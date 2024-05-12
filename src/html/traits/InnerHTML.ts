import { StateType } from '../../types';

type UseInnerHTMLProps<T> = {
  state: StateType<T>;
};

export function useInnerHTML<T>({
  state,
}: UseInnerHTMLProps<T>): (
  el: HTMLElement,
  children: (state: T) => string | number | HTMLElement | (string | number | HTMLElement)[],
  condition?: ((state: T) => boolean) | boolean,
) => void;

export function useInnerHTML(): (
  el: HTMLElement,
  children: () => string | number | HTMLElement | (string | number | HTMLElement)[],
  condition?: (() => boolean) | boolean,
) => void;

export function useInnerHTML<T>(props?: UseInnerHTMLProps<T>) {
  const { state } = props ?? {};
  return (...htmlProps: any) => {
    const [el, children, condition] = htmlProps;
    const apply = () => {
      el.innerHTML = '';
      const _children = state ? children(state.get()) : children();
      const _condition = state
        ? typeof condition === 'function'
          ? condition(state.get())
          : condition ?? true
        : condition ?? true;
      if (_condition) {
        el.innerHTML = '';
        if (Array.isArray(_children)) {
          _children.forEach((c) => {
            if (c instanceof HTMLElement) el.appendChild(c);
            else el.appendChild(document.createTextNode(String(c)));
          });
        } else if (_children instanceof HTMLElement) {
          el.appendChild(_children);
        } else {
          el.innerHTML = String(_children);
        }
      }
    };
    if (state) state.sub(apply);
    apply();
  };
}
