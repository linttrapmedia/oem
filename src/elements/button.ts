import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children?: HTMLElement[];
};

// Extract token name types from DesignTokens
type ColorToken = keyof DesignTokens['colors'];
type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

const variantConfig: Record<
  ButtonVariant,
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
  ButtonSize,
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

export const button = (props: ButtonProps) => {
  const {
    label,
    variant = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    onClick,
    children = [],
  } = props;

  const config = variantConfig[variant];
  const sizeSettings = sizeConfig[size];

  const btnElement = tag.button(
    // Base styles
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

    // Cursor
    trait.style('cursor', 'not-allowed', $test(disabled)),
    trait.style('cursor', 'pointer', $test(!disabled)),

    // Size-based styles
    trait.style('padding', theme.$token('spacing', sizeSettings.padding)),
    trait.style('fontSize', theme.$token('typography', sizeSettings.fontSize)),
    trait.style('height', theme.$token('spacing', sizeSettings.height)),
    trait.style('borderRadius', theme.$token('borders', 'borderRadiusButton')),

    // Width
    trait.style('width', '100%', $test(fullWidth)),
    trait.style('width', 'auto', $test(!fullWidth)),

    // Background color
    trait.style(
      'backgroundColor',
      theme.$token('colors', config.bg),
      $test(!disabled && config.bg !== 'transparent'),
    ),
    trait.style('backgroundColor', 'transparent', $test(!disabled && config.bg === 'transparent')),
    trait.style(
      'backgroundColor',
      theme.$token('colors', config.bgDisabled),
      $test(disabled && config.bg !== 'transparent'),
    ),
    trait.style('backgroundColor', 'transparent', $test(disabled && config.bg === 'transparent')),

    // Text color
    trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),
    trait.style('color', theme.$token('colors', config.text), $test(!disabled)),

    // Border for ghost variant
    trait.style(
      'border',
      () =>
        `${theme.token('borders', 'borderWidthThin')} ${theme.token(
          'borders',
          'borderStyleSolid',
        )} ${theme.token('colors', config.border || 'borderPrimary')}`,
      $test(config.border !== undefined),
      theme,
    ),

    // Opacity
    trait.style('opacity', '0.6', $test(disabled)),
    trait.style('opacity', '1', $test(!disabled)),

    // Shadow
    trait.style('boxShadow', 'none', $test(disabled)),
    trait.style('boxShadow', theme.$token('shadows', 'shadowButton'), $test(!disabled)),

    // Hover state - enter
    trait.style_on_event(
      'mouseenter',
      'backgroundColor',
      theme.$token('colors', config.bgHover),
      $test(!disabled),
    ),
    trait.style_on_event(
      'mouseenter',
      'boxShadow',
      theme.$token('shadows', 'shadowButtonHover'),
      $test(!disabled),
    ),
    trait.style_on_event('mouseenter', 'transform', 'translateY(-1px)', $test(!disabled)),

    // Hover state - leave (revert)
    trait.style_on_event(
      'mouseleave',
      'backgroundColor',
      theme.$token('colors', config.bg),
      $test(!disabled && config.bg !== 'transparent'),
    ),
    trait.style_on_event(
      'mouseleave',
      'backgroundColor',
      'transparent',
      $test(!disabled && config.bg === 'transparent'),
    ),
    trait.style_on_event(
      'mouseleave',
      'boxShadow',
      theme.$token('shadows', 'shadowButton'),
      $test(!disabled),
    ),
    trait.style_on_event('mouseleave', 'transform', 'translateY(0)', $test(!disabled)),

    // Active state - press
    trait.style_on_event(
      'mousedown',
      'backgroundColor',
      theme.$token('colors', config.bgActive),
      $test(!disabled),
    ),
    trait.style_on_event('mousedown', 'transform', 'translateY(0)', $test(!disabled)),
    trait.style_on_event('mousedown', 'boxShadow', 'none', $test(!disabled)),

    // Active state - release (revert to hover if still hovering)
    trait.style_on_event(
      'mouseup',
      'backgroundColor',
      theme.$token('colors', config.bgHover),
      $test(!disabled),
    ),
    trait.style_on_event('mouseup', 'transform', 'translateY(-1px)', $test(!disabled)),
    trait.style_on_event(
      'mouseup',
      'boxShadow',
      theme.$token('shadows', 'shadowButtonHover'),
      $test(!disabled),
    ),

    // Focus state
    trait.style_on_event('focus', 'boxShadow', theme.$token('shadows', 'shadowFocus')),

    // Click handler
    trait.event('click', onClick || (() => {}), $test(onClick !== undefined && !disabled)),

    // Disabled attribute
    trait.attr('disabled', 'true', $test(disabled)),

    // Label text
    trait.text(label || '', $test(label !== undefined)),

    // Children elements
    ...children,
  );

  return btnElement;
};
