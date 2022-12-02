export class OEM_ARRAY<T extends any[]> implements OEM.ARRAY<T> {
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
  filter(cb: (item: T) => boolean) {
    this.set(this.#ary.filter(cb));
    return this;
  }
  includes(searchElement: T, fromIndex: number = 0) {
    return this.#ary.includes(searchElement, fromIndex);
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
