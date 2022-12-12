export class OEM_STRING implements OEM.STRING {
  #original: string;
  #s: string;
  #subs: ((s: string) => any)[] = [];
  constructor(s: string = '') {
    this.#original = s;
    this.#s = s;
    this.cb = this.cb.bind(this);
    this.eq = this.eq.bind(this);
    this.neq = this.neq.bind(this);
    this.set = this.set.bind(this);
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.reset = this.reset.bind(this);
    this.get.prototype = { sub: this.sub };
    return this;
  }
  cb<F extends 'eq' | 'neq'>(func: F, ...args: Parameters<OEM.STRING[F]>) {
    return () => this[func].apply(this, args);
  }
  eq(s: string) {
    return this.#s === s;
  }
  get() {
    return this.#s;
  }
  neq(s: string) {
    return this.#s !== s;
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
