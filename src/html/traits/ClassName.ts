import { StateType } from 'src/types';

export const useClassName =
  (state?: StateType<any>) =>
  (el: HTMLElement, className: string | (() => string), condition?: boolean | (() => boolean)) => {
    const apply = () => {
      const _className = String(typeof className === 'function' ? className() : className);
      (typeof condition === 'function' ? condition() : condition ?? true) ? (el.className = _className) : null;
    };
    if (state) state.sub(apply);
    apply();
  };
