import { StateType } from '../../types';

type UseInnerHTMLProps = {
  state?: StateType<any> | null;
};

export const useInnerHTML =
  ({ state }: UseInnerHTMLProps = {}) =>
  (
    el: HTMLElement,
    children: () => string | number | HTMLElement | (string | number | HTMLElement)[],
    condition?: ((...args: any) => boolean) | boolean,
  ) => {
    const apply = () => {
      el.innerHTML = '';
      const _children = children();
      if (typeof condition === 'function' ? condition() : condition ?? true) {
        el.innerHTML = '';
        if (Array.isArray(_children)) {
          _children.forEach((c) => {
            if (c instanceof HTMLElement) el.appendChild(c);
            else el.appendChild(document.createTextNode(String(c)));
          });
        } else if (_children instanceof HTMLElement) {
          el.appendChild(_children);
        } else {
          el.appendChild(document.createTextNode(String(_children)));
        }
      }
    };
    if (state) state.sub(apply);
    apply();
  };
