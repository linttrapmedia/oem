import { Trait } from './Trait';

export namespace Types {
  // Utilities
  export type OmitFirstArg<T> = T extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
  export type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;

  // State

  export type Atom<T> = {
    get: () => T;
    reset: () => void;
    set: (atom: T) => void;
    sub: (cb: (atom: T) => any) => number;
  };

  export interface AtomArray<T> {
    // iterator: () => IterableIterator<T>;
    at: (index: number) => T;
    concat: (...items: ConcatArray<T>[]) => T[];
    copyWithin: (target: number, start: number, end?: number) => T[];
    entries: () => IterableIterator<[number, T]>;
    every: (predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => boolean;
    fill: (value: T, start?: number, end?: number) => T[];
    filter: (predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => T[];
    filterSet: (predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => T[];
    find: (predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) => T | undefined;
    findIndex: (predicate: (value: T) => value is T, thisArg?: any) => number;
    flat: (depth?: number) => T[];
    flatSet: (depth?: number) => T[];
    flatMap: <U, This = undefined>(
      callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[],
      thisArg?: This,
    ) => U[];
    // flatMapSet: <U, This = undefined>(
    //   callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[],
    //   thisArg?: This,
    // ) => U[];
    // forEach: (callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any) => void;
    get: () => T[];
    includes: (searchElement: T, fromIndex?: number) => boolean;
    // indexOf: (searchElement: T, fromIndex?: number) => number;
    // join: (separator?: string) => string;
    // keys: () => IterableIterator<number>;
    // lastIndexOf: (searchElement: T, fromIndex?: number) => number;
    // map: <U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any) => U[];
    pop: () => T | undefined;
    push: (...items: T[]) => number;
    // reduce: <U>(
    //   callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    //   initialValue: U,
    // ) => U;
    // reduceRight: <U>(
    //   callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
    //   initialValue: U,
    // ) => U;
    // reverse: () => T[];
    set: (atom: T[]) => void;
    // shift: () => T | undefined;
    // slice: (start?: number, end?: number) => T[];
    // some: (predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => boolean;
    // sort: (compareFn?: (a: T, b: T) => number) => this;
    // splice: (start: number, deleteCount?: number) => T[];
    sub: (cb: (atom: T[]) => any) => number;
    // toLocaleString: (
    //   locales?: string | string[],
    //   options?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions,
    // ) => string;
    // toString: () => string;
    // unshift: (...items: T[]) => number;
    // values: () => IterableIterator<T>;
  }

  type AtomNumberMathMethods = {
    [Func in Extract<
      keyof Math,
      | 'abs'
      | 'ceil'
      | 'cbrt'
      | 'clz32'
      | 'exp'
      | 'expm1'
      | 'fround'
      | 'log'
      | 'log10'
      | 'log1p'
      | 'log2'
      | 'round'
      | 'sign'
      | 'sqrt'
      | 'trunc'
    >]: () => void;
  } & {
    add: (amount: number) => void;
    reset: () => void;
    subtract: (amount: number) => void;
  };

  export interface AtomNumber extends AtomNumberMathMethods {
    bind: <M extends keyof AtomNumberMathMethods>(method: M, ...args: Parameters<AtomNumberMathMethods[M]>) => any;
    get: () => number;
    reset: () => void;
    set: (atom: number) => void;
    sub: (cb: (atom: number) => any) => number;
    pow: (pow: number) => void;
    add: (amount: number) => void;
    subtract: (amount: number) => void;
  }

  export interface AtomSet<T> {
    add: (item: T) => void;
    clear: () => void;
    delete: (item: T) => void;
    entries: () => IterableIterator<[T, T]>;
    forEach: (cb: (item: T, item2: T, set: Set<T>) => void) => void;
    get: () => Set<T>;
    has: (item: T) => boolean;
    keys: () => IterableIterator<T>;
    reset: () => void;
    set: (atom: T) => void;
    sub: (cb: (atom: Set<T>) => any) => number;
    values: () => IterableIterator<T>;
  }

  // Styling

  export type CssPropType = keyof CSSStyleDeclaration;
  export type CssPropValType = string | number;
  export type CssDeclaration = [CssPropType, CssPropValType];
  export type KeyframeStyleDeclaration = [number, CssPropType, CssPropValType][];

  // Traits

  export type TraitProp = string;
  export type TraitFunc = (el: HTMLElement | SVGElement, ...a: any) => any;
  export type TraitParams<T> = Parameters<OmitFirstArg<T>>;
  export type TraitConfigDefault = {
    attr: typeof Trait.Attr;
    event: typeof Trait.Event;
    flex: typeof Trait.Flex;
    focus: typeof Trait.Focus;
    font_size: typeof Trait.FontSize;
    grid: typeof Trait.Grid;
    inner_html: typeof Trait.InnerHtml;
    inner_text: typeof Trait.InnerText;
    on_change: typeof Trait.OnChange;
    on_color_input: typeof Trait.OnColorInput;
    on_click: typeof Trait.OnClick;
    on_click_bind: typeof Trait.OnClickBind;
    on_create: typeof Trait.OnCreate;
    on_load: typeof Trait.OnLoad;
    on_mouse_out: typeof Trait.OnMouseOut;
    on_mouse_over: typeof Trait.OnMouseOver;
    on_resize: typeof Trait.OnResize;
    on_submit: typeof Trait.OnSubmit;
    on_text_input: typeof Trait.OnTextInput;
    on_text_content_input: typeof Trait.OnTextContentInput;
    on_win_resize: typeof Trait.OnWinResize;
    print_style: typeof Trait.PrintStyle;
    src: typeof Trait.Src;
    style: typeof Trait.Style;
    styles: typeof Trait.Styles;
    style_on_hover: typeof Trait.StyleOnHover;
    style_on_print: typeof Trait.PrintStyle;
    style_on_resize: typeof Trait.StyleOnResize;
    style_on_win_resize: typeof Trait.StyleOnWinResize;
    svg_attr: typeof Trait.SvgAttr;
    value: typeof Trait.Value;
  };

  // Template

  export type HtmlChild = HTMLElement | DocumentFragment | string | number | SVGElement | Comment | undefined | null;
  export type HtmlTemplate = (...children: HtmlChild[]) => HTMLElement;
  export type HtmlTemplateConfig = Record<TraitProp, TraitFunc>;
  export type HtmlTemplateTagMap<Config> = Record<
    keyof HTMLElementTagNameMap,
    <KS extends (keyof Config)[]>(
      ...traits: {
        [I in keyof KS]-?: [KS[I], ...Parameters<OmitFirstArg<Config[Extract<KS[I], keyof Config>]>>];
      }
    ) => (...children: HtmlChild[]) => HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  > & { fragment: (...children: Types.HtmlChild[]) => DocumentFragment };

  export type SvgTraitProp = string;
  export type SvgTraitFunc = (el: SVGElement, ...a: any) => any;
  export type SvgTraitParams<T> = Parameters<OmitFirstArg<T>>;
  export type SvgChild = string | number | SVGElement | Comment;
  export type SvgTags = keyof SVGElementTagNameMap;
}
