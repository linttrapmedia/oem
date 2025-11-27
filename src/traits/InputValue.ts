import { Condition, extractConditions, extractStates, StateType } from '@/oem';

export function useInputValueTrait(
  el: HTMLInputElement | HTMLTextAreaElement,
  value: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(value, ...rest);
  const conditions = extractConditions(value, ...rest);
  const apply = () => {
    const _val = typeof value === 'function' ? value() : value;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.value = _val as string;
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
