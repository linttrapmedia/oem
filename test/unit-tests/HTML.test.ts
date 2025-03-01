import { HTML } from '../../src/html/HTML';
import { useAttribute } from '../../src/html/traits/Attribute';
import { useClassName } from '../../src/html/traits/ClassName';
import { useEvent } from '../../src/html/traits/Event';
import { useInnerHTML } from '../../src/html/traits/InnerHTML';
import { useStyle } from '../../src/html/traits/Style';
import { useTextContent } from '../../src/html/traits/TextContent';
import { State } from '../../src/state/State';
import { Test } from '../../src/types';

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
  const state = State({ disabled: false });
  const { div } = HTML({
    staticAttr: useAttribute(),
    dynamicAttr: useAttribute({ state }),
  });

  // static tests
  const e1 = div(['staticAttr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<div id="test"></div>';
  const e2 = div(['staticAttr', 'disabled', 'true'])();
  const t2 = e2.outerHTML === '<div disabled="true"></div>';

  // dynamic tests
  state.set({ disabled: true });
  const e5 = div(['dynamicAttr', 'disabled', (state) => state.disabled])();
  const t5 = e5.outerHTML === '<div disabled="true"></div>';

  state.set({ disabled: false });
  const e6 = div(['dynamicAttr', 'disabled', (state) => state.disabled])();
  const t6 = e6.outerHTML === '<div disabled="false"></div>';

  // condition tests
  state.set({ disabled: true });
  const e7 = div(['dynamicAttr', 'disabled', 'true', (state) => state.disabled])();
  const t7 = e7.outerHTML === '<div disabled="true"></div>';

  state.set({ disabled: false });
  const e8 = div(['dynamicAttr', 'disabled', 'true', (state) => state.disabled])();
  const t8 = e8.outerHTML === '<div></div>';

  return { pass: t1 && t2 && t5 && t6 && t7 && t8 };
};

export const CanApplyClassNameTraitToHtml: Test = () => {
  const state = State({ className: 'item--modifier-1' });
  const { div } = HTML({
    'class:static': useClassName(),
    'class:dynamic': useClassName({ state }),
  });

  // static tests
  const e1 = div(['class:static', 'c1'], ['class:static', 'c1'])();
  const t1 = e1.outerHTML === '<div class="c1"></div>';
  const e2 = div(['class:static', 'c1 c2'])();
  const t2 = e2.outerHTML === '<div class="c1 c2"></div>';
  const e3 = div(['class:static', 'c1', false])();
  const t3 = e3.outerHTML === '<div class=""></div>';
  const e4 = div(['class:static', 'c1', true])();
  const t4 = e4.outerHTML === '<div class="c1"></div>';
  const e5 = div(['class:static', 'c1', () => false])();
  const t5 = e5.outerHTML === '<div class=""></div>';
  const e6 = div(['class:static', 'c1', () => true])();
  const t6 = e6.outerHTML === '<div class="c1"></div>';

  return { pass: t1 && t2 && t3 && t4 && t5 && t6 };
};

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { div } = HTML({
    click: useEvent({ event: 'click' }),
  });
  let clicked = false;
  const handleClick = () => (clicked = true);
  const e1 = div(['click', handleClick])();
  e1.click();
  const t1 = clicked;
  return { pass: t1 };
};

export const CanConditionallyApplyEventListenerTraitToHtml: Test = () => {
  const toggle = State(true);
  const { div } = HTML({
    click: useEvent({ event: 'click', state: toggle }),
  });
  const e1 = div(
    ['click', () => toggle.set(false), toggle.get],
    ['click', () => toggle.set(true), () => toggle.get() === false],
  )();
  e1.click();
  const t1 = toggle.get() === false;
  e1.click();
  const t2 = toggle.get() === true;
  return { pass: t1 && t2 };
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
  const e3 = div(['dynamicText', (s) => s.value])();
  const t3 = e3.outerHTML === '<div>asdf</div>';

  // condition tests
  const e4 = div(['dynamicText', (s) => s.value, false])();
  const t4 = e4.outerHTML === '<div></div>';
  const e5 = div(['dynamicText', (s) => s.value, () => false])();
  const t5 = e5.outerHTML === '<div></div>';
  const e6 = div(['dynamicText', (s) => s.value, () => true])();
  const t6 = e6.outerHTML === '<div>asdf</div>';
  state.set({ value: 'c1' });
  const e7 = div(['dynamicText', (s) => s.value, (s) => s.value === 'c1'])();
  const t7 = e7.outerHTML === '<div>c1</div>';

  return { pass: t1 && t2 && t3 && t4 && t5 && t6 && t7 };
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

export const CanApplyCssVarWithStyleTraitToHtml: Test = () => {
  const { div } = HTML({
    style: useStyle(),
  });
  const e1 = div(['style', '--test-var', 'testing'])();
  const t1 = e1.outerHTML === '<div style="--test-var: testing;"></div>';
  return { pass: t1 };
};

export const CanApplyMultipleTraitsToHtml: Test = () => {
  const { div } = HTML({
    attr: useAttribute(),
    text: useTextContent(),
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
