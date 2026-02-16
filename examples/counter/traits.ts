// --- Custom Traits ---

import { StateType } from '@/registry';

/**
 * Replaces an element's children by calling a render function reactively.
 * When any of the provided states change, the element is cleared and re-rendered.
 */
export function useChildrenTrait(
  el: HTMLElement,
  render: () => (HTMLElement | SVGElement)[],
  ...states: StateType<any>[]
) {
  const apply = () => {
    el.innerHTML = '';
    render().forEach((child) => el.appendChild(child));
  };
  apply();
  const unsubs = states.map((s) => s.sub(apply));
  return () => unsubs.forEach((u) => u());
}

/**
 * Submits on Enter key. Calls handler with the current input value and clears the input.
 */
export function useSubmitOnEnterTrait(el: HTMLInputElement, handler: (value: string) => void) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handler(el.value);
      el.value = '';
    }
  };
  el.addEventListener('keydown', onKey);
  return () => el.removeEventListener('keydown', onKey);
}
