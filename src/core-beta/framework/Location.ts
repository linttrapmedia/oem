export class OEM_LOCATION implements OEM.LOCATION {
  #location: {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    origin: string;
    pathname: string;
    port: string;
    protocol: string;
    params: Record<string, string | number>;
  };
  #subs: ((location: OEM_LOCATION['val']) => any)[] = [];
  constructor() {
    this.parse = this.parse.bind(this);
    this.set = this.set.bind(this);
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.get.prototype = {
      sub: this.sub,
    };
    window.onpopstate = () => setTimeout(this.parse, 100);
    window.onhashchange = () => setTimeout(this.parse, 100);
    this.parse();
  }
  get() {
    return this.#location;
  }
  parse() {
    this.#location = {
      hash: window.location.hash,
      host: window.location.host,
      hostname: window.location.hostname,
      href: window.location.href,
      origin: window.location.origin,
      pathname: window.location.pathname,
      port: window.location.port,
      protocol: window.location.protocol,
      params: {},
    };
    this.#subs.forEach((cb) => cb(this.val));
  }
  set(href: string, title?: string, state?: string) {
    const nextURL = href;
    const nextTitle = title;
    const nextState = state;
    window.history.pushState(nextState, nextTitle, nextURL);
    this.parse();
    this.#subs.forEach((cb) => cb(this.val));
    return this.#location;
  }
  sub(cb: (location: OEM_LOCATION['val']) => any) {
    this.#subs.push(cb);
  }
  get val() {
    return this.#location;
  }
}
