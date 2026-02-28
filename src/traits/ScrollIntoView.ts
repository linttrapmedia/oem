import { Condition, extractConditions, extractStates, StateType } from '@/registry';

export const useScrollIntoViewTrait = (
  el: HTMLElement,
  options?: ScrollIntoViewOptions,
  ...rest: (StateType<any> | Condition)[]
) => {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.scrollIntoView(options);
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
