export type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type Boxed<T> = T extends string
  ? String
  : T extends number
    ? Number
    : T extends boolean
      ? Boolean
      : T;

type MethodFn<T, K extends keyof T> = T[K] extends (...args: any[]) => any ? T[K] : never;

type CustomMethods<T, M> = {
  [K in keyof M]: M[K] extends (state: StateType<T, M>, ...args: infer P) => infer R
    ? (...args: P) => R
    : never;
} & {
  [K in keyof M as `$${string & K}`]: M[K] extends (
    state: StateType<T, M>,
    ...args: infer P
  ) => infer R
    ? (...args: P) => () => R
    : never;
};

export type StateType<T, M = {}> = {
  call: <K extends keyof Boxed<T>>(method: K, ...params: Parameters<MethodFn<Boxed<T>, K>>) => any;
  reduce: (cb: (prev: T) => T) => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => () => void;
  test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => boolean;
  val: () => T;
  $call: <K extends keyof Boxed<T>>(
    method: K,
    ...params: Parameters<MethodFn<Boxed<T>, K>>
  ) => ReturnType<MethodFn<Boxed<T>, K>>;
  $reduce: (cb: (prev: T) => T) => () => void;
  $set: (atom: T) => () => void;
  $test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => () => boolean;
  $val: () => T;

  _subs: Set<(atom: T) => any>;
} & CustomMethods<T, M>;

export function State<
  T,
  M extends Record<string, (state: StateType<T, M>, ...args: any[]) => any> = {},
>(param: T, customMethods?: M): StateType<T, M> {
  let _internalVal: T = param;
  const _subs: Set<(param: T) => any> = new Set();

  const _set = (atom: T) => {
    _internalVal = atom;
    _subs.forEach((i) => i(atom));
  };
  const $set = (atom: T) => () => _set(atom);
  const _reduce = (cb: (prev: T) => T) => _set(cb(_internalVal));
  const $reduce = (cb: (prev: T) => T) => () => _set(cb(_val()));

  const _sub = (cb: (val: T) => any) => {
    _subs.add(cb);
    return () => _subs.delete(cb);
  };

  const test = (
    predicate: RegExp | T | ((atom: T) => boolean),
    truthCheck: true | false = true,
  ) => {
    if (predicate instanceof RegExp) {
      const result = predicate.test(_internalVal as unknown as string);
      return truthCheck ? result : !result;
    } else if (typeof predicate === 'function' && predicate instanceof Function) {
      const result = (predicate as (atom: T) => boolean)(_internalVal);
      return truthCheck ? result : !result;
    } else {
      const string_comparison = predicate;
      const result = _internalVal === string_comparison;
      return truthCheck ? result : !result;
    }
  };

  const $test = (
    predicate: RegExp | T | ((atom: T) => boolean),
    truthCheck: true | false = true,
  ) => {
    const closure = () => test(predicate, truthCheck);
    closure.sub = _sub;
    closure.type = '$test';
    return closure;
  };

  const _val = (): T => _internalVal;
  const $val = (): T => _internalVal;
  $val.sub = _sub;
  $val.type = '$val';

  const call = (method: any, ...params: any) => (<any>_internalVal)[method](...params);

  const $call = (method: any, ...params: any) => {
    const closure = () => (<any>_internalVal)[method](...params);
    closure.sub = _sub;
    closure.type = '$call';
    return closure;
  };

  const methods: any = {
    $call: $call,
    $reduce: $reduce,
    $set: $set,
    $test: $test,
    $val: $val,
    call: call,
    reduce: _reduce,
    set: _set,
    sub: _sub,
    test: test,
    val: _val,
    _subs,
  };

  // Add custom methods with the state object bound as first parameter
  if (customMethods) {
    for (const key in customMethods) {
      // Regular method
      methods[key] = (...args: any[]) => customMethods[key](methods, ...args);
      // $ callback version
      methods[`$${key}`] =
        (...args: any[]) =>
        () =>
          customMethods[key](methods, ...args);
    }
  }

  return methods;
}
