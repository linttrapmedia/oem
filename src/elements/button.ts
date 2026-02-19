import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type Variant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];
type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

const variantConfig: Record<
  Variant,
  {
    bg: ColorToken | 'transparent';
    bgHover: ColorToken;
    bgActive: ColorToken;
    bgDisabled: ColorToken;
    text: ColorToken;
    border?: ColorToken;
  }
> = {
  primary: {
    bg: 'primary',
    bgHover: 'primaryHover',
    bgActive: 'primaryActive',
    bgDisabled: 'primaryDisabled',
    text: 'textInverse',
  },
  secondary: {
    bg: 'secondary',
    bgHover: 'secondaryHover',
    bgActive: 'secondaryActive',
    bgDisabled: 'secondaryDisabled',
    text: 'textInverse',
  },
  success: {
    bg: 'success',
    bgHover: 'successHover',
    bgActive: 'successActive',
    bgDisabled: 'successSubtle',
    text: 'textInverse',
  },
  error: {
    bg: 'error',
    bgHover: 'errorHover',
    bgActive: 'errorActive',
    bgDisabled: 'errorSubtle',
    text: 'textInverse',
  },
  warning: {
    bg: 'warning',
    bgHover: 'warningHover',
    bgActive: 'warningActive',
    bgDisabled: 'warningSubtle',
    text: 'textPrimary',
  },
  info: {
    bg: 'info',
    bgHover: 'infoHover',
    bgActive: 'infoActive',
    bgDisabled: 'infoSubtle',
    text: 'textInverse',
  },
  ghost: {
    bg: 'transparent',
    bgHover: 'bgHover',
    bgActive: 'bgActive',
    bgDisabled: 'bgDisabled',
    text: 'textPrimary',
    border: 'borderPrimary',
  },
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

// Example usage:
// button.el(
//   button.size('md'),
//   button.disabled(false),
//   button.variant('primary'),
//   button.text('Click Me'),
// );
export const button = {
  create: (...children: Child[]) => {
    const el = document.createElement('button');

    // Apply default button styles
    tag.$(el)(
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('fontWeight', theme.$token('typography', 'fontWeightMedium')),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
      trait.style('transition', 'all 0.2s ease-in-out'),
      trait.style('border', 'none'),
      trait.style('outline', 'none'),
      trait.style('userSelect', 'none'),
      trait.style('cursor', 'pointer'),
    );

    // Apply children (appliers or elements)
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
    const config = variantConfig[variant];

    tag.$(el)(
      // Base styles
      trait.style('backgroundColor', theme.$token('colors', config.bg)),
      trait.style('color', theme.$token('colors', config.text)),
      trait.style(
        'border',
        `1px solid ${theme.$token('colors', config.border!)}`,
        $test(config.border),
      ),
      trait.style('border', 'none', $test(!config.border)),

      // Hover state
      trait.style_on_event('mouseenter', 'backgroundColor', theme.$token('colors', config.bgHover)),

      // Mouse leave - restore background
      trait.style_on_event(
        'mouseleave',
        'backgroundColor',
        'transparent',
        $test(config.bg === 'transparent'),
      ),
      trait.style_on_event(
        'mouseleave',
        'backgroundColor',
        theme.$token('colors', config.bg),
        $test(config.bg !== 'transparent'),
      ),

      // Active state
      trait.style_on_event('mousedown', 'backgroundColor', theme.$token('colors', config.bgActive)),
      trait.style_on_event('mouseup', 'backgroundColor', theme.$token('colors', config.bgHover)),
    );
  },

  size: (size: Size) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];

    tag.$(el)(
      trait.style('padding', theme.$token('spacing', config.padding)),
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('height', theme.$token('spacing', config.height)),
      trait.style('borderRadius', theme.$token('borders', 'borderRadiusButton')),
    );
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('opacity', '0.6', $test(disabled)),
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('pointerEvents', 'none', $test(disabled)),
      trait.attr('disabled', 'true', $test(disabled)),
    );
  },

  text: (text: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.text(text));
  },

  onClick: (handler: (e: any) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.event('click', handler));
  },
};
