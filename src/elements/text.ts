import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type TextVariant = 'body' | 'caption' | 'overline' | 'subtitle';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type TextColor = keyof DesignTokens['colors'];
type TypographyToken = keyof DesignTokens['typography'];

const variantConfig: Record<
  TextVariant,
  { fontSize: TypographyToken; lineHeight: TypographyToken }
> = {
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

export const text = {
  create: (...children: Child[]) => {
    const el = document.createElement('span');

    tag.$(el)(
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('color', theme.$token('colors', 'textPrimary')),
    );

    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  variant: (variant: TextVariant) => (el: HTMLElement | SVGElement) => {
    const config = variantConfig[variant];

    tag.$(el)(
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('lineHeight', theme.$token('typography', config.lineHeight)),
    );
  },

  size: (size: TextSize) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('fontSize', theme.$token('typography', sizeConfig[size])));
  },

  weight: (weight: TextWeight) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('fontWeight', theme.$token('typography', weightConfig[weight])));
  },

  align: (align: TextAlign) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('textAlign', align));
  },

  color: (color: TextColor) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('color', theme.$token('colors', color)));
  },

  italic: (italic: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('fontStyle', 'italic', $test(italic)),
      trait.style('fontStyle', 'normal', $test(!italic)),
    );
  },

  underline: (underline: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('textDecoration', 'underline', $test(underline)),
      trait.style('textDecoration', 'none', $test(!underline)),
    );
  },

  truncate: (truncate: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('overflow', 'hidden', $test(truncate)),
      trait.style('textOverflow', 'ellipsis', $test(truncate)),
      trait.style('whiteSpace', 'nowrap', $test(truncate)),
    );
  },

  content: (content: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.text(content));
  },
};
