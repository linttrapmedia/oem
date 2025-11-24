import { Condition, StateType } from '@/oem';

export function useStyleTrait(
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const isTestCond = (i: any) => typeof i === 'function' && i.type === '$test';
  const states = rest.filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item: any) => !isStateObj(item) || isTestCond(item));
  if (el.tagName === 'BUTTON' && prop === 'backgroundColor') {
    console.log(el, states, conditions);
  }
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
