export function MockEventBus<T>(param: T) {
  let _param: T = param;
  const _subs: ((param: T) => any)[] = [];
  const _get = (): T => _param;
  const _set = (param: T) => ((_param = param), _subs.forEach((i) => i(_param)));
  const _sub = (cb: (atom: T) => any) => _subs.push(cb);
  return { get: _get, set: _set, sub: _sub };
}
