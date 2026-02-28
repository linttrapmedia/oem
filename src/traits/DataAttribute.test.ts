import { $test, State, Template, Test, useDataAttributeTrait } from '@/registry';

export const CanApplyDataAttributeTraitToHtml: Test = async () => {
  const tests: boolean[] = [];
  const [tmpl, trait] = Template({ data: useDataAttributeTrait });

  // can set data attribute with bare name
  const e1 = tmpl.div(trait.data('id', '42'));
  tests.push(e1.dataset.id === '42');

  // can set data attribute with data- prefix
  const e2 = tmpl.div(trait.data('data-id', '42'));
  tests.push(e2.dataset.id === '42');

  // can set kebab-case data attribute
  const e3 = tmpl.div(trait.data('active-tab', 'home'));
  tests.push(e3.dataset.activeTab === 'home');

  // can set with data- prefix and kebab-case
  const e4 = tmpl.div(trait.data('data-active-tab', 'home'));
  tests.push(e4.dataset.activeTab === 'home');

  // can use callback for value
  const e5 = tmpl.div(trait.data('status', () => 'open'));
  tests.push(e5.dataset.status === 'open');

  // removes attribute when value is undefined
  const e6 = tmpl.div(trait.data('id', undefined));
  tests.push(e6.dataset.id === undefined);

  // boolean value is stringified
  const e7 = tmpl.div(trait.data('active', true));
  tests.push(e7.dataset.active === 'true');

  // numeric value is stringified
  const e8 = tmpl.div(trait.data('count', 5));
  tests.push(e8.dataset.count === '5');

  return { pass: tests.every(Boolean) };
};

export const CanApplyDataAttributeReactively: Test = async () => {
  const tests: boolean[] = [];
  const status = State('idle');
  const [tmpl, trait] = Template({ data: useDataAttributeTrait });

  // reacts to state changes via $val
  const e1 = tmpl.div(trait.data('status', status.$val));
  tests.push(e1.dataset.status === 'idle');
  status.set('loading');
  tests.push(e1.dataset.status === 'loading');
  status.set('done');
  tests.push(e1.dataset.status === 'done');

  return { pass: tests.every(Boolean) };
};

export const CanApplyDataAttributeWithConditions: Test = async () => {
  const tests: boolean[] = [];
  const active = State(true);
  const [tmpl, trait] = Template({ data: useDataAttributeTrait });

  // applies when condition is true
  const e1 = tmpl.div(trait.data('selected', 'true', active.$test(true)));
  tests.push(e1.dataset.selected === 'true');

  // removes when condition is false
  const e2 = tmpl.div(trait.data('selected', 'true', active.$test(false)));
  tests.push(e2.dataset.selected === undefined);

  // respects $test condition
  const e3 = tmpl.div(trait.data('selected', 'true', $test(false)));
  tests.push(e3.dataset.selected === undefined);

  // removes when condition switches to false
  const toggle = State(true);
  const e4 = tmpl.div(trait.data('visible', 'true', toggle.$test(true)));
  tests.push(e4.dataset.visible === 'true');
  toggle.set(false);
  tests.push(e4.dataset.visible === undefined);

  return { pass: tests.every(Boolean) };
};

export const CanApplyDataAttributeTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({ data: useDataAttributeTrait });
  const e1 = tmpl.circle(trait.data('id', 'test'));
  const t1 = (e1 as unknown as HTMLElement).dataset.id === 'test';
  return { pass: t1 };
};

export const CanCleanupDataAttributeTrait: Test = async () => {
  const state = State('value');
  const [tmpl, trait] = Template({ data: useDataAttributeTrait });
  const e1 = tmpl.div(trait.data('test', () => state.val(), state));
  // verify subscription was created
  const t1 = state._subs.size > 0;
  return { pass: t1 };
};
