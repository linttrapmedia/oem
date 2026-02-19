import { $test } from '@/core/util';
import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type SpacingToken = keyof DesignTokens['spacing'];
type AlignItems = 'start' | 'center' | 'end' | 'stretch';
type JustifyItems = 'start' | 'center' | 'end' | 'stretch';

export const grid = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    tag.$(el)(trait.style('display', 'grid'));

    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  columns: (columns: number | string) => (el: HTMLElement | SVGElement) => {
    const value = typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
    tag.$(el)(trait.style('gridTemplateColumns', value));
  },

  rows: (rows: number | string) => (el: HTMLElement | SVGElement) => {
    const value = typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows;
    tag.$(el)(trait.style('gridTemplateRows', value));
  },

  gap: (gap: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('gap', theme.$token('spacing', gap)));
  },

  columnGap: (gap: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('columnGap', theme.$token('spacing', gap)));
  },

  rowGap: (gap: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('rowGap', theme.$token('spacing', gap)));
  },

  alignItems: (align: AlignItems) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('alignItems', align));
  },

  justifyItems: (justify: JustifyItems) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('justifyItems', justify));
  },

  fullWidth: (fullWidth: boolean) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('width', '100%', $test(fullWidth)),
      trait.style('width', 'auto', $test(!fullWidth)),
    );
  },
};
