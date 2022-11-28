class ELEMENT<T extends HTMLElement> implements OEM.ELEMENT<T> {
  #el: T;
  #tag: string = 'div';
  #attrs: [string, string][] = [];
  #funcs: [string, (...args: any[]) => any][] = [];
  #styles: [string, string][] = [];
  constructor(tag: string) {
    this.#tag = tag;
    this.append = this.append.bind(this);
    this.column = this.column.bind(this);
    this.createElement = this.createElement.bind(this);
    this.innerHtml = this.innerHtml.bind(this);
    this.innerText = this.innerText.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onInput = this.onInput.bind(this);
    this.render = this.render.bind(this);
    this.row = this.row.bind(this);
    this.value = this.value.bind(this);
  }
  private createElement() {
    this.#el = document.createElement(this.#tag) as T;
    this.#attrs.forEach(([key, val]) => this.#el.setAttribute(key, val));
    this.#styles.forEach(([prop, val]) => ((<any>this.#el).style[prop] = val));
    this.#funcs.forEach(([event, func]) =>
      this.#el.addEventListener(event, func),
    );
    return this.#el;
  }
  // ATTRIBUTES
  column(
    gap: number,
    align: 'start' | 'center' | 'end' = 'start',
    justify: 'start' | 'center' | 'end' = 'start',
  ) {
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', 'column']);
    this.#styles.push(['gap', `${gap}px`]);
    this.#styles.push(['alignItems', align]);
    this.#styles.push(['justifyContent', justify]);
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
  row(
    gap: number,
    align: 'start' | 'center' | 'end' = 'start',
    justify: 'start' | 'center' | 'end' = 'start',
  ) {
    this.#styles.push(['display', 'flex']);
    this.#styles.push(['flexDirection', 'row']);
    this.#styles.push(['gap', `${gap}px`]);
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
  setAttribute(key: string, val: string) {
    this.#attrs.push([key, val]);
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

'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'
  .split(',')
  .forEach((tag: keyof HTMLElementTagNameMap) => {
    Object.defineProperty(window, tag.toUpperCase(), {
      get: () => new ELEMENT<HTMLElementTagNameMap[typeof tag]>(tag),
    });
  });

class NUMBER implements OEM.NUMBER {
  #n: number;
  #subs: ((n: number) => any)[] = [];
  constructor(n: number = 0) {
    this.#n = n;
    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    this.set = this.set.bind(this);
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.get.prototype = {
      sub: this.sub,
    };
    return this;
  }
  dec(n: number) {
    this.set(this.#n - n);
    return this;
  }
  get() {
    return this.#n;
  }
  inc(n: number) {
    this.set(this.#n + n);
    return this;
  }
  set(n: number) {
    this.#n = n;
    this.#subs.forEach((cb) => cb(this.#n));
    return this;
  }
  sub(cb: (atom: number) => any) {
    this.#subs.push(cb);
  }
  get val() {
    return this.#n;
  }
}

Object.defineProperty(window, 'NUMBER', {
  get: () => (n: number) => new NUMBER(n),
});

class ARRAY<T extends any[]> implements OEM.ARRAY<T> {
  #ary: T[] = [];
  #subs: ((ary: T[]) => any)[] = [];
  constructor(ary: T[] = []) {
    this.#ary = ary;
    this.get = this.get.bind(this);
    this.pop = this.pop.bind(this);
    this.push = this.push.bind(this);
    this.shift = this.shift.bind(this);
    this.set = this.set.bind(this);
    this.sub = this.sub.bind(this);
    this.get.prototype = {
      sub: this.sub,
    };
  }
  get() {
    return this.#ary;
  }
  get val() {
    return this.#ary;
  }
  pop() {
    this.set(this.#ary.slice(0, -1));
    return this;
  }
  push(item: T | (() => T)) {
    const i = typeof item === 'function' ? item() : item;
    if (i.length === 0) return this;
    this.set(this.#ary.concat(i));
    return this;
  }
  shift() {
    this.set(this.#ary.slice(1));
    return this;
  }
  set(ary: T[]) {
    this.#ary = ary;
    this.#subs.forEach((cb) => cb(this.#ary));
    return this;
  }
  sub(cb: (ary: T[]) => any) {
    this.#subs.push(cb);
    return this;
  }
}

Object.defineProperty(window, 'ARRAY', {
  get: () => (ary: any[]) => new ARRAY(ary),
});

class STRING implements OEM.STRING {
  #original: string;
  #s: string;
  #subs: ((s: string) => any)[] = [];
  constructor(s: string = '') {
    this.#original = s;
    this.#s = s;
    this.set = this.set.bind(this);
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.reset = this.reset.bind(this);
    this.get.prototype = { sub: this.sub };
    return this;
  }

  get() {
    return this.#s;
  }
  reset(): OEM.STRING {
    this.set(this.#original);
    return this;
  }
  set(s: string) {
    this.#s = s;
    this.#subs.forEach((cb) => cb(this.#s));
    return this;
  }
  sub(cb: (s: string) => any) {
    this.#subs.push(cb);
  }
  get val() {
    return this.#s;
  }
}

Object.defineProperty(window, 'STRING', {
  get: () => (s: string) => new STRING(s),
});

export const COMP: OEM.COMPONENT = (
  cb: () => HTMLElement,
  ...buses: any[]
): HTMLElement => {
  const el = cb();
  buses.forEach((bus) => bus.sub(() => (el.innerHTML = cb().innerHTML)));
  return el;
};

export const APP = (app: HTMLElement, container?: string) => {
  if (!container) return app;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(container).appendChild(app);
  });
};
