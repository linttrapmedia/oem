import { Condition, extractConditions, extractStates, StateType } from '@/registry';

export function useStyleTrait(
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const isCustomProp = (prop as string).startsWith('--');
  const hasConditions = conditions.length > 0;
  let _savedValue: string | undefined;

  const _get = (): string =>
    isCustomProp
      ? el.style.getPropertyValue(prop as string)
      : ((el.style as any)[prop as any] as string) ?? '';

  const _set = (v: string | number | undefined) => {
    isCustomProp
      ? el.style.setProperty(prop as string, v as string)
      : (el.style[prop as any] = v as any);
  };

  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      if (hasConditions && _savedValue === undefined) {
        _savedValue = _get();
      }
      _set(_val);
    } else if (hasConditions && _savedValue !== undefined) {
      _set(_savedValue);
      _savedValue = undefined;
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
