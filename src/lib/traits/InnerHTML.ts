import { Condition, StateType } from '@/types';

type Props = [
  el: HTMLElement,
  children: () =>
    | string
    | number
    | HTMLElement
    | SVGElement
    | undefined
    | (string | number | HTMLElement | SVGElement | undefined)[],
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useInnerHTMLTrait = (...props: Props) => {
  const [el, children, conditions = true, states = []] = props;
  const apply = () => {
    const _children = children();
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet) {
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
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
