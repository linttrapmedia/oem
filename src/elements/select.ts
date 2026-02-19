import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type Size = 'sm' | 'md' | 'lg';
type Variant = 'outline' | 'filled' | 'flushed';
type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

const sizeConfig: Record<
  Size,
  {
    padding: SpacingToken;
    fontSize: TypographyToken;
    height: SpacingToken;
  }
> = {
  sm: {
    padding: 'sm',
    fontSize: 'fontSizeSm',
    height: '8',
  },
  md: {
    padding: 'md',
    fontSize: 'fontSizeBase',
    height: '10',
  },
  lg: {
    padding: 'lg',
    fontSize: 'fontSizeLg',
    height: '12',
  },
};

export const select = {
  create: (...children: Child[]) => {
    const el = document.createElement('select');

    // Apply default select styles
    tag.$(el)(
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
      trait.style('color', theme.$token('colors', 'textPrimary')),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusInput')),
      trait.style('transition', 'all 0.2s ease-in-out'),
      trait.style('outline', 'none'),
      trait.style('boxSizing', 'border-box'),
      trait.style('appearance', 'none'),
      trait.style('cursor', 'pointer'),
      trait.style('paddingRight', theme.$token('spacing', 'xl')),
      trait.style(
        'backgroundImage',
        `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='currentColor' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
      ),
      trait.style('backgroundRepeat', 'no-repeat'),
      trait.style('backgroundPosition', 'right 0.75rem center'),
      trait.style('backgroundSize', '12px'),
    );

    // Apply children (appliers or option elements)
    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  variant: (variant: Variant) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      // Outline variant
      trait.style(
        'border',
        () =>
          `${theme.token('borders', 'borderWidthThin')} ${theme.token(
            'borders',
            'borderStyleSolid',
          )} ${theme.token('colors', 'borderPrimary')}`,
        $test(variant === 'outline'),
        theme,
      ),
      trait.style(
        'backgroundColor',
        theme.$token('colors', 'bgPrimary'),
        $test(variant === 'outline'),
      ),

      // Filled variant
      trait.style('border', 'none', $test(variant === 'filled')),
      trait.style(
        'backgroundColor',
        theme.$token('colors', 'bgSecondary'),
        $test(variant === 'filled'),
      ),

      // Flushed variant
      trait.style('border', 'none', $test(variant === 'flushed')),
      trait.style(
        'borderBottom',
        () =>
          `${theme.token('borders', 'borderWidthThin')} ${theme.token(
            'borders',
            'borderStyleSolid',
          )} ${theme.token('colors', 'borderPrimary')}`,
        $test(variant === 'flushed'),
        theme,
      ),
      trait.style('backgroundColor', 'transparent', $test(variant === 'flushed')),
      trait.style('borderRadius', '0', $test(variant === 'flushed')),
      trait.style('paddingLeft', '0', $test(variant === 'flushed')),
    );
  },

  size: (size: Size) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];

    tag.$(el)(
      trait.style('padding', theme.$token('spacing', config.padding)),
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('height', theme.$token('spacing', config.height)),
    );
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('opacity', '0.6', $test(disabled)),
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('cursor', 'pointer', $test(!disabled)),
      trait.attr('disabled', 'true', $test(disabled)),
    );
  },

  required: (required: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('required', 'true', $test(required)));
  },

  fullWidth: (fullWidth: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('width', '100%', $test(fullWidth)),
      trait.style('width', 'auto', $test(!fullWidth)),
    );
  },

  error: (error: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('borderColor', theme.$token('colors', 'error'), $test(error)),
      trait.style_on_event(
        'mouseenter',
        'borderColor',
        theme.$token('colors', 'errorHover'),
        $test(error),
      ),
    );
  },

  value: (value: string) => (el: HTMLElement | SVGElement) => {
    (el as HTMLSelectElement).value = value;
  },

  options: (options: SelectOption[]) => (el: HTMLElement | SVGElement) => {
    options.forEach((option) => {
      const optionEl = document.createElement('option');
      tag.$(optionEl)(
        trait.attr('value', option.value),
        trait.attr('disabled', 'true', $test(option.disabled === true)),
        trait.text(option.label),
      );
      (el as HTMLSelectElement).appendChild(optionEl);
    });
  },

  placeholder: (placeholder: string) => (el: HTMLElement | SVGElement) => {
    const optionEl = document.createElement('option');
    tag.$(optionEl)(
      trait.attr('value', ''),
      trait.attr('disabled', 'true'),
      trait.attr('selected', 'true'),
      trait.text(placeholder),
    );
    (el as HTMLSelectElement).insertBefore(optionEl, (el as HTMLSelectElement).firstChild);
  },

  onChange: (handler: (value: string) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.event('change', (e?: Event) => {
        if (!e) return;
        const target = e.target as HTMLSelectElement;
        handler(target.value);
      }),
    );
  },

  onFocus: (handler: () => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.event('focus', handler),
      trait.style_on_event('focus', 'borderColor', theme.$token('colors', 'primary')),
      trait.style_on_event('focus', 'boxShadow', theme.$token('shadows', 'shadowFocus')),
    );
  },
};
