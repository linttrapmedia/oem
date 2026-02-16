import type { Tail } from './types';

// --- Cleanup: auto-unsubscribe traits when elements are removed from the DOM ---

const cleanups = new WeakMap<HTMLElement | SVGElement, (() => void)[]>();

new MutationObserver((mutations) => {
  for (const { type, removedNodes } of mutations) {
    if (type !== 'childList') continue;
    removedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      cleanups.get(node)?.forEach((fn) => fn());
      cleanups.delete(node);
    });
  }
}).observe(document.documentElement, { childList: true, subtree: true });

// --- Types ---

type TraitFn = (...args: any[]) => any;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;

type TagMap = {
  [K in keyof HTMLElementTagNameMap]: (...children: Child[]) => HTMLElementTagNameMap[K];
} & {
  [K in keyof SVGElementTagNameMap]: (...children: Child[]) => SVGElementTagNameMap[K];
};

type TraitMap<P extends Record<string, TraitFn>> = {
  [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => Applier;
};

// --- SVG tag set ---

const SVG_TAGS = new Set(
  'svg,g,rect,circle,ellipse,line,polyline,polygon,path,text,defs,use,mask,clipPath'.split(','),
);

// --- Template ---

export function Template<P extends Record<string, TraitFn>>(config?: P): [TagMap, TraitMap<P>] {
  // Tag proxy: tmpl.div(...), tmpl.svg(...), etc.
  const tags = new Proxy({} as TagMap, {
    get: (_, tag: string) => {
      const create = (...children: Child[]) => {
        const el = SVG_TAGS.has(tag)
          ? document.createElementNS('http://www.w3.org/2000/svg', tag)
          : document.createElement(tag);
        children.forEach((c: any) => {
          if (c instanceof HTMLElement || c instanceof SVGElement) el.appendChild(c);
          else c(el);
        });
        return el;
      };
      (create as any).type = 'tag';
      return create;
    },
  });

  // Trait proxy: trait.attr(...), trait.style(...), etc.
  const traits = new Proxy({} as TraitMap<P>, {
    get:
      (_, name: string) =>
      (...args: any[]) => {
        const apply = (el: HTMLElement | SVGElement) => {
          const unsub = (config as any)[name](el, ...args);
          const list = cleanups.get(el) || [];
          list.push(unsub);
          cleanups.set(el, list);
        };
        (apply as any).type = 'trait';
        return apply;
      },
  });

  return [tags, traits];
}
