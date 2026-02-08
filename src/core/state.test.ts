import { State } from './state';
import type { Test } from './types';

export const CanCreateState: Test = async () => {
  const num = State(1);
  const t1 = num.val() === 1;
  return { pass: t1 };
};

export const CanUpdateState: Test = async () => {
  const num = State(1);
  num.set(2);
  const t1 = num.val() === 2;
  return { pass: t1 };
};

export const CanSubscribeToState: Test = async () => {
  const num = State(true);
  let t1 = false;
  num.sub(() => (t1 = true));
  num.set(false);
  return { pass: t1 };
};

export const CanUnSubscribeToState: Test = async () => {
  const num = State(1);
  let t1 = false;
  const cb = () => (t1 = !t1);
  const unsub = num.sub(cb);
  num.set(2);
  unsub();
  num.set(3);
  return { pass: t1 };
};

export const CanSetStateAndPublish: Test = async () => {
  const num = State({
    val: 1,
  });
  let flag = false;
  num.sub(() => (flag = true));
  num.set({ val: 2 });

  const t1 = flag && num.val().val === 2;
  return { pass: t1 };
};

export const CanTestStateValue: Test = async () => {
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

export const CanUseCustomMethods: Test = async () => {
  const counter = State(
    { count: 0 },
    {
      increment: (state) => {
        state.reduce((prev) => ({ count: prev.count + 1 }));
      },
      decrement: (state) => {
        state.reduce((prev) => ({ count: prev.count - 1 }));
      },
    },
  );

  counter.increment();
  const t1 = counter.val().count === 1;

  counter.increment();
  const t2 = counter.val().count === 2;

  counter.decrement();
  const t3 = counter.val().count === 1;

  return { pass: t1 && t2 && t3 };
};

export const CanUseCustomMethodsWithParameters: Test = async () => {
  const counter = State(
    { count: 0 },
    {
      incrementBy: (state, amount: number) => {
        state.reduce((prev) => ({ count: prev.count + amount }));
      },
      multiplyBy: (state, factor: number) => {
        state.reduce((prev) => ({ count: prev.count * factor }));
      },
    },
  );

  counter.incrementBy(5);
  const t1 = counter.val().count === 5;

  counter.incrementBy(3);
  const t2 = counter.val().count === 8;

  counter.multiplyBy(2);
  const t3 = counter.val().count === 16;

  return { pass: t1 && t2 && t3 };
};

export const CanUseDeferredCustomMethods: Test = async () => {
  const counter = State(
    { count: 0 },
    {
      increment: (state) => {
        state.reduce((prev) => ({ count: prev.count + 1 }));
      },
    },
  );

  // Get deferred version
  const deferredIncrement = counter.$increment();

  // Should not execute yet
  const t1 = counter.val().count === 0;

  // Execute the deferred function
  deferredIncrement();
  const t2 = counter.val().count === 1;

  deferredIncrement();
  const t3 = counter.val().count === 2;

  return { pass: t1 && t2 && t3 };
};

export const CanUseDeferredCustomMethodsWithParameters: Test = async () => {
  const counter = State(
    { count: 0 },
    {
      incrementBy: (state, amount: number) => {
        state.reduce((prev) => ({ count: prev.count + amount }));
      },
    },
  );

  // Get deferred version with parameter
  const addFive = counter.$incrementBy(5);
  const addTen = counter.$incrementBy(10);

  // Should not execute yet
  const t1 = counter.val().count === 0;

  // Execute the deferred functions
  addFive();
  const t2 = counter.val().count === 5;

  addTen();
  const t3 = counter.val().count === 15;

  addFive();
  const t4 = counter.val().count === 20;

  return { pass: t1 && t2 && t3 && t4 };
};

export const CanAccessStateMethodsInCustomMethods: Test = async () => {
  let subscriptionCalled = false;

  const counter = State(
    { count: 0, name: 'test' },
    {
      reset: (state) => {
        const currentName = state.val().name;
        state.set({ count: 0, name: currentName });
      },
      getCount: (state) => {
        return state.val().count;
      },
      doubleIfPositive: (state) => {
        if (state.test((val) => val.count > 0)) {
          state.reduce((prev) => ({ ...prev, count: prev.count * 2 }));
        }
      },
    },
  );

  counter.sub(() => {
    subscriptionCalled = true;
  });

  counter.reduce((prev) => ({ ...prev, count: 5 }));
  const t1 = counter.getCount() === 5;
  const t2 = subscriptionCalled;

  counter.doubleIfPositive();
  const t3 = counter.val().count === 10;

  counter.reset();
  const t4 = counter.val().count === 0;
  const t5 = counter.val().name === 'test';

  return { pass: t1 && t2 && t3 && t4 && t5 };
};
