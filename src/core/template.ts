import type { Tail } from './types';

const traitCleanupMap = new WeakMap<HTMLElement | SVGElement, (() => void)[]>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && traitCleanupMap.has(node)) {
          const funcs = traitCleanupMap.get(node)!;
          funcs.forEach((fn) => fn());
          traitCleanupMap.delete(node);
        }
      });
    }
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

type TemplateTraitFunc<Args extends any[] = any[], Return = any> = (...args: Args) => Return;
type TemplateTraitApplier = (el: HTMLElement | SVGElement) => void;
type TemplateReturnType<P extends Record<string, TemplateTraitFunc>> = [
  {
    [K in keyof HTMLElementTagNameMap]: (
      ...traits: (string | number | TemplateTraitApplier | HTMLElement | SVGElement)[]
    ) => HTMLElementTagNameMap[K];
  } & {
    [K in keyof SVGElementTagNameMap]: (
      ...traits: (string | number | TemplateTraitApplier | HTMLElement | SVGElement)[]
    ) => SVGElementTagNameMap[K];
  },
  {
    [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => TemplateTraitApplier;
  },
];

export function Template<P extends Record<string, TemplateTraitFunc>>(
  config?: P,
): TemplateReturnType<P> {
  // HTML proxy: creates elements and applies traits
  const tagProxy = new Proxy(
    {},
    {
      get: (_, prop: string) => {
        const tagFunc = (...traits: TemplateTraitApplier[]) => {
          const svgTags = new Set([
            'svg',
            'g',
            'rect',
            'circle',
            'ellipse',
            'line',
            'polyline',
            'polygon',
            'path',
            'text',
            'defs',
            'use',
            'mask',
            'clipPath',
          ]);

          const el = svgTags.has(prop)
            ? document.createElementNS('http://www.w3.org/2000/svg', prop)
            : document.createElement(prop);

          traits.forEach((trait: any) => {
            // apply
            if (trait.type === 'trait') {
              trait(el);
              // is some type of function
            } else if (typeof trait === 'function') {
              // if a state object
              if (trait.hasOwnProperty('sub')) {
                const text = document.createTextNode('');
                el.appendChild(text);
                const apply = () => (text.data = trait(el) as any);
                apply();
                const unsub = (trait as any).sub(apply);
                traitCleanupMap.set(el, [...(traitCleanupMap.get(el) || []), unsub]);
                // is just a function
              } else {
                el.append(trait(el) as any);
              }
              // static value
            } else {
              el.append(trait);
            }
          });
          return el;
        };
        tagFunc.type = 'tag';
        return tagFunc;
      },
    },
  ) as TemplateReturnType<P>[0];

  // Trait proxy: returns functions that apply themselves to an element
  const traitProxy = new Proxy(
    {},
    {
      get:
        (_, prop: string) =>
        (...args: any[]) => {
          const trait = (el: HTMLElement) => {
            const fn = (<any>config)[prop as keyof P] as (...args: any[]) => any;
            const unsub = fn(el, ...args); // first argument is the element
            const list = traitCleanupMap.get(el) || [];
            list.push(unsub);
            traitCleanupMap.set(el, list);
          };
          trait.type = 'trait';
          return trait;
        },
    },
  ) as TemplateReturnType<P>[1];

  return [tagProxy, traitProxy];
}
