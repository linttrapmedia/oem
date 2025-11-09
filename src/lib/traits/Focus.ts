import { Condition, StateType } from '@/types';

type FocusProps = [el: HTMLElement, conditions?: Condition | Condition[], states?: StateType<any> | StateType<any>[]];

export const useFocusTrait = (...props: FocusProps) => {
  const [el, conditions = true, states = []] = props;
  const apply = () => {
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) el.focus();
  };
  apply();
  const _states = Array.isArray(states) ? states : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
