import { State, Template, Test } from '@/oem';
import { useTextContentTrait } from './TextContent';

export const CanApplyTextContentTraitToHtml: Test = async () => {
  const state = State({ value: 'asdf' });
  const [tmpl, trait] = Template({
    text: useTextContentTrait,
  });

  let el: HTMLElement;
  let tests: boolean[] = [];

  // static tests
  el = tmpl.div(trait.text('test'));
  tests.push(el.outerHTML === '<div>test</div>');

  el = tmpl.div(trait.text(() => 'test'));
  tests.push(el.outerHTML === '<div>test</div>');

  // dynamic tests
  el = tmpl.div(trait.text(() => state.val().value, true, state));
  tests.push(el.outerHTML === '<div>asdf</div>');

  // condition tests
  el = tmpl.div(trait.text(() => state.val().value, false, state));
  tests.push(el.outerHTML === '<div></div>');

  el = tmpl.div(
    trait.text(
      () => state.val().value,
      () => false,
      state,
    ),
  );
  tests.push(el.outerHTML === '<div></div>');

  el = tmpl.div(
    trait.text(
      () => state.val().value,
      () => true,
      state,
    ),
  );
  tests.push(el.outerHTML === '<div>asdf</div>');
  state.set({ value: 'c1' });

  el = tmpl.div(
    trait.text(
      () => state.val().value,
      () => state.val().value === 'c1',
      state,
    ),
  );
  tests.push(el.outerHTML === '<div>c1</div>');

  return { pass: tests.every(Boolean) };
};

export const CanApplyTextContentTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({
    text: useTextContentTrait,
  });
  const e1 = tmpl.circle(trait.text('test'));
  const t1 = e1.outerHTML === '<circle>test</circle>';
  return { pass: t1 };
};
