import { Condition, extractConditions, extractStates, StateType } from '@/registry';

export function useAnimationTrait(
  el: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes | (() => Keyframe[] | PropertyIndexedKeyframes),
  options: number | KeyframeAnimationOptions | (() => number | KeyframeAnimationOptions),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);
  let current: Animation | null = null;

  const apply = () => {
    const _keyframes = typeof keyframes === 'function' ? keyframes() : keyframes;
    const _options = typeof options === 'function' ? options() : options;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      if (current) current.cancel();
      current = el.animate(_keyframes, _options);
    }
  };

  apply();
  const unsubs = states.map((state) => state.sub(apply));

  return () => {
    if (current) current.cancel();
    unsubs.forEach((unsub) => unsub());
  };
}
