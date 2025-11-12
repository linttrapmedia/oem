import { Condition, StateType } from '@/types';

export const useAttributeTrait = (
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = [val ?? '', ...rest].filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));
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
