import { $test, State, Template, Test } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';

export const CanApplyAttributeTraitToHtml: Test = async () => {
  const disabled = State(false);
  const other = State('value');
  const tests: boolean[] = [];
  let el;

  const [tmpl, trait] = Template({
    attr: useAttributeTrait,
  });

  // can add basic attribute
  el = tmpl.div(trait.attr('id', 'test'));
  tests.push(el.outerHTML === '<div id="test"></div>');

  // can use call back for value
  el = tmpl.div(trait.attr('id', () => 'callback'));
  tests.push(el.outerHTML === '<div id="callback"></div>');

  // can react to state change
  disabled.set(true);
  el = tmpl.div(trait.attr('disabled', disabled.val, disabled));
  tests.push(el.outerHTML === '<div disabled="true"></div>');

  // can use bit condition
  el = tmpl.div(trait.attr('disabled', disabled.val, disabled));
  tests.push(el.outerHTML === '<div disabled="true"></div>');

  // respects false condition
  el = tmpl.div(trait.attr('id', "don't apply", disabled, $test(false)));
  tests.push(el.outerHTML === '<div></div>');

  // respects multiple conditions
  el = tmpl.div(
    trait.attr(
      'id',
      'multi',
      disabled,
      $test(true),
      $test(() => true),
    ),
  );
  tests.push(el.outerHTML === '<div id="multi"></div>');

  // respects multiple conditions with one false
  el = tmpl.div(
    trait.attr(
      'id',
      'multi',
      disabled,
      $test(true),
      $test(() => false),
    ),
  );
  tests.push(el.outerHTML === '<div></div>');

  // removes attribute when value is undefined
  el = tmpl.div(trait.attr('id', undefined, disabled));
  tests.push(el.outerHTML === '<div></div>');

  // reacts to state changes again
  disabled.set(false);
  el = tmpl.div(trait.attr('disabled', disabled.val, disabled.$test(false)));
  tests.push(el.outerHTML === '<div disabled="false"></div>');

  // tunnels state through $val
  other.set('newValue');
  el = tmpl.div(trait.attr('data-test', other.$val));
  other.set('updatedValue');
  tests.push(el.outerHTML === '<div data-test="updatedValue"></div>');
  console.log(el.outerHTML);

  // tunnels state through $test
  const testState = State(1);
  el = tmpl.div(trait.attr('data-test', testState.val, testState.$test(/1|2/)));
  testState.set(2);
  tests.push(el.outerHTML === '<div data-test="2"></div>');

  return { pass: tests.every(Boolean) };
};

export const CanApplyAttributeTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({
    attr: useAttributeTrait,
  });
  const e1 = tmpl.circle(trait.attr('id', 'test'));
  const t1 = e1.outerHTML === '<circle id="test"></circle>';
  return { pass: t1 };
};
