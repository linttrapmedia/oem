import { useAttributeTrait, useTextContentTrait } from '@/registry';
import { Template } from './template';
import type { Test } from './types';

export const CanApplyMultipleTraitsToHtml: Test = async () => {
  const [tmpl, trait] = Template({
    attr: useAttributeTrait,
    text: useTextContentTrait,
  });
  const e1 = tmpl.div(trait.attr('id', 'test'), trait.text('test'));
  const t1 = e1.outerHTML === '<div id="test">test</div>';
  return { pass: t1 };
};

export const CanCreateBasicHtmlTagWithText: Test = async () => {
  const [tmpl] = Template();
  const test = tmpl.div('test');
  const t1 = test.outerHTML === '<div>test</div>';
  return { pass: t1 };
};

export const CanCreateEmptyHtmlTag: Test = async () => {
  const [tmpl] = Template();
  const t1 = tmpl.div().outerHTML === '<div></div>';
  return { pass: t1 };
};

export const HasValidHtmlNamespace: Test = async () => {
  const [tmpl, trait] = Template({
    attr: useAttributeTrait,
  });
  const t1 = tmpl.div(trait.attr('id', '1')).namespaceURI === 'http://www.w3.org/1999/xhtml';
  return { pass: t1 };
};

export const CanCreateBasicTrait: Test = async () => {
  const tests: boolean[] = [];
  let el;

  const [tmpl, trait] = Template({
    red: (el: HTMLElement) => {
      el.style.color = 'red';
      return () => {};
    },
  });

  el = tmpl.div(trait.red(), 'Test Trait');
  tests.push(el.style.color === 'red');

  return { pass: tests.every(Boolean) };
};

export const WillCleanupTraitOnElementRemoval: Test = async (sandbox) => {
  const tests: boolean[] = [];
  let el;
  let cleanedUp = false;

  const mockTrait = (el: HTMLElement) => {
    return () => {
      cleanedUp = true;
    };
  };

  const [tmpl, trait] = Template({
    cleanupTrait: mockTrait,
    secondTraitInstance: mockTrait,
  });

  el = tmpl.div(trait.cleanupTrait(), trait.secondTraitInstance(), 'Test Cleanup Trait');
  tests.push(!cleanedUp); // Should not be cleaned up yet
  sandbox?.appendChild(el);

  // Now remove the element, which should remove the event listener from the state object
  el.remove();

  // wait a tick to allow MutationObserver to process
  await Promise.resolve();

  tests.push(cleanedUp); // Should be cleaned up after removal

  return { pass: tests.every(Boolean) };
};

export const CanApplyMultipleTraitsToSvg: Test = async () => {
  const [tmpl, trait] = Template({
    attr: useAttributeTrait,
    text: useTextContentTrait,
  });
  const e1 = tmpl.circle(trait.attr('id', 'test'), trait.text('test'));
  const t1 = e1.outerHTML === '<circle id="test">test</circle>';
  return { pass: t1 };
};

export const CanCreateBasicSvgTagWithText: Test = async () => {
  const [tmpl] = Template();
  const test = tmpl.circle('test');
  const t1 = test.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanCreateEmptySvgTag: Test = async () => {
  const [tmpl] = Template();
  const t1 = tmpl.circle().outerHTML === '<circle></circle>';
  return { pass: t1 };
};
