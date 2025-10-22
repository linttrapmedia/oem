import { StateType } from '../types';

type UseAttributeConfig = {
  state?: StateType<any> | StateType<any>[];
};

export function useAttribute(): (
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  condition?: boolean | (() => boolean),
) => void;

export function useAttribute(
  props?: UseAttributeConfig,
): (
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  condition?: boolean | (() => boolean),
) => void;

export function useAttribute<T>(props?: UseAttributeConfig) {
  const { state = undefined } = props ?? {};
  return (...htmlProps: any) => {
    const [el, prop, val, condition = true] = htmlProps;

    // application
    const apply = () => {
      const _val = typeof val === 'function' ? val() : val;
      const _condition = typeof condition === 'function' ? condition() : condition;
      if (_condition) {
        el.setAttribute(prop, String(_val));
        if (_val === undefined) {
          el.removeAttribute(prop);
        } else {
          el.setAttribute(prop, String(_val));
        }
      }
    };

    const stateIsArray = Array.isArray(state);
    if (state) stateIsArray ? state.forEach((s) => s.sub(apply)) : state.sub(apply);
    apply();
  };
}
