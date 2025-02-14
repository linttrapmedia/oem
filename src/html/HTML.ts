import { HtmlReturnType } from '../types';

const selectorMap = new Map<string, [any[], any]>();

const matchObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0 && mutation.type === 'childList') {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          for (const [selector, [props, config]] of selectorMap.entries()) {
            const els = Array.from(node.querySelectorAll(selector));
            for (const el of els) HtmlTag(el as HTMLElement, props, config);
          }
        }
      }
    }
  });
});
matchObserver.observe(document, { attributes: true, childList: true, subtree: true });

function AdoptElBySelector(selector: string, watch: boolean = true, config: any) {
  return (...props: any[]) => {
    // on mutation
    if (watch) selectorMap.set(selector, [props, config]);
    // onload
    const els = Array.from(document.querySelectorAll(selector));
    for (const el of els) HtmlTag(el as HTMLElement, props, config);
  };
}

function AdoptElByInstance(el: HTMLElement, config: any) {
  return (...props: any[]) => HtmlTag(el, props, config);
}

function CreateEl(tag: string, config: any) {
  return (...props: any[]) => {
    const ns = 'http://www.w3.org/1999/xhtml';
    const el = document.createElementNS(ns, tag as string);
    return HtmlTag(el, props, config);
  };
}

function HtmlTag(el: HTMLElement, traits: any[] = [], config: any = {}) {
  traits.forEach(([trait, ...args]) => config[trait](el, ...args));
  function fn(...children: any[]) {
    children.forEach((child) => el.append(child));
    return el;
  }
  return fn;
}

export function HTML<P extends Record<string, any>>(config?: P) {
  return new Proxy(
    {},
    {
      get: (_, prop) => {
        if (prop === 'el') return (el: HTMLElement) => AdoptElByInstance(el, config);
        if (prop === '$el') return (selector: string, watch: boolean) => AdoptElBySelector(selector, watch, config);
        return CreateEl(prop as string, config);
      },
    },
  ) as HtmlReturnType<P>;
}
