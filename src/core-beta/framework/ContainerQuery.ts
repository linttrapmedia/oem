export class OEM_CONTAINER_QUERY implements OEM.CONTAINER_QUERY {
  #container: string;
  #width: number = 0;
  #height: number = 0;
  #subs: ((size: { height: number; width: number }) => any)[] = [];
  constructor(container: string) {
    this.#container = container;
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.get.prototype = { sub: this.sub };
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('load', this.handleResize);
    return this;
  }
  handleResize() {
    const el = document.querySelector(this.#container);
    if (this.#container && !el) return this;
    this.#width = el ? el.clientWidth : window.innerWidth;
    this.#height = el ? el.clientHeight : window.innerHeight;
    this.#subs.forEach((cb) => cb(this.get()));
  }
  get() {
    return {
      height: this.#height,
      width: this.#width,
    };
  }
  get val() {
    return {
      height: this.#height,
      width: this.#width,
    };
  }
  sub(cb: (size: { height: number; width: number }) => any) {
    this.#subs.push(cb);
  }
}
