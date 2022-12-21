

type Color = `hsl(${string})` | `rgb(${string})` | `#${string}`

export class OEM_COLOR implements OEM.COLOR {
  #original: string;
  #hue = 0;
  #saturation = 0;
  #lightness = 0;
  #subs: ((color: string) => any)[] = [];
  constructor(color: Color = 'hsl(0,0%,0%)') {
    this.#original = color;
    const [hue, saturation, lightness] = this.parse(color)
    this.#hue = hue;
    this.#saturation = saturation;
    this.#lightness = lightness;
    this.set = this.set.bind(this);
    this.sub = this.sub.bind(this);
    this.get = this.get.bind(this);
    this.reset = this.reset.bind(this);
    this.get.prototype = { sub: this.sub };
    return this;
  }
  alpha(a: number) {
    return `hsl(${this.#hue},${this.#saturation}%,${this.#lightness}%,${a})`
  }
  private parse(color: string): [number, number, number] {
    const type = color.slice(0, 3).toUpperCase();
    if (color.slice(0, 1) === '#') {
      return this.hexToHSL(color);
    }
    if (type === 'HSL') {
      const colorValue = color.replace(/[hsla()]/g, '').split(',');
      const [h, s, l] = colorValue.map((v) => parseInt(v));
      return [h, s, l];
    }
    if (type === 'RGB') {
      const colorValue = color.replace(/[hsla()]/g, '').split(',');
      const [r, g, b] = colorValue.map((v) => parseInt(v));
      return this.rgbToHsl(r, g, b);
    }
    return [0, 0, 0];
  }
  darken(p: number, a: number = 1) {
    return `hsla(${this.#hue},${this.#saturation}%,${this.#lightness - p}%,${a})`
  }
  get() {
    return `hsla(${this.#hue},${this.#saturation}%,${this.#lightness}%,1)`
  }
  get val() {
    return `hsla(${this.#hue},${this.#saturation}%,${this.#lightness}%,1)`
  }
  private hexToHSL(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
      throw new Error("Could not parse Hex Color");
    }

    const rHex = parseInt(result[1], 16);
    const gHex = parseInt(result[2], 16);
    const bHex = parseInt(result[3], 16);

    const r = rHex / 255;
    const g = gHex / 255;
    const b = bHex / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = (max + min) / 2;
    let s = h;
    let l = h;

    if (max === min) {
      // Achromatic
      return [0, 0, l]
    }

    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return [h, s, l]
  }
  lighten(p: number, a: number = 1) {
    return `hsl(${this.#hue},${this.#saturation}%,${this.#lightness + p}%,${a})`
  }
  private rgbToHsl(r255: number, g255: number, b255: number): [number, number, number] {

    const r = r255 / 255;
    const g = g255 / 255;
    const b = b255 / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h = (max + min) / 2;
    let s = h;
    let l = h;

    if (max === min) {
      // Achromatic
      return [0, 0, l]
    }

    const d = max - min;
    s = l >= 0.5 ? d / (2 - (max + min)) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + 0) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
  }
  reset(): OEM.COLOR {
    this.set(this.#original);
    return this;
  }
  set(color: string) {
    const [hue, saturation, lightness] = this.parse(color)
    this.#hue = hue;
    this.#saturation = saturation;
    this.#lightness = lightness;
    this.#subs.forEach((cb) => cb(this.val));
    return this;
  }
  sub(cb: (s: string) => any) {
    this.#subs.push(cb);
  }
}
