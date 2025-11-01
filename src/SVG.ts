import { SvgReturnType } from '@/types';

function SvgTag(el: SVGElement, traits: any[] = [], config: any = {}) {
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
      get: (_, prop) => {
        if (prop === 'el')
          return (el: SVGElement) =>
            (...props: any[]) =>
              SvgTag(el, props, config);
        return (...props: any[]) => {
          const ns = 'http://www.w3.org/2000/svg';
          const el = document.createElementNS(ns, prop as string);
          return SvgTag(el, props, config);
        };
      },
    },
  ) as SvgReturnType<P>;
}
