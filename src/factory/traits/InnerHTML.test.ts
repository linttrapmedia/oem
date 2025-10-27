import { State } from '@/state/State';
import { HTML } from '@/template/HTML';
import { SVG } from '@/template/SVG';
import { Test } from '@/types';
import { useInnerHTML } from './InnerHTML';

export const CanApplyInnerHTMLTraitToHtml: Test = () => {
  const state = State<{ value: string }>({ value: 'asdf' });
  const { div } = HTML({ staticHtml: useInnerHTML(), dynamicHtml: useInnerHTML({ state }) });

  // static tests
  const e1 = div(['staticHtml', () => 'asdf'])();
  const t1 = e1.outerHTML === '<div>asdf</div>';
  const e2 = div(['staticHtml', () => ['one', 'two']])();
  const t2 = e2.outerHTML === '<div>onetwo</div>';
  const e3 = div(['staticHtml', () => div()('one')])();
  const t3 = e3.outerHTML === '<div><div>one</div></div>';
  const e4 = div(['staticHtml', () => [div()('one'), div()('two')]])();
  const t4 = e4.outerHTML === '<div><div>one</div><div>two</div></div>';

  // dynamic tests
  const e5 = div(['dynamicHtml', () => state.val().value])();
  const t5 = e5.outerHTML === '<div>asdf</div>';

  // condition tests
  state.set({ value: 'c1' });
  const e6 = div(['dynamicHtml', () => state.val().value, false])();
  const t6 = e6.outerHTML === '<div></div>';
  const e7 = div(['dynamicHtml', () => state.val().value, () => false])();
  const t7 = e7.outerHTML === '<div></div>';
  const e8 = div(['dynamicHtml', () => state.val().value, () => true])();
  const t8 = e8.outerHTML === '<div>c1</div>';
  state.set({ value: 'c2' });
  const e9 = div(['dynamicHtml', () => state.val().value, state.$test(/c2/)])();
  const t9 = e9.outerHTML === '<div>c2</div>';
  // multiple html attributes and using undefined
  const e10 = div(['staticHtml', () => ['one', 'two']], ['staticHtml', () => undefined, false])();
  const t10 = e10.outerHTML === '<div>onetwo</div>';
  const e11 = div(['staticHtml', () => ['one', 'two']], ['staticHtml', () => undefined, true])();
  const t11 = e11.outerHTML === '<div></div>';

  const tests = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11];

  return { pass: tests.every((t) => t) };
};

export const CanApplyInnerHTMLTraitToSvg: Test = () => {
  const state = State({ value: 'asdf' });
  const { circle } = SVG({ staticHtml: useInnerHTML(), dynamicHtml: useInnerHTML({ state }) });

  // static tests
  const e1 = circle(['staticHtml', () => 'asdf'])();
  const t1 = e1.outerHTML === '<circle>asdf</circle>';
  const e2 = circle(['staticHtml', () => ['one', 'two']])();
  const t2 = e2.outerHTML === '<circle>onetwo</circle>';
  const e3 = circle(['staticHtml', () => circle()('one')])();
  const t3 = e3.outerHTML === '<circle><circle>one</circle></circle>';
  const e4 = circle(['staticHtml', () => [circle()('one'), circle()('two')]])();
  const t4 = e4.outerHTML === '<circle><circle>one</circle><circle>two</circle></circle>';

  // dynamic tests
  const e5 = circle(['dynamicHtml', () => state.val().value])();
  const t5 = e5.outerHTML === '<circle>asdf</circle>';

  // condition tests
  state.set({ value: 'c1' });
  const e6 = circle(['dynamicHtml', () => state.val().value, false])();
  const t6 = e6.outerHTML === '<circle></circle>';
  const e7 = circle(['dynamicHtml', () => state.val().value, () => false])();
  const t7 = e7.outerHTML === '<circle></circle>';
  const e8 = circle(['dynamicHtml', () => state.val().value, () => true])();
  const t8 = e8.outerHTML === '<circle>c1</circle>';
  state.set({ value: 'c2' });
  const e9 = circle(['dynamicHtml', () => state.val().value, state.$test(/c2/)])();
  const t9 = e9.outerHTML === '<circle>c2</circle>';
  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 && t8 && t9 };
};
