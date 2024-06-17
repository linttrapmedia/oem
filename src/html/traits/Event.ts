import { StateType } from '../../types';

type UseEventProps<T> = {
  event: keyof GlobalEventHandlersEventMap;
  state?: StateType<T>;
};

export function useEvent(
  props?: UseEventProps<any>,
): (
  el: HTMLElement,
  cb: (evt?: GlobalEventHandlersEventMap) => void,
  condition?: (() => boolean) | boolean | (() => boolean),
) => void;

export function useEvent<T>(
  props?: UseEventProps<T>,
): (
  el: HTMLElement,
  cb: (evt?: GlobalEventHandlersEventMap) => void,
  condition?: ((state: T) => boolean) | boolean | (() => boolean),
) => void;

export function useEvent<T>(props?: UseEventProps<T>) {
  const { state, event } = props ?? {};
  return (...htmlProps: any) => {
    const [el, cb, condition] = htmlProps;
    const apply = () => {
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.addEventListener(event, () => {
          state ? cb(state.get()) : cb();
        });
      } else {
        el.removeEventListener(event, () => {
          state ? cb(state.get()) : cb();
        });
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
