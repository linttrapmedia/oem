import { Condition, StateType } from '@/oem';

export function useTextContentTrait(
  el: HTMLElement,
  children: (() => string | number) | string | number,
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = rest.filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));
  const apply = () => {
    const _children = typeof children === 'function' ? children() : children;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      el.textContent = String(_children);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
