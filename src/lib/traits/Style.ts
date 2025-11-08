import { Condition, StateType } from '@/types';

export const useStyleTrait = (
  ...props: [
    el: HTMLElement,
    prop: keyof CSSStyleDeclaration | `--${string}`,
    val: (() => string | number | undefined) | (string | number | undefined),
    conditions?: Condition | Condition[],
    states?: StateType<any> | StateType<any>[],
  ]
) => {
  const [el, prop, val, conditions = true, states = []] = props;
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  apply();
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
