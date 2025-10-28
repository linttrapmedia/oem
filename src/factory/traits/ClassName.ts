import { Trait } from '@/trait/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  className: string | (() => string),
  condition?: boolean | (() => boolean),
  ...states: StateType<any>[],
];

export const useClassName = Trait((...props: Props) => {
  const [el, className, condition = true, ...states] = props;
  const apply = () => {
    const _className = typeof className === 'function' ? className() : className;
    const _condition = typeof condition === 'function' ? condition() : condition;
    if (_condition) el.setAttribute('class', String(_className));
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
