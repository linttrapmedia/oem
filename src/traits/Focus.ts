import { Condition, extractStatesAndConditions, StateType } from '@/oem';

type FocusProps = [
  el: HTMLElement,
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useFocusTrait = (el: HTMLElement, ...rest: (StateType<any> | Condition)[]) => {
  const { states, conditions } = extractStatesAndConditions(...rest);
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.focus();
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
