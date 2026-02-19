import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type SpacingToken = keyof DesignTokens['spacing'];
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export const stack = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    tag.$(el)(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('alignItems', 'stretch'),
      trait.style('justifyContent', 'flex-start'),
      trait.style('gap', theme.$token('spacing', 'md')),
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

  spacing: (spacing: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('gap', theme.$token('spacing', spacing)));
  },

  align: (align: AlignItems) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('alignItems', align));
  },

  justify: (justify: JustifyContent) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('justifyContent', justify));
  },

  wrap: (wrap: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('flexWrap', 'wrap', $test(wrap)),
      trait.style('flexWrap', 'nowrap', $test(!wrap)),
    );
  },

  fullWidth: (fullWidth: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('width', '100%', $test(fullWidth)),
      trait.style('width', 'auto', $test(!fullWidth)),
    );
  },
};
