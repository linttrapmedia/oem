import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'month'
  | 'week';
type Size = 'sm' | 'md' | 'lg';
type Variant = 'outline' | 'filled' | 'flushed';
type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

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

export const input = {
  create: (...children: Child[]) => {
    const el = document.createElement('input');

    // Apply default input styles
    tag.$(el)(
      trait.attr('type', 'text'),
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
      trait.style('color', theme.$token('colors', 'textPrimary')),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusInput')),
      trait.style('transition', 'all 0.2s ease-in-out'),
      trait.style('outline', 'none'),
      trait.style('boxSizing', 'border-box'),
    );

    // Apply children (appliers)
    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  type: (type: InputType) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('type', type));
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
      trait.style('cursor', 'text', $test(!disabled)),
      trait.attr('disabled', 'true', $test(disabled)),
    );
  },

  readOnly: (readOnly: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('backgroundColor', theme.$token('colors', 'bgDisabled'), $test(readOnly)),
      trait.style('cursor', 'default', $test(readOnly)),
      trait.attr('readonly', 'true', $test(readOnly)),
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
    (el as HTMLInputElement).value = value;
  },

  placeholder: (placeholder: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('placeholder', placeholder));
  },

  onInput: (handler: (value: string) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.event('input', (e?: Event) => {
        if (!e) return;
        const target = e.target as HTMLInputElement;
        handler(target.value);
      }),
    );
  },

  onChange: (handler: (value: string) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.event('change', (e?: Event) => {
        if (!e) return;
        const target = e.target as HTMLInputElement;
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

  onBlur: (handler: () => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.event('blur', handler));
  },
};
