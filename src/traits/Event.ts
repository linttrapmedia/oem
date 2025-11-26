import { Condition, extractStatesAndConditions, StateType } from '@/oem';

export function useEventTrait(
  el: HTMLElement,
  evt: keyof GlobalEventHandlersEventMap,
  cb: (evt?: GlobalEventHandlersEventMap[keyof GlobalEventHandlersEventMap]) => void,
  ...rest: (StateType<any> | Condition)[]
) {
  const { states, conditions } = extractStatesAndConditions(...rest);
  let listenerAttached = false;

  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies && !listenerAttached) {
      el.addEventListener(evt, cb);
      listenerAttached = true;
    } else {
      el.removeEventListener(evt, cb);
      listenerAttached = false;
    }
  };

  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => {
    el.removeEventListener(evt, cb);
    unsubs.forEach((unsub) => unsub());
  };
}
