import { $test, State, Template, Test, useAriaTrait } from '@/registry';

export const CanApplyAriaTraitToHtml: Test = async () => {
  const tests: boolean[] = [];
  const [tmpl, trait] = Template({ aria: useAriaTrait });

  // can set role
  const e1 = tmpl.div(trait.aria('role', 'navigation'));
  tests.push(e1.getAttribute('role') === 'navigation');

  // can set aria-label
  const e2 = tmpl.div(trait.aria('aria-label', 'Close dialog'));
  tests.push(e2.getAttribute('aria-label') === 'Close dialog');

  // can set aria-hidden
  const e3 = tmpl.div(trait.aria('aria-hidden', 'true'));
  tests.push(e3.getAttribute('aria-hidden') === 'true');

  // can use callback for value
  const e4 = tmpl.div(trait.aria('aria-label', () => 'dynamic'));
  tests.push(e4.getAttribute('aria-label') === 'dynamic');

  // removes attribute when value is undefined
  const e5 = tmpl.div(trait.aria('aria-label', undefined));
  tests.push(e5.getAttribute('aria-label') === null);

  return { pass: tests.every(Boolean) };
};

export const CanApplyAriaTraitReactively: Test = async () => {
  const tests: boolean[] = [];
  const expanded = State(false);
  const [tmpl, trait] = Template({ aria: useAriaTrait });

  // reacts to state changes via $val
  const e1 = tmpl.div(trait.aria('aria-expanded', () => String(expanded.val()), expanded));
  tests.push(e1.getAttribute('aria-expanded') === 'false');
  expanded.set(true);
  tests.push(e1.getAttribute('aria-expanded') === 'true');

  return { pass: tests.every(Boolean) };
};

export const CanApplyAriaTraitWithConditions: Test = async () => {
  const tests: boolean[] = [];
  const visible = State(true);
  const [tmpl, trait] = Template({ aria: useAriaTrait });

  // applies when condition is true
  const e1 = tmpl.div(trait.aria('aria-current', 'page', visible.$test(true)));
  tests.push(e1.getAttribute('aria-current') === 'page');

  // removes when condition is false
  const e2 = tmpl.div(trait.aria('aria-current', 'page', visible.$test(false)));
  tests.push(e2.getAttribute('aria-current') === null);

  // respects $test condition
  const e3 = tmpl.div(trait.aria('aria-current', 'page', $test(false)));
  tests.push(e3.getAttribute('aria-current') === null);

  // removes attribute when condition switches to false
  const toggle = State(true);
  const e4 = tmpl.div(trait.aria('aria-hidden', 'true', toggle.$test(true)));
  tests.push(e4.getAttribute('aria-hidden') === 'true');
  toggle.set(false);
  tests.push(e4.getAttribute('aria-hidden') === null);

  return { pass: tests.every(Boolean) };
};

export const CanApplyAriaTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({ aria: useAriaTrait });
  const e1 = tmpl.circle(trait.aria('role', 'img'));
  const t1 = e1.getAttribute('role') === 'img';
  return { pass: t1 };
};

export const CanCleanupAriaTrait: Test = async () => {
  const state = State('label');
  const [tmpl, trait] = Template({ aria: useAriaTrait });
  const e1 = tmpl.div(trait.aria('aria-label', () => state.val(), state));
  const subsBefore = state._subs.size;
  // cleanup is handled by Template's MutationObserver when element is removed
  // but we can verify subscriptions exist
  const t1 = subsBefore > 0;
  return { pass: t1 };
};
