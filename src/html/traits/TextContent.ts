import { StateType } from '../../types';

type UseTextContentProps<T> = {
  state: StateType<T>;
};

export function useTextContent<T>({
  state,
}: UseTextContentProps<T>): (
  el: HTMLElement,
  children: ((state: T) => string | number) | string | number,
  condition?: ((state: T) => boolean) | boolean,
) => void;

export function useTextContent(): (
  el: HTMLElement,
  children: (() => string | number) | string | number,
  condition?: (() => boolean) | boolean,
) => void;

export function useTextContent<T>(props?: UseTextContentProps<T>) {
  const { state } = props ?? {};
  return (...htmlProps: any) => {
    const [el, children, condition] = htmlProps;
    const apply = () => {
      const _children = typeof children === 'function' ? children(state ? state.get() : undefined) : children;
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.textContent = String(_children);
      }
    };
    if (state) state.sub(apply);
    apply();
  };
}
