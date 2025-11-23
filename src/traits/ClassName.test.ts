import { State, Template, Test } from '@/oem';
import { useClassNameTrait } from '@/traits/ClassName';

export const CanApplyClassNameTraitToHtml: Test = async () => {
  const tests: boolean[] = [];
  let el;
  let stateA: any;
  let stateB: any;
  const [tmpl, trait] = Template({
    classname: useClassNameTrait,
  });

  // basic test
  el = tmpl.div(trait.classname('c1'), trait.classname('c1'));
  tests.push(el.outerHTML === '<div class="c1"></div>');

  // // add multiple classes
  el = tmpl.div(trait.classname('c1 c2'));
  tests.push(el.outerHTML === '<div class="c1 c2"></div>');

  // // dynamic class name
  el = tmpl.div(trait.classname(() => 'c1'));
  tests.push(el.outerHTML === '<div class="c1"></div>');

  // state driven class name
  stateA = State('one');
  el = tmpl.div(trait.classname(stateA.val, stateA));
  tests.push(el.outerHTML === '<div class="one"></div>');
  stateA.set('two');
  tests.push(el.outerHTML === '<div class="two"></div>');

  // multiple states
  stateA = State('a');
  stateB = State('b');
  el = tmpl.div(trait.classname(() => `${stateA.val()} ${stateB.val()}`, stateA, stateB));
  tests.push(el.outerHTML === '<div class="a b"></div>');
  stateB.set('c');
  tests.push(el.outerHTML === '<div class="a c"></div>');
  stateA.set('d');
  tests.push(el.outerHTML === '<div class="d c"></div>');

  // // conditional class names
  el = tmpl.div(trait.classname('c1', false));
  tests.push(el.outerHTML === '<div></div>');

  // conditional class names true
  el = tmpl.div(trait.classname('c1', true));
  tests.push(el.outerHTML === '<div class="c1"></div>');

  // bit true condition
  el = tmpl.div(trait.classname('c1', 1));
  tests.push(el.outerHTML === '<div class="c1"></div>');

  // bit false condition
  el = tmpl.div(trait.classname('c1', 0));
  tests.push(el.outerHTML === '<div></div>');

  // callback condition
  el = tmpl.div(trait.classname('c1', () => false));
  tests.push(el.outerHTML === '<div></div>');

  // callback condition true
  el = tmpl.div(trait.classname('c1', () => true));
  tests.push(el.outerHTML === '<div class="c1"></div>');

  el = tmpl.div(trait.classname('c1', () => false));
  tests.push(el.outerHTML === '<div></div>');

  el = tmpl.div(trait.classname('c1', () => true));
  tests.push(el.outerHTML === '<div class="c1"></div>');

  // multiple conditions
  el = tmpl.div(
    trait.classname('c1', () => true),
    trait.classname('c2', () => false),
  );
  tests.push(el.outerHTML === '<div class="c1"></div>');

  // multiple attr tests
  el = tmpl.div(trait.classname('c1 c2', true), trait.classname('', true));
  tests.push(el.outerHTML === '<div class=""></div>');

  // test subscription tunneling on $test, also test to make sure subs are deduped
  const autoSubState = State(true);
  el = tmpl.div(
    trait.classname('c1 c2', autoSubState.$test(true)),
    trait.classname(
      '',
      autoSubState.$test(false),
      autoSubState,
      autoSubState,
      autoSubState,
      autoSubState.$test(true),
    ),
  );
  autoSubState.set(false);
  tests.push(el.outerHTML === '<div class=""></div>');
  tests.push(autoSubState._subs.size === 2);

  // test value tunneling on $val, also test to make sure subs are deduped
  stateA = State('a');
  el = tmpl.div(trait.classname(stateA.$val));
  stateA.set('tunneled');
  tests.push(el.outerHTML === '<div class="tunneled"></div>');

  return { pass: tests.every(Boolean) };
};

export const CanApplyClassNameTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({ classname: useClassNameTrait });
  const e1 = tmpl.circle(trait.classname('c1'));
  const t1 = e1.outerHTML === '<circle class="c1"></circle>';
  const e2 = tmpl.circle(trait.classname('c1 c2'));
  const t2 = e2.outerHTML === '<circle class="c1 c2"></circle>';
  const e3 = tmpl.circle(trait.classname('c1', false));
  const t3 = e3.outerHTML === '<circle></circle>';
  const e4 = tmpl.circle(trait.classname('c1', true));
  const t4 = e4.outerHTML === '<circle class="c1"></circle>';
  const e5 = tmpl.circle(trait.classname('c1', () => false));
  const t5 = e5.outerHTML === '<circle></circle>';
  const e6 = tmpl.circle(trait.classname('c1', () => true));
  const t6 = e6.outerHTML === '<circle class="c1"></circle>';
  const e7 = tmpl.circle(trait.classname('c1 c2', true), trait.classname('', true));
  const t7 = e7.outerHTML === '<circle class=""></circle>';
  const tests = [t1, t2, t3, t4, t5, t6, t7];
  return { pass: tests.every(Boolean) };
};
