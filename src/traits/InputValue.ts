import { Condition, StateType } from '@/oem';

export function useInputValueTrait(
  el: HTMLInputElement | HTMLTextAreaElement,
  value: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const isTestCond = (i: any) => typeof i === 'function' && i.type === '$test';
  const states = rest.filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item) || isTestCond(item));
  const apply = () => {
    const _val = typeof value === 'function' ? value() : value;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.value = _val as string;
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
