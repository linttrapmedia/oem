import { Condition, StateType } from '@/oem';

export const useFocusTrait = (
  el: HTMLElement,
  conditions: Condition[] = [],
  states: StateType<any>[] = [],
) => {
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.focus();
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
