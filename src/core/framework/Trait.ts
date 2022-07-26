import { guid } from '@utils/Guid';

const Attr = (el: HTMLElement, prop: string, val: string | number, cond: () => boolean = () => true) =>
  cond() ? el.setAttribute(prop, String(val)) : el.removeAttribute(prop);

const Atom =
  <T extends Types.HtmlTraitFunc>(atom: any, trait: T) =>
  (...props: Parameters<T>) =>
    atom.sub(() => trait.apply(null, props));

const InnerHtml = (el: HTMLElement, html: () => HTMLElement | HTMLElement[], cond: () => boolean = () => true) => {
  const content = html();
  el.innerHTML = '';
  if (cond() && content) {
    if (Array.isArray(content)) {
      content.forEach((i) => el.appendChild(i));
    } else {
      el.appendChild(content);
    }
  }
};

const InnerText = (el: HTMLElement, text: () => string, cond: () => boolean = () => true) => {
  const content = text();
  el.innerHTML = '';
  if (cond()) {
    el.innerText = content;
  }
};

const Focus = (el: HTMLElement, cond: () => boolean = () => true) => (cond() ? el.focus : null);

// const KeyFrames = <T>(
//   declarations: Record<keyof T, Types.KeyframeStyleDeclaration>,
// ): ((...list: (keyof T)[]) => string) => {
//   const id = guid();
//   const style = document.createElement('style');
//   Theme.id = id;
//   document.getElementsByTagName('head')[0].appendChild(style);

//   const render = () => {
//     Theme.innerHTML = '';
//     const styles: string[] = [];
//     const declarationList = Object.entries(declarations).sort((a, b) => (a[0] < b[0] ? -1 : 1));
//     declarationList.forEach(([selector, declaration]: [string, Types.KeyframeStyleDeclaration]) => {
//       styles.push(`@keyframes ${selector}_${id} {\n`);
//       declaration.forEach(([percent, prop, val]) =>
//         styles.push(`${percent}% { ${(<string>prop).replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val}; }\n`),
//       );
//       styles.push(`}\n`);
//     });
//     Theme.innerHTML = styles.join('');
//   };

//   render();

//   const getter = (...list: (keyof T)[]) => list.map((item) => `${String(item)}_${id}`).join(', ');

//   return getter;
// };

const OnCreate = (el: HTMLElement, cb: (el: HTMLElement) => void) => cb(el);
const OnChange = (el: HTMLSelectElement, cb: (e: MouseEvent) => void) => el.addEventListener('change', cb);
const OnClick = (el: HTMLElement, cb: (e: MouseEvent) => void) => el.addEventListener('click', cb);
const OnMouseOver = (el: HTMLElement, cb: (e: MouseEvent) => void) => el.addEventListener('mouseover', cb);
const OnMouseOut = (el: HTMLElement, cb: (e: MouseEvent) => void) => el.addEventListener('mouseout', cb);
const OnLoad = (el: HTMLElement, cb: (el: HTMLElement) => void) => window.addEventListener('load', () => cb(el));

const OnResize = (el: HTMLElement, cb: ({ width, height }: { width: number; height: number }) => void) => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
      cb({ width: contentBoxSize.inlineSize, height: contentBoxSize.blockSize });
    }
  });

  resizeObserver.observe(el);
};

const OnSubmit = (el: HTMLFormElement, cb: () => void) =>
  el.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    cb();
  });

const OnTextInput = (el: HTMLInputElement, cb: (val: string) => void) =>
  el.addEventListener('input', () => cb(el.value));

const OnWinResize = (el: HTMLElement, cb: ({ width, height }: { width: number; height: number }) => void) => {
  window.addEventListener('resize', () => {
    const bb = el.getBoundingClientRect();
    cb({ width: bb.width, height: bb.height });
  });
};

const PrintStyle = (
  el: HTMLElement | SVGElement,
  prop: keyof CSSStyleDeclaration,
  val: string | number | (() => string | number),
  cond: () => boolean = () => true,
) => {
  if (!cond()) return;
  const id = 'print-style';
  const selector = id + '-' + guid();
  let style: HTMLStyleElement = document.getElementById(id) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.id = id;
    style.setAttribute('type', 'text/css');
    style.setAttribute('media', 'print');
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  const sheet = style.sheet;
  const propFmt = (<string>prop).replace(/([A-Z])/g, '-$1').toLowerCase();
  const valFmt = typeof val === 'function' ? val() : val;
  sheet.insertRule(`.${selector} { ${propFmt}:${valFmt} !important; }`, 0);
  el.classList.add(selector);
};

const Src = (el: HTMLImageElement, src: string) => (el.src = src);

const Style = (
  el: HTMLElement | SVGElement,
  prop: keyof CSSStyleDeclaration,
  val: string | number | (() => string | number),
  cond: () => boolean = () => true,
) => (cond() ? ((<any>el.style)[prop] = typeof val === 'function' ? val() : val) : null);

const Styles = (
  el: HTMLElement | SVGElement,
  styles: [prop: keyof CSSStyleDeclaration, val: string | number][],
  cond: () => boolean = () => true,
) => styles.forEach(([prop, val]) => Style(el, prop, val, cond));

const StyleOnHover = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration,
  val: string | number,
  resetVal?: string | number,
) => {
  let originalVal = resetVal ?? el.style[prop] ?? null;
  el.addEventListener('mouseover', () => {
    // if there was no original value but now there is,
    // we need to capture it first before we change its style
    // this allows you to list a style trait (which is presumed to be an "original value") after a hover trait
    if (!originalVal) originalVal = el.style[prop];
    return ((<any>el.style)[prop] = val);
  });
  el.addEventListener('mouseout', () => ((<any>el.style)[prop] = originalVal));
};

const StyleOnResize = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration,
  cb: ({ width, height }: { width: number; height: number }) => string,
) => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;

      (<any>el.style)[prop] = cb({
        width: contentBoxSize.inlineSize,
        height: contentBoxSize.blockSize,
      });
    }
  });

  resizeObserver.observe(el);
};

const StyleOnWinResize = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration,
  cb: ({ width, height }: { width: number; height: number }) => string,
) => {
  const applyStyle = () =>
    ((<any>el.style)[prop] = cb({
      width: window.innerWidth,
      height: window.innerHeight,
    }));

  window.addEventListener('resize', applyStyle);
  window.addEventListener('load', applyStyle);
};

const SvgAttr = (el: SVGElement, prop: string, val: string | number) => el.setAttribute(prop, String(val));

const Value = (el: HTMLInputElement, value: () => string, cond: () => boolean = () => true) =>
  cond() ? (el.value = value()) : 'blank';

export const Trait = {
  Attr,
  Atom,
  Focus,
  InnerHtml,
  InnerText,
  OnChange,
  OnClick,
  OnCreate,
  OnLoad,
  OnMouseOut,
  OnMouseOver,
  OnResize,
  OnSubmit,
  OnTextInput,
  OnWinResize,
  PrintStyle,
  Src,
  Style,
  Styles,
  StyleOnHover,
  StyleOnResize,
  StyleOnWinResize,
  SvgAttr,
  Value,
};
