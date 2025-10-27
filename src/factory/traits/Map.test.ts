import { useAttribute } from '@/factory/traits/Attribute';
import { useMap } from '@/factory/traits/Map';
import { State } from '@/state/State';
import { HTML } from '@/template/HTML';
import { Test } from '@/types';

export const CanMapListOfElements: Test = () => {
  // inline state
  const items1 = State<string[]>(['item1', 'item2']);
  const tmpl1 = HTML({
    map: useMap(),
    attr: useAttribute(),
  });
  const render1 = (item: string) => tmpl1.div(['attr', 'key', item])(item);
  const e1 = tmpl1.div(['map', items1.val, render1])();
  const t1 = e1.outerHTML === '<div><div key="item1">item1</div><div key="item2">item2</div></div>';

  // configured state
  const items2 = State<string[]>(['item1', 'item2']);
  const tmpl2 = HTML({
    map: useMap({ states: [items2] }),
    attr: useAttribute(),
  });
  const render2 = (item: string) => tmpl2.div(['attr', 'key', item])(item);
  const e2 = tmpl2.div(['map', items2.val, render2])();
  const t2 = e2.outerHTML === '<div><div key="item1">item1</div><div key="item2">item2</div></div>';

  // combined states
  const items3a = State<string[]>(['item1', 'item2']);
  const items3b = State<number[]>([1, 2, 10]);
  const tmpl3 = HTML({
    map: useMap({ states: [items3a, items3b] }),
    attr: useAttribute(),
  });
  const render3 = (item: string, i: number) => tmpl3.div(['attr', 'key', i], ['attr', 'id', items3b.val()[i]])(item);
  const e3 = tmpl3.div(['map', items3a.val, render3, true, items3b])();
  items3b.set([3, 4, 10]);
  const t3 = e3.outerHTML === '<div><div key="0" id="3">item1</div><div key="1" id="4">item2</div></div>';
  items3a.reduce((prev) => [...prev, 'item3']);
  const t4 =
    e3.outerHTML ===
    '<div><div key="0" id="3">item1</div><div key="1" id="4">item2</div><div key="2" id="10">item3</div></div>';

  const tests = [t1, t2, t3, t4];
  return { pass: tests.every(Boolean) };
};
