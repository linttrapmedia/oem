import { StateType } from 'src/types';

export const useStyle =
  (state?: StateType<any>) =>
  (
    el: HTMLElement,
    prop: keyof CSSStyleDeclaration,
    val: ((...args: any) => string | number) | (string | number),
    condition?: boolean | ((...args: any) => boolean),
  ) => {
    const apply = () => {
      const _val = String(typeof val === 'function' ? val() : val);
      (typeof condition === 'function' ? condition() : condition ?? true)
        ? (el.style[prop as any] = _val as any)
        : null;
    };
    if (state) state.sub(apply);
    apply();
  };
