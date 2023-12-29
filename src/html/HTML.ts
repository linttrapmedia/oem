import { HtmlReturnType } from 'src/typings';

function HtmlTag(tag: keyof HTMLElementTagNameMap, traits: any[] = [], config: any = {}) {
  const ns = 'http://www.w3.org/1999/xhtml';
  const el = document.createElementNS(ns, tag);

  traits.forEach(([trait, ...args]) => config[trait](el, ...args));

  function fn(...children: any[]) {
    children.forEach((child) => el.append(child));
    return el;
  }

  return fn;
}

export function Template<P extends Record<string, any>>(config?: P) {
  return new Proxy(
    {},
    {
      get:
        (_, tag) =>
        (...props: any) =>
          HtmlTag(tag as keyof HTMLElementTagNameMap, props, config),
    },
  ) as HtmlReturnType<P>;
}

export default {
  Template,
};
