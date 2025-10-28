import { Trait } from '@/trait/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  children: (() => string | number) | string | number,
  condition?: (() => boolean) | boolean,
  ...states: StateType<any>[],
];

export const useTextContent = Trait((...props: Props) => {
  const [el, children, condition, ...states] = props;
  const apply = () => {
    const _children = typeof children === 'function' ? children() : children;
    const _condition = typeof condition === 'function' ? condition() : condition ?? true;
    if (_condition) {
      el.textContent = String(_children);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
