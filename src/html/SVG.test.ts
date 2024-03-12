import { Test } from '../types';
import { SVG } from './SVG';
import { useAttribute } from './traits/Attribute';
import { useClassName } from './traits/ClassName';
import { useEvent } from './traits/Event';
import { useStyle } from './traits/Style';
import { useText } from './traits/Text';

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
  const { circle } = SVG({
    className: useClassName(),
  });
  const e1 = circle(['className', 'n1 n2'])();
  const t1 = e1.outerHTML === '<circle class="n1 n2"></circle>';
  return { pass: t1 };
};

export const CanApplyEventListenerTraitToHtml: Test = () => {
  const { circle } = SVG({
    click: useEvent('click'),
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

export const CanApplyInnerTextTraitToHtml: Test = () => {
  const { circle } = SVG({
    text: useText(),
  });
  const e1 = circle(['text', 'test'])();
  const t1 = e1.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanApplyPrintStyleTraitToHtml: Test = () => {
  const { circle } = SVG({
    printStyle: useStyle({ mediaType: 'print' }),
  });
  const e1 = circle(['printStyle', 'fontSize', '12px'])();
  // can't test if style is applied to document with jsdom
  const t1 = e1.ownerDocument.head.innerHTML.includes('print-style');
  return { pass: t1 };
};

export const CanApplyStyleTraitToHtml: Test = () => {
  const { circle } = SVG({
    style: useStyle(),
  });
  const e1 = circle(['style', 'fontSize', '12px'])();
  const t1 = e1.outerHTML === '<circle style="font-size: 12px;"></circle>';
  return { pass: t1 };
};

export const CanApplyMultipleTraitsToHtml: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
    text: useText(),
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
