declare namespace OEM {
  // UTILS
  type AnyFunc = (...args: any[]) => any;
  type Condition = boolean | (() => boolean) | BUS<boolean> | ElementEvents;
  type Concat<T> = T extends [infer A, ...infer Rest]
    ? A extends any[]
      ? [...A, ...Concat<Rest>]
      : A
    : T;
  type ElementEvents =
    | 'abort'
    | 'animationcancel'
    | 'animationend'
    | 'animationiteration'
    | 'animationstart'
    | 'auxclick'
    | 'beforeinput'
    | 'blur'
    | 'canplay'
    | 'canplaythrough'
    | 'change'
    | 'click'
    | 'close'
    | 'compositionend'
    | 'compositionstart'
    | 'compositionupdate'
    | 'contextmenu'
    | 'cuechange'
    | 'dblclick'
    | 'drag'
    | 'dragend'
    | 'dragenter'
    | 'dragleave'
    | 'dragover'
    | 'dragstart'
    | 'drop'
    | 'durationchange'
    | 'emptied'
    | 'ended'
    | 'error'
    | 'focus'
    | 'focusin'
    | 'focusout'
    | 'formdata'
    | 'gotpointercapture'
    | 'hover'
    | 'input'
    | 'invalid'
    | 'keydown'
    | 'keypress'
    | 'keyup'
    | 'load'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'loadstart'
    | 'lostpointercapture'
    | 'mousedown'
    | 'mouseenter'
    | 'mouseleave'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'pause'
    | 'play'
    | 'playing'
    | 'pointercancel'
    | 'pointerdown'
    | 'pointerenter'
    | 'pointerleave'
    | 'pointermove'
    | 'pointerout'
    | 'pointerover'
    | 'pointerup'
    | 'progress'
    | 'ratechange'
    | 'reset'
    | 'resize'
    | 'scroll'
    | 'securitypolicyviolation'
    | 'seeked'
    | 'seeking'
    | 'select'
    | 'selectionchange'
    | 'selectstart'
    | 'slotchange'
    | 'stalled'
    | 'submit'
    | 'suspend'
    | 'timeupdate'
    | 'toggle'
    | 'touchcancel'
    | 'touchend'
    | 'touchmove'
    | 'touchstart'
    | 'transitioncancel'
    | 'transitionend'
    | 'transitionrun'
    | 'transitionstart'
    | 'volumechange'
    | 'waiting'
    | 'wheel';
  type FlexAlign =
    | 'center'
    | 'end'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'start'
    | 'stretch';
  type AnyArgs = [];
  type Attr<E extends HTMLElement, P extends [...args: any]> = (
    ...args: Concat<[P, [condition?: Condition]]>
  ) => ELEMENT<E>;
  type CssProp = keyof CSSStyleDeclaration;
  type FlexDir = 'row' | 'row-reverse' | 'column' | 'column-reverse';
  type Method<E extends HTMLElement, P extends [...args: any]> = (...args: P) => ELEMENT<E>;
  type Render<E extends HTMLElement, P extends [...args: any]> = (...args: P) => E;
  type Sizing = number | `${number}${SizingUnits}` | `${SizingVals}`;
  type SizingUnits = 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%';
  type SizingVals = number | 'auto' | 'max-content' | 'min-content';
  type ValueOf<T> = T[keyof T];

  // BUSES

  export interface BUS<T> {
    eq: (val: T) => boolean;
    get: () => T;
    neq: (val: T) => boolean;
    reset: () => BUS<T>;
    set(...args: any): BUS<T>;
    sub: (cb: (x: T) => any) => void;
    val: T;
  }

  export interface ARRAY<T> {
    get: () => T[];
    includes: (searchElement: T, fromIndex?: number) => boolean;
    filter: (cb: (item: T) => boolean) => ARRAY<T>;
    pop: () => ARRAY<T>;
    push: (x: T | (() => T)) => ARRAY<T>;
    reset: () => ARRAY<T>;
    set(x: T[]): ARRAY<T>;
    shift: () => ARRAY<T>;
    sub: (cb: (n: T[]) => any) => void;
    val: T[];
  }

