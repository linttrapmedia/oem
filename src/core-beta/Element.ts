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
    this.createElement = this.createElement.bind(this);
    this.innerHtml = this.innerHtml.bind(this);
    this.innerText = this.innerText.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.render = this.render.bind(this);
    this.style = this.style.bind(this);
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

  // ATTRIBUTES
  attr(...props: Parameters<OEM.ELEMENT<T>['attr']>) {
    const [name, value, condition = true] = props;
    this.#attrs.push([name, value, condition]);
    return this;
  }
  class(...props: Parameters<OEM.ELEMENT<T>['class']>) {
    const [classname, condition = true] = props;
    this.#classes.push([classname, condition]);
    return this;
  }
  eventListener: OEM.Attr<T, [event: OEM.Event, func: OEM.AnyFunc]> = (...props) => {
    const [event, func] = props;
    this.#funcs.push([event, func]);
    return this;
  };
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
