import { Template } from './HTML';
import { useAttribute } from './traits/Attribute';
import { useClassName } from './traits/ClassName';
import { useEventListener } from './traits/EventListener';
import { useInnerText } from './traits/InnerText';
import { usePrintStyle } from './traits/PrintStyle';
import { useStyle } from './traits/Style';

export const CanApplyAttributeTraitToHtml: Test = () => {
  const { div } = Template({
    attr: useAttribute(),
  });
  const e1 = div(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<div id="test"></div>';
  return { pass: t1 };
};

export const CanApplyClassNameTraitToHtml: Test = () => {
  const { div } = Template({
    className: useClassName(),
  });
  const e1 = div(['className', 'n1 n2'])();
  const t1 = e1.outerHTML === '<div class="n1 n2"></div>';
  return { pass: t1 };
};

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { div } = Template({
    click: useEventListener('click'),
  });
  let clicked = false;
  const handleClick = () => (clicked = true);
  const e1 = div(['click', handleClick])();
  e1.click();
  const t1 = clicked;
  return { pass: t1 };
};

export const CanApplyInnerTextTraitToHtml: Test = () => {
  const { div } = Template({
    text: useInnerText(),
  });
  const e1 = div(['text', 'test'])();
  const t1 = e1.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanApplyPrintStyleTraitToHtml: Test = () => {
  const { div } = Template({
    printStyle: usePrintStyle(),
  });
  const e1 = div(['printStyle', 'fontSize', '12px'])();
  // can't test if style is applied to document with jsdom
  const t1 = e1.ownerDocument.head.innerHTML.includes('print-style');
  return { pass: t1 };
};

export const CanApplyStyleTraitToHtml: Test = () => {
  const { div } = Template({
    style: useStyle(),
  });
  const e1 = div(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<div style="font-size: 12px;"></div>';
  return { pass: t1 };
};

export const CanApplyMultipleTraitsToHtml: Test = () => {
  const { div } = Template({
    attr: useAttribute(),
    text: useInnerText(),
  });
  const e1 = div(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<div id="test">test</div>';
  return { pass: t1 };
};

export const CanCreateBasicHtmlTagWithText: Test = () => {
  const { div } = Template();
  const test = div()('test');
  const t1 = test.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanCreateEmptyHtmlTag: Test = () => {
  const { div } = Template();
  const t1 = div()().outerHTML === '<div></div>';
  return { pass: t1 };
};

export const HasValidHtmlNamespace: Test = () => {
  const { div } = Template({
    attr: useAttribute(),
  });
  const t1 = div(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/1999/xhtml';
  return { pass: t1 };
};
