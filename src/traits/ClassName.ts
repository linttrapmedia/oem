import { StateType } from '../types';

type UseClassNameConfig = {
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  state?: StateType<any> | StateType<any>[];
};

export function useClassName(): (
  el: HTMLElement,
  classList: undefined | string | (() => undefined | string),
  condition?: boolean | (() => boolean),
) => void;

export function useClassName(
  props?: UseClassNameConfig,
): (
  el: HTMLElement,
  classList: undefined | string | (() => undefined | string),
  condition?: boolean | (() => boolean),
) => void;

export function useClassName<T>(props?: UseClassNameConfig) {
  const { mediaMinWidth = 0, mediaMaxWidth = Infinity, state = null } = props ?? {};
  return (...htmlProps: any) => {
    const [el, classes, condition = true] = htmlProps;
    // application
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _classes = typeof classes === 'function' ? classes() : classes;
      const _condition = typeof condition === 'function' ? condition() : condition;
      if (_condition) {
        el.setAttribute('class', _classes);
      }
    };

    const stateIsArray = Array.isArray(state);
    if (state) stateIsArray ? state.forEach((s) => s.sub(apply)) : state.sub(apply);

    if (props?.mediaMinWidth || props?.mediaMaxWidth) {
      const resizeObserver = new ResizeObserver(apply);
      resizeObserver.observe(document.body);
    }

    apply();
  };
}
