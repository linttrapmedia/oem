class Element implements OEM.Element {
  #el: HTMLElement;
  constructor(tag: string) {
    this.#el = document.createElement(tag);
  }
  column(gap: number, align: 'start' | 'center' | 'end' = 'start', justify: 'start' | 'center' | 'end' = 'start') {
    this.#el.style.display = 'flex';
    this.#el.style.flexDirection = 'column';
    this.#el.style.gap = `${gap}px`;
    this.#el.style.alignItems = align;
    this.#el.style.justifyContent = justify;
    return this;
  }
  innerHtml(...nodes: HTMLElement[]) {
    this.#el.innerHTML = '';
    nodes.forEach((node) => this.#el.appendChild(node));
    return this.#el;
  }
  innerText(txt: string | number | OEM.Number['get']) {
    const run = () => (this.#el.innerText = String(typeof txt === 'function' ? txt() : txt));
    if (typeof txt === 'function' && txt.prototype.sub) txt.prototype.sub(run);
    run();
    return this.#el;
  }
  onClick<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>) {
    this.#el.addEventListener('click', () => func(...args));
    return this;
  }
  row(gap: number, align: 'start' | 'center' | 'end' = 'start', justify: 'start' | 'center' | 'end' = 'start') {
    this.#el.style.display = 'flex';
    this.#el.style.flexDirection = 'row';
    this.#el.style.gap = `${gap}px`;
    this.#el.style.alignItems = align;
    this.#el.style.justifyContent = justify;
    return this;
  }
}

'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'
  .split(',')
  .forEach((tag) => {
    Object.defineProperty(window, tag.toUpperCase(), { get: () => new Element(tag) });
  });

class Number implements OEM.Number {
  #n: number;
  #subs: ((n: number) => any)[] = [];
  constructor(n: number = 0) {
    this.#n = n;
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
  get: () => {
    const num = new Number();
    num.inc = num.inc.bind(num);
    num.dec = num.dec.bind(num);
    num.set = num.set.bind(num);
    num.sub = num.sub.bind(num);
    num.get = num.get.bind(num);
    num.get.prototype = {
      sub: num.sub,
    };
    return num;
  },
});

const COMP: OEM.Component = (cb: () => HTMLElement, ...buses: any[]): HTMLElement => {
  const el = cb();
  buses.forEach((bus) => bus.sub(() => (el.innerHTML = cb().innerHTML)));
  return el;
};

Object.defineProperty(window, 'COMP', {
  get: () => COMP,
});

export const render = (app: HTMLElement) => {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(app);
  });
};
