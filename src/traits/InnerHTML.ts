import { Condition, StateType } from '@/types';

export function useInnerHTMLTrait(
  el: HTMLElement,
  children: () =>
    | string
    | number
    | HTMLElement
    | SVGElement
    | undefined
    | (string | number | HTMLElement | SVGElement | undefined)[],
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = [children, ...rest].filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));
  const apply = () => {
    const _children = children();
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
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
}
