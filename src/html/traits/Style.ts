import { StateType } from '../../types';

type UseStyleProps<T> = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<T>;
};

export function useStyle(
  props?: UseStyleProps<any>,
): (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number) | (string | number),
  condition?: boolean | (() => boolean),
) => void;

export function useStyle<T>(
  props?: UseStyleProps<T>,
): (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: ((state: T) => string | number) | (string | number),
  condition?: boolean | ((state: T) => boolean),
) => void;

export function useStyle<T>(props?: UseStyleProps<T>) {
  const {
    event = null,
    eventElement = window,
    invokeImmediately = true,
    mediaMinWidth = 0,
    mediaMaxWidth = Infinity,
    state = undefined,
  } = props ?? {};
  return (...htmlProps: any) => {
    const [el, prop, val, condition] = htmlProps;
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _val = String(typeof val === 'function' ? val(state ? state.get() : undefined) : val);
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      _condition
        ? prop.startsWith('--')
          ? el.style.setProperty(prop, _val)
          : (el.style[prop as any] = _val as any)
        : null;
    };

    // handle state changes
    if (state) state.sub(apply);

    // handle resize changes
    window.addEventListener('resize', apply);

    // handle event changes
    if (event) (el ?? eventElement).addEventListener(event, apply);

    // apply immediately
    if (invokeImmediately && !event) apply();
  };
}
