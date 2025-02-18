import { StateType } from '../../types';

type UseTextContentProps<T> = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  state?: StateType<T>;
};

export function useTextContent<T>(
  props?: UseTextContentProps<T>,
): (
  el: HTMLElement,
  children: ((state: T) => string | number) | string | number,
  condition?: ((state: T) => boolean) | boolean,
) => void;

export function useTextContent(
  props?: UseTextContentProps<any>,
): (
  el: HTMLElement,
  children: (() => string | number) | string | number,
  condition?: (() => boolean) | boolean,
) => void;

export function useTextContent<T>(props?: UseTextContentProps<T>) {
  const { event, eventElement, state } = props ?? {};
  return (...htmlProps: any) => {
    const [el, children, condition] = htmlProps;

    const apply = () => {
      const _children = typeof children === 'function' ? children(state ? state.get() : undefined) : children;
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.textContent = '';
        el.textContent = String(_children);
      }
    };
    // handle state changes
    if (state) state.sub(apply);

    // handle resize changes
    window.addEventListener('resize', apply);

    // handle event changes
    if (event) (el ?? eventElement).addEventListener(event, apply);

    // apply immediately
    apply();
  };
}
