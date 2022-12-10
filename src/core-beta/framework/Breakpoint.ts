export class OEM_BREAKPOINT implements OEM.BREAKPOINT {
  #container: string;
  #breakpoint: number = 0;
  #dimension: 'height' | 'width' = 'width';
  #subs: ((isGTEbreakpoint: boolean) => any)[] = [];
  constructor(breakpoint: number = 0, dimension: 'height' | 'width' = 'width', container: string) {
    this.#container = container;
    this.#breakpoint = breakpoint;
    this.#dimension = dimension;
    this.isGTEbreakpoint = this.isGTEbreakpoint.bind(this);
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.get.prototype = { sub: this.sub };
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('load', this.handleResize);
    return this;
  }
  isGTEbreakpoint() {
    const el = document.querySelector(this.#container);
    if (this.#container && !el) return false;
    const height = el ? el.clientHeight : window.innerHeight;
    const width = el ? el.clientWidth : window.innerWidth;
    if (this.#dimension === 'width') return width >= this.#breakpoint;
    if (this.#dimension === 'height') return height >= this.#breakpoint;
    return false;
  }
  handleResize() {
    this.#subs.forEach((cb) => cb(this.isGTEbreakpoint()));
  }
  get() {
    return this.isGTEbreakpoint();
  }
  get val() {
    return this.isGTEbreakpoint();
  }
  set(breakpoint: number, dimension: 'height' | 'width' = 'width', container: string = 'window') {
    this.#container = container;
    this.#breakpoint = breakpoint;
    this.#dimension = dimension;
    return this;
  }
  sub(cb: (isGTEbreakpoint: boolean) => any) {
    this.#subs.push(cb);
  }
}
