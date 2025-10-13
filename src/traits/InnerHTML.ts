import { StateType } from '../types';

type UseInnerHTMLProps<T> = {
  state: StateType<T>;
};

type Children =
  | string
  | number
  | HTMLElement
  | SVGElement
  | undefined
  | (string | number | HTMLElement | SVGElement | undefined)[];

export function useInnerHTML<T>({
  state,
}: UseInnerHTMLProps<T>): (
  el: HTMLElement,
  children: (state: T) => Children,
  condition?: ((state: T) => boolean) | boolean,
) => void;

export function useInnerHTML(): (
  el: HTMLElement,
  children: () => Children,
  condition?: (() => boolean) | boolean,
) => void;

export function useInnerHTML<T>(props?: UseInnerHTMLProps<T>) {
  const { state } = props ?? {};
  return (...htmlProps: any) => {
    const [el, children, condition] = htmlProps;
    const apply = () => {
      const _children = state ? children(state.get()) : children();
      const _condition =
        typeof condition === 'function' ? condition(state ? state.get() : undefined) : condition ?? true;
      if (_condition) {
        el.innerHTML = '';
        if (_children !== undefined) {
          if (Array.isArray(_children)) {
            _children
              .filter((c) => c)
              .forEach((c) => {
                if (c instanceof HTMLElement || c instanceof SVGElement) el.appendChild(c);
                else el.appendChild(document.createTextNode(String(c)));
              });
          } else if (_children instanceof HTMLElement || _children instanceof SVGElement) {
            el.appendChild(_children);
          } else {
            el.innerHTML = String(_children);
          }
        }
      }
    };
    if (state) state.sub(apply);
    apply();
  };
}
