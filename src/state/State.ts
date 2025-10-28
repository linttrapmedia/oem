import { StateType } from '../types';

type Persistence = {
  key: string;
  storage: Storage;
  overwrite?: boolean;
};

function getPersistedVal<T>(param: T, persistence?: Persistence): T {
  if (!persistence) return param;
  const storageParam: any = persistence.storage.getItem(persistence.key);
  const parsedStorageParam = JSON.parse(storageParam);
  const isStorageParamValid = parsedStorageParam !== null && parsedStorageParam !== undefined;
  if ((persistence.overwrite ?? true) && isStorageParamValid) return parsedStorageParam;
  if (!(persistence.overwrite ?? true) && isStorageParamValid) {
    if (Array.isArray(param) && Array.isArray(parsedStorageParam)) {
      return [...param, ...parsedStorageParam] as any;
    } else if (typeof param === 'object' && typeof parsedStorageParam === 'object') {
      return { ...param, ...parsedStorageParam };
    }
  }
  return param;
}

export function State<T>(param: T, persistence?: Persistence): StateType<T> {
  let _val: T = getPersistedVal(param, persistence);
  const _subs: Set<(param: T) => any> = new Set();
  const val = (): T => _val;

  const _set = (atom: T) => {
    _val = atom;
    _subs.forEach((i) => i(atom));
    if (persistence) persistence.storage.setItem(persistence.key, JSON.stringify(atom));
  };
  const $set = (atom: T) => () => _set(atom);

  const reduce = (cb: (prev: T) => T) => _set(cb(_val));
  const $reduce = (cb: (prev: T) => T) => () => _set(cb(val()));

  const _sub = (cb: (val: T) => any) => {
    _subs.add(cb); // Set.add() automatically prevents duplicates of the same function reference
    return () => _unsub(cb);
  };

  const test = (predicate: RegExp | T | ((atom: T) => boolean), truthCheck: true | false = true) => {
    const serialized_currentVal = JSON.stringify(_val);
    if (predicate instanceof RegExp) {
      const result = predicate.test(serialized_currentVal);
      return truthCheck ? result : !result;
    } else if (typeof predicate === 'function' && predicate instanceof Function) {
      const result = (predicate as (atom: T) => boolean)(_val);
      return truthCheck ? result : !result;
    } else {
      const string_comparison = JSON.stringify(predicate);
      const result = serialized_currentVal === string_comparison;
      return truthCheck ? result : !result;
    }
  };

  const $test =
    (predicate: RegExp | T | ((atom: T) => boolean), truthCheck: true | false = true) =>
    () => {
      const serialized_currentVal = JSON.stringify(_val);
      if (predicate instanceof RegExp) {
        const result = predicate.test(serialized_currentVal);
        return truthCheck ? result : !result;
      } else if (typeof predicate === 'function' && predicate instanceof Function) {
        const result = (predicate as (atom: T) => boolean)(_val);
        return truthCheck ? result : !result;
      } else {
        const string_comparison = JSON.stringify(predicate);
        const result = serialized_currentVal === string_comparison;
        return truthCheck ? result : !result;
      }
    };

  const _unsub = (cb: (val: T) => any) => {
    _subs.delete(cb);
  };
  return {
    reduce: reduce,
    set: _set,
    sub: _sub,
    test: test,
    unsub: _unsub,
    val: val,
    $reduce: $reduce,
    $set: $set,
    $test: $test,
  };
}
