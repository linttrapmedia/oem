// Helpers

import { Types } from './types';

type Condition = (() => boolean) | boolean;

const check = (condition: Condition, ...values: any[]) => {
  const hasAnUndefinedValue = values.some((v: any) => v === undefined);
  if (hasAnUndefinedValue) return false;
  const conditionIsFunction = typeof condition === 'function';
  if (conditionIsFunction) return condition();
  const conditionIsBoolean = typeof condition === 'boolean';
  if (conditionIsBoolean) return condition;
  const conditionIsDefined = typeof condition !== 'undefined';
  if (conditionIsDefined) return Boolean(condition);
  return true;
};

// Traits

const Attr = (el: HTMLElement, prop: string, val: string | number | undefined, condition?: Condition) =>
  check(condition, val) ? el.setAttribute(prop, String(val)) : el.removeAttribute(prop);

const Flex = (
  el: HTMLElement,
  flexDirection: 'row' | 'column',
  gap: number,
  justifyContent?: 'center' | 'start' | 'end',
  alignItems?: 'center' | 'start' | 'end',
  condition?: Condition,
) => {
  if (check(condition)) {
    el.style.display = 'flex';
    el.style.flexDirection = flexDirection ?? 'row';
    el.style.justifyContent = justifyContent ?? 'start';
    el.style.alignItems = alignItems ?? 'start';
    el.style.gap = gap ? `${gap}px` : '0px';
  }
};
const Focus = (el: HTMLElement, condition?: Condition) => (check(condition) ? el.focus : null);

const InnerHtml = (
  el: HTMLElement,
  html: () => HTMLElement | HTMLElement[] | DocumentFragment,
  condition?: Condition,
) => {
  const content = html();
  // TODO: Optimization
  // if ((<HTMLElement>content).outerHTML.trim() === el.innerHTML.trim()) return
  el.innerHTML = '';
  if (check(condition, html) && content) {
    if (Array.isArray(content)) {
      content.forEach((i) => el.appendChild(i));
    } else {
      el.appendChild(content);
    }
  }
};

const InnerText = (el: HTMLElement, text: () => string | number, condition?: Condition) => {
  const content = text();
  if (check(condition, text)) {
    el.innerText = '';
    el.innerText = String(content);
  }
};

const OnChange = (el: HTMLSelectElement, cb: (e: MouseEvent) => void) => el.addEventListener('change', cb);

const OnColorInput = (el: HTMLInputElement, cb: (val: string) => void) =>
  el.addEventListener('input', () => cb(el.value));

const OnClick = (el: HTMLElement, cb: (e: MouseEvent) => void, condition?: Condition) => {
  if (check(condition, cb)) {
    el.addEventListener('click', cb);
  }
};

// const OnClickBind = <T extends (...args: any) => any, A extends Parameters<T>>(el: HTMLElement, cb: T, amount: A) => {
//   el.addEventListener('click', () => cb(amount));
// };

const OnCreate = (el: HTMLElement, cb: (el: HTMLElement) => void) => cb(el);

const OnLoad = (el: HTMLElement, cb: (el: HTMLElement) => void) => window.addEventListener('load', () => cb(el));

const OnMouseOut = (el: HTMLElement, cb: (e: MouseEvent) => void) => el.addEventListener('mouseout', cb);

const OnMouseOver = (el: HTMLElement, cb: (e: MouseEvent) => void) => el.addEventListener('mouseover', cb);

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

const OnTextContentInput = (el: HTMLInputElement, cb: (val: string) => void) =>
  el.addEventListener('input', () => cb(el.innerText));

const OnWinResize = (el: HTMLElement, cb: ({ width, height }: { width: number; height: number }) => void) => {
  window.addEventListener('resize', () => {
    cb({ width: window.innerWidth, height: window.innerHeight });
  });
};

const PrintStyle = (
  el: HTMLElement | SVGElement,
  prop: keyof CSSStyleDeclaration,
  val: string | number | (() => string | number),
  condition?: Condition,
) => {
  if (check(condition, val)) {
    const id = 'print-style';
    const selector = id + '-' + globalThis.crypto.randomUUID();
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
  }
};

const Src = (el: HTMLImageElement, src: string) => (el.src = src);

const State =
  <T extends Types.TraitFunc>(atom: any, trait: T) =>
  (...props: Parameters<T>) => {
    atom.sub(() => trait.apply(null, props));
  };

const Style = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration,
  val: undefined | string | number | ((el: HTMLElement) => string | number),
  condition?: Condition,
) => {
  if (!check(condition, val)) return;
  const _style = <any>el.style;
  const _val = typeof val === 'function' ? val(el) : val;
  _style[prop] = _val;
  return _style;
};

const StyleOnHover = (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration,
  val: string | number,
  resetVal?: string | number,
  condition?: Condition,
) => {
  if (check(condition, val)) {
    const originalVal = resetVal ?? el.style[prop];
    el.addEventListener('mouseover', () => ((<any>el.style)[prop] = val));
    el.addEventListener('mouseout', () => ((<any>el.style)[prop] = originalVal));
  }
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
  applyStyle();
  window.addEventListener('resize', applyStyle);
};

const Styles = (
  el: HTMLElement,
  styles: [prop: keyof CSSStyleDeclaration, val: string | number][],
  condition?: Condition,
) => (check(condition, styles) ? styles.forEach(([prop, val]) => Style(el, prop, val, condition)) : null);

const SvgAttr = (el: SVGElement, prop: string, val: string | number) => el.setAttribute(prop, String(val));

const Value = (el: HTMLInputElement, value: string | (() => string), condition?: Condition) =>
  check(condition, value) ? (el.value = typeof value === 'string' ? value : value()) : 'blank';

export const Trait = {
  Attr,
  Flex,
  Focus,
  InnerHtml,
  InnerText,
  OnChange,
  OnColorInput,
  OnClick,
  OnCreate,
  OnLoad,
  OnMouseOut,
  OnMouseOver,
  OnResize,
  OnSubmit,
  OnTextInput,
  OnTextContentInput,
  OnWinResize,
  PrintStyle,
  Src,
  State,
  Style,
  Styles,
  StyleOnHover,
  StyleOnResize,
  StyleOnWinResize,
  SvgAttr,
  Value,
};
