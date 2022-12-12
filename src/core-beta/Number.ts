export class OEM_NUMBER implements OEM.NUMBER {
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
