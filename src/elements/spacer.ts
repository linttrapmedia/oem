import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type SpacingToken = keyof DesignTokens['spacing'];
type SpacerAxis = 'horizontal' | 'vertical' | 'both';

export const spacer = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    tag.$(el)(
      trait.style('flexShrink', '0'),
      trait.style('width', '100%'),
      trait.style('height', theme.$token('spacing', 'md')),
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

  size: (size: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('height', theme.$token('spacing', size)));
  },

  axis: (axis: SpacerAxis) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      // Vertical spacing (default)
      trait.style('width', '100%', $test(axis === 'vertical')),
      trait.style('height', theme.$token('spacing', 'md'), $test(axis === 'vertical')),

      // Horizontal spacing
      trait.style('width', theme.$token('spacing', 'md'), $test(axis === 'horizontal')),
      trait.style('height', '100%', $test(axis === 'horizontal')),

      // Both directions
      trait.style('width', theme.$token('spacing', 'md'), $test(axis === 'both')),
      trait.style('height', theme.$token('spacing', 'md'), $test(axis === 'both')),
    );
  },
};
