import { Trait } from '@/trait/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  condition?: boolean | (() => boolean),
  ...states: StateType<any>[],
];

export const useAttribute = Trait((...props: Props) => {
  const [el, prop, val, condition = true, ...states] = props;
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const _condition = typeof condition === 'function' ? condition() : condition;
    if (_condition) {
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
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
