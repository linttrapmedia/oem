import { Trait } from '@/Trait';
import { Condition, StateType } from '@/types';

type Props = [
  el: HTMLElement,
  children: (() => string | number) | string | number,
  conditions?: Condition | Condition[],
  ...states: StateType<any>[],
];

export const useTextContentTrait = Trait((...props: Props) => {
  const [el, children, conditions = true, ...states] = props;
  const apply = () => {
    const _children = typeof children === 'function' ? children() : children;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.some((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) {
      el.textContent = String(_children);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
