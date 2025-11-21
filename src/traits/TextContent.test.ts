import { State, Template, Test } from '@/oem';
import { useTextContentTrait } from './TextContent';

export const CanApplyTextContentTraitToHtml: Test = async () => {
  const state = State({ value: 'asdf' });
  const [tmpl, trait] = Template({
    text: useTextContentTrait,
  });

  // static tests
  const e1 = tmpl.div(trait.text('test'));
  const t1 = e1.outerHTML === '<div>test</div>';
  const e2 = tmpl.div(trait.text(() => 'test'));
  const t2 = e2.outerHTML === '<div>test</div>';

  // dynamic tests
  const e3 = tmpl.div(trait.text(() => state.val().value, true, state));
  const t3 = e3.outerHTML === '<div>asdf</div>';

  // condition tests
  const e4 = tmpl.div(trait.text(() => state.val().value, false, state));
  const t4 = e4.outerHTML === '<div></div>';
  const e5 = tmpl.div(
    trait.text(
      () => state.val().value,
      () => false,
      state,
    ),
  );
  const t5 = e5.outerHTML === '<div></div>';
  const e6 = tmpl.div(
    trait.text(
      () => state.val().value,
      () => true,
      state,
    ),
  );
  const t6 = e6.outerHTML === '<div>asdf</div>';
  state.set({ value: 'c1' });
  const e7 = tmpl.div(
    trait.text(
      () => state.val().value,
      () => state.val().value === 'c1',
      state,
    ),
  );
  const t7 = e7.outerHTML === '<div>c1</div>';

  const tests = [t1, t2, t3, t4, t5, t6, t7];

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
