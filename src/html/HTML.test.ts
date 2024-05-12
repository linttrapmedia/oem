import { State } from '../state/State';
import { Test } from '../types';
import { HTML } from './HTML';
import { useAttribute } from './traits/Attribute';
import { useClassName } from './traits/ClassName';
import { useEvent } from './traits/Event';
import { useInnerHTML } from './traits/InnerHTML';
import { useStyle } from './traits/Style';
import { useText } from './traits/Text';

export const CanAdoptElement: Test = () => {
  const { el, $el } = HTML({
    style: useStyle(),
  });
  const myDiv = document.createElement('div');
  // by instances
  const e1 = el(myDiv)(['style', 'color', 'red'])('test');
  const t1 = e1.outerHTML === '<div style="color: red;">test</div>';

  // by selector
  const e2 = document.createElement('div');
  e2.id = 'test';
  document.body.appendChild(e2);
  $el('#test')(['style', 'color', 'red']);
  const t2 = e2.outerHTML === '<div id="test" style="color: red;"></div>';
  return { pass: t1 && t2 };
};

export const CanApplyAttributeTraitToHtml: Test = () => {
  const { div } = HTML({
    attr: useAttribute(),
  });
  const e1 = div(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<div id="test"></div>';
  return { pass: t1 };
};

export const CanRemoveAttributeTraitToHtml: Test = () => {
  const state = State({ disabled: false });
  const { div } = HTML({
    staticAttr: useAttribute(),
    dynamicAttr: useAttribute({ state }),
  });

  // static tests
  const e1 = div(['staticAttr', 'disabled', true])();
  const t1 = e1.outerHTML === '<div disabled="true"></div>';
  const e2 = div(['staticAttr', 'disabled', false])();
  const t2 = e2.outerHTML === '<div></div>';
  const e3 = div(['staticAttr', 'disabled', 'true'])();
  const t3 = e3.outerHTML === '<div disabled="true"></div>';
  const e4 = div(['staticAttr', 'disabled', 'false'])();
  const t4 = e4.outerHTML === '<div></div>';

  // dynamic tests
  state.set({ disabled: true });
  const e5 = div(['dynamicAttr', 'disabled', (state) => state.disabled])();
  const t5 = e5.outerHTML === '<div disabled="true"></div>';
  state.set({ disabled: false });
  const e6 = div(['dynamicAttr', 'disabled', (state) => state.disabled])();
  const t6 = e6.outerHTML === '<div></div>';

  // condition tests
  state.set({ disabled: true });
  const e7 = div(['dynamicAttr', 'disabled', 'true', (state) => state.disabled])();
  const t7 = e7.outerHTML === '<div disabled="true"></div>';
  state.set({ disabled: false });
  const e8 = div(['dynamicAttr', 'disabled', 'true', (state) => state.disabled])();
  const t8 = e8.outerHTML === '<div></div>';

  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 && t8 };
};

export const CanApplyClassNameTraitToHtml: Test = () => {
  const { div } = HTML({
    className: useClassName(),
  });
  const e1 = div(['className', 'n1 n2'])();
  const t1 = e1.outerHTML === '<div class="n1 n2"></div>';
  return { pass: t1 };
};

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { div } = HTML({
    click: useEvent('click'),
  });
  let clicked = false;
  const handleClick = () => (clicked = true);
  const e1 = div(['click', handleClick])();
  e1.click();
  const t1 = clicked;
  return { pass: t1 };
};

export const CanApplyInnerHTMLTraitToHtml: Test = () => {
  const state = State({ value: 'asdf' });
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
  const e5 = div(['dynamicHtml', (s) => s.value])();
  const t5 = e5.outerHTML === '<div>asdf</div>';

  // condition tests
  state.set({ value: 'c1' });
  const e6 = div(['dynamicHtml', (s) => s.value, false])();
  const t6 = e6.outerHTML === '<div></div>';
  const e7 = div(['dynamicHtml', (s) => s.value, () => false])();
  const t7 = e7.outerHTML === '<div></div>';
  const e8 = div(['dynamicHtml', (s) => s.value, () => true])();
  const t8 = e8.outerHTML === '<div>c1</div>';
  state.set({ value: 'c2' });
  const e9 = div(['dynamicHtml', (s) => s.value, (s) => s.value === 'c2'])();
  const t9 = e9.outerHTML === '<div>c2</div>';
  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 && t8 && t9 };
};

export const CanApplyInnerTextTraitToHtml: Test = () => {
  const { div } = HTML({
    text: useText(),
  });
  const e1 = div(['text', 'test'])();
  const t1 = e1.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanApplyStyleTraitToHtml: Test = () => {
  const state = State({ fontSize: '13px' });
  const { div } = HTML({
    staticStyle: useStyle(),
    dynamicStyle: useStyle({ state }),
  });
  const e1 = div(['staticStyle', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<div style="font-size: 12px;"></div>';
  const e2 = div(['dynamicStyle', 'fontSize', (s) => s.fontSize])();
  const t2a = e2.outerHTML === '<div style="font-size: 13px;"></div>';
  state.set({ fontSize: '14px' });
  const t2b = e2.outerHTML === '<div style="font-size: 14px;"></div>';
  state.set({ fontSize: '15px' });
  const e3 = div(['dynamicStyle', 'fontSize', (s) => s.fontSize, () => false])();
  const t3 = e3.outerHTML === '<div></div>';
  const e4 = div(['dynamicStyle', 'fontSize', (s) => s.fontSize, () => true])();
  const t4 = e4.outerHTML === '<div style="font-size: 15px;"></div>';
  const e5 = div(['dynamicStyle', 'fontSize', (s) => s.fontSize, (s) => s.fontSize === '14px'])();
  const t5 = e5.outerHTML === '<div></div>';

  return { pass: t1 && t2a && t2b && t3 && t4 && t5 };
};

export const CanApplyMultipleTraitsToHtml: Test = () => {
  const { div } = HTML({
    attr: useAttribute(),
    text: useText(),
  });
  const e1 = div(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<div id="test">test</div>';
  return { pass: t1 };
};

export const CanCreateBasicHtmlTagWithText: Test = () => {
  const { div } = HTML();
  const test = div()('test');
  const t1 = test.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanCreateEmptyHtmlTag: Test = () => {
  const { div } = HTML();
  const t1 = div()().outerHTML === '<div></div>';
  return { pass: t1 };
};

export const HasValidHtmlNamespace: Test = () => {
  const { div } = HTML({
    attr: useAttribute(),
  });
  const t1 = div(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/1999/xhtml';
  return { pass: t1 };
};
