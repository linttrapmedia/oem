import { Condition, extractConditions, extractStates, StateType } from '@/oem';

export const useAttributeTrait = (
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(val, ...rest);
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      if (_val === undefined) {
        el.removeAttribute(prop);
      } else {
        el.setAttribute(prop, String(_val));
      }
    } else {
      el.removeAttribute(prop);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
