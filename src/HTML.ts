import { HtmlReturnType } from '@/types';

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