  export interface BREAKPOINT extends BUS<boolean> {
    isGTEbreakpoint: () => boolean;
  }

  export interface NUMBER {
    dec: (n: number) => NUMBER;
    get: () => number;
    inc: (n: number) => NUMBER;
    set(n: number): NUMBER;
    sub: (cb: (n: number) => any) => void;
    val: number;
  }

  export interface STRING extends BUS<string> {
    cb: (func: 'eq' | 'neq', ...args: any) => () => any;
  }

  export interface LOCATION {
    get: () => LOCATION['val'];
    set(href: string, title?: string, state?: string): LOCATION['val'];
    sub: (cb: (location: LOCATION['val']) => any) => void;
    val: {
      hash: string;
      host: string;
      hostname: string;
      href: string;
      origin: string;
      pathname: string;
      port: string;
      protocol: string;
      params: Record<string, string | number>;
      urlParams: URLSearchParams;
    };
  }

  export type BUSES = ARRAY<any> | LOCATION | NUMBER | STRING;

  // ELEMENT

  export interface ELEMENT<E extends HTMLElement> {
    // ATTRIBUTES
    attr: Attr<E, [name: string, value?: string]>;
    backgroundColor: Attr<E, [hsla: number[], opacity?: number, lightness?: number]>;
    class: Attr<E, [classname: string]>;
    column: Attr<E, [gap: number, align?: FlexAlign, justify?: FlexAlign]>;
    color: Attr<E, [hsla: number[], opacity?: number, lightness?: number]>;
    flex: Attr<E, [direction: FlexDir, gap: number, align?: FlexAlign, justify?: FlexAlign]>;
    fontSize: Attr<E, [s: SizingVals, u?: SizingUnits]>;
    height: Attr<E, [w: SizingVals, u?: SizingUnits]>;
    margin: Attr<
      E,
      [top: Sizing, right?: Sizing, bottom?: Sizing, left?: Sizing, unit?: SizingUnits]
    >;
    marginX: Attr<E, [marginX: Sizing, unit?: SizingUnits]>;
    marginY: Attr<E, [marginY: Sizing, unit?: SizingUnits]>;
    onClick: Method<E, [func: AnyFunc, ...args: any[]]>;
    onInput: Method<E, [func: (val: any) => void]>;
    onSubmit: Method<E, [func?: () => void]>;
    padding: Attr<
      E,
      [top: Sizing, right?: Sizing, bottom?: Sizing, left?: Sizing, unit?: SizingUnits]
    >;
    paddingX: Attr<E, [paddingX: Sizing, unit?: SizingUnits]>;
    paddingY: Attr<E, [paddingY: Sizing, unit?: SizingUnits]>;
    row: Attr<E, [gap: number, align?: FlexAlign, justify?: FlexAlign]>;
    style: Attr<E, [prop: CssProp, val: any]>;
    styles: Attr<E, [propsAndVals: [CssProp, any][]]>;
    width: Attr<E, [h: SizingVals, u?: SizingUnits]>;

    // RENDERERS
    append: Render<E, [...nodes: (string | Node)[]]>;
    innerText: Render<E, [txt: (string | number) | (() => string | number), ...buses: BUSES[]]>;
    innerHtml: Render<E, [node: HTMLElement | (() => HTMLElement), ...buses: BUSES[]]>;
    map: Render<E, [cb: AnyFunc, item: any, ...buses: BUSES[]]>;
    value: Render<E, [val: (string | number) | (() => string | number), ...buses: BUSES[]]>;
    render: Render<E, []>;
  }

  // FUNCS
  export type APP = (app: HTMLElement, options?: { container: string }) => void;
  export type COMPONENT = (cb: () => HTMLElement, ...buses: any[]) => HTMLElement;
}

// DECLARATIONS

// Declare Functions
declare const COMPONENT: OEM.COMPONENT;

// Declare Buses
declare const ARRAY: <T>(ary: T[]) => OEM.ARRAY<T>;
declare const BREAKPOINT: (
  breakpoint: number,
  dimension?: 'height' | 'width',
  container?: string,
) => OEM.BREAKPOINT;
declare const LOCATION: () => OEM.LOCATION;
declare const NUMBER: (n: number) => OEM.NUMBER;
declare const STRING: (s: string) => OEM.STRING;

