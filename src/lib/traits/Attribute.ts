import { Condition, StateType } from '@/types';

type Props = [
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useAttributeTrait = (...props: Props) => {
  const [el, prop, val, conditions = true, states = []] = props;
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) {
      if (_val === undefined) {
        el.removeAttribute(prop);
      } else {
        el.setAttribute(prop, String(_val));
      }
    } else {
      el.removeAttribute(prop);
    }
  };
  apply();
  const _states = Array.isArray(states) ? states : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
