import { StateType } from '../types';

type UseStyleProps<T> = {
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<any> | StateType<any>[];
};

export function useStyle(): (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  condition?: boolean | (() => boolean) | ((state: StateType<any>) => boolean),
) => void;

export function useStyle(
  props?: UseStyleProps<any>,
): (
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  condition?: boolean | (() => boolean) | ((state: StateType<any>) => boolean),
) => void;

export function useStyle<T>(props?: UseStyleProps<T>) {
  const { mediaMinWidth = 0, mediaMaxWidth = Infinity, state = undefined } = props ?? {};
  return (...htmlProps: any) => {
    const [el, prop, val, condition = true] = htmlProps;

    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _val = typeof val === 'function' ? val() : val;
      const _condition = typeof condition === 'function' ? condition() : condition;
      if (_condition) {
        if (_val === undefined) {
          el.style.removeProperty(prop);
        } else {
          prop.startsWith('--') ? el.style.setProperty(prop, _val) : (el.style[prop as any] = _val as any);
        }
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
