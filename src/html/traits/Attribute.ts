import { StateType } from '@oem/types';

type UseAttributeProps = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<any> | null;
};

export const useAttribute = ({
  event = null,
  eventElement = window,
  invokeImmediately = true,
  mediaMinWidth = 0,
  mediaMaxWidth = Infinity,
  state = null,
}: UseAttributeProps = {}) => {
  return (
    el: HTMLElement,
    prop: string,
    val: (() => string | number) | (string | number),
    condition?: boolean | (() => boolean),
  ) => {
    // application
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _val = String(typeof val === 'function' ? val() : val);
      (typeof condition === 'function' ? condition() : condition ?? true) ? el.setAttribute(prop, _val) : null;
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
