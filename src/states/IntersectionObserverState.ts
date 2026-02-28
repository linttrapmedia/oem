import { State } from '@/registry';

type IntersectionObserverStateValue = {
  isIntersecting: boolean;
  intersectionRatio: number;
  boundingClientRect: DOMRectReadOnly | null;
};

export const useIntersectionObserverState = (
  el: Element,
  options?: IntersectionObserverInit,
) => {
  const state = State<IntersectionObserverStateValue>({
    isIntersecting: false,
    intersectionRatio: 0,
    boundingClientRect: null,
  });

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry) {
      state.set({
        isIntersecting: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        boundingClientRect: entry.boundingClientRect,
      });
    }
  }, options);

  observer.observe(el);

  return state;
};
