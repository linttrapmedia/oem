import { $test, State, Template, Test } from '@/oem';
import { useEventTrait } from './Event';
import { useStyleOnEventTrait } from './StyleOnEvent';

export const CanApplyStyleOnEventWithStaticValue: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(trait.styleOnEvent('click', 'color', 'red'));
  const t1 = el.outerHTML === '<div></div>';
  console.log(el.outerHTML);
  el.click();
  const t2 = el.outerHTML === '<div style="color: red;"></div>';
  return { pass: t1 && t2 };
};

export const CanApplyStyleOnEventWithFunctionValue: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(trait.styleOnEvent('click', 'fontSize', () => '16px'));
  el.click();
  const t1 = el.outerHTML === '<div style="font-size: 16px;"></div>';
  return { pass: t1 };
};

export const CanApplyStyleOnEventWithState: Test = async () => {
  const color = State('blue');
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(trait.styleOnEvent('click', 'color', color.$val));
  el.click();
  const t1 = el.outerHTML === '<div style="color: blue;"></div>';
  color.set('green');
  el.click();
  const t2 = el.outerHTML === '<div style="color: green;"></div>';
  return { pass: t1 && t2 };
};

export const CanApplyStyleOnEventWithConditionTrue: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(
    trait.styleOnEvent(
      'click',
      'color',
      'red',
      $test(() => true),
    ),
  );
  el.click();
  const t1 = el.outerHTML === '<div style="color: red;"></div>';
  return { pass: t1 };
};

export const CanApplyStyleOnEventWithConditionFalse: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(
    trait.styleOnEvent(
      'click',
      'color',
      'red',
      $test(() => false),
    ),
  );
  el.click();
  const t1 = el.outerHTML === '<div></div>';
  return { pass: t1 };
};

export const CanApplyStyleOnEventWithStateAndCondition: Test = async () => {
  const state = State<{ active: boolean }>({ active: true });
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(
    trait.styleOnEvent(
      'click',
      'color',
      'red',
      state.$test((s) => s.active),
    ),
  );
  el.click();
  const t1 = el.outerHTML === '<div style="color: red;"></div>';
  state.set({ active: false });
  const t2 = el.outerHTML === '<div style="color: red;"></div>'; // Style already applied, condition only prevents new applications
  return { pass: t1 && t2 };
};

export const CanApplyCssVarOnEvent: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(trait.styleOnEvent('click', '--my-var', 'test-value'));
  el.click();
  const t1 = el.outerHTML === '<div style="--my-var: test-value;"></div>';
  return { pass: t1 };
};

export const CanApplyNumericStyleOnEvent: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(trait.styleOnEvent('click', 'opacity', 0.5));
  el.click();
  const t1 = el.outerHTML === '<div style="opacity: 0.5;"></div>';
  return { pass: t1 };
};

export const CanApplyMultipleStylesOnEvent: Test = async () => {
  const [tmpl, trait] = Template({ event: useEventTrait, styleOnEvent: useStyleOnEventTrait });
  const el = tmpl.div(
    trait.styleOnEvent('click', 'color', 'red'),
    trait.styleOnEvent('click', 'fontSize', '20px'),
  );
  el.click();
  const t1 = el.outerHTML === '<div style="color: red; font-size: 20px;"></div>';
  return { pass: t1 };
};
