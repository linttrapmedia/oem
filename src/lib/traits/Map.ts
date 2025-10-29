import { Trait } from '@/Trait';
import { StateType } from '@/types';

type Props = [
  el: HTMLElement,
  items: () => any[],
  renderer: (item: any, index: number) => HTMLElement,
  condition: boolean | (() => boolean),
  ...states: StateType<any>[],
];

export const useMapTraitTrait = Trait((...props: Props) => {
  const [el, items, renderer, condition = true, ...states] = props;
  const apply = () => {
    const cond = typeof condition === 'function' ? condition() : condition;
    if (!cond) return;
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
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
});
