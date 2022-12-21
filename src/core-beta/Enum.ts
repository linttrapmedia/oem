export class OEM_ENUM<T extends string> implements OEM.ENUM<T> {
    #original: T;
    #s: T;
    #subs: ((s: T) => any)[] = [];
    constructor(s: T) {
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
    cb<F extends 'eq' | 'neq'>(func: F, ...args: Parameters<OEM.ENUM<T>[F]>) {
        return () => this[func].apply(this, args);
    }
    eq(s: T) {
        return this.#s === s;
    }
    get() {
        return this.#s;
    }
    neq(s: T) {
        return this.#s !== s;
    }
    reset(): OEM.ENUM<T> {
        this.set(this.#original);
        return this;
    }
    set(s: T) {
        this.#s = s;
        this.#subs.forEach((cb) => cb(this.#s));
        return this;
    }
    sub(cb: (s: T) => any) {
        this.#subs.push(cb);
    }
    get val() {
        return this.#s;
    }
}
