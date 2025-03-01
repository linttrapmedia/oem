import { StateType } from '../../types';

type UseClassNameProps<T> = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  method?: 'classList' | 'className';
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
      const classList = el.getAttribute('class')?.split(' ') ?? [];
      if (_condition) {
        classList.push(_className);
        el.setAttribute('class', classList.join(' '));
      } else {
        const index = classList.indexOf(_className);
        if (index > -1) classList.splice(index, 1);
        el.setAttribute('class', classList.join(' '));
      }
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
