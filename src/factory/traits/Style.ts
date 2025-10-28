import { Trait } from '@/trait/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  condition?: boolean | (() => boolean),
  ...states: StateType<any>[],
];

export const useStyle = Trait((...props: Props) => {
  const [el, prop, val, condition = true, ...states] = props;
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const _condition = typeof condition === 'function' ? condition() : condition;
    if (_condition) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
