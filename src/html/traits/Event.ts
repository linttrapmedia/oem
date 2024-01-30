export const useEvent =
  <E extends keyof GlobalEventHandlersEventMap>(evt: E) =>
  (el: HTMLElement, cb: (evt: GlobalEventHandlersEventMap[E]) => any, condition?: (() => boolean) | boolean) => {
    (typeof condition === 'function' ? condition() : condition ?? true) ? el.addEventListener(evt, cb) : null;
  };
