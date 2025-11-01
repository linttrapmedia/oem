import { Trait } from '@/Trait';
import { Condition, StateType } from '@/types';

type Props = [
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  conditions?: Condition | Condition[],
  ...states: StateType<any>[],
];

export const useStyleTrait = Trait((...props: Props) => {
  const [el, prop, val, conditions = true, ...states] = props;
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.some((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
