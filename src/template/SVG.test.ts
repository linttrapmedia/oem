import { useAttribute } from '../traits/Attribute';
import { useTextContent } from '../traits/TextContent';
import { Test } from '../types';
import { SVG } from './SVG';

export const CanApplyMultipleTraitsToSvg: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
    text: useTextContent(),
  });
  const e1 = circle(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test">test</circle>';
  return { pass: t1 };
};

export const CanCreateBasicSvgTagWithText: Test = () => {
  const { circle } = SVG();
  const test = circle()('test');
  const t1 = test.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanCreateEmptySvgTag: Test = () => {
  const { circle } = SVG();
  const t1 = circle()().outerHTML === '<circle></circle>';
  return { pass: t1 };
};

export const HasValidSvgNamespace: Test = () => {
  const { circle } = SVG({
    attr: useAttribute(),
  });
  const t1 = circle(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/2000/svg';
  return { pass: t1 };
};
