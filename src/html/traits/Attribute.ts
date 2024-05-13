import { StateType } from '../../types';

type UseAttributeProps<T> = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  hideOnFalse?: boolean;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  state?: StateType<T>;
};

export function useAttribute(
  props?: UseAttributeProps<any>,
): (
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean) | (string | number | boolean),
  condition?: boolean | (() => boolean),
) => void;

export function useAttribute<T>(
  props?: UseAttributeProps<T>,
): (
  el: HTMLElement,
  prop: string,
  val: ((state: T) => string | number | boolean) | (string | number | boolean),
  condition?: ((state: T) => boolean) | boolean,
) => void;

export function useAttribute<T>(props?: UseAttributeProps<T>) {
  const {
    event = null,
    eventElement = window,
    hideOnFalse = true,
    invokeImmediately = true,
    mediaMinWidth = 0,
    mediaMaxWidth = Infinity,
    state = undefined,
  } = props ?? {};
  return (...htmlProps: any) => {
    const [el, prop, val, condition] = htmlProps;
    // application
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _val = state && typeof val === 'function' ? val(state.get()) : val;
      const _isBool = String(_val) === 'true' || String(_val) === 'false';
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_isBool && hideOnFalse && String(_val) === 'false') return el.removeAttribute(prop);
      if (_isBool && _condition === false) return el.removeAttribute(prop);
      if (_condition === false) return;
      el.setAttribute(prop, String(_val));
    };

    // handle state changes
    if (state) state.sub(apply);

    // handle event changes
    if (event) (el ?? eventElement).addEventListener(event, apply);

    // handle breakpoint changes
    window.addEventListener('resize', apply);

    // apply immediately
    if (invokeImmediately) apply();
  };
}
