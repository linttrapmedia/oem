import { StateType } from 'src/typings';

export const useAttribute =
  (state?: StateType<any>) =>
  (
    el: HTMLElement,
    prop: string,
    val: (() => string | number) | (string | number),
    condition?: boolean | (() => boolean),
  ) => {
    const apply = () => {
      const _val = String(typeof val === 'function' ? val() : val);
      (typeof condition === 'function' ? condition() : condition ?? true) ? el.setAttribute(prop, _val) : null;
    };
    if (state) state.sub(apply);
    apply();
  };
