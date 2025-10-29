export function Trait<T extends any[]>(traitFn: (...args: T) => () => void) {
  return (...traitProps: T) => {
    const el: HTMLElement = traitProps[0] as HTMLElement;
    const cleanupFunc = traitFn(...traitProps);
    let observer: MutationObserver | null = null;
    const fullCleanup = () => {
      if (typeof cleanupFunc === 'function') {
        cleanupFunc(); // Run the subscription cleanup logic
      }
      if (observer) {
        observer.disconnect(); // Stop observing the DOM
        observer = null;
      }
    };
    if (el.parentNode) {
      observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (Array.from(mutation.removedNodes).includes(el)) {
              fullCleanup();
              return;
            }
          }
        }
      });
      observer.observe(el.parentNode, { childList: true });
    }
    return fullCleanup;
  };
}
