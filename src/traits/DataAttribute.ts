import { Condition, extractConditions, extractStates, StateType } from '@/registry';

export const useDataAttributeTrait = (
  el: HTMLElement,
  name: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const attr = name.startsWith('data-') ? name : `data-${name}`;
  const key = attr.replace(/^data-/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      if (_val === undefined) {
        delete el.dataset[key];
      } else {
        el.dataset[key] = String(_val);
      }
    } else {
      delete el.dataset[key];
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
