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

/**
 * Enables double-click-to-edit behavior on an element.
 * On double-click, replaces content with an input, commits on Enter/blur, cancels on Escape.
 */
export function useEditOnDblClickTrait(
  el: HTMLElement,
  currentText: () => string,
  onCommit: (value: string) => void,
) {
  const onDblClick = () => {
    const original = currentText();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = original;
    input.style.cssText =
      'width:100%;padding:4px 8px;font:inherit;border:1px solid #4a90d9;border-radius:4px;outline:none;box-sizing:border-box;';

    const commit = () => {
      onCommit(input.value);
    };

    const cancel = () => {
      el.textContent = original;
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        cancel();
      }
    });

    input.addEventListener('blur', commit, { once: true });

    el.textContent = '';
    el.appendChild(input);
    input.focus();
    input.select();
  };

  el.addEventListener('dblclick', onDblClick);
  return () => el.removeEventListener('dblclick', onDblClick);
}
