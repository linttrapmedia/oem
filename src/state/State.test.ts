import { Test } from '../types';
import { State } from './State';

export const CanCreateState: Test = () => {
  const num = State(1);
  const t1 = num.val() === 1;
  return { pass: t1 };
};

export const CanUpdateState: Test = () => {
  const num = State(1);
  num.set(2);
  const t1 = num.val() === 2;
  return { pass: t1 };
};

export const CanSubscribeToState: Test = () => {
  const num = State(true);
  let t1 = false;
  num.sub(() => (t1 = true));
  num.set(false);
  return { pass: t1 };
};

export const CanUnSubscribeToState: Test = () => {
  const num = State(1);
  let t1 = false;
  const cb = () => (t1 = !t1);
  num.sub(cb);
  num.set(2);
  num.unsub(cb);
  num.set(3);
  return { pass: t1 };
};

export const CanSetStateAndPublish: Test = () => {
  const num = State({
    val: 1,
  });
  let flag = false;
  num.sub(() => (flag = true));
  num.set({ val: 2 });

  const t1 = flag && num.val().val === 2;
  return { pass: t1 };
};

export const CanTestStateValue: Test = () => {
  const num = State(5);
  const str = State('hello');
  const tests = [
    num.test(5),
    num.test(3, false),
    num.$test(5)(),
    num.$test(3, false)(),
    num.test(/5/),
    num.test(/3/, false),
    num.$test(/5/)(),
    num.$test(/3/, false)(),
    str.test('hello'),
    str.test('world', false),
    str.$test('hello')(),
    str.$test('world', false)(),
    str.test(/hello/),
    str.test(/world/, false),
    str.$test(/hello/)(),
    str.$test(/world/, false)(),
    str.test((val) => val === 'hello'),
    str.test((val) => val === 'world', false),
    str.$test((val) => val === 'hello')(),
    str.$test((val) => val === 'world', false)(),
  ];

  return {
    pass: tests.every((t) => t),
  };
};
