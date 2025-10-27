import { StateType } from '@/types';

type UseMapConfig = {
  states?: StateType<any>[];
};

export function useMap(config?: UseMapConfig) {
  const { states } = config || {};
  return (
    el: HTMLElement,
    items: () => any[],
    renderItem: (item: any, index: number) => HTMLElement,
    condition: boolean | (() => boolean) = true,
    ...inlineStates: StateType<any>[]
  ) => {
    const apply = () => {
      const cond = typeof condition === 'function' ? condition() : condition;
      if (!cond) return;
      items().forEach((item, index) => {
        const itemEl = renderItem(item, index);
        const itemKey = itemEl.getAttribute('key');
        if (!itemKey) throw new Error('Each item must have a unique "key" property for mapping.');
        const currEl = el.querySelector(`[key="${itemKey}"]`);
        const isDiff = itemEl.outerHTML !== currEl?.outerHTML;
        if (!currEl) return el.appendChild(itemEl);
        if (currEl && isDiff) el.replaceChild(itemEl, currEl);
      });
    };
    const _states = states ? [...inlineStates, ...states] : inlineStates;
    _states.forEach((state) => state.sub(apply));
    apply();
  };
}
