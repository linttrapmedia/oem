import { StateType } from '../../types';

type UseClassNameProps = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<any> | null;
};

export const useClassName = ({
  event = null,
  eventElement = window,
  invokeImmediately = true,
  mediaMinWidth = 0,
  mediaMaxWidth = Infinity,
  state = null,
}: UseClassNameProps = {}) => {
  return (el: HTMLElement, className: string | (() => string), condition?: boolean | (() => boolean)) => {
    // application
    const apply = () => {
      const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
      if (!isInBreakpoint) return;
      const _className = String(typeof className === 'function' ? className() : className);
      (typeof condition === 'function' ? condition() : condition ?? true) ? el.setAttribute('class', _className) : null;
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
