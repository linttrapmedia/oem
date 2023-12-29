export const useBreakpointStyle =
  (breakpoint: number = 0) =>
  (
    el: HTMLElement,
    prop: keyof CSSStyleDeclaration,
    val: ((width: number) => string | number) | (string | number),
    condition?: boolean | ((width: number) => boolean),
  ) => {
    const apply = () => {
      const width = window.innerWidth;
      if (width < breakpoint) return;
      const _val = String(typeof val === 'function' ? val(width) : val);
      (typeof condition === 'function' ? condition(width) : condition ?? true)
        ? (el.style[prop as any] = _val as any)
        : null;
    };
    window.addEventListener('resize', apply);
    apply();
  };
