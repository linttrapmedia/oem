declare namespace OEM {
  // UTILS
  type AnyFunc = (...args: any[]) => any;
  type Condition = boolean | (() => boolean) | BUS<boolean> | Event;
  type Concat<T> = T extends [infer A, ...infer Rest]
    ? A extends any[]
    ? [...A, ...Concat<Rest>]
    : A
    : T;
  type Event =
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
  type Size = number | `${number}${SizeUnits}` | `${SizeVals}`;
  type SizeUnits = 'px' | 'em' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%';
  type SizeVals = number | 'auto' | 'max-content' | 'min-content';
  type ValueOf<T> = T[keyof T];

  // BUSES

  export interface BUS<T> {
    eq?: (val: T) => boolean;
    get: () => T;
    neq?: (val: T) => boolean;
    reset?: () => BUS<T>;
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

  export interface COLOR extends BUS<string> {
    alpha: (a: number) => string;
    darken: (p: number) => string;
    lighten: (p: number) => string;
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

  export interface ENUM<T> {
    eq?: (val: T) => boolean;
    get: () => T;
    neq?: (val: T) => boolean;
    reset?: () => BUS<T>;
    set(...args: any): BUS<T>;
    sub: (cb: (x: T) => any) => void;
    val: T;
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

  export type Attrs = [prop: 'id', val: string] | [prop: 'onclick', val: () => void];
  type Val<T> = T | (() => T);

  export interface ELEMENT<E extends HTMLElement> {
    // ATTRIBUTES
    attr: Attr<E, [name: string, value?: Val<string>]>;
    class: Attr<E, [classname: string]>;
    eventListener: Attr<E, [event: Event, func: AnyFunc]>;
    onClick: Method<E, [func: AnyFunc, ...args: any[]]>;
    onInput: Method<E, [func: (val: any) => void]>;
    onSubmit: Method<E, [func?: () => void]>;
    style: Attr<E, [prop: CssProp, val: Val<string>]>;
    styles: Attr<E, [propsAndVals: [CssProp, any][]]>;

    // RENDERERS
    append: Render<E, [...nodes: (string | Node)[]]>;
    innerText: Render<E, [txt: (string | number) | (() => string | number), ...buses: BUSES[]]>;
    innerHtml: Render<E, [node: HTMLElement | (() => HTMLElement), ...buses: BUSES[]]>;
    map: Render<E, [cb: AnyFunc, item: any, ...buses: BUSES[]]>;
    render: Render<E, []>;
  }

  // FUNCS
  export type APP = (app: HTMLElement, options?: { container: string }) => void;
  export type COMPONENT = (cb: () => HTMLElement, ...buses: any[]) => HTMLElement;
}
