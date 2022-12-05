const defaultStyles: Record<string, [string, string][]> = {
  h1: [['fontSize', '42px']],
  h2: [['fontSize', '36px']],
  h3: [['fontSize', '32px']],
  h4: [['fontSize', '24px']],
};

export class OEM_ELEMENT<T extends HTMLElement> implements OEM.ELEMENT<T> {
  #el: T;
  #tag: string = 'div';
  #attrs: [string, string][] = [];
  #funcs: [string, (...args: any[]) => any][] = [];
  #styles: [string, string][] = [];
  #stylesOnHover: [string, string][] = [];
  #classes: string[] = [];
  constructor(tag: string) {
    this.#tag = tag;
    this.#styles = [...(defaultStyles[tag] ?? [])];
    this.append = this.append.bind(this);
    this.attr = this.attr.bind(this);
    this.column = this.column.bind(this);
    this.color = this.color.bind(this);
    this.createElement = this.createElement.bind(this);
    this.innerHtml = this.innerHtml.bind(this);
    this.innerText = this.innerText.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onInput = this.onInput.bind(this);
    this.render = this.render.bind(this);
    this.row = this.row.bind(this);
    this.value = this.value.bind(this);
    this.width = this.width.bind(this);
  }
  private createElement() {
    this.#el = document.createElement(this.#tag) as T;
    this.#attrs.forEach(([key, val]) => this.#el.setAttribute(key, val));
    this.#styles.forEach(([prop, val]) => ((<any>this.#el).style[prop] = val));
    this.#stylesOnHover.forEach(([prop, val]) => {
      const oVal = (<any>this.#el).style[prop];
      const set = (p: string, v: string) => ((<any>this.#el).style[p] = v);
      this.#el.addEventListener('mouseenter', set.bind(null, prop, val));
      this.#el.addEventListener('mouseleave', set.bind(null, prop, oVal));
    });
    this.#funcs.forEach(([event, func]) =>
      this.#el.addEventListener(event, func),
    );
    this.#classes.forEach((cls) => this.#el.classList.add(cls));
    return this.#el;
  }
  // ATTRIBUTES
  attr(name: string, value?: string) {
    this.#attrs.push([name, value]);
    return this;
  }
  backgroundColor(hsla: number[], opacity: number = 1, lightness: number = 0) {
    const h = hsla[0];
    const s = hsla[1];
    const l = hsla[2] + lightness;
    const a = hsla[3] * opacity;
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    this.#styles.push(['backgroundColor', color]);
    return this;
  }
  class(...classes: string[]) {
    this.#classes.push(...classes);
    return this;
  }
  color(hsla: number[], opacity: number = 1, lightness: number = 0) {
    const h = hsla[0];
    const s = hsla[1];
    const l = hsla[2] + lightness;
    const a = hsla[3] * opacity;
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    this.#styles.push(['color', color]);
    return this;
  }
  column(
    gap: number | string,
    align: 'start' | 'center' | 'end' = 'start',
    justify: 'start' | 'center' | 'end' = 'start',
  ) {
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', 'column']);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap]);
    this.#styles.push(['alignItems', align]);
    this.#styles.push(['justifyContent', justify]);
    return this;
  }
  fontSize(size: number | string) {
    this.#styles.push([
      'fontSize',
      typeof size === 'number' ? `${size}px` : size,
    ]);
    return this;
  }
  margin(...margin: (string | number)[]) {
    this.#styles.push([
      'margin',
      margin.map((m) => (typeof m === 'number' ? `${m}px` : m)).join(' '),
    ]);
    return this;
  }
  onClick<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>) {
    this.#funcs.push(['click', () => func(...args)]);
    return this;
  }
  onInput(func: (val: any) => void) {
    this.#funcs.push(['input', (e: Event) => func((<any>e.target).value)]);
    return this;
  }
  onSubmit(func?: () => void) {
    this.#funcs.push([
      'submit',
      (ev: Event) => {
        ev.preventDefault();
        func?.();
      },
    ]);
    return this;
  }
  padding(...padding: (string | number)[]) {
    this.#styles.push([
      'padding',
      padding.map((p) => (typeof p === 'number' ? `${p}px` : p)).join(' '),
    ]);
    return this;
  }
  row(
    gap: number | string,
    align: 'start' | 'center' | 'end' = 'start',
    justify: 'start' | 'center' | 'end' | 'space-between' = 'start',
  ) {
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', 'row']);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap]);
    this.#styles.push(['alignItems', align]);
    this.#styles.push(['justifyContent', justify]);
    return this;
  }
  style<P extends keyof CSSStyleDeclaration>(
    prop: P,
    val: CSSStyleDeclaration[P],
  ) {
    this.#styles.push([prop as string, val as string]);
    return this;
  }
  styleOnHover<P extends keyof CSSStyleDeclaration>(
    prop: P,
    val: CSSStyleDeclaration[P],
  ) {
    this.#stylesOnHover.push([prop as string, val as string]);
    return this;
  }
  styles(propsAndVals: [keyof CSSStyleDeclaration, string][]) {
    propsAndVals.forEach(([prop, val]) => this.style(prop, val));
    return this;
  }
  width(w: number | `${string}%` | `${string}px` = '100%') {
    this.#styles.push(['width', typeof w === 'number' ? `${w}%` : w]);
    return this;
  }
  // RENDERERS
  append(...nodes: Parameters<OEM.ELEMENT<T>['append']>) {
    this.createElement();
    this.#el.append(...nodes);
    return this.#el;
  }
  innerHtml(node: HTMLElement | (() => HTMLElement), ...buses: OEM.BUSES[]) {
    this.createElement();
    const run = () => {
      this.#el.innerHTML = '';
      this.#el.appendChild(typeof node === 'function' ? node() : node);
    };
    buses.forEach((bus) => bus.sub(run));
    run();
    return this.#el;
  }
  innerText(
    txt: (string | number) | (() => string | number),
    ...buses: OEM.BUSES[]
  ) {
    this.createElement();
    const run = () =>
      (this.#el.innerText = String(typeof txt === 'function' ? txt() : txt));
    buses.forEach((bus) => bus.sub(run));
    run();
    return this.#el;
  }
  map<I extends any[], II extends () => any[]>(
    cb: (i: I[0] | ReturnType<II>[0]) => HTMLElement,
    items: I | II,
    ...buses: OEM.BUSES[]
  ) {
    this.createElement();
    const run = () => {
      this.#el.innerHTML = '';
      const list = typeof items === 'function' ? items() : items;
      list.forEach((item) => {
        const el = cb(item);
        this.#el.appendChild(el);
      });
    };
    buses.forEach((bus) => bus.sub(run));
    if (typeof items === 'function' && items.prototype.sub)
      items.prototype.sub(run);

    run();
    return this.#el;
  }
  render(): T {
    this.createElement();
    return this.#el;
  }
  value(val: string | number | OEM.NUMBER['get']) {
    this.createElement();
    const run = () =>
      ((<any>this.#el).value = String(typeof val === 'function' ? val() : val));
    if (typeof val === 'function' && val.prototype.sub) val.prototype.sub(run);
    run();
    return this.#el;
  }
}
