export const useEventStyle =
  (evt: keyof GlobalEventHandlersEventMap) =>
  (
    el: HTMLElement,
    prop: keyof CSSStyleDeclaration,
    val: ((...args: any) => string | number) | (string | number),
    condition?: boolean | ((...args: any) => boolean),
  ) => {
    el.addEventListener(evt, () => {
      const _val = String(typeof val === 'function' ? val() : val);
      if (typeof condition === 'function' ? condition() : condition ?? true) el.style[prop as any] = _val as any;
      return el;
    });
  };
