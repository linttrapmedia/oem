import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import type { DesignTokens } from '@/themes/_base';

type TextVariant = 'body' | 'caption' | 'overline' | 'subtitle';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type TextColor = keyof DesignTokens['colors'];

type TextProps = {
  content?: string;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  color?: TextColor;
  italic?: boolean;
  underline?: boolean;
  truncate?: boolean;
  children?: HTMLElement[];
};

type TypographyToken = keyof DesignTokens['typography'];

const variantConfig: Record<TextVariant, { fontSize: TypographyToken; lineHeight: TypographyToken }> = {
  body: {
    fontSize: 'fontSizeBase',
    lineHeight: 'lineHeightNormal',
  },
  caption: {
    fontSize: 'fontSizeSm',
    lineHeight: 'lineHeightTight',
  },
  overline: {
    fontSize: 'fontSizeXs',
    lineHeight: 'lineHeightTight',
  },
  subtitle: {
    fontSize: 'fontSizeLg',
    lineHeight: 'lineHeightRelaxed',
  },
};

const sizeConfig: Record<TextSize, TypographyToken> = {
  xs: 'fontSizeXs',
  sm: 'fontSizeSm',
  md: 'fontSizeBase',
  lg: 'fontSizeLg',
  xl: 'fontSizeXl',
};

const weightConfig: Record<TextWeight, TypographyToken> = {
  normal: 'fontWeightNormal',
  medium: 'fontWeightMedium',
  semibold: 'fontWeightSemibold',
  bold: 'fontWeightBold',
};

export const text = (props: TextProps) => {
  const {
    content,
    variant = 'body',
    size,
    weight = 'normal',
    align = 'left',
    color = 'textPrimary',
    italic = false,
    underline = false,
    truncate = false,
    children = [],
  } = props;

  const config = variantConfig[variant];

  const element = tag.span(
    // Base styles
    trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
    trait.style('color', theme.$token('colors', color)),

    // Font size (size prop overrides variant)
    trait.style('fontSize', theme.$token('typography', sizeConfig[size!]), $test(size !== undefined)),
    trait.style('fontSize', theme.$token('typography', config.fontSize), $test(size === undefined)),

    // Line height
    trait.style('lineHeight', theme.$token('typography', config.lineHeight)),

    // Font weight
    trait.style('fontWeight', theme.$token('typography', weightConfig[weight])),

    // Text align
    trait.style('textAlign', align),

    // Italic
    trait.style('fontStyle', 'italic', $test(italic)),
    trait.style('fontStyle', 'normal', $test(!italic)),

    // Underline
    trait.style('textDecoration', 'underline', $test(underline)),
    trait.style('textDecoration', 'none', $test(!underline)),

    // Truncate
    trait.style('overflow', 'hidden', $test(truncate)),
    trait.style('textOverflow', 'ellipsis', $test(truncate)),
    trait.style('whiteSpace', 'nowrap', $test(truncate)),

    // Content
    trait.text(content || '', $test(content !== undefined)),

    // Children
    ...children,
  );

  return element;
};
