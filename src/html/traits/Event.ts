import { StateType } from '../../types';

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
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.addEventListener(event, (e: E) => cb(e));
      } else {
        el.removeEventListener(event, (e: E) => cb(e));
      }
    };

    // handle state changes
    if (state) state.sub(apply);

    // apply immediately
    apply();
  };
}

// export const useEvent =
//   <E extends keyof GlobalEventHandlersEventMap>(evt: E) =>
//   (el: HTMLElement, cb: (evt: GlobalEventHandlersEventMap[E]) => any, condition?: (() => boolean) | boolean) => {
//     (typeof condition === 'function' ? condition() : condition ?? true) ? el.addEventListener(evt, cb) : null;
//   };
