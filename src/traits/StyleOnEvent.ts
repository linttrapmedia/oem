import { Condition, extractConditions } from '@/oem';

export function useStyleOnEventTrait(
  el: HTMLElement,
  evt: keyof HTMLElementEventMap,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: Condition[]
) {
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  el.addEventListener(evt, apply);
  return () => el.removeEventListener(evt, apply);
}
