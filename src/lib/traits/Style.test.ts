import { HTML } from '@/HTML';
import { State } from '@/State';
import { SVG } from '@/SVG';
import { Test } from '@/types';
import { useStyleTrait } from './Style';

export const CanApplyStyleTraitToHtml: Test = () => {
  const state = State<{ fontSize: string }>({ fontSize: '13px' });
  const { div } = HTML({ style: useStyleTrait });
  const e1 = div(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<div style="font-size: 12px;"></div>';
  const e2 = div(['style', 'fontSize', () => state.val().fontSize, true, state])();
  const t2a = e2.outerHTML === '<div style="font-size: 13px;"></div>';
  state.set({ fontSize: '14px' });
  const t2b = e2.outerHTML === '<div style="font-size: 14px;"></div>';
  state.set({ fontSize: '15px' });
  const e3 = div(['style', 'fontSize', () => state.val().fontSize, () => false, state])();
  const t3 = e3.outerHTML === '<div></div>';
  const e4 = div(['style', 'fontSize', () => state.val().fontSize, () => true, state])();
  const t4 = e4.outerHTML === '<div style="font-size: 15px;"></div>';
  const e5 = div(['style', 'fontSize', () => state.val().fontSize, state.$test(/15px/), state])();
  const t5 = e5.outerHTML === '<div style="font-size: 15px;"></div>';

  const tests = [t1, t2a, t2b, t3, t4, t5];

  return { pass: tests.every(Boolean) };
};

export const CanApplyCssVarWithStyleTraitToHtml: Test = () => {
  const { div } = HTML({ style: useStyleTrait });
  const e1 = div(['style', '--test-var', 'testing'])();
  const t1 = e1.outerHTML === '<div style="--test-var: testing;"></div>';
  return { pass: t1 };
};

export const CanApplyStyleTraitToSvg: Test = () => {
  const { circle } = SVG({ style: useStyleTrait });
  const e1 = circle(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<circle style="font-size: 12px;"></circle>';
  const e2 = circle(['style', 'fontSize', '12px'], ['style', 'color', 'red'])();
  const t2 = e2.outerHTML === '<circle style="font-size: 12px; color: red;"></circle>';
  return { pass: t1 && t2 };
};
