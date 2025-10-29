import { Trait } from '@/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  event: keyof GlobalEventHandlersEventMap,
  cb: (evt?: GlobalEventHandlersEventMap[keyof GlobalEventHandlersEventMap]) => void,
  condition?: (() => boolean) | boolean | (() => boolean),
  ...states: StateType<any>[],
];

export const useEventTrait = Trait((...props: Props) => {
  const [el, evt, cb, condition = true, ...states] = props;
  let listenerAttached = false;

  const apply = () => {
    const _condition = typeof condition === 'function' ? condition() : condition;
    if (_condition && !listenerAttached) {
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
});
