import { StateType } from '../types';

type UseInnerHTMLConfig = {
  state?: StateType<any> | StateType<any>[];
};

type Children =
  | string
  | number
  | HTMLElement
  | SVGElement
  | undefined
  | (string | number | HTMLElement | SVGElement | undefined)[];

export function useInnerHTML(): (
  el: HTMLElement,
  children: () => Children,
  condition?: (() => boolean) | boolean,
) => void;

export function useInnerHTML(
  props?: UseInnerHTMLConfig,
): (el: HTMLElement, children: () => Children, condition?: (() => boolean) | boolean) => void;

export function useInnerHTML(props?: UseInnerHTMLConfig) {
  const { state } = props ?? {};
  return (...htmlProps: any) => {
    const [el, children, condition = true] = htmlProps;
    const apply = () => {
      const _children = children();
      const _condition = typeof condition === 'function' ? condition() : condition;
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
    const stateIsArray = Array.isArray(state);
    if (state) stateIsArray ? state.forEach((s) => s.sub(apply)) : state.sub(apply);
    apply();
  };
}
