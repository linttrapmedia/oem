type RestArgs<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export type StateType<T> = {
  get: () => T;
  reduce: (cb: (atom: T) => T) => () => void;
  reset: () => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => number;
  unsub: (cb: (atom: T) => any) => void;
};

export type HtmlTraitFunc<Args extends any[]> = (el: HTMLElement, ...args: Args) => HTMLElement;

export type HtmlTraitConfig = <Config extends any[]>(...config: Config) => HtmlTraitFunc<any>;
type HtmlTags = keyof HTMLElementTagNameMap;

export type HtmlReturnType<P extends Record<string, HtmlTraitFunc<any>>> = Record<
  HtmlTags,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => HTMLElement
>;

export type SvgTraitFunc<Args extends any[]> = (el: HTMLElement, ...args: Args) => HTMLElement;

export type SvgTraitConfig = <Config extends any[]>(...config: Config) => SvgTraitFunc<any>;
type SvgTags = keyof SVGElementTagNameMap;

export type SvgReturnType<P extends Record<string, SvgTraitFunc<any>>> = Record<
  SvgTags,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => SVGElement
>;
