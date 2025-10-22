import { State } from '../state/State';
import { HTML } from '../template/HTML';
import { SVG } from '../template/SVG';
import { Test } from '../types';
import { useStyle } from './Style';

export const CanApplyStyleTraitToHtml: Test = () => {
  const state = State<{ fontSize: string }>({ fontSize: '13px' });
  const { div } = HTML({
    staticStyle: useStyle(),
    dynamicStyle: useStyle({ state }),
  });
  const e1 = div(['staticStyle', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<div style="font-size: 12px;"></div>';
  const e2 = div(['dynamicStyle', 'fontSize', () => state.$val().fontSize])();
  const t2a = e2.outerHTML === '<div style="font-size: 13px;"></div>';
  state.set({ fontSize: '14px' });
  const t2b = e2.outerHTML === '<div style="font-size: 14px;"></div>';
  state.set({ fontSize: '15px' });
  const e3 = div(['dynamicStyle', 'fontSize', () => state.$val().fontSize, () => false])();
  const t3 = e3.outerHTML === '<div></div>';
  const e4 = div(['dynamicStyle', 'fontSize', () => state.$val().fontSize, () => true])();
  const t4 = e4.outerHTML === '<div style="font-size: 15px;"></div>';
  const e5 = div(['dynamicStyle', 'fontSize', () => state.$val().fontSize, state.$test(/15px/)])();
  const t5 = e5.outerHTML === '<div style="font-size: 15px;"></div>';

  // multiple style attributes and using undefined
  const e6 = div(
    ['staticStyle', 'fontSize', '12px'],
    ['staticStyle', 'color', 'red'],
    ['staticStyle', 'color', undefined],
  )();
  const t6 = e6.outerHTML === '<div style="font-size: 12px;"></div>';
  const e7 = div(
    ['staticStyle', 'fontSize', '12px'],
    ['staticStyle', 'color', undefined],
    ['staticStyle', 'color', 'red'],
  )();
  const t7 = e7.outerHTML === '<div style="font-size: 12px; color: red;"></div>';

  return { pass: t1 && t2a && t2b && t3 && t4 && t5 && t6 && t7 };
};

export const CanApplyCssVarWithStyleTraitToHtml: Test = () => {
  const { div } = HTML({
    style: useStyle(),
  });
  const e1 = div(['style', '--test-var', 'testing'])();
  const t1 = e1.outerHTML === '<div style="--test-var: testing;"></div>';
  return { pass: t1 };
};

export const CanApplyStyleTraitToSvg: Test = () => {
  const { circle } = SVG({
    style: useStyle(),
  });
  const e1 = circle(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<circle style="font-size: 12px;"></circle>';

  const e2 = circle(['style', 'fontSize', '12px'], ['style', 'color', 'red'])();
  return { pass: t1 };
};
