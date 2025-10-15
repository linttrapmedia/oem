import { StateType } from '../types';

type Persistence = {
  key: string;
  storage: Storage;
  overwrite?: boolean;
};

function getVal<T>(param: T, persistence?: Persistence): T {
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
  let _val: T = getVal(param, persistence);
  const _subs: ((param: T) => any)[] = [];
  const $val = (): T => _val;

  const _set = (atom: T) => {
    _val = atom;
    _subs.forEach((i) => i(atom));
    if (persistence) persistence.storage.setItem(persistence.key, JSON.stringify(atom));
  };
  const $set = (atom: T) => () => _set(atom);

  const reduce = (cb: (prev: T) => T) => _set(cb(_val));
  const $reduce = (cb: (prev: T) => T) => () => _set(cb($val()));

  const _sub = (cb: (val: T) => any) => {
    if (!_subs.includes(cb)) _subs.push(cb);
  };

  const test = (regexOrVal: RegExp | T, checkFor: true | false = true) => {
    const serialized_currentVal = JSON.stringify(_val);
    if (regexOrVal instanceof RegExp) {
      const result = regexOrVal.test(serialized_currentVal);
      return checkFor ? result : !result;
    } else {
      const serialized_regex = JSON.stringify(regexOrVal);
      const result = serialized_currentVal === serialized_regex;
      return checkFor ? result : !result;
    }
  };

  const $test =
    (regexOrVal: RegExp | T, checkFor: true | false = true) =>
    () => {
      const serialized_currentVal = JSON.stringify(_val);
      if (regexOrVal instanceof RegExp) {
        const result = regexOrVal.test(serialized_currentVal);
        return checkFor ? result : !result;
      } else {
        const serialized_regex = JSON.stringify(regexOrVal);
        const result = serialized_currentVal === serialized_regex;
        return checkFor ? result : !result;
      }
    };

  const _unsub = (cb: (val: T) => any) => _subs.splice(_subs.indexOf(cb), 1);

  return {
    val: _val,
    reduce: reduce,
    set: _set,
    sub: _sub,
    test: test,
    unsub: _unsub,
    $val: $val,
    $reduce: $reduce,
    $set: $set,
    $test: $test,
  };
}
