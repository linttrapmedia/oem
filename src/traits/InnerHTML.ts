import { Condition, extractConditions, extractStates, StateType } from '@/oem';

type Child = string | number | HTMLElement | SVGElement | undefined | unknown;

export function useInnerHTMLTrait(
  el: HTMLElement,
  children: Child | Child[] | (() => Child | Child[]),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _children = typeof children === 'function' ? children() : children;
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
