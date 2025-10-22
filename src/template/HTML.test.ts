import ResizeObserver from 'resize-observer-polyfill';
import { useAttribute } from '../traits/Attribute';
import { useTextContent } from '../traits/TextContent';
import { Test } from '../types';
import { HTML } from './HTML';

globalThis.ResizeObserver = ResizeObserver;

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
