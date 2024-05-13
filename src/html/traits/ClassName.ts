import { StateType } from '../../types';

type UseClassNameProps<T> = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<T> | null;
};

export function useClassName(
  props?: UseClassNameProps<any>,
): (el: HTMLElement, className: string | (() => string), condition?: boolean | (() => boolean)) => void;

export function useClassName<T>(
  props?: UseClassNameProps<T>,
): (el: HTMLElement, className: string | ((state: T) => string), condition?: boolean | ((state: T) => boolean)) => void;

export function useClassName<T>(props?: UseClassNameProps<T>) {
  const {
    event = null,
    eventElement = window,
    invokeImmediately = true,
    mediaMinWidth = 0,
    mediaMaxWidth = Infinity,
    state = null,
  } = props ?? {};
  return (...htmlProps: any) => {
    const [el, className, condition] = htmlProps;
    // application
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _className = typeof className === 'function' ? className(state ? state.get() : undefined) : className;
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) el.setAttribute('class', _className);
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
