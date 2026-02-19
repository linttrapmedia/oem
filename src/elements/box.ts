import { tag, trait } from '@/elements/_base';
import { theme } from '@/modules/theme';
import { DesignTokens } from '@/themes';

type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;
type SpacingToken = keyof DesignTokens['spacing'];
type ColorToken = keyof DesignTokens['colors'];
type BorderRadiusToken = keyof DesignTokens['borders'];
type Display = 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';
type ShadowToken = keyof DesignTokens['shadows'];

export const box = {
  create: (...children: Child[]) => {
    const el = document.createElement('div');

    tag.$(el)(trait.style('display', 'block'), trait.style('position', 'static'));

    children.forEach((c) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) {
        el.appendChild(c);
      } else {
        c(el);
      }
    });

    return el;
  },

  padding: (padding: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('padding', theme.$token('spacing', padding)));
  },

  paddingX: (paddingX: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('paddingLeft', theme.$token('spacing', paddingX)),
      trait.style('paddingRight', theme.$token('spacing', paddingX)),
    );
  },

  paddingY: (paddingY: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('paddingTop', theme.$token('spacing', paddingY)),
      trait.style('paddingBottom', theme.$token('spacing', paddingY)),
    );
  },

  margin: (margin: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('margin', theme.$token('spacing', margin)));
  },

  marginX: (marginX: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('marginLeft', theme.$token('spacing', marginX)),
      trait.style('marginRight', theme.$token('spacing', marginX)),
    );
  },

  marginY: (marginY: SpacingToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style('marginTop', theme.$token('spacing', marginY)),
      trait.style('marginBottom', theme.$token('spacing', marginY)),
    );
  },

  bg: (bg: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('backgroundColor', theme.$token('colors', bg)));
  },

  border: (border: ColorToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(
      trait.style(
        'border',
        `${theme.$token('borders', 'borderWidthThin')} ${theme.$token(
          'borders',
          'borderStyleSolid',
        )} ${theme.$token('colors', border)}`,
      ),
    );
  },

  borderRadius: (borderRadius: BorderRadiusToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('borderRadius', theme.$token('borders', borderRadius)));
  },

  width: (width: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('width', width));
  },

  height: (height: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('height', height));
  },

  maxWidth: (maxWidth: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('maxWidth', maxWidth));
  },

  maxHeight: (maxHeight: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('maxHeight', maxHeight));
  },

  minWidth: (minWidth: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('minWidth', minWidth));
  },

  minHeight: (minHeight: string) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('minHeight', minHeight));
  },

  display: (display: Display) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('display', display));
  },

  position: (position: Position) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('position', position));
  },

  overflow: (overflow: Overflow) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('overflow', overflow));
  },

  shadow: (shadow: ShadowToken) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('boxShadow', theme.$token('shadows', shadow)));
  },

  onClick: (handler: (e: any) => void) => (el: HTMLElement | SVGElement) => {
    tag.$(el)(trait.style('cursor', 'pointer'), trait.event('click', handler));
  },
};
