namespace Types {
  // Utilities

  export type OmitFirstArg<T> = T extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;

  // State

  export type Atom<T> = {
    get: () => T;
    set: (atom: T) => void;
    sub: (cb: () => any) => number;
  };

  // Html

  export type HtmlTraitProp = string;
  export type HtmlTraitFunc = (el: HTMLElement, ...a: any) => any;
  export type HtmlTraitParams<T> = Parameters<OmitFirstArg<T>>;
  export type HtmlChild = HTMLElement | DocumentFragment | string | number | SVGElement | Comment;
  export type HtmlTags =
    | { tag: 'a'; type: HTMLAnchorElement }
    | { tag: 'blockquote'; type: HTMLQuoteElement }
    | { tag: 'body'; type: HTMLBodyElement }
    | { tag: 'button'; type: HTMLButtonElement }
    | { tag: 'caption'; type: HTMLTableCaptionElement }
    | { tag: 'code'; type: HTMLElement }
    | { tag: 'dl'; type: HTMLDListElement }
    | { tag: 'dd'; type: HTMLDListElement }
    | { tag: 'dt'; type: HTMLDListElement }
    | { tag: 'div'; type: HTMLDivElement }
    | { tag: 'fieldset'; type: HTMLFieldSetElement }
    | { tag: 'figcaption'; type: HTMLElement }
    | { tag: 'figure'; type: HTMLElement }
    | { tag: 'form'; type: HTMLFormElement }
    | { tag: 'h1'; type: HTMLHeadingElement }
    | { tag: 'h2'; type: HTMLHeadingElement }
    | { tag: 'h3'; type: HTMLHeadingElement }
    | { tag: 'h4'; type: HTMLHeadingElement }
    | { tag: 'h5'; type: HTMLHeadingElement }
    | { tag: 'h6'; type: HTMLHeadingElement }
    | { tag: 'iframe'; type: HTMLIFrameElement }
    | { tag: 'img'; type: HTMLImageElement }
    | { tag: 'input'; type: HTMLInputElement }
    | { tag: 'label'; type: HTMLLabelElement }
    | { tag: 'legend'; type: HTMLLegendElement }
    | { tag: 'li'; type: HTMLLIElement }
    | { tag: 'nav'; type: HTMLElement }
    | { tag: 'ol'; type: HTMLOListElement }
    | { tag: 'optgroup'; type: HTMLOptGroupElement }
    | { tag: 'option'; type: HTMLOptionElement }
    | { tag: 'p'; type: HTMLParagraphElement }
    | { tag: 'pre'; type: HTMLPreElement }
    | { tag: 'progress'; type: HTMLProgressElement }
    | { tag: 'section'; type: HTMLElement }
    | { tag: 'select'; type: HTMLSelectElement }
    | { tag: 'span'; type: HTMLSpanElement }
    | { tag: 'style'; type: HTMLStyleElement }
    | { tag: 'table'; type: HTMLTableElement }
    | { tag: 'tbody'; type: HTMLTableSectionElement }
    | { tag: 'td'; type: HTMLTableCellElement }
    | { tag: 'textarea'; type: HTMLTextAreaElement }
    | { tag: 'tfoot'; type: HTMLTableSectionElement }
    | { tag: 'th'; type: HTMLTableCellElement }
    | { tag: 'thead'; type: HTMLTableSectionElement }
    | { tag: 'time'; type: HTMLTimeElement }
    | { tag: 'title'; type: HTMLTitleElement }
    | { tag: 'tr'; type: HTMLTableRowElement }
    | { tag: 'ul'; type: HTMLUListElement }
    | { tag: 'video'; type: HTMLVideoElement };

  export type SvgTraitProp = string;
  export type SvgTraitFunc = (el: SVGElement, ...a: any) => any;
  export type SvgTraitParams<T> = Parameters<OmitFirstArg<T>>;
  export type SvgChild = string | number | SVGElement | Comment;
  export type SvgTags =
    | { tag: 'svg'; type: SVGElement }
    | { tag: 'circle'; type: SVGCircleElement }
    | { tag: 'path'; type: SVGPathElement }
    | { tag: 'rect'; type: SVGRectElement }
    | { tag: 'polygon'; type: SVGPolygonElement };

  // Css

  export type CssPropType = keyof CSSStyleDeclaration;
  export type CssPropValType = string | number;
  export type CssDeclaration = [CssPropType, CssPropValType];
  export type KeyframeStyleDeclaration = [number, CssPropType, CssPropValType][];
}
