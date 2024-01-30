import { StateType } from '../types';

export function State<T>(param: T): StateType<T> {
  const originalParam: T = param;
  let _param: T = param;
  const _subscribers: ((param: T) => any)[] = [];
  const _get = (): T => _param;
  const _reduce = (cb: (param: T) => T) => () => _set(cb(_param));
  const _reset = () => _set(originalParam);
  const _set = (param: T) => ((_param = param), _subscribers.forEach((i) => i(_param)));
  const _sub = (cb: (param: T) => any) => _subscribers.push(cb);
  const _unsub = (cb: (param: T) => any) => _subscribers.splice(_subscribers.indexOf(cb), 1);
  return { get: _get, reset: _reset, reduce: _reduce, set: _set, sub: _sub, unsub: _unsub };
}
