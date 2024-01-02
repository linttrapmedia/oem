import { StateType } from '@oem/types';

export const useText =
  (state?: StateType<any>) =>
  (
    el: HTMLElement,
    text: ((...args: any) => string | number) | (string | number),
    condition?: ((...args: any) => boolean) | boolean,
  ) => {
    const apply = () => {
      const _text = String(typeof text === 'function' ? text() : text);
      (typeof condition === 'function' ? condition() : condition ?? true) ? (el.textContent = _text) : null;
    };
    if (state) state.sub(apply);
    apply();
  };
