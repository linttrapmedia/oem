import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type BadgeVariant = 'solid' | 'subtle' | 'outline';
type BadgeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

type ColorToken = keyof DesignTokens['colors'];
type SpacingToken = keyof DesignTokens['spacing'];
type TypographyToken = keyof DesignTokens['typography'];

type BadgeProps = {
  content: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  pill?: boolean;
  children?: HTMLElement[];
};

const colorConfig: Record<
  BadgeColor,
  {
    solid: { bg: ColorToken; text: ColorToken };
    subtle: { bg: ColorToken; text: ColorToken };
    outline: { border: ColorToken; text: ColorToken };
  }
> = {
  primary: {
    solid: { bg: 'primary', text: 'textInverse' },
    subtle: { bg: 'primarySubtle', text: 'primary' },
    outline: { border: 'primary', text: 'primary' },
  },
  secondary: {
    solid: { bg: 'secondary', text: 'textInverse' },
    subtle: { bg: 'secondarySubtle', text: 'secondary' },
    outline: { border: 'secondary', text: 'secondary' },
  },
  success: {
    solid: { bg: 'success', text: 'textInverse' },
    subtle: { bg: 'successSubtle', text: 'success' },
    outline: { border: 'success', text: 'success' },
  },
  error: {
    solid: { bg: 'error', text: 'textInverse' },
    subtle: { bg: 'errorSubtle', text: 'error' },
    outline: { border: 'error', text: 'error' },
  },
  warning: {
    solid: { bg: 'warning', text: 'textPrimary' },
    subtle: { bg: 'warningSubtle', text: 'warning' },
    outline: { border: 'warning', text: 'warning' },
  },
  info: {
    solid: { bg: 'info', text: 'textInverse' },
    subtle: { bg: 'infoSubtle', text: 'info' },
    outline: { border: 'info', text: 'info' },
  },
  neutral: {
    solid: { bg: 'bgSecondary', text: 'textPrimary' },
    subtle: { bg: 'bgTertiary', text: 'textSecondary' },
    outline: { border: 'borderPrimary', text: 'textPrimary' },
  },
};

const sizeConfig: Record<
  BadgeSize,
  {
    paddingX: SpacingToken;
    paddingY: SpacingToken;
    fontSize: TypographyToken;
  }
> = {
  sm: {
    paddingX: 'xs',
    paddingY: '1',
    fontSize: 'fontSizeXs',
  },
  md: {
    paddingX: 'sm',
    paddingY: '1',
    fontSize: 'fontSizeSm',
  },
  lg: {
    paddingX: 'md',
    paddingY: 'xs',
    fontSize: 'fontSizeBase',
  },
};

export const badge = (props: BadgeProps) => {
  const {
    content,
    variant = 'solid',
    color = 'primary',
    size = 'md',
    pill = false,
    children = [],
  } = props;

  const colors = colorConfig[color][variant];
  const sizeSettings = sizeConfig[size];

  const element = tag.span(
    // Base styles
    trait.style('display', 'inline-flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('fontSize', theme.$token('typography', sizeSettings.fontSize)),
    trait.style('fontWeight', theme.$token('typography', 'fontWeightMedium')),
    trait.style('lineHeight', theme.$token('typography', 'lineHeightTight')),
    trait.style('whiteSpace', 'nowrap'),
    trait.style('userSelect', 'none'),

    // Padding
    trait.style('paddingLeft', theme.$token('spacing', sizeSettings.paddingX)),
    trait.style('paddingRight', theme.$token('spacing', sizeSettings.paddingX)),
    trait.style('paddingTop', theme.$token('spacing', sizeSettings.paddingY)),
    trait.style('paddingBottom', theme.$token('spacing', sizeSettings.paddingY)),

    // Border radius
    trait.style('borderRadius', theme.$token('borders', 'borderRadiusBadge'), $test(!pill)),
    trait.style('borderRadius', '9999px', $test(pill)),

    // Variant: solid
    trait.style('backgroundColor', theme.$token('colors', colors.bg!), $test(variant === 'solid')),
    trait.style('color', theme.$token('colors', colors.text), $test(variant === 'solid')),
    trait.style('border', 'none', $test(variant === 'solid')),

    // Variant: subtle
    trait.style('backgroundColor', theme.$token('colors', colors.bg!), $test(variant === 'subtle')),
    trait.style('color', theme.$token('colors', colors.text), $test(variant === 'subtle')),
    trait.style('border', 'none', $test(variant === 'subtle')),

    // Variant: outline
    trait.style('backgroundColor', 'transparent', $test(variant === 'outline')),
    trait.style('color', theme.$token('colors', colors.text), $test(variant === 'outline')),
    trait.style(
      'border',
      () =>
        `${theme.token('borders', 'borderWidthThin')} ${theme.token(
          'borders',
          'borderStyleSolid',
        )} ${theme.token('colors', colors.border!)}`,
      $test(variant === 'outline'),
      theme,
    ),

    // Content
    trait.text(content),

    // Children
    ...children,
  );

  return element;
};
