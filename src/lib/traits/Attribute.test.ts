import { HTML } from '@/HTML';
import { useAttributeTrait } from '@/lib/traits/Attribute';
import { State } from '@/State';
import { SVG } from '@/SVG';
import { Test } from '@/types';

export const CanApplyAttributeTraitToHtml: Test = async () => {
  const disabled = State(false);
  const other = State('value');
  const tests: boolean[] = [];
  let el;

  const { div } = HTML({
    attr: useAttributeTrait,
  });

  // can add basic attribute
  el = div(['attr', 'id', 'test'])();
  tests.push(el.outerHTML === '<div id="test"></div>');

  // can use call back for value
  el = div(['attr', 'id', () => 'callback'])();
  tests.push(el.outerHTML === '<div id="callback"></div>');

  // can react to state change
  disabled.set(true);
  el = div(['attr', 'disabled', disabled.val, true, disabled])();
  tests.push(el.outerHTML === '<div disabled="true"></div>');

  // can use bit condition
  el = div(['attr', 'disabled', disabled.val, 1, disabled])();
  tests.push(el.outerHTML === '<div disabled="true"></div>');

  // respects 0 condition
  el = div(['attr', 'id', "don't apply", 0, disabled])();
  tests.push(el.outerHTML === '<div></div>');

  // respects multiple conditions
  el = div(['attr', 'id', 'multi', [false, () => true], disabled])();
  tests.push(el.outerHTML === '<div id="multi"></div>');

  // removes attribute when value is undefined
  el = div(['attr', 'id', undefined, 1, disabled])();
  tests.push(el.outerHTML === '<div></div>');

  // reacts to state changes again
  disabled.set(false);
  el = div(['attr', 'disabled', disabled.val, 1, [disabled, other]])();
  tests.push(el.outerHTML === '<div disabled="false"></div>');

  return { pass: tests.every(Boolean) };
};

export const CanApplyAttributeTraitToSvg: Test = async () => {
  const { circle } = SVG({
    attr: useAttributeTrait,
  });
  const e1 = circle(['attr', 'id', 'test'])();
  const t1 = e1.outerHTML === '<circle id="test"></circle>';
  return { pass: t1 };
};
