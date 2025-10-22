import { StateType } from '../types';

type UseTextContentProps<T> = {
  state?: StateType<any> | StateType<any>[];
};

export function useTextContent(): (
  el: HTMLElement,
  children: (() => string | number) | string | number,
  condition?: (() => boolean) | boolean,
) => void;

export function useTextContent(
  props?: UseTextContentProps<any>,
): (
  el: HTMLElement,
  children: (() => string | number) | string | number,
  condition?: (() => boolean) | boolean,
) => void;

export function useTextContent<T>(props?: UseTextContentProps<T>) {
  const { state } = props ?? {};
  return (...htmlProps: any) => {
    const [el, children, condition] = htmlProps;

    const apply = () => {
      const _children = typeof children === 'function' ? children() : children;
      const _condition = typeof condition === 'function' ? condition() : condition ?? true;
      if (_condition) {
        el.textContent = String(_children);
      }
    };

    const stateIsArray = Array.isArray(state);
    if (state) stateIsArray ? state.forEach((s) => s.sub(apply)) : state.sub(apply);

    apply();
  };
}
