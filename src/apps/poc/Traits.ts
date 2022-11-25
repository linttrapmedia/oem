import { Trait } from './Types';

export const Row = (el: HTMLElement) => (gap: `${string}px` | number) => {
  el.style.display = 'flex';
  el.style.flexDirection = 'row';
  el.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
};

export const InnerText = (el: HTMLElement) => (text: string | Function) => {
  const run = () => (el.innerText = typeof text === 'function' ? text() : text);
  if (typeof text === 'function' && text.prototype.atom) text.prototype.sub(run);
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

export const TraitRegistry: Record<string, Trait> = {};

export function CreateTrait<T extends string, F extends Trait>(
  trait: T,
  func: F,
): (...args: Parameters<ReturnType<F>>) => [T, ...Parameters<ReturnType<F>>] {
  (<any>TraitRegistry)[trait] = func;
  const res: any = (...args: any) => [trait, ...args];
  return res;
}

export const on_click = CreateTrait('onclick', OnClick);
export const inner_text = CreateTrait('inner_text', InnerText);
export const row = CreateTrait('row', Row);
export const style = CreateTrait('style', Style);
