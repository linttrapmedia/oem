import { Tail } from '@/registry';

type TraitFn = (...args: any[]) => any;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier;

type PropMap<P extends Record<string, TraitFn>> = {
  [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => Applier;
};

// --- Cleanup: auto-unsubscribe traits when elements are removed from the DOM ---

const cleanups = new WeakMap<HTMLElement | SVGElement, (() => void)[]>();

new MutationObserver((mutations) => {
  for (const { type, removedNodes } of mutations) {
    if (type !== 'childList') continue;
    removedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement || node instanceof SVGElement)) return;
      cleanups.get(node)?.forEach((fn) => fn());
      cleanups.delete(node);
    });
  }
}).observe(document.documentElement, { childList: true, subtree: true });

const SVG_TAGS = new Set(
  'svg,g,rect,circle,ellipse,line,polyline,polygon,path,text,defs,use,mask,clipPath'.split(','),
);

export function El<P extends Record<string, TraitFn>>(
  props: P,
): {
  tag: (...children: Child[]) => HTMLElement | SVGElement;
  prop: <K extends keyof P>(name: K, ...args: Tail<Parameters<P[K]>>) => Applier;
} {
  // Tag proxy: tmpl.div(...), tmpl.svg(...), etc.
  const tag = new Proxy({} as any, {
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
      (create as any).type = 'element';
      return create;
    },
  });

  // Trait proxy: callable as prop(name, ...args)
  const prop = new Proxy(function () {} as any, {
    apply: (_, __, [name, ...args]: [keyof P, ...any[]]) => {
      const apply = (el: HTMLElement | SVGElement) => {
        const unsub = (props as any)[name](el, ...args);
        const list = cleanups.get(el) || [];
        list.push(unsub);
        cleanups.set(el, list);
      };
      (apply as any).type = 'trait';
      return apply;
    },
  });

  return { tag, prop };
}

const button = El({
  label: (el: Element, text: string) => (el.textContent = text),
  click: (el: Element, fn: () => void) => {
    el.addEventListener('click', fn);
    return () => el.removeEventListener('click', fn);
  },
});

button.tag(
  button.prop('label', 'Click me!'),
  button.prop('click', () => alert('Button clicked!')),
);
