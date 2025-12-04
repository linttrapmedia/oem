import { $test, State, Template, Test } from '@/oem';
import { useStyleTrait } from './Style';

export const CanApplyStyleTraitToHtml: Test = async () => {
  const state = State<{ fontSize: string }>({ fontSize: '13px' });
  const [tmpl, trait] = Template({ style: useStyleTrait });
  const e1 = tmpl.div(trait.style('fontSize', '12px'));
  const t1 = e1.outerHTML === '<div style="font-size: 12px;"></div>';
  const e2 = tmpl.div(trait.style('fontSize', () => state.val().fontSize, true, state));
  const t2a = e2.outerHTML === '<div style="font-size: 13px;"></div>';
  state.set({ fontSize: '14px' });
  const t2b = e2.outerHTML === '<div style="font-size: 14px;"></div>';
  state.set({ fontSize: '15px' });
  const e3 = tmpl.div(
    trait.style(
      'fontSize',
      () => state.val().fontSize,
      $test(() => false),
      state,
    ),
  );
  const t3 = e3.outerHTML === '<div></div>';
  const e4 = tmpl.div(
    trait.style(
      'fontSize',
      () => state.val().fontSize,
      $test(() => true),
      state,
    ),
  );
  const t4 = e4.outerHTML === '<div style="font-size: 15px;"></div>';
  const state2 = State<string>('15px');
  const e5 = tmpl.div(trait.style('fontSize', state2.$val, state2.$test(/15px/)));
  const t5 = e5.outerHTML === '<div style="font-size: 15px;"></div>';
  console.log(e5.outerHTML);

  const tests = [t1, t2a, t2b, t3, t4, t5];

  return { pass: tests.every(Boolean) };
};

export const CanApplyCssVarWithStyleTraitToHtml: Test = async () => {
  const [tmpl, trait] = Template({ style: useStyleTrait });
  const e1 = tmpl.div(trait.style('--test-var', 'testing'));
  const t1 = e1.outerHTML === '<div style="--test-var: testing;"></div>';
  return { pass: t1 };
};

export const CanApplyStyleTraitToSvg: Test = async () => {
  const [tmpl, trait] = Template({ style: useStyleTrait });
  const e1 = tmpl.circle(trait.style('fontSize', '12px'));
  const t1 = e1.outerHTML === '<circle style="font-size: 12px;"></circle>';
  const e2 = tmpl.circle(trait.style('fontSize', '12px'), trait.style('color', 'red'));
  const t2 = e2.outerHTML === '<circle style="font-size: 12px; color: red;"></circle>';
  return { pass: t1 && t2 };
};
