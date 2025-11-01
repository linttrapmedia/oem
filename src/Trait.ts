// Global observer and registry
const cleanupMap = new WeakMap<HTMLElement, (() => void)[]>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && cleanupMap.has(node)) {
          // Call all cleanup functions for this element
          const funcs = cleanupMap.get(node)!;
          funcs.forEach((fn) => fn());
          cleanupMap.delete(node);
        }
      });
    }
  }
});

// Start observing once
observer.observe(document.body, { childList: true, subtree: true });

export function Trait<T extends any[]>(traitFn: (...args: T) => () => void) {
  return (...traitProps: T) => {
    const el: HTMLElement = traitProps[0] as HTMLElement;
    const cleanupFunc = traitFn(...traitProps);

    // Register cleanup function
    const list = cleanupMap.get(el) || [];
    list.push(cleanupFunc);
    cleanupMap.set(el, list);

    // Return a manual cleanup function
    return () => {
      const arr = cleanupMap.get(el);
      if (arr) {
        const idx = arr.indexOf(cleanupFunc);
        if (idx !== -1) arr.splice(idx, 1);
        if (arr.length === 0) cleanupMap.delete(el);
      }
      cleanupFunc();
    };
  };
}
