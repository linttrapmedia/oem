export type Condition = (() => boolean) | boolean | 1 | 0;

type RestArgs<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export type StateType<T> = {
  reduce: (cb: (prev: T) => T) => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => () => void;
  test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => boolean;
  unsub: (cb: (atom: T) => any) => void;
  val: () => T;
  $reduce: (cb: (prev: T) => T) => () => void;
  $set: (atom: T) => () => void;
  $test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => () => boolean;
  _subs: Set<(atom: T) => any>;
};

export type HtmlTraitFunc<Args extends any[]> = (el: HTMLElement, ...args: Args) => () => void;

type HtmlTags = keyof HTMLElementTagNameMap;

export type HtmlReturnType<P extends Record<string, HtmlTraitFunc<any>>> = Record<
  HtmlTags,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => HTMLElement
>;

export type SvgTraitFunc<Args extends any[]> = (el: SVGElement, ...args: Args) => SVGElement;

type SvgTags = keyof SVGElementTagNameMap;

export type SvgReturnType<P extends Record<string, SvgTraitFunc<any>>> = Record<
  SvgTags,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => SVGElement
>;

export type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>;
