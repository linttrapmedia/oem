import { Condition, StateType } from '@/types';

type InputValueProps = [
  el: HTMLInputElement | HTMLTextAreaElement,
  value: (() => string | number | undefined) | (string | number | undefined),
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useInputValueTrait = (...props: InputValueProps) => {
  const [el, val, conditions = true, states = []] = props;
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) el.value = _val as string;
  };
  apply();
  const _states = Array.isArray(states) ? states : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
