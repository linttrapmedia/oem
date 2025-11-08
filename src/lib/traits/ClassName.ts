import { Condition, StateType } from '@/types';

export const useClassNameTrait = (
  ...props: [
    el: HTMLElement,
    className: string | (() => string),
    conditions?: Condition | Condition[],
    states?: StateType<any> | StateType<any>[],
  ]
) => {
  const [el, className, conditions = true, states = []] = props;
  const apply = () => {
    const _className = typeof className === 'function' ? className() : className;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) =>
      typeof condition === 'function' ? condition() : condition,
    );
    if (isConditionMet) el.setAttribute('class', String(_className));
  };
  apply();
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
