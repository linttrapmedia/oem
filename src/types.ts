type RestArgs<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export type StateType<T> = {
  get: () => T;
  reduce: (cb: (atom: T) => T) => () => void;
  reset: () => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => number;
  unsub: (cb: (atom: T) => any) => void;
};

type HtmlTraitFunc<Args extends any[]> = (el: HTMLElement, ...args: Args) => HTMLElement;
type HtmlTags = keyof HTMLElementTagNameMap;
export type HtmlReturnType<P extends Record<string, HtmlTraitFunc<any>>> = Record<
  HtmlTags,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => HTMLElement
> & {
  el: (
    element: HTMLElement,
  ) => <K extends Array<keyof P>>(
    ...attributes: { [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>] }
  ) => (...nodes: any[]) => HTMLElement;
  $el: (
    selector: string,
    watch?: boolean,
  ) => <K extends Array<keyof P>>(...attributes: { [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>] }) => any;
};

type SvgTraitFunc<Args extends any[]> = (el: SVGElement, ...args: Args) => SVGElement;
type SvgTags = keyof SVGElementTagNameMap;
export type SvgReturnType<P extends Record<string, SvgTraitFunc<any>>> = Record<
  SvgTags,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => SVGElement
> & {
  el: (
    element: SVGElement,
  ) => <K extends Array<keyof P>>(
    ...attributes: { [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>] }
  ) => (...nodes: any[]) => SVGElement;
  $el: (
    selector: string,
    watch?: boolean,
  ) => <K extends Array<keyof P>>(...attributes: { [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>] }) => any;
};

export type Test = (sandbox?: HTMLElement) => {
  pass: boolean;
  message?: string;
};
