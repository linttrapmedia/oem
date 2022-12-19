export class OEM_ELEMENT<T extends HTMLElement> implements OEM.ELEMENT<T> {
  #attrs: [string, string | (() => string), OEM.Condition?][] = [];
  #classes: [string, OEM.Condition?][] = [];
  #el: T;
  #funcs: [string, (...args: any[]) => any][] = [];
  #styles: [keyof CSSStyleDeclaration, string | (() => string), OEM.Condition?][] = [];
  #tag: string = 'div';
  constructor(tag: string) {
    this.#tag = tag;
    this.#styles = [];
    this.append = this.append.bind(this);
    this.attr = this.attr.bind(this);
    this.backgroundColor = this.backgroundColor.bind(this);
    this.border = this.border.bind(this);
    this.borderTop = this.borderTop.bind(this);
    this.borderRight = this.borderRight.bind(this);
    this.borderLeft = this.borderLeft.bind(this);
    this.borderBottom = this.borderBottom.bind(this);
    this.borderRadius = this.borderRadius.bind(this);
    this.colorizer = this.colorizer.bind(this);
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
    this.style = this.style.bind(this);
    this.width = this.width.bind(this);
  }

  // Private functions
  private createElement() {
    const cond = (condition: OEM.Condition, apply: () => void, reset: () => void) => {
      if (condition === 'hover') {
        this.#el.addEventListener('mouseenter', apply);
        this.#el.addEventListener('mouseleave', reset);
        return;
      }
      if (typeof condition === 'string') return this.#el.addEventListener(condition, apply);
      if (typeof condition === 'boolean') return apply();
      if (typeof condition === 'function') return condition() ? apply() : null;
      if (typeof condition === 'object' && Object.keys(condition).includes('sub'))
        condition.sub((c) => (c ? apply() : null));
    };

    this.#el = document.createElement(this.#tag) as T;
    this.#attrs.forEach(([key, val]) =>
      this.#el.setAttribute(key, typeof val === 'function' ? val() : val),
    );
    this.#styles.forEach(([prop, val, condition = true]) => {
      const originalVal = (<any>this.#el).style[prop];
      cond(
        condition,
        () => ((<any>this.#el).style[prop] = typeof val === 'function' ? val() : val),
        () => ((<any>this.#el).style[prop] = originalVal),
      );
    });
    this.#funcs.forEach(([event, func]) => this.#el.addEventListener(event, func));
    this.#classes.forEach(([cls, condition = true]) => {
      cond(
        condition,
        () => this.#el.classList.add(cls),
        () => this.#el.classList.remove(cls),
      );
    });
    return this.#el;
  }

  private colorizer(color: string, opacity: number, lightness: number) {
    const colorType = color.slice(0, 3).toUpperCase();

    if (colorType === 'HSL') {
      const colorValue = color.replace(/[hsla()]/g, '').split(',');
      const [h, s, l, a = 1] = colorValue.map((v) => parseInt(v));
      return `hsla(${h}, ${s}%, ${l + lightness}%, ${opacity})`;
    }
    if (colorType === 'RGB') {
      const colorValue = color.replace(/[hsla()]/g, '').split(',');
      const [r, g, b, a = 1] = colorValue.map((v) => parseInt(v));
      return `rgba(${r + lightness}, ${g + lightness}%, ${b + lightness}%, ${a})`;
    }
    return color;
  }

  // ATTRIBUTES
  attr(...props: Parameters<OEM.ELEMENT<T>['attr']>) {
    const [name, value, condition = true] = props;
    this.#attrs.push([name, value, condition]);
    return this;
  }
  backgroundColor(...props: Parameters<OEM.ELEMENT<T>['backgroundColor']>) {
    const [color, opacity = 1, lightness = 0, condition = true] = props;
    this.#styles.push(['backgroundColor', this.colorizer(color, opacity, lightness), condition]);
    return this;
  }
  border(...props: Parameters<OEM.ELEMENT<T>['border']>) {
    const [_width, style, _color, opacity, lightness, condition = true] = props;
    const width = typeof _width === 'number' ? `${_width}px` : _width;
    const color = this.colorizer(_color, opacity, lightness);
    this.#styles.push(['border', `${width} ${style} ${color}`, condition]);
    return this;
  }
  borderTop(...props: Parameters<OEM.ELEMENT<T>['borderTop']>) {
    const [_width, style, _color, opacity, lightness, condition = true] = props;
    const width = typeof _width === 'number' ? `${_width}px` : _width;
    const color = this.colorizer(_color, opacity, lightness);
    this.#styles.push(['borderTop', `${width} ${style} ${color}`, condition]);
    return this;
  }
  borderRight(...props: Parameters<OEM.ELEMENT<T>['borderRight']>) {
    const [_width, style, _color, opacity, lightness, condition = true] = props;
    const width = typeof _width === 'number' ? `${_width}px` : _width;
    const color = this.colorizer(_color, opacity, lightness);
    this.#styles.push(['borderRight', `${width} ${style} ${color}`, condition]);
    return this;
  }
  borderBottom(...props: Parameters<OEM.ELEMENT<T>['borderBottom']>) {
    const [_width, style, _color, opacity, lightness, condition = true] = props;
    const width = typeof _width === 'number' ? `${_width}px` : _width;
    const color = this.colorizer(_color, opacity, lightness);
    this.#styles.push(['borderBottom', `${width} ${style} ${color}`, condition]);
    return this;
  }
  borderLeft(...props: Parameters<OEM.ELEMENT<T>['borderLeft']>) {
    const [_width, style, _color, opacity, lightness, condition = true] = props;
    const width = typeof _width === 'number' ? `${_width}px` : _width;
    const color = this.colorizer(_color, opacity, lightness);
    this.#styles.push(['borderLeft', `${width} ${style} ${color}`, condition]);
    return this;
  }
  borderRadius(...props: Parameters<OEM.ELEMENT<T>['borderRadius']>) {
    const [_size, condition = true] = props;
    const size = typeof _size === 'number' ? `${_size}px` : _size;
    this.#styles.push(['borderRadius', size, condition]);
    return this;
  }
  class(...props: Parameters<OEM.ELEMENT<T>['class']>) {
    const [classname, condition = true] = props;
    this.#classes.push([classname, condition]);
    return this;
  }
  color(...props: Parameters<OEM.ELEMENT<T>['color']>) {
    const [color, opacity = 1, lightness = 0, condition = true] = props;
    this.#styles.push(['color', this.colorizer(color, opacity, lightness), condition]);
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
    const [_size, condition = true] = props;
    const size = typeof _size === 'number' ? _size + 'px' : _size;
    this.#styles.push(['fontSize', size, condition]);
    return this;
  }
  height(...props: Parameters<OEM.ELEMENT<T>['height']>) {
    const [_h, condition = true] = props;
    const h = typeof _h === 'number' ? _h + '%' : _h;
    this.#styles.push(['height', h, condition]);
    return this;
  }
  margin(...props: Parameters<OEM.ELEMENT<T>['margin']>) {
    const [_top, _right, _bottom, _left, condition = true] = props;
    const top = typeof _top === 'number' ? _top + 'px' : _top;
    const right = typeof _right === 'number' ? _right + 'px' : _right;
    const bottom = typeof _bottom === 'number' ? _bottom + 'px' : _bottom;
    const left = typeof _left === 'number' ? _left + 'px' : _left;
    const margin = [top, right, bottom, left].filter((v) => v !== undefined).join(' ');
    this.#styles.push(['margin', margin, condition]);
    return this;
  }
  marginX(...props: Parameters<OEM.ELEMENT<T>['marginX']>) {
    const [x, condition = true] = props;
    const margin = typeof x === 'number' ? `${x}px` : x;
    this.#styles.push(['marginLeft', margin, condition]);
    this.#styles.push(['marginRight', margin, condition]);
    return this;
  }
  marginY(...props: Parameters<OEM.ELEMENT<T>['marginX']>) {
    const [y, condition = true] = props;
    const margin = typeof y === 'number' ? `${y}px` : y;
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
    const [_top, _right, _bottom, _left, condition = true] = props;
    const top = typeof _top === 'number' ? _top + 'px' : _top;
    const right = typeof _right === 'number' ? _right + 'px' : _right;
    const bottom = typeof _bottom === 'number' ? _bottom + 'px' : _bottom;
    const left = typeof _left === 'number' ? _left + 'px' : _left;
    const padding = [top, right, bottom, left].filter((v) => v !== undefined).join(' ');
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
    const [_w, condition = true] = props;
    const w = typeof _w === 'number' ? `${_w}%` : _w;
    this.#styles.push(['width', w, condition]);
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
}
