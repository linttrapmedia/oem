import { Condition, StateType } from '@/types';

type Props = [
  el: HTMLElement,
  className: string | (() => string),
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useClassNameTrait = (...props: Props) => {
  const [el, className, conditions = true, states = []] = props;
  const apply = () => {
    const _className = typeof className === 'function' ? className() : className;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.some((condition) => (typeof condition === 'function' ? condition() : condition));
    if (isConditionMet) el.setAttribute('class', String(_className));
  };
  apply();
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
