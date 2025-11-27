import { Condition, extractConditions, extractStates, StateType } from '@/oem';

function useClassNameTrait(
  el: HTMLElement,
  className: string | (() => string),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(className, ...rest);
  const conditions = extractConditions(className, ...rest);
  const apply = () => {
    const _className = typeof className === 'function' ? className() : className;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.setAttribute('class', String(_className));
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}

export { useClassNameTrait };
