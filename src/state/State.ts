import { StateType } from '../types';

function deepSet<T>(obj: T, pathKeys: string, value: any): T {
  const path = pathKeys.split('.');
  const update = (obj: any, path: (string | number)[], value: any): any => {
    const [head, ...tail] = path;
    if (tail.length === 0) {
      return Array.isArray(obj)
        ? [...obj.slice(0, head as number), value, ...obj.slice((head as number) + 1)]
        : { ...obj, [head]: value };
    }

    if (obj[head] === undefined) {
      obj[head] = typeof tail[0] === 'number' ? [] : {};
    }

    return {
      ...obj,
      [head]: update(obj[head], tail, value),
    };
  };

  return update(obj, path as (string | number)[], value);
}

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
  const _pub = () => _subscribers.forEach((i) => i(_param));
  const _reduce = (cb: (param: T) => T) => () => _set(cb(_param));
  const _reset = () => _set(originalParam);
  const _set = (param: T) => {
    _param = param;
    _subscribers.forEach((i) => i(_param));
    if (persistence) persistence.storage.setItem(persistence.key, JSON.stringify(_param));
  };
  const _deepSet = (path: string, value: any) => _set(deepSet(_param, path, value));
  const _sub = (cb: (param: T) => any) => _subscribers.push(cb);
  const _unsub = (cb: (param: T) => any) => _subscribers.splice(_subscribers.indexOf(cb), 1);
  return {
    deepSet: _deepSet,
    get: _get,
    pub: _pub,
    reset: _reset,
    reduce: _reduce,
    set: _set,
    sub: _sub,
    unsub: _unsub,
  };
}
