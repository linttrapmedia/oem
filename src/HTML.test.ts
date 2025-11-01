import { HTML } from '@/HTML';
import { useAttributeTrait } from '@/lib/traits/Attribute';
import { useTextContentTrait } from '@/lib/traits/TextContent';
import { Test } from '@/types';

export const CanApplyMultipleTraitsToHtml: Test = async () => {
  const { div } = HTML({
    attr: useAttributeTrait,
    text: useTextContentTrait,
  });
  const e1 = div(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<div id="test">test</div>';
  return { pass: t1 };
};

export const CanCreateBasicHtmlTagWithText: Test = async () => {
  const { div } = HTML();
  const test = div()('test');
  const t1 = test.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanCreateEmptyHtmlTag: Test = async () => {
  const { div } = HTML();
  const t1 = div()().outerHTML === '<div></div>';
  return { pass: t1 };
};

export const HasValidHtmlNamespace: Test = async () => {
  const { div } = HTML({
    attr: useAttributeTrait,
  });
  const t1 = div(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/1999/xhtml';
  return { pass: t1 };
};
