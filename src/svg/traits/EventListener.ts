export const useEventListener =
  (evt: keyof GlobalEventHandlersEventMap) =>
  (el: HTMLElement, cb: () => any, condition?: (() => boolean) | boolean) => {
    (typeof condition === 'function' ? condition() : condition ?? true) ? el.addEventListener(evt, cb) : null;
  };
