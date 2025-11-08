import { Condition, StateType } from '@/types';

export const useTextContentTrait = (
  ...props: [
    el: HTMLElement,
    children: (() => string | number) | string | number,
    conditions?: Condition | Condition[],
    states?: StateType<any> | StateType<any>[],
  ]
) => {
  const [el, children, conditions = true, states = []] = props;
  const apply = () => {
    const _children = typeof children === 'function' ? children() : children;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) {
      el.textContent = String(_children);
    }
  };
  apply();
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
