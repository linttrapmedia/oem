import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type LabelSize = 'sm' | 'md' | 'lg';
type ColorToken = keyof DesignTokens['colors'];
type TypographyToken = keyof DesignTokens['typography'];
type SpacingToken = keyof DesignTokens['spacing'];

const sizeConfig: Record<
  LabelSize,
  {
    fontSize: TypographyToken;
    fontWeight: TypographyToken;
  }
> = {
  sm: {
    fontSize: 'fontSizeSm',
    fontWeight: 'fontWeightNormal',
  },
  md: {
    fontSize: 'fontSizeBase',
    fontWeight: 'fontWeightMedium',
  },
  lg: {
    fontSize: 'fontSizeLg',
    fontWeight: 'fontWeightMedium',
  },
};

export const label = {
  create: (...children: Child[]) => {
    const el = document.createElement('label');

    tag.$(el)(
      trait.style('fontFamily', theme.$token('typography', 'fontFamilyBase')),
      trait.style('lineHeight', theme.$token('typography', 'lineHeightNormal')),
      trait.style('display', 'inline-block'),
      trait.style('marginBottom', theme.$token('spacing', 'xs')),
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

  size: (size: LabelSize) => (el: HTMLElement | SVGElement) => {
    const config = sizeConfig[size];

    tag.$(el)(
      trait.style('fontSize', theme.$token('typography', config.fontSize)),
      trait.style('fontWeight', theme.$token('typography', config.fontWeight)),
    );
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('color', theme.$token('colors', color)));
  },

  htmlFor: (htmlFor: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.attr('for', htmlFor), trait.style('cursor', 'pointer'));
  },

  required: (required: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('color', theme.$token('colors', 'error'), $test(required)));
  },

  disabled: (disabled: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('opacity', '0.6', $test(disabled)),
      trait.style('cursor', 'not-allowed', $test(disabled)),
      trait.style('color', theme.$token('colors', 'textDisabled'), $test(disabled)),
    );
  },

  text: (text: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.text(text));
  },
};
