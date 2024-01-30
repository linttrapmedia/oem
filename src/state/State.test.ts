import { Test } from '../types';
import { State } from './State';

export const CanCreateState: Test = () => {
  const num = State(1);
  const t1 = num.get() === 1;
  return { pass: t1 };
};

export const CanUpdateState: Test = () => {
  const num = State(1);
  num.set(2);
  const t1 = num.get() === 2;
  return { pass: t1 };
};

export const CanSubscribeToState: Test = () => {
  const num = State(1);
  let t1 = false;
  num.sub(() => (t1 = true));
  num.set(2);
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

export const CanResetState: Test = () => {
  const num = State(1);
  num.set(2);
  num.reset();
  const t1 = num.get() === 1;
  return { pass: t1 };
};
