import { Condition, extractStatesAndConditions, StateType } from '@/oem';

export function useInputEventTrait(
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
  const { states, conditions } = extractStatesAndConditions(...rest);
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
