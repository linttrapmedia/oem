import { Condition, StateType } from '@/types';

export const useEventTrait = (
  ...props: [
    el: HTMLElement,
    event: keyof GlobalEventHandlersEventMap,
    cb: (evt?: GlobalEventHandlersEventMap[keyof GlobalEventHandlersEventMap]) => void,
    conditions?: Condition | Condition[],
    states?: StateType<any> | StateType<any>[],
  ]
) => {
  const [el, evt, cb, conditions = true, states = []] = props;
  let listenerAttached = false;

  const apply = () => {
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (isConditionMet && !listenerAttached) {
      el.addEventListener(evt, cb);
      listenerAttached = true;
    } else {
      el.removeEventListener(evt, cb);
      listenerAttached = false;
    }
  };

  apply();
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => {
    el.removeEventListener(evt, cb);
    unsubs.forEach((unsub) => unsub());
  };
};
