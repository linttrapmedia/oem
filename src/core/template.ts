import type { Tail } from './types';

// Map of traits to clean up
const traitCleanupMap = new WeakMap<HTMLElement | SVGElement, (() => void)[]>();

// On DOM mutations, find and call all trait cleanup functions for all nodes removed
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

// Watch the entire document
observer.observe(document.documentElement, { childList: true, subtree: true });

// Any function where an element is the first argument
type TemplateTraitApplier = (el: HTMLElement | SVGElement) => void;

// The "Trait" configuration object to be used by the Template function
type TemplateTraitFunc<Args extends any[] = any[], Return = any> = (...args: Args) => Return;

// The Template instance return type
type TemplateReturnType<P extends Record<string, TemplateTraitFunc>> = [
  {
    [K in keyof HTMLElementTagNameMap]: (
      ...traits: TemplateTraitApplier[]
    ) => HTMLElementTagNameMap[K];
  } & {
    [K in keyof SVGElementTagNameMap]: (
      ...traits: TemplateTraitApplier[]
    ) => SVGElementTagNameMap[K];
  },
  {
    [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => TemplateTraitApplier;
  },
];

// The main Template function. Creates an instance of a user defined "template engine" through the use of "traits"
export function Template<P extends Record<string, TemplateTraitFunc>>(
  config?: P,
): TemplateReturnType<P> {
  // HTML proxy: creates a method for every html tag.
  // Example: tag.div(...TemplateTraitApplier functions...)
  const tagProxy = new Proxy(
    {},
    {
      get: (_, prop: string) => {
        const tagFunc = (...traits: TemplateTraitApplier[]) => {
          // we need a list of svg tags so we can reliably autoset the namespace
          const svgTags = new Set(
            'svg,g,rect,circle,ellipse,line,polyline,polygon,path,text,defs,use,mask,clipPath'.split(
              ',',
            ),
          );

          // Create the element based on the "prop" which will be an html tag
          // Example: for tag.div(...), prop will be "div"
          const el = svgTags.has(prop)
            ? document.createElementNS('http://www.w3.org/2000/svg', prop)
            : document.createElement(prop);
          traits.forEach((trait: any) => trait(el));
          return el;
        };

        // this helps for reliable ad-hoc reflection in the OEM internals
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

          // this helps for reliable ad-hoc reflection in the OEM internals
          trait.type = 'trait';
          return trait;
        },
    },
  ) as TemplateReturnType<P>[1];

  // returning destructured objects makes the api clean and straightforward
  // Example: tagProxy.div(traitProxy.traitOne(arg1, arg2), traitProxy.traitTwo(arg1, arg2)).
  return [tagProxy, traitProxy];
}
