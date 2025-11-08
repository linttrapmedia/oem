import { Condition, StateType } from '@/types';

export const useMapTrait = (
  ...props: [
    el: HTMLElement,
    items: () => any[],
    renderer: (item: any, index: number) => HTMLElement,
    conditions: Condition | Condition[],
    states: StateType<any> | StateType<any>[],
  ]
) => {
  const [el, items, renderer, conditions = true, states = []] = props;
  const apply = () => {
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    const isConditionMet = _conditions.every((condition) => {
      return typeof condition === 'function' ? condition() : condition;
    });
    if (!isConditionMet) return;
    el.innerHTML = '';
    items().forEach((item, index) => {
      const itemEl = renderer(item, index);
      const itemKey = itemEl.getAttribute('key');
      if (!itemKey) throw new Error('Each item must have a unique "key" property for mapping.');
      const currEl = el.querySelector(`[key="${itemKey}"]`);
      const isDiff = itemEl.outerHTML !== currEl?.outerHTML;
      if (!currEl) return el.appendChild(itemEl);
      if (currEl && isDiff) el.replaceChild(itemEl, currEl);
    });
  };
  apply();
  const _states = Array.isArray(states) ? states.flat() : [states];
  const unsubs = _states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
