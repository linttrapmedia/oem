class ELEMENT<T extends HTMLElement> implements OEM.ELEMENT<T> {
  #el: T;
  constructor(tag: string) {
    this.#el = document.createElement(tag) as T;
  }
  column(gap: number, align: 'start' | 'center' | 'end' = 'start', justify: 'start' | 'center' | 'end' = 'start') {
    this.#el.style.display = 'flex';
    this.#el.style.flexDirection = 'column';
    this.#el.style.gap = `${gap}px`;
    this.#el.style.alignItems = align;
    this.#el.style.justifyContent = justify;
    return this;
  }
  innerHtml(...nodes: T[]) {
    this.#el.innerHTML = '';
    nodes.forEach((node) => this.#el.appendChild(node));
    return this.#el;
  }
  innerText(txt: string | number | OEM.NUMBER['get']) {
    const run = () => (this.#el.innerText = String(typeof txt === 'function' ? txt() : txt));
    if (typeof txt === 'function' && txt.prototype.sub) txt.prototype.sub(run);
    run();
    return this.#el;
  }
  onClick<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>) {
    this.#el.addEventListener('click', () => func(...args));
    return this;
  }
  onInput(func: (val: any) => void) {
    this.#el.addEventListener('input', (e: Event) => func((<HTMLInputElement>e.target).value));
    return this;
  }
  render(): T {
    return this.#el;
  }
  row(gap: number, align: 'start' | 'center' | 'end' = 'start', justify: 'start' | 'center' | 'end' = 'start') {
    this.#el.style.display = 'flex';
    this.#el.style.flexDirection = 'row';
    this.#el.style.gap = `${gap}px`;
    this.#el.style.alignItems = align;
    this.#el.style.justifyContent = justify;
    return this;
  }
  value(val: string): T {
    (<any>this.#el).value = val;
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

const COMP: OEM.COMPONENT = (cb: () => HTMLElement, ...buses: any[]): HTMLElement => {
  const el = cb();
  buses.forEach((bus) => bus.sub(() => (el.innerHTML = cb().innerHTML)));
  return el;
};

Object.defineProperty(window, 'COMP', {
  get: () => COMP,
});

export const container = (app: HTMLElement, container?: string) => {
  if (!container) return app;
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(container).appendChild(app);
  });
};
