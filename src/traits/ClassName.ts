import { Condition, StateType } from '@/oem';

function useClassNameTrait(
  el: HTMLElement,
  className: string | (() => string),
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const isTestCond = (i: any) => typeof i === 'function' && i.type === '$test';
  const states = [className, ...rest].filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item) || isTestCond(item));
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
