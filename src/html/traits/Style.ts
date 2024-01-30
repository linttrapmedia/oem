import { StateType } from '../../types';

type UseStyleProps = {
  event?: keyof GlobalEventHandlersEventMap | null;
  eventElement?: HTMLElement | Window;
  invokeImmediately?: boolean;
  mediaMaxWidth?: number;
  mediaMinWidth?: number;
  mediaType?: 'screen' | 'print';
  state?: StateType<any> | null;
};

export const useStyle = ({
  event = null,
  eventElement = window,
  invokeImmediately = true,
  mediaType = 'screen',
  mediaMinWidth = 0,
  mediaMaxWidth = Infinity,
  state = null,
}: UseStyleProps = {}) => {
  const fingerPrint = (Math.random() * 100000000).toFixed(0);
  const printId = 'print-style-' + fingerPrint;
  let style: HTMLStyleElement = document.getElementById(printId) as HTMLStyleElement;
  if (!style) {
    style = document.createElement('style');
    style.id = printId;
    style.setAttribute('type', 'text/css');
    style.setAttribute('media', 'print');
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  const sheet = style.sheet as CSSStyleSheet;
  return (
    el: HTMLElement,
    prop: keyof CSSStyleDeclaration,
    val: ((...args: any) => string | number) | (string | number),
    condition?: boolean | ((...args: any) => boolean),
  ) => {
    if (mediaType === 'print') el.dataset.printId = el.dataset.printId ?? (Math.random() * 100000000).toFixed(0);
    // application
    const apply = () => {
      if (mediaType === 'print') {
        const selector = <string>prop + '-' + el.dataset.printId;
        const _val = String(typeof val === 'function' ? val() : val);
        const propFmt = (<string>prop).replace(/([A-Z])/g, '-$1').toLowerCase();
        sheet.insertRule(`.${selector} { ${propFmt}:${_val} !important; }`, 0);
        el.classList.add(selector);
      } else {
        const isInBreakpoint = window.innerWidth >= mediaMinWidth && window.innerWidth <= mediaMaxWidth;
        if (!isInBreakpoint) return;
        const _val = String(typeof val === 'function' ? val() : val);
        (typeof condition === 'function' ? condition() : condition ?? true)
          ? (el.style[prop as any] = _val as any)
          : null;
      }
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
