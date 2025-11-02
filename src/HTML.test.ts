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

export const CanCreateBasicTrait: Test = async () => {
  const tests: boolean[] = [];
  let el: HTMLElement;

  const tmpl = HTML({
    red: (el: HTMLElement) => {
      el.style.color = 'red';
      return () => {};
    },
  });

  el = tmpl.div(['red'])('Test Trait');
  tests.push(el.style.color === 'red');

  return { pass: tests.every(Boolean) };
};

export const WillCleanupTraitOnElementRemoval: Test = async (sandbox) => {
  const tests: boolean[] = [];
  let el: HTMLElement;
  let cleanedUp = false;

  const mockTrait = (el: HTMLElement) => {
    return () => {
      cleanedUp = true;
    };
  };

  const tmpl = HTML({
    cleanupTrait: mockTrait,
    secondTraitInstance: mockTrait,
  });

  el = tmpl.div(['cleanupTrait'], ['secondTraitInstance'])('Test Cleanup Trait');
  tests.push(!cleanedUp); // Should not be cleaned up yet
  sandbox?.appendChild(el);

  // Now remove the element, which should remove the event listener from the state object
  el.remove();

  // wait a tick to allow MutationObserver to process
  await Promise.resolve();

  tests.push(cleanedUp); // Should be cleaned up after removal

  return { pass: tests.every(Boolean) };
};
