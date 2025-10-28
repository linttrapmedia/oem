import { Trait } from '@/trait/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  children: () =>
    | string
    | number
    | HTMLElement
    | SVGElement
    | undefined
    | (string | number | HTMLElement | SVGElement | undefined)[],
  condition?: (() => boolean) | boolean,
  ...states: StateType<any>[],
];

export const useInnerHTML = Trait((...props: Props) => {
  const [el, children, condition = true, ...states] = props;
  const apply = () => {
    const _children = children();
    const _condition = typeof condition === 'function' ? condition() : condition;
    if (_condition) {
      el.innerHTML = '';
      if (_children !== undefined) {
        if (Array.isArray(_children)) {
          _children
            .filter((c) => c)
            .forEach((c) => {
              if (c instanceof HTMLElement || c instanceof SVGElement) el.appendChild(c);
              else el.appendChild(document.createTextNode(String(c)));
            });
        } else if (_children instanceof HTMLElement || _children instanceof SVGElement) {
          el.appendChild(_children);
        } else {
          el.innerHTML = String(_children);
        }
      }
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
