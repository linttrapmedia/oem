import { SVG } from '../../src/html/SVG';
import { useAttribute } from '../../src/html/traits/Attribute';
import { useClassName } from '../../src/html/traits/ClassName';
import { useEvent } from '../../src/html/traits/Event';
import { useStyle } from '../../src/html/traits/Style';
import { useTextContent } from '../../src/html/traits/TextContent';
import { Test } from '../../src/types';

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
    className: useClassName({ method: 'className' }),
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
