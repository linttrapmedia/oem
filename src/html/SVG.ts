import { SvgReturnType } from '../types';

function SvgTag(tag: keyof SVGElementTagNameMap, traits: any[] = [], config: any = {}) {
  const ns = 'http://www.w3.org/1999/xhtml';
  const el = document.createElementNS(ns, tag);

  traits.forEach(([trait, ...args]) => config[trait](el, ...args));

  function fn(...children: any[]) {
    children.forEach((child) => el.append(child));
    return el;
  }

  return fn;
}

export function SVG<P extends Record<string, any>>(config?: P) {
  return new Proxy(
    {},
    {
      get:
        (_, tag) =>
        (...props: any) =>
          SvgTag(tag as keyof SVGElementTagNameMap, props, config),
    },
  ) as SvgReturnType<P>;
}
