import { $test, State, Template, Test } from '@/registry';
import { useAnimationTrait } from './Animation';

export const CanApplyBasicAnimation: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation([{ opacity: '0' }, { opacity: '1' }], { duration: 300, fill: 'forwards' }),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 1;
  el.remove();
  return { pass: t1 };
};

export const CanApplyAnimationWithNumericDuration: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(trait.animation([{ opacity: '0' }, { opacity: '1' }], 250));
  sandbox?.append(el);
  const animations = el.getAnimations();
  const t1 = animations.length === 1;
  const timing = animations[0]?.effect?.getTiming?.();
  const t2 = timing ? timing.duration === 250 : false;
  el.remove();
  return { pass: t1 && t2 };
};

export const CanApplyAnimationWithKeyframeOptions: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [
        { transform: 'translateX(0)', opacity: '1' },
        { transform: 'translateX(100px)', opacity: '0' },
      ],
      { duration: 500, easing: 'ease-out', fill: 'forwards', iterations: 1 },
    ),
  );
  sandbox?.append(el);
  const animations = el.getAnimations();
  const t1 = animations.length === 1;
  const timing = animations[0]?.effect?.getTiming?.();
  const t2 = timing ? timing.easing === 'ease-out' : false;
  const t3 = timing ? timing.fill === 'forwards' : false;
  el.remove();
  return { pass: t1 && t2 && t3 };
};

export const CanApplyAnimationWithPropertyIndexedKeyframes: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      { opacity: ['0', '0.5', '1'], transform: ['scale(0.8)', 'scale(1.1)', 'scale(1)'] },
      { duration: 400, fill: 'forwards' },
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 1;
  el.remove();
  return { pass: t1 };
};

export const CanApplyAnimationWithFunctionKeyframes: Test = async (sandbox) => {
  const state = State<number>(100);
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      () => [{ transform: 'translateX(0)' }, { transform: `translateX(${state.val()}px)` }],
      { duration: 300, fill: 'forwards' },
      state,
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 1;
  state.set(200);
  const t2 = el.getAnimations().length === 1;
  el.remove();
  return { pass: t1 && t2 };
};

export const CanApplyAnimationWithFunctionOptions: Test = async (sandbox) => {
  const speed = State<number>(300);
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [{ opacity: '0' }, { opacity: '1' }],
      () => ({ duration: speed.val(), fill: 'forwards' as FillMode }),
      speed,
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 1;
  const timing1 = el.getAnimations()[0]?.effect?.getTiming?.();
  const t2 = timing1 ? timing1.duration === 300 : false;
  speed.set(500);
  const t3 = el.getAnimations().length === 1;
  const timing2 = el.getAnimations()[0]?.effect?.getTiming?.();
  const t4 = timing2 ? timing2.duration === 500 : false;
  el.remove();
  return { pass: t1 && t2 && t3 && t4 };
};

export const CanConditionallyApplyAnimation: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [{ opacity: '0' }, { opacity: '1' }],
      { duration: 300 },
      $test(() => true),
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 1;
  el.remove();
  return { pass: t1 };
};

export const CanPreventAnimationWithFalseCondition: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [{ opacity: '0' }, { opacity: '1' }],
      { duration: 300 },
      $test(() => false),
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 0;
  el.remove();
  return { pass: t1 };
};

export const CanReactivelyTriggerAnimationOnStateChange: Test = async (sandbox) => {
  const visible = State<boolean>(false);
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [{ opacity: '0' }, { opacity: '1' }],
      { duration: 200, fill: 'forwards' },
      visible.$test(true),
      visible,
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 0;
  visible.set(true);
  const t2 = el.getAnimations().length === 1;
  el.remove();
  return { pass: t1 && t2 };
};

export const CanCancelPreviousAnimationOnRetrigger: Test = async (sandbox) => {
  const counter = State<number>(0);
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [{ opacity: '0' }, { opacity: '1' }],
      { duration: 1000, fill: 'forwards' },
      counter,
    ),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 1;
  counter.set(1);
  const t2 = el.getAnimations().length === 1;
  counter.set(2);
  const t3 = el.getAnimations().length === 1;
  el.remove();
  return { pass: t1 && t2 && t3 };
};

export const CanCleanupAnimation: Test = async (sandbox) => {
  const el = document.createElement('div');
  sandbox?.append(el);
  const cleanup = useAnimationTrait(el, [{ opacity: '0' }, { opacity: '1' }], {
    duration: 5000,
    fill: 'forwards',
  });
  const t1 = el.getAnimations().length === 1;
  cleanup();
  const t2 = el.getAnimations().length === 0;
  el.remove();
  return { pass: t1 && t2 };
};

export const CanApplyInfiniteAnimation: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
      duration: 1000,
      iterations: Infinity,
    }),
  );
  sandbox?.append(el);
  const animations = el.getAnimations();
  const t1 = animations.length === 1;
  const timing = animations[0]?.effect?.getTiming?.();
  const t2 = timing ? timing.iterations === Infinity : false;
  el.remove();
  return { pass: t1 && t2 };
};

export const CanApplyMultipleAnimationsToSameElement: Test = async (sandbox) => {
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation([{ opacity: '0' }, { opacity: '1' }], { duration: 300, fill: 'forwards' }),
    trait.animation([{ transform: 'scale(0.9)' }, { transform: 'scale(1)' }], {
      duration: 300,
      fill: 'forwards',
    }),
  );
  sandbox?.append(el);
  const t1 = el.getAnimations().length === 2;
  el.remove();
  return { pass: t1 };
};

export const CanApplyAnimationWithStateCondition: Test = async (sandbox) => {
  const mode = State<'enter' | 'exit'>('enter');
  const [tmpl, trait] = Template({ animation: useAnimationTrait });
  const el = tmpl.div(
    trait.animation(
      [{ opacity: '0' }, { opacity: '1' }],
      { duration: 200, fill: 'forwards' },
      mode.$test('enter'),
      mode,
    ),
    trait.animation(
      [{ opacity: '1' }, { opacity: '0' }],
      { duration: 200, fill: 'forwards' },
      mode.$test('exit'),
      mode,
    ),
  );
  sandbox?.append(el);
  // Only the enter animation fires initially
  const t1 = el.getAnimations().length === 1;
  mode.set('exit');
  // Enter animation persists (trait doesn't cancel on false condition),
  // exit animation starts — so 2 animations are present
  const t2 = el.getAnimations().length === 2;
  el.remove();
  return { pass: t1 && t2 };
};
