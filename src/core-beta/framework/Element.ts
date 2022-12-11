export class OEM_ELEMENT<T extends HTMLElement> implements OEM.ELEMENT<T> {
  #attrs: [string, string, OEM.Condition?][] = [];
  #classes: [string, OEM.Condition?][] = [];
  #el: T;
  #funcs: [string, (...args: any[]) => any][] = [];
  #styles: [keyof CSSStyleDeclaration, string, OEM.Condition?][] = [];
  #tag: string = 'div';
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
    const cond = (condition: OEM.Condition, apply: () => void) => {
      if (typeof condition === 'string') return this.#el.addEventListener(condition, apply);
      if (typeof condition === 'boolean') return apply();
      if (typeof condition === 'function') return condition() ? apply() : null;
      if (typeof condition === 'object' && Object.keys(condition).includes('sub'))
        condition.sub((c) => (c ? apply() : null));
    };

    this.#el = document.createElement(this.#tag) as T;
    this.#attrs.forEach(([key, val]) => this.#el.setAttribute(key, val));
    this.#styles.forEach(([prop, val, condition = true]) => {
      cond(condition, () => ((<any>this.#el).style[prop] = val));
    });
    this.#funcs.forEach(([event, func]) => this.#el.addEventListener(event, func));
    this.#classes.forEach((cls) => this.#el.classList.add(cls));
    return this.#el;
  }
  // ATTRIBUTES
  attr(...props: Parameters<OEM.ELEMENT<T>['attr']>) {
    const [name, value, condition = true] = props;
    this.#attrs.push([name, value, condition]);
    return this;
  }
  backgroundColor(...props: Parameters<OEM.ELEMENT<T>['backgroundColor']>) {
    const [hsla, opacity = 1, lightness = 0, condition = true] = props;
    const h = hsla[0];
    const s = hsla[1];
    const l = hsla[2] + lightness;
    const a = hsla[3] * opacity;
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    this.#styles.push(['backgroundColor', color, condition]);
    return this;
  }
  class(...props: Parameters<OEM.ELEMENT<T>['class']>) {
    const [classname, condition = true] = props;
    this.#classes.push([classname, condition]);
    return this;
  }
  color(...props: Parameters<OEM.ELEMENT<T>['color']>) {
    const [hsla, opacity = 1, lightness = 0, condition = true] = props;
    const h = hsla[0];
    const s = hsla[1];
    const l = hsla[2] + lightness;
    const a = hsla[3] * opacity;
    const color = `hsla(${h}, ${s}%, ${l}%, ${a})`;
    this.#styles.push(['color', color, condition]);
    return this;
  }
  column(...props: Parameters<OEM.ELEMENT<T>['column']>) {
    const [gap, align = 'start', justify = 'start', condition = true] = props;
    this.#styles.push(['display', 'flex', condition]);
    this.#styles.push(['flexDirection', 'column', condition]);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap, condition]);
    this.#styles.push(['alignItems', align, condition]);
    this.#styles.push(['justifyContent', justify, condition]);
    return this;
  }
  flex(...props: Parameters<OEM.ELEMENT<T>['flex']>) {
    const [dir = 'row', gap = 0, align = 'start', justify = 'start', condition = true] = props;
    this.#styles.push(['display', 'flex', condition]);
    this.#styles.push(['flexDirection', dir, condition]);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap, condition]);
    this.#styles.push(['alignItems', align, condition]);
    this.#styles.push(['justifyContent', justify, condition]);
    return this;
  }
  fontSize(...props: Parameters<OEM.ELEMENT<T>['fontSize']>) {
    const [size, unit = 'px', condition = true] = props;
    this.#styles.push(['fontSize', `${size}${unit}`, condition]);
    return this;
  }
  height(...props: Parameters<OEM.ELEMENT<T>['height']>) {
    const [h, u = '%', condition = true] = props;
    this.#styles.push(['height', `${h}${u}`, condition]);
    return this;
  }
  margin(...props: Parameters<OEM.ELEMENT<T>['margin']>) {
    const [top, right, bottom, left, unit = 'px', condition = true] = props;
    const margin = [top, right, bottom, left]
      .filter((v) => v !== undefined)
      .map((v) => (typeof v === 'number' ? `${v}${unit}` : v))
      .join(' ');
    this.#styles.push(['margin', margin, condition]);
    return this;
  }
  marginX(...props: Parameters<OEM.ELEMENT<T>['marginX']>) {
    const [x, unit = 'px', condition = true] = props;
    const margin = typeof x === 'number' ? `${x}${unit}` : x;
    this.#styles.push(['marginLeft', margin, condition]);
    this.#styles.push(['marginRight', margin, condition]);
    return this;
  }
  marginY(...props: Parameters<OEM.ELEMENT<T>['marginX']>) {
    const [y, unit = 'px', condition = true] = props;
    const margin = typeof y === 'number' ? `${y}${unit}` : y;
    this.#styles.push(['marginTop', margin, condition]);
    this.#styles.push(['marginBottom', margin, condition]);
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
    const [top, right, bottom, left, unit = 'px', condition = true] = props;
    const padding = [top, right, bottom, left]
      .filter((v) => v !== undefined)
      .map((v) => (typeof v === 'number' ? `${v}${unit}` : v))
      .join(' ');
    this.#styles.push(['padding', padding, condition]);
    return this;
  }
  paddingX(...props: Parameters<OEM.ELEMENT<T>['paddingX']>) {
    const [x, unit = 'px', condition = true] = props;
    const padding = typeof x === 'number' ? `${x}${unit}` : x;
    this.#styles.push(['paddingLeft', padding, condition]);
    this.#styles.push(['paddingRight', padding, condition]);
    return this;
  }
  paddingY(...props: Parameters<OEM.ELEMENT<T>['paddingX']>) {
    const [y, unit = 'px', condition = true] = props;
    const padding = typeof y === 'number' ? `${y}${unit}` : y;
    this.#styles.push(['paddingTop', padding, condition]);
    this.#styles.push(['paddingBottom', padding, condition]);
    return this;
  }
  row(...props: Parameters<OEM.ELEMENT<T>['row']>) {
    const [gap, align = 'start', justify = 'start', condition = true] = props;
    this.#styles.push(['display', 'flex', condition]);
    this.#styles.push(['flexDirection', 'row', condition]);
    this.#styles.push(['gap', typeof gap === 'number' ? `${gap}px` : gap, condition]);
    this.#styles.push(['alignItems', align, condition]);
    this.#styles.push(['justifyContent', justify, condition]);
    return this;
  }
  style(...props: Parameters<OEM.ELEMENT<T>['style']>) {
    const [prop, val, condition = true] = props;
    this.#styles.push([prop, val, condition]);
    return this;
  }
  styles(...props: Parameters<OEM.ELEMENT<T>['styles']>) {
    const [styles, condition = true] = props;
    styles.forEach(([prop, val]) => this.style(prop, val, condition));
    return this;
  }
  width(...props: Parameters<OEM.ELEMENT<T>['width']>) {
    const [w, u = '%', condition = true] = props;
    this.#styles.push(['width', `${w}${u}`, condition]);
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
