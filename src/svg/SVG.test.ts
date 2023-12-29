import { Template } from './SVG';
import { useAttribute } from './traits/Attribute';
import { useClassName } from './traits/ClassName';
import { useEventListener } from './traits/EventListener';
import { useInnerText } from './traits/InnerText';
import { usePrintStyle } from './traits/PrintStyle';
import { useStyle } from './traits/Style';

export const CanApplyAttributeTraitToHtml: Test = () => {
  const { circle } = Template({
    attr: useAttribute(),
  });
  const e1 = circle(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test"></circle>';
  return { pass: t1 };
};

export const CanApplyClassNameTraitToHtml: Test = () => {
  const { circle } = Template({
    className: useClassName(),
  });
  const e1 = circle(['className', 'n1 n2'])();
  const t1 = e1.outerHTML === '<circle class="n1 n2"></circle>';
  return { pass: t1 };
};

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { circle } = Template({
    click: useEventListener('click'),
  });
  let clicked = false;
  const handleClick = () => (clicked = true);
  const e1 = circle(['click', handleClick])();
  (<any>e1).click();
  const t1 = clicked;
  return { pass: t1 };
};

export const CanApplyInnerTextTraitToHtml: Test = () => {
  const { circle } = Template({
    text: useInnerText(),
  });
  const e1 = circle(['text', 'test'])();
  const t1 = e1.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanApplyPrintStyleTraitToHtml: Test = () => {
  const { circle } = Template({
    printStyle: usePrintStyle(),
  });
  const e1 = circle(['printStyle', 'fontSize', '12px'])();
  // can't test if style is applied to document with jsdom
  const t1 = e1.ownerDocument.head.innerHTML.includes('print-style');
  return { pass: t1 };
};

export const CanApplyStyleTraitToHtml: Test = () => {
  const { circle } = Template({
    style: useStyle(),
  });
  const e1 = circle(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<circle style="font-size: 12px;"></circle>';
  return { pass: t1 };
};

export const CanApplyMultipleTraitsToHtml: Test = () => {
  const { circle } = Template({
    attr: useAttribute(),
    text: useInnerText(),
  });
  const e1 = circle(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test">test</circle>';
  return { pass: t1 };
};

export const CanCreateBasicHtmlTagWithText: Test = () => {
  const { circle } = Template();
  const test = circle()('test');
  const t1 = test.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanCreateEmptyHtmlTag: Test = () => {
  const { circle } = Template();
  const t1 = circle()().outerHTML === '<circle></circle>';
  return { pass: t1 };
};

export const HasValidHtmlNamespace: Test = () => {
  const { circle } = Template({
    attr: useAttribute(),
  });
  const t1 = circle(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/1999/xhtml';
  return { pass: t1 };
};
