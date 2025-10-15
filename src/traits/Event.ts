import { StateType } from '../types';

type UseEventProps<T, E extends keyof GlobalEventHandlersEventMap> = {
  event: E;
  state?: StateType<T>;
};

export function useEvent<E extends keyof GlobalEventHandlersEventMap>(
  props?: UseEventProps<any, E>,
): (
  el: HTMLElement,
  cb: (evt?: GlobalEventHandlersEventMap[E]) => void,
  condition?: (() => boolean) | boolean | (() => boolean),
) => void;

export function useEvent<T, E extends keyof GlobalEventHandlersEventMap>(
  props?: UseEventProps<T, E>,
): (
  el: HTMLElement,
  cb: (evt?: GlobalEventHandlersEventMap[E]) => void,
  condition?: ((state: T) => boolean) | boolean | (() => boolean),
) => void;

export function useEvent<T, E extends keyof GlobalEventHandlersEventMap>(props?: UseEventProps<T, E>) {
  const { state, event } = props ?? {};
  return (...htmlProps: any) => {
    const [el, cb, condition] = htmlProps;
    const apply = () => {
      const _cb = (e: E) => cb(e);
      const _condition =
        typeof condition === 'function' ? condition(state ? state.$val() : undefined) : condition ?? true;
      if (_condition) {
        el.addEventListener(event, _cb);
      } else {
        el.removeEventListener(event, _cb);
      }
    };

    // handle state changes
    if (state) state.sub(apply);

    // apply immediately
    apply();
  };
}
