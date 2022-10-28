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

  // Styling

  export type CssPropType = keyof CSSStyleDeclaration;
  export type CssPropValType = string | number;
  export type CssDeclaration = [CssPropType, CssPropValType];
  export type KeyframeStyleDeclaration = [number, CssPropType, CssPropValType][];

  // Traits

  export type TraitProp = string;
  export type TraitFunc = (el: HTMLElement, ...a: any) => any;
  export type TraitParams<T> = Parameters<OmitFirstArg<T>>;

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
  >;

  export type SvgTraitProp = string;
  export type SvgTraitFunc = (el: SVGElement, ...a: any) => any;
  export type SvgTraitParams<T> = Parameters<OmitFirstArg<T>>;
  export type SvgChild = string | number | SVGElement | Comment;
  export type SvgTags = keyof SVGElementTagNameMap;
}
