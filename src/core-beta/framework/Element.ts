export class OEM_ELEMENT<T extends HTMLElement> implements OEM.ELEMENT<T> {
  #el: T;
  #tag: string = 'div';
  #attrs: [string, string][] = [];
  #funcs: [string, (...args: any[]) => any][] = [];
  #styles: [string, string][] = [];
  #stylesOnHeight: [string, string, number, OEM.CONTAINER_QUERY][] = [];
  #stylesOnWidth: [string, string, number, OEM.CONTAINER_QUERY][] = [];
  #stylesOnHover: [string, string][] = [];
  #classes: string[] = [];
  constructor(tag: string) {
    this.#tag = tag;
    this.#styles = [];
    this.append = this.append.bind(this);
    this.attr = this.attr.bind(this);
    this.column = this.column.bind(this);
    this.color = this.color.bind(this);
    this.createElement = this.createElement.bind(this);
    this.fontSize = this.fontSize.bind(this);
    this.flex = this.flex.bind(this);
    this.height = this.height.bind(this);
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
      const _val = (<any>this.#el).style[prop];
      const set = (p: string, v: string) => ((<any>this.#el).style[p] = v);
      this.#el.addEventListener('mouseenter', set.bind(null, prop, val));
      this.#el.addEventListener('mouseleave', set.bind(null, prop, _val));
    });
    this.#stylesOnHeight.forEach(([prop, val, breakpoint, cq]) => {
      const set = (p: string, v: string) => ((<any>this.#el).style[p] = v);
      cq.sub((size) => (size.height >= breakpoint ? set(prop, val) : null));
    });
    this.#stylesOnWidth.forEach(([prop, val, breakpoint, cq]) => {
      const set = (p: string, v: string) => ((<any>this.#el).style[p] = v);
      cq.sub((size) => (size.width >= breakpoint ? set(prop, val) : null));
    });
    this.#funcs.forEach(([event, func]) => this.#el.addEventListener(event, func));
    this.#classes.forEach((cls) => this.#el.classList.add(cls));
    return this.#el;
  }
  // ATTRIBUTES
  attr(...props: Parameters<OEM.ELEMENT<T>['attr']>) {
    const [name, value] = props;
    this.#attrs.push([name, value]);
    return this;
  }
  backgroundColor(...props: Parameters<OEM.ELEMENT<T>['backgroundColor']>) {
    const [hsla, opacity = 1, lightness = 0] = props;
    const h = hsla[0];
    const s = hsla[1];
    const l = hsla[2] + lightness;
    const a = hsla[3] * opacity;
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    this.#styles.push(['backgroundColor', color]);
    return this;
  }
  class(...classes: Parameters<OEM.ELEMENT<T>['class']>) {
    this.#classes.push(...classes);
    return this;
  }
  color(...props: Parameters<OEM.ELEMENT<T>['color']>) {
    const [hsla, opacity = 1, lightness = 0] = props;
    const h = hsla[0];
    const s = hsla[1];
    const l = hsla[2] + lightness;
    const a = hsla[3] * opacity;
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    this.#styles.push(['color', color]);
    return this;
  }
  column(...props: Parameters<OEM.ELEMENT<T>['column']>) {
    const [gap, align = 'start', justify = 'end'] = props;
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', 'column']);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap]);
    this.#styles.push(['alignItems', align]);
    this.#styles.push(['justifyContent', justify]);
    return this;
  }
  flex(...props: Parameters<OEM.ELEMENT<T>['flex']>) {
    const [direction = 'row', gap = 0, align = 'start', justify = 'start'] = props;
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', direction]);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap]);
    this.#styles.push(['alignItems', align]);
    this.#styles.push(['justifyContent', justify]);
    return this;
  }
  fontSize(...props: Parameters<OEM.ELEMENT<T>['fontSize']>) {
    const [size, unit = 'px'] = props;
    this.#styles.push(['fontSize', `${size}${unit}`]);
    return this;
  }
  height(...props: Parameters<OEM.ELEMENT<T>['height']>) {
    const [h, u = '%'] = props;
    this.#styles.push(['height', `${h}${u}`]);
    return this;
  }
  margin(...props: Parameters<OEM.ELEMENT<T>['margin']>) {
    const margin = props;
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
  onInput(...props: Parameters<OEM.ELEMENT<T>['onInput']>) {
    const [func] = props;
    this.#funcs.push(['input', (e: Event) => func((<any>e.target).value)]);
    return this;
  }
  onSubmit(...props: Parameters<OEM.ELEMENT<T>['onSubmit']>) {
    const [func] = props;
    this.#funcs.push([
      'submit',
      (ev: Event) => {
        ev.preventDefault();
        func?.();
      },
    ]);
    return this;
  }
  padding(...props: Parameters<OEM.ELEMENT<T>['padding']>) {
    const padding = props;
    this.#styles.push([
      'padding',
      padding.map((p) => (typeof p === 'number' ? `${p}px` : p)).join(' '),
    ]);
    return this;
  }
  row(...props: Parameters<OEM.ELEMENT<T>['row']>) {
    const [gap, align = 'start', justify = 'end'] = props;
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', 'row']);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap]);
    this.#styles.push(['alignItems', align]);
    this.#styles.push(['justifyContent', justify]);
    return this;
  }
  style(...props: Parameters<OEM.ELEMENT<T>['style']>) {
    const [prop, val] = props;
    this.#styles.push([prop as string, val as string]);
    return this;
  }
  styleOnHeight(...props: Parameters<OEM.ELEMENT<T>['styleOnHeight']>) {
    const [prop, val, breakpoint, cq] = props;
    this.#stylesOnHeight.push([prop as string, val as string, breakpoint, cq]);
    return this;
  }
  styleOnWidth(...props: Parameters<OEM.ELEMENT<T>['styleOnWidth']>) {
    const [prop, val, breakpoint, cq] = props;
    this.#stylesOnWidth.push([prop as string, val as string, breakpoint, cq]);
    return this;
  }
  styleOnHover(...props: Parameters<OEM.ELEMENT<T>['styleOnHover']>) {
    const [prop, val] = props;
    this.#stylesOnHover.push([prop as string, val as string]);
    return this;
  }
  styles(...props: Parameters<OEM.ELEMENT<T>['styles']>) {
    const [styles] = props;
    styles.forEach(([prop, val]) => this.style(prop, val));
    return this;
  }
  width(...props: Parameters<OEM.ELEMENT<T>['width']>) {
    const [w, u = '%'] = props;
    this.#styles.push(['width', `${w}${u}`]);
    return this;
  }
  // RENDERERS
  append(...nodes: Parameters<OEM.ELEMENT<T>['append']>) {
    this.createElement();
    this.#el.append(...nodes);
    return this.#el;
  }
  innerHtml(...props: Parameters<OEM.ELEMENT<T>['innerHtml']>) {
    const [node, ...buses] = props;
    this.createElement();
    const run = () => {
      this.#el.innerHTML = '';
      this.#el.appendChild(typeof node === 'function' ? node() : node);
    };
    buses.forEach((bus) => bus.sub(run));
    run();
    return this.#el;
  }
  innerText(...props: Parameters<OEM.ELEMENT<T>['innerText']>) {
    const [txt, ...buses] = props;
    this.createElement();
    const run = () => (this.#el.innerText = String(typeof txt === 'function' ? txt() : txt));
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
    if (typeof items === 'function' && items.prototype.sub) items.prototype.sub(run);

    run();
    return this.#el;
  }
  render(): T {
    this.createElement();
    return this.#el;
  }
  value(...props: Parameters<OEM.ELEMENT<T>['value']>) {
    const [val] = props;
    this.createElement();
    const run = () => ((<any>this.#el).value = String(typeof val === 'function' ? val() : val));
    if (typeof val === 'function' && val.prototype.sub) val.prototype.sub(run);
    run();
    return this.#el;
  }
}
