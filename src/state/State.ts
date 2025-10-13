import { CbFunction, StateType } from '../types';

type Persistence = {
  key: string;
  storage: Storage;
  overwrite?: boolean;
};

export function State<T>(param: T, persistence?: Persistence): StateType<T> {
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

  const _set = (atom: T) => {
    _param = atom;
    _subscribers.forEach((i) => i(atom));
    if (persistence) persistence.storage.setItem(persistence.key, JSON.stringify(atom));
  };

  const _sub = (cb: (param: T) => any) => {
    if (!_subscribers.includes(cb)) _subscribers.push(cb);
  };

  const _unsub = (cb: (param: T) => any) => _subscribers.splice(_subscribers.indexOf(cb), 1);

  const _cb: CbFunction<T> = (mode, arg) => {
    if (mode === 'reduce') {
      return () => {
        _set((arg as any)(_param as any));
        return true;
      };
    }
    if (mode === 'eq') return () => arg === _param;
    if (mode === 'neq') return () => arg !== _param;
    throw new Error('Invalid mode');
  };

  return {
    cb: _cb,
    get: _get,
    set: _set,
    sub: _sub,
    unsub: _unsub,
  };
}
