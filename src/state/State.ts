import { StateType } from '../types';

type Persistence = {
  key: string;
  storage: Storage;
  overwrite?: boolean;
};

export function State<T>(param: T, persistence?: Persistence): StateType<T> {
  const originalParam: T = param;

  // handle persistence defaults
  if (persistence) {
    const storageParam: any = persistence.storage.getItem(persistence.key);
    const parsedStorageParam = JSON.parse(storageParam);
    const isStorageParamValid = parsedStorageParam !== null && parsedStorageParam !== undefined;
    if ((persistence.overwrite ?? true) && isStorageParamValid) param = parsedStorageParam;
    if (!(persistence.overwrite ?? true) && isStorageParamValid) {
      if (Array.isArray(param) && Array.isArray(parsedStorageParam)) {
        param = [...param, ...parsedStorageParam] as any;
      } else if (typeof param === 'object' && typeof parsedStorageParam === 'object') {
        param = { ...param, ...parsedStorageParam };
      }
    }
  }

  let _param: T = param;
  const _subscribers: ((param: T) => any)[] = [];
  const _get = (): T => _param;
  const _reduce = (cb: (param: T) => T) => () => _set(cb(_param));
  const _reset = () => _set(originalParam);
  const _set = (param: T) => {
    _param = param;
    _subscribers.forEach((i) => i(_param));
    if (persistence) persistence.storage.setItem(persistence.key, JSON.stringify(_param));
  };
  const _sub = (cb: (param: T) => any) => _subscribers.push(cb);
  const _unsub = (cb: (param: T) => any) => _subscribers.splice(_subscribers.indexOf(cb), 1);
  return { get: _get, reset: _reset, reduce: _reduce, set: _set, sub: _sub, unsub: _unsub };
}
