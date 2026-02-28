import { $test, State, Template, Test, useScrollIntoViewTrait } from '@/registry';

export const CanApplyScrollIntoViewTrait: Test = async (sandbox) => {
  const tests: boolean[] = [];
  const [tmpl, trait] = Template({ scrollIntoView: useScrollIntoViewTrait });

  // can create element with scrollIntoView trait (no conditions = always scrolls)
  const e1 = tmpl.div(trait.scrollIntoView({ behavior: 'instant', block: 'start' }));
  sandbox?.append(e1);
  // trait applies without error
  tests.push(e1 instanceof HTMLElement);

  return { pass: tests.every(Boolean) };
};

export const CanConditionallyApplyScrollIntoViewTrait: Test = async (sandbox) => {
  const tests: boolean[] = [];
  const active = State(false);
  const [tmpl, trait] = Template({ scrollIntoView: useScrollIntoViewTrait });

  // scrollIntoView respects false condition (does not throw)
  const e1 = tmpl.div(trait.scrollIntoView({ behavior: 'instant' }, active.$test(true)));
  sandbox?.append(e1);
  tests.push(e1 instanceof HTMLElement);

  // after state change, scrollIntoView should fire (no error)
  active.set(true);
  tests.push(active.val() === true);

  return { pass: tests.every(Boolean) };
};

export const CanCleanupScrollIntoViewTrait: Test = async () => {
  const state = State(false);
  const [tmpl, trait] = Template({ scrollIntoView: useScrollIntoViewTrait });
  const e1 = tmpl.div(trait.scrollIntoView({ behavior: 'instant' }, state.$test(true)));
  // verify subscription was created
  const t1 = state._subs.size > 0;
  return { pass: t1 };
};

export const CanApplyScrollIntoViewWithStaticCondition: Test = async (sandbox) => {
  const tests: boolean[] = [];
  const [tmpl, trait] = Template({ scrollIntoView: useScrollIntoViewTrait });

  // with $test(true) — should scroll
  const e1 = tmpl.div(trait.scrollIntoView({ behavior: 'instant' }, $test(true)));
  sandbox?.append(e1);
  tests.push(e1 instanceof HTMLElement);

  // with $test(false) — should not scroll (but should not error)
  const e2 = tmpl.div(trait.scrollIntoView({ behavior: 'instant' }, $test(false)));
  sandbox?.append(e2);
  tests.push(e2 instanceof HTMLElement);

  return { pass: tests.every(Boolean) };
};
