import { Condition, StateType } from '@/types';

type FocusProps = [el: HTMLElement, conditions?: Condition | Condition[], states?: StateType<any> | StateType<any>[]];

export const useFocusTrait = (el: HTMLElement, ...rest: (StateType<any> | Condition)[]) => {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = rest.filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) el.focus();
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
