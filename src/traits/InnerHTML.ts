import { Condition, StateType } from '@/oem';

type Child = string | number | HTMLElement | SVGElement | undefined | unknown;

export function useInnerHTMLTrait(
  el: HTMLElement,
  children: Child | Child[] | (() => Child | Child[]),
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const isStateTest = (i: any) => typeof i === 'function' && i.type === '$test';
  const states = [children, ...rest].filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item) || isStateTest(item)) as Condition[];
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
