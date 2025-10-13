import { State } from '..';
import { useAttribute } from '../traits/Attribute';
import { useClassName } from '../traits/ClassName';
import { useEvent } from '../traits/Event';
import { useInnerHTML } from '../traits/InnerHTML';
import { useStyle } from '../traits/Style';
import { useTextContent } from '../traits/TextContent';
import { Test } from '../types';
import { SVG } from './SVG';

export const CanAdoptElement: Test = () => {
  const { el } = SVG({
    style: useStyle(),
  });
  const myCircle = document.createElement('circle') as unknown as SVGCircleElement;
  const e1 = el(myCircle)(['style', 'color', 'red'])();
  const t1 = e1.outerHTML === '<circle style="color: red;"></circle>';
  return { pass: t1 };
};

export const CanApplyAttributeTraitToHtml: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
  });
  const e1 = circle(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test"></circle>';
  return { pass: t1 };
};

export const CanApplyClassNameTraitToHtml: Test = () => {
  const { circle } = SVG({ 'class:static': useClassName() });
  const e1 = circle(['class:static', 'c1'])();
  const t1 = e1.outerHTML === '<circle class="c1"></circle>';
  const e2 = circle(['class:static', 'c1 c2'])();
  const t2 = e2.outerHTML === '<circle class="c1 c2"></circle>';
  const e3 = circle(['class:static', 'c1', false])();
  const t3 = e3.outerHTML === '<circle></circle>';
  const e4 = circle(['class:static', 'c1', true])();
  const t4 = e4.outerHTML === '<circle class="c1"></circle>';
  const e5 = circle(['class:static', 'c1', () => false])();
  const t5 = e5.outerHTML === '<circle></circle>';
  const e6 = circle(['class:static', 'c1', () => true])();
  const t6 = e6.outerHTML === '<circle class="c1"></circle>';
  const e7 = circle(['class:static', 'c1 c2', true], ['class:static', undefined, true])();
  const t7 = e7.outerHTML === '<circle></circle>';
  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 };
};

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { circle } = SVG({
    click: useEvent({ event: 'click' }),
  });
  let clicked = false;
  var clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const handleClick = () => (clicked = true);
  const e1 = circle(['click', handleClick])();
  e1.dispatchEvent(clickEvent);
  const t1 = clicked;
  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToHtml: Test = () => {
  const toggle = State(true);
  const { circle } = SVG({
    click: useEvent({ event: 'click', state: toggle }),
  });
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: false,
  });
  const e1 = circle(
    ['click', () => toggle.set(false), toggle.get],
    ['click', () => toggle.set(true), () => toggle.get() === false],
  )();
  e1.dispatchEvent(clickEvent);
  const t1 = toggle.get() === false;
  e1.dispatchEvent(clickEvent);
  const t2 = toggle.get() === true;
  return { pass: t1 && t2 };
};

export const CanApplyInnerHTMLTraitToHtml: Test = () => {
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
  const e5 = circle(['dynamicHtml', (s) => s.value])();
  const t5 = e5.outerHTML === '<circle>asdf</circle>';

  // condition tests
  state.set({ value: 'c1' });
  const e6 = circle(['dynamicHtml', (s) => s.value, false])();
  const t6 = e6.outerHTML === '<circle></circle>';
  const e7 = circle(['dynamicHtml', (s) => s.value, () => false])();
  const t7 = e7.outerHTML === '<circle></circle>';
  const e8 = circle(['dynamicHtml', (s) => s.value, () => true])();
  const t8 = e8.outerHTML === '<circle>c1</circle>';
  state.set({ value: 'c2' });
  const e9 = circle(['dynamicHtml', (s) => s.value, (s) => s.value === 'c2'])();
  const t9 = e9.outerHTML === '<circle>c2</circle>';
  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 && t8 && t9 };
};

export const CanApplyInnerTextTraitToHtml: Test = () => {
  const { circle } = SVG({
    text: useTextContent(),
  });
  const e1 = circle(['text', 'test'])();
  const t1 = e1.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanApplyStyleTraitToHtml: Test = () => {
  const { circle } = SVG({
    style: useStyle(),
  });
  const e1 = circle(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<circle style="font-size: 12px;"></circle>';

  const e2 = circle(['style', 'fontSize', '12px'], ['style', 'color', 'red'])();
  return { pass: t1 };
};

export const CanApplyMultipleTraitsToHtml: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
    text: useTextContent(),
  });
  const e1 = circle(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test">test</circle>';
  return { pass: t1 };
};

export const CanCreateBasicHtmlTagWithText: Test = () => {
  const { circle } = SVG();
  const test = circle()('test');
  const t1 = test.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanCreateEmptyHtmlTag: Test = () => {
  const { circle } = SVG();
  const t1 = circle()().outerHTML === '<circle></circle>';
  return { pass: t1 };
};

export const HasValidHtmlNamespace: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
  });
  const t1 = circle(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/2000/svg';
  return { pass: t1 };
};
