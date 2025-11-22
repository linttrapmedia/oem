import { Condition, StateType } from '@/oem';

export function useInputEvent(
  el: HTMLElement,
  evt:
    | 'input'
    | 'change'
    | 'keyup'
    | 'keydown'
    | 'keypress'
    | 'beforeinput'
    | 'paste'
    | 'cut'
    | 'compositionstart'
    | 'compositionupdate'
    | 'compositionend',
  setter: (val: any) => void,
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = rest.filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));
  const handler: any = (e: any) => setter((e as any).target.value);
  let listenerAttached = false;

  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies && !listenerAttached) {
      el.addEventListener(evt, handler);
      listenerAttached = true;
    } else {
      el.removeEventListener(evt, handler);
      listenerAttached = false;
    }
  };

  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => {
    el.removeEventListener(evt, handler);
    unsubs.forEach((unsub) => unsub());
  };
}
