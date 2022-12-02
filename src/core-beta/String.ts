export class OEM_STRING implements OEM.STRING {
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
