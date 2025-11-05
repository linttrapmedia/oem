import { HtmlReturnType } from '@/types';

// Global observer and registry
const traitCleanupMap = new WeakMap<HTMLElement, (() => void)[]>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && traitCleanupMap.has(node)) {
          // Call all cleanup functions for this element
          const funcs = traitCleanupMap.get(node)!;
          funcs.forEach((fn) => fn());
          traitCleanupMap.delete(node);
        }
      });
    }
  }
});

// Start observing once
observer.observe(document.documentElement, { childList: true, subtree: true });

function Trait<T extends any[]>(traitFn: (...args: T) => () => void) {
  return (...traitProps: T) => {
    const el: HTMLElement = traitProps[0] as HTMLElement;
    const cleanupFunc = traitFn(...traitProps);

    // Register cleanup function
    const list = traitCleanupMap.get(el) || [];
    list.push(cleanupFunc);
    traitCleanupMap.set(el, list);

    // Return a manual cleanup function
    return () => {
      const arr = traitCleanupMap.get(el);
      if (arr) {
        const idx = arr.indexOf(cleanupFunc);
        if (idx !== -1) arr.splice(idx, 1);
        if (arr.length === 0) traitCleanupMap.delete(el);
      }
      cleanupFunc();
    };
  };
}

function CreateEl(tag: string, config: any) {
  return (...props: any[]) => {
    const ns = 'http://www.w3.org/1999/xhtml';
    const el = document.createElementNS(ns, tag as string);
    return HtmlTag(el, props, config);
  };
}

function HtmlTag(el: HTMLElement, traits: any[] = [], config: any = {}) {
  traits.forEach(([trait, ...args]) => Trait(config[trait])(el, ...args));
  function fn(...children: any[]) {
    children.forEach((child) => {
      if (child) el.append(child);
    });
    return el;
  }
  return fn;
}

export function HTML<P extends Record<string, any>>(config?: P) {
  return new Proxy(
    {},
    {
      get: (_, prop) => CreateEl(prop as string, config),
    },
  ) as HtmlReturnType<P>;
}
