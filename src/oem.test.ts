import { HTML, State, SVG, Test } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useTextContentTrait } from '@/traits/TextContent';

export const CanCreateState: Test = async () => {
  const num = State(1);
  const t1 = num.val() === 1;
  return { pass: t1 };
};

export const CanUpdateState: Test = async () => {
  const num = State(1);
  num.set(2);
  const t1 = num.val() === 2;
  return { pass: t1 };
};

export const CanSubscribeToState: Test = async () => {
  const num = State(true);
  let t1 = false;
  num.sub(() => (t1 = true));
  num.set(false);
  return { pass: t1 };
};

export const CanUnSubscribeToState: Test = async () => {
  const num = State(1);
  let t1 = false;
  const cb = () => (t1 = !t1);
  const unsub = num.sub(cb);
  num.set(2);
  unsub();
  num.set(3);
  return { pass: t1 };
};

export const CanSetStateAndPublish: Test = async () => {
  const num = State({
    val: 1,
  });
  let flag = false;
  num.sub(() => (flag = true));
  num.set({ val: 2 });

  const t1 = flag && num.val().val === 2;
  return { pass: t1 };
};

export const CanTestStateValue: Test = async () => {
  const num = State(5);
  const str = State('hello');
  const tests = [
    num.test(5),
    num.test(3, false),
    num.$test(5)(),
    num.$test(3, false)(),
    num.test(/5/),
    num.test(/3/, false),
    num.$test(/5/)(),
    num.$test(/3/, false)(),
    str.test('hello'),
    str.test('world', false),
    str.$test('hello')(),
    str.$test('world', false)(),
    str.test(/hello/),
    str.test(/world/, false),
    str.$test(/hello/)(),
    str.$test(/world/, false)(),
    str.test((val) => val === 'hello'),
    str.test((val) => val === 'world', false),
    str.$test((val) => val === 'hello')(),
    str.$test((val) => val === 'world', false)(),
  ];

  return {
    pass: tests.every((t) => t),
  };
};

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

export const CanApplyMultipleTraitsToSvg: Test = async () => {
  const { circle } = SVG({
    attr: useAttributeTrait,
    text: useTextContentTrait,
  });
  const e1 = circle(['attr', 'id', 'test'], ['text', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test">test</circle>';
  return { pass: t1 };
};

export const CanCreateBasicSvgTagWithText: Test = async () => {
  const { circle } = SVG();
  const test = circle()('test');
  const t1 = test.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};

export const CanCreateEmptySvgTag: Test = async () => {
  const { circle } = SVG();
  const t1 = circle()().outerHTML === '<circle></circle>';
  return { pass: t1 };
};

export const HasValidSvgNamespace: Test = async () => {
  const { circle } = SVG({
    attr: useAttributeTrait,
  });
  const t1 = circle(['attr', 'id', '1'])().namespaceURI === 'http://www.w3.org/2000/svg';
  return { pass: t1 };
};