// Declare Elements
declare const A: OEM.ELEMENT<HTMLAnchorElement>;
declare const ABBRADDRESS: OEM.ELEMENT<HTMLElement>;
declare const AREA: OEM.ELEMENT<HTMLAreaElement>;
declare const ARTICLE: OEM.ELEMENT<HTMLElement>;
declare const ASIDE: OEM.ELEMENT<HTMLElement>;
declare const AUDIO: OEM.ELEMENT<HTMLAudioElement>;
declare const B: OEM.ELEMENT<HTMLElement>;
declare const BASE: OEM.ELEMENT<HTMLBaseElement>;
declare const BDI: OEM.ELEMENT<HTMLElement>;
declare const BDO: OEM.ELEMENT<HTMLElement>;
declare const BLOCKQUOTE: OEM.ELEMENT<HTMLQuoteElement>;
declare const BODY: OEM.ELEMENT<HTMLBodyElement>;
declare const BR: OEM.ELEMENT<HTMLBRElement>;
declare const BUTTON: OEM.ELEMENT<HTMLButtonElement>;
declare const CANVAS: OEM.ELEMENT<HTMLCanvasElement>;
declare const CAPTION: OEM.ELEMENT<HTMLTableCaptionElement>;
declare const CITE: OEM.ELEMENT<HTMLElement>;
declare const CODE: OEM.ELEMENT<HTMLElement>;
declare const COL: OEM.ELEMENT<HTMLTableColElement>;
declare const COLGROUP: OEM.ELEMENT<HTMLTableColElement>;
declare const COMMENT: (comment: string) => Comment;
declare const DATA: OEM.ELEMENT<HTMLDataElement>;
declare const DATALIST: OEM.ELEMENT<HTMLDataListElement>;
declare const DD: OEM.ELEMENT<HTMLElement>;
declare const DEL: OEM.ELEMENT<HTMLModElement>;
declare const DETAILS: OEM.ELEMENT<HTMLDetailsElement>;
declare const DFN: OEM.ELEMENT<HTMLElement>;
declare const DIALOG: OEM.ELEMENT<HTMLDialogElement>;
declare const DIV: OEM.ELEMENT<HTMLDivElement>;
declare const DL: OEM.ELEMENT<HTMLDListElement>;
declare const DT: OEM.ELEMENT<HTMLElement>;
declare const EM: OEM.ELEMENT<HTMLElement>;
declare const EMBED: OEM.ELEMENT<HTMLEmbedElement>;
declare const FIELDSET: OEM.ELEMENT<HTMLFieldSetElement>;
declare const FIGCAPTION: OEM.ELEMENT<HTMLElement>;
declare const FIGURE: OEM.ELEMENT<HTMLElement>;
declare const FOOTER: OEM.ELEMENT<HTMLElement>;
declare const FORM: OEM.ELEMENT<HTMLFormElement>;
declare const H1: OEM.ELEMENT<HTMLHeadElement>;
declare const H2: OEM.ELEMENT<HTMLHeadElement>;
declare const H3: OEM.ELEMENT<HTMLHeadElement>;
declare const H4: OEM.ELEMENT<HTMLHeadElement>;
declare const H5: OEM.ELEMENT<HTMLHeadElement>;
declare const H6: OEM.ELEMENT<HTMLHeadElement>;
declare const HEAD: OEM.ELEMENT<HTMLHeadElement>;
declare const HEADER: OEM.ELEMENT<HTMLElement>;
declare const HGROUP: OEM.ELEMENT<HTMLElement>;
declare const HR: OEM.ELEMENT<HTMLHRElement>;
declare const HTML: OEM.ELEMENT<HTMLElement>;
declare const I: OEM.ELEMENT<HTMLElement>;
declare const IFRAME: OEM.ELEMENT<HTMLElement>;
declare const IMG: OEM.ELEMENT<HTMLElement>;
declare const INPUT: OEM.ELEMENT<HTMLInputElement>;
declare const INS: OEM.ELEMENT<HTMLElement>;
declare const KBD: OEM.ELEMENT<HTMLElement>;
declare const LABEL: OEM.ELEMENT<HTMLElement>;
declare const LEGEND: OEM.ELEMENT<HTMLElement>;
declare const LI: OEM.ELEMENT<HTMLElement>;
declare const LINK: OEM.ELEMENT<HTMLElement>;
declare const MAIN: OEM.ELEMENT<HTMLElement>;
declare const MAP: OEM.ELEMENT<HTMLElement>;
declare const MARK: OEM.ELEMENT<HTMLElement>;
declare const MENU: OEM.ELEMENT<HTMLElement>;
declare const META: OEM.ELEMENT<HTMLElement>;
declare const METER: OEM.ELEMENT<HTMLElement>;
declare const NAV: OEM.ELEMENT<HTMLElement>;
declare const NOSCRIPT: OEM.ELEMENT<HTMLElement>;
declare const OBJECT: OEM.ELEMENT<HTMLElement>;
declare const OL: OEM.ELEMENT<HTMLElement>;
declare const OPTGROUP: OEM.ELEMENT<HTMLElement>;
declare const OPTION: OEM.ELEMENT<HTMLElement>;
declare const OUTPUT: OEM.ELEMENT<HTMLElement>;
declare const P: OEM.ELEMENT<HTMLElement>;
declare const PICTURE: OEM.ELEMENT<HTMLElement>;
declare const PRE: OEM.ELEMENT<HTMLElement>;
declare const PROGRESS: OEM.ELEMENT<HTMLElement>;
declare const Q: OEM.ELEMENT<HTMLElement>;
declare const RP: OEM.ELEMENT<HTMLElement>;
declare const RT: OEM.ELEMENT<HTMLElement>;
declare const RUBY: OEM.ELEMENT<HTMLElement>;
declare const S: OEM.ELEMENT<HTMLElement>;
declare const SAMP: OEM.ELEMENT<HTMLElement>;
declare const SCRIPT: OEM.ELEMENT<HTMLElement>;
declare const SECTION: OEM.ELEMENT<HTMLElement>;
declare const SELECT: OEM.ELEMENT<HTMLElement>;
declare const SLOT: OEM.ELEMENT<HTMLElement>;
declare const SMALL: OEM.ELEMENT<HTMLElement>;
declare const SOURCE: OEM.ELEMENT<HTMLElement>;
declare const SPAN: OEM.ELEMENT<HTMLElement>;
declare const STRONG: OEM.ELEMENT<HTMLElement>;
declare const STYLE: OEM.ELEMENT<HTMLElement>;
declare const SUB: OEM.ELEMENT<HTMLElement>;
declare const SUMMARY: OEM.ELEMENT<HTMLElement>;
declare const SUP: OEM.ELEMENT<HTMLElement>;
declare const TABLE: OEM.ELEMENT<HTMLElement>;
declare const TBODY: OEM.ELEMENT<HTMLElement>;
declare const TD: OEM.ELEMENT<HTMLElement>;
declare const TEMPLATE: OEM.ELEMENT<HTMLElement>;
declare const TEXTAREA: OEM.ELEMENT<HTMLElement>;
declare const TFOOT: OEM.ELEMENT<HTMLElement>;
declare const TH: OEM.ELEMENT<HTMLElement>;
declare const THEAD: OEM.ELEMENT<HTMLElement>;
declare const TIME: OEM.ELEMENT<HTMLElement>;
declare const TITLE: OEM.ELEMENT<HTMLElement>;
declare const TR: OEM.ELEMENT<HTMLElement>;
declare const TRACK: OEM.ELEMENT<HTMLElement>;
declare const U: OEM.ELEMENT<HTMLElement>;
declare const UL: OEM.ELEMENT<HTMLElement>;
declare const VAR: OEM.ELEMENT<HTMLElement>;
declare const VIDEO: OEM.ELEMENT<HTMLElement>;
declare const WBR: OEM.ELEMENT<HTMLElement>;
