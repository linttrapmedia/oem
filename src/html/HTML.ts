import { HtmlReturnType } from '../types';

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
        if (prop === 'el')
          return (el: HTMLElement) =>
            (...props: any[]) =>
              HtmlTag(el, props, config);
        return (...props: any[]) => {
          const ns = 'http://www.w3.org/1999/xhtml';
          const el = document.createElementNS(ns, prop as string);
          return HtmlTag(el, props, config);
        };
      },
    },
  ) as HtmlReturnType<P>;
}
