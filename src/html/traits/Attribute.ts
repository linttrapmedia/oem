import { StateType } from '../../types';

type UseAttributeProps = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  hideOnFalse?: boolean;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<any> | null;
};

export const useAttribute = ({
  event = null,
  eventElement = window,
  hideOnFalse = true,
  invokeImmediately = true,
  mediaMinWidth = 0,
  mediaMaxWidth = Infinity,
  state = null,
}: UseAttributeProps = {}) => {
  return (
    el: HTMLElement,
    prop: string,
    val: (() => string | number | boolean) | (string | number | boolean),
    condition?: boolean | (() => boolean),
  ) => {
    // application
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _val = String(typeof val === 'function' ? val() : val);
      const _isBool = _val === 'true' || _val === 'false';
      const _condition = typeof condition === 'function' ? condition() : condition ?? true;
      if (_isBool && hideOnFalse && _val === 'false') return el.removeAttribute(prop);
      if (_isBool && _condition === false) return el.removeAttribute(prop);
      if (_condition === false) return;
      el.setAttribute(prop, _val);
    };

    // handle state changes
    if (state) state.sub(apply);

    // handle event changes
    if (event) (el ?? eventElement).addEventListener(event, apply);

    // handle breakpoint changes
    window.addEventListener('resize', apply);

    // apply immediately
    if (invokeImmediately) apply();
  };
};
