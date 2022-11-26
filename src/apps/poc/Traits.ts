import { State, Trait } from './Types';

export const Row = (el: HTMLElement) => (gap: `${string}px` | number) => {
  el.style.display = 'flex';
  el.style.flexDirection = 'row';
  el.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
};

export const InnerHtml = (el: HTMLElement) => (html: () => Node, state?: State<any>) => {
  const run = () => ((el.innerHTML = ''), el.appendChild(html()));
  if (html?.prototype?.atom) html.prototype.sub(run);
  if (state && state.sub) state.sub(run);
  run();
};

export const InnerText = (el: HTMLElement) => (text: () => string, state?: State<any>) => {
  const run = () => (el.innerText = text());
  if (text?.prototype?.atom) text.prototype.sub(run);
  if (state && state.sub) state.sub(run);
  run();
};

export const OnClick =
  (el: HTMLElement) =>
  (cb: (...args: any[]) => void, ...args: any[]) => {
    el.addEventListener('click', () => cb(...args));
  };

export const Style =
  (el: HTMLElement) =>
  <P extends keyof CSSStyleDeclaration>(prop: P, val: CSSStyleDeclaration[P]) => {
    const _style = <any>el.style;
    const _val = val;
    _style[prop] = _val;
    return _style;
  };

export const StyleFontSize = (el: HTMLElement) => (fontSize: number | `${number}px` | `${number}rem`) => {
  const _val = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
  return Style(el)('fontSize', _val);
};

export const StylePadding = (el: HTMLElement) => (padding: number | `${number}px` | `${number}rem`) => {
  const _val = typeof padding === 'number' ? `${padding}px` : padding;
  return Style(el)('padding', _val);
};

export const Styles = (el: HTMLElement) => (styles: any[]) => {
  styles.forEach(([_, prop, val]: any) => {
    const _style = <any>el.style;
    const _val = val;
    _style[prop] = _val;
    return _style;
  });
};

export const TraitRegistry: Record<string, Trait> = {};

export function CreateTrait<T extends string, F extends Trait>(
  trait: T,
  func: F,
): (...args: Parameters<ReturnType<F>>) => [T, ...Parameters<ReturnType<F>>] {
  (<any>TraitRegistry)[trait] = func;
  const res: any = (...args: any) => [trait, ...args];
  return res;
}

export const useTrait = () => ({
  font_size: CreateTrait('fontSize', StyleFontSize),
  padding: CreateTrait('padding', StylePadding),
  inner_html: CreateTrait('inner_html', InnerHtml),
  inner_text: CreateTrait('inner_text', InnerText),
  on_click: CreateTrait('onclick', OnClick),
  row: CreateTrait('row', Row),
  style: CreateTrait('style', Style),
  styles: CreateTrait('styles', Styles),
});
