import { StateType } from '../types';

type UseEventConfig<E extends keyof GlobalEventHandlersEventMap> = {
  event: E;
  state?: StateType<any> | StateType<any>[];
};

const eventMap = new WeakMap<HTMLElement, Map<string, ((evt: any) => void) | null>>();

export function useEvent<E extends keyof GlobalEventHandlersEventMap>(): (
  el: HTMLElement,
  cb: (evt?: GlobalEventHandlersEventMap[E]) => void,
  condition?: (() => boolean) | boolean | (() => boolean),
) => void;

export function useEvent<E extends keyof GlobalEventHandlersEventMap>(
  props?: UseEventConfig<E>,
): (
  el: HTMLElement,
  cb: (evt?: GlobalEventHandlersEventMap[E]) => void,
  condition?: (() => boolean) | boolean | (() => boolean),
) => void;

export function useEvent<T, E extends keyof GlobalEventHandlersEventMap>(props?: UseEventConfig<E>) {
  const { state, event = 'click' } = props ?? {};

  return (...htmlProps: any) => {
    const [el, cb, condition = true] = htmlProps;
    if (!eventMap.has(el)) eventMap.set(el, new Map());
    const listenerMap = eventMap.get(el)!;

    const apply = () => {
      const _condition = typeof condition === 'function' ? condition() : condition;

      let listener = listenerMap.get(event) ?? null;
      if (listener) {
        el.removeEventListener(event, listener as EventListener);
        listenerMap.set(event, null); // Clear the entry while we re-evaluate
        listener = null;
      }

      if (_condition) {
        const newListener = (e: Event) => cb(e as GlobalEventHandlersEventMap[E]);
        el.addEventListener(event, newListener as EventListener);
        listenerMap.set(event, newListener);
        listener = newListener;
      }
    };

    const stateIsArray = Array.isArray(state);
    if (state) stateIsArray ? state.forEach((s) => s.sub(apply)) : state.sub(apply);
    apply();
  };
}
