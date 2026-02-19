import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted';
type ColorToken = keyof DesignTokens['colors'];
type SpacingToken = keyof DesignTokens['spacing'];

export const divider = {
  create: (...children: Child[]) => {
    const el = document.createElement('hr');

    tag.$(el)(
      trait.style('border', 'none'),
      trait.style('margin', '0'),
      trait.style('padding', '0'),
      trait.style('backgroundColor', theme.$token('colors', 'borderPrimary')),
      trait.style('width', '100%'),
      trait.style('height', '1px'),
      trait.style('marginTop', theme.$token('spacing', 'md')),
      trait.style('marginBottom', theme.$token('spacing', 'md')),
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

  orientation: (orientation: DividerOrientation) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      // Horizontal
      trait.style('width', '100%', $test(orientation === 'horizontal')),
      trait.style('height', '1px', $test(orientation === 'horizontal')),

      // Vertical
      trait.style('width', '1px', $test(orientation === 'vertical')),
      trait.style('height', '100%', $test(orientation === 'vertical')),
      trait.style('display', 'inline-block', $test(orientation === 'vertical')),
    );
  },

  variant: (variant: DividerVariant) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('backgroundColor', 'transparent', $test(variant !== 'solid')),
      trait.style(
        'backgroundImage',
        'repeating-linear-gradient(to right, currentColor 0, currentColor 8px, transparent 8px, transparent 16px)',
        $test(variant === 'dashed'),
      ),
      trait.style(
        'backgroundImage',
        'repeating-linear-gradient(to right, currentColor 0, currentColor 2px, transparent 2px, transparent 6px)',
        $test(variant === 'dotted'),
      ),
    );
  },

  color: (color: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('backgroundColor', theme.$token('colors', color)),
      trait.style('color', theme.$token('colors', color)),
    );
  },

  thickness: (thickness: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('height', thickness));
  },

  spacing: (spacing: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('marginTop', theme.$token('spacing', spacing)),
      trait.style('marginBottom', theme.$token('spacing', spacing)),
    );
  },

  spacingVertical: (spacing: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('marginLeft', theme.$token('spacing', spacing)),
      trait.style('marginRight', theme.$token('spacing', spacing)),
    );
  },
};
