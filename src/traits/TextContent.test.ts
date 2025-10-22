import { State } from '../state/State';
import { HTML } from '../template/HTML';
import { SVG } from '../template/SVG';
import { Test } from '../types';
import { useTextContent } from './TextContent';

export const CanApplyTextContentTraitToHtml: Test = () => {
  const state = State({ value: 'asdf' });
  const { div } = HTML({
    staticText: useTextContent(),
    dynamicText: useTextContent({ state }),
  });

  // static tests
  const e1 = div(['staticText', 'test'])();
  const t1 = e1.outerHTML === '<div>test</div>';
  const e2 = div(['staticText', () => 'test'])();
  const t2 = e2.outerHTML === '<div>test</div>';

  // dynamic tests
  const e3 = div(['dynamicText', () => state.$val().value])();
  const t3 = e3.outerHTML === '<div>asdf</div>';

  // condition tests
  const e4 = div(['dynamicText', () => state.$val().value, false])();
  const t4 = e4.outerHTML === '<div></div>';
  const e5 = div(['dynamicText', () => state.$val().value, () => false])();
  const t5 = e5.outerHTML === '<div></div>';
  const e6 = div(['dynamicText', () => state.$val().value, () => true])();
  const t6 = e6.outerHTML === '<div>asdf</div>';
  state.set({ value: 'c1' });
  const e7 = div(['dynamicText', () => state.$val().value, () => state.$val().value === 'c1'])();
  const t7 = e7.outerHTML === '<div>c1</div>';

  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 };
};

export const CanApplyTextContentTraitToSvg: Test = () => {
  const { circle } = SVG({
    text: useTextContent(),
  });
  const e1 = circle(['text', 'test'])();
  const t1 = e1.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};
