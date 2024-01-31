import { Test } from '../types';
import { HTML } from './HTML';
import { useAttribute } from './traits/Attribute';
import { useClassName } from './traits/ClassName';
import { useEvent } from './traits/Event';
import { useStyle } from './traits/Style';
import { useText } from './traits/Text';

export const CanApplyAttributeTraitToHtml: Test = () => {
  const { div } = HTML({
    attr: useAttribute(),
  });
  const e1 = div(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<div id="test"></div>';
  return { pass: t1 };
};

export const CanRemoveAttributeTraitToHtml: Test = () => {
  const { div } = HTML({
    attr: useAttribute(),
  });
  const e1 = div(['attr', 'disabled', 'false'])();
  const t1 = e1.outerHTML === '<div></div>';
  return { pass: t1 };
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

export const CanApplyInnerTextTraitToHtml: Test = () => {
  const { div } = HTML({
    text: useText(),
  });
  const e1 = div(['text', 'test'])();
  const t1 = e1.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanApplyPrintStyleTraitToHtml: Test = () => {
  const { div } = HTML({
    printStyle: useStyle({ mediaType: 'print' }),
  });
  const e1 = div(['printStyle', 'fontSize', '12px'])();
  // can't test if style is applied to document with jsdom
  const t1 = e1.ownerDocument.head.innerHTML.includes('print-style');
  return { pass: t1 };
};

export const CanApplyStyleTraitToHtml: Test = () => {
  const { div } = HTML({
    style: useStyle(),
  });
  const e1 = div(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<div style="font-size: 12px;"></div>';
  return { pass: t1 };
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
