import { Types } from './types';

function Atom<T>(atom: T): Types.Atom<T> {
  const originalAtom: T = atom;
  let _atom: T = atom;
  const _subscribers: ((atom: T) => any)[] = [];
  const _get = (): T => _atom;
  const _reset = () => _set(originalAtom);
  const _set = (atom: T) => ((_atom = atom), _subscribers.forEach((i) => i(_atom)));
  const _sub = (cb: (atom: T) => any) => _subscribers.push(cb);
  return { get: _get, reset: _reset, set: _set, sub: _sub };
}

function ArrayAtom<T>(atom: T[] = []): Types.AtomArray<T> {
  let _atom: T[] = [...atom];
  const _subscribers: ((atom: T[]) => any)[] = [];
  const _call = () => _subscribers.forEach((i) => i(_atom));
  const _get = (): T[] => _atom;
  const _set = (atom: T[]) => ((_atom = atom), _subscribers.forEach((i) => i(_atom)));
  const _sub = (cb: (atom: T[]) => any) => _subscribers.push(cb);
  const _extensions = {
    at: _atom.at,
    concat: (...items: ConcatArray<T>[]) => {
      _set(_atom.concat(...items)) as unknown as T[];
      _call();
      return _atom;
    },
    copyWithin: (target: number, start: number, end?: number) => {
      _set(_atom.copyWithin(target, start, end));
      _call();
      return _atom;
    },
    entries: _atom.entries,
    every: _atom.every,
    fill: (value: T, start?: number, end?: number) => {
      _set(_atom.fill(value, start, end));
      _call();
      return _atom;
    },
    filter: (f: (value: T, index: number, array: T[]) => unknown) => {
      _set(_atom.filter(f));
      _call();
      return _atom;
    },
    filterSet: (callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any) => {
      _set(_atom.filter(callbackfn, thisArg));
      _call();
      return _atom;
    },
    find: _atom.find,
    findIndex: _atom.findIndex,
    flat: (depth?: number): T[] => {
      _set((depth ? _atom.flat(depth) : _atom.flat()) as T[]);
      _call();
      return _atom;
    },
    flatSet: (depth?: number) => {
      _set((depth ? _atom.flat(depth) : _atom.flat()) as T[]);
      _call();
      return _atom;
    },
    flatMap: _atom.flatMap,
    flatMapSet: (callbackfn: (value: T, index: number, array: T[]) => T[], thisArg?: any): T[] => {
      _set(_atom.flatMap(callbackfn, thisArg));
      _call();
      return _atom;
    },
    forEach: _atom.forEach,
    includes: (searchElement: T, fromIndex?: number) => _atom.includes(searchElement, fromIndex),
    indexOf: _atom.indexOf,
    join: _atom.join,
    keys: _atom.keys,
    lastIndexOf: _atom.lastIndexOf,
    map: _atom.map,
    mapSet: (callbackfn: (value: T, index: number, array: T[]) => T, thisArg?: any): T[] => {
      _set(_atom.map(callbackfn, thisArg));
      _call();
      return _atom;
    },
    pop: () => {
      const popped = _atom.pop();
      _call();
      return popped;
    },
    push: (...items: T[]) => {
      _set([..._atom, ...items]);
      _call();
      return _atom;
    },
  };
  return { get: _get, set: _set, sub: _sub, ..._extensions };
}

function NumberAtom(atom: number): Types.AtomNumber {
  const originalAtom = atom;
  let _atom = atom;
  const _subscribers: ((atom: number) => any)[] = [];
  const _get = (): number => _atom;
  const _set = (atom: number) => ((_atom = atom), _subscribers.forEach((i) => i(_atom)));
  const _sub = (cb: (atom: number) => any) => _subscribers.push(cb);
  const _reset = () => _set(originalAtom);
  const _extensions = {
    add: (amount: number) => _set(_atom + amount),
    abs: () => _set(Math.floor(_atom)),
    cbrt: () => _set(Math.cbrt(_atom)),
    ceil: () => _set(Math.ceil(_atom)),
    clz32: () => _set(Math.clz32(_atom)),
    exp: () => _set(Math.exp(_atom)),
    expm1: () => _set(Math.expm1(_atom)),
    floor: () => _set(Math.floor(_atom)),
    fround: () => _set(Math.fround(_atom)),
    log: () => _set(Math.log(_atom)),
    log10: () => _set(Math.log10(_atom)),
    log1p: () => _set(Math.log1p(_atom)),
    log2: () => _set(Math.log2(_atom)),
    pow: (pow: number) => _set(Math.pow(_atom, pow)),
    round: () => _set(Math.round(_atom)),
    sign: () => _set(Math.sign(_atom)),
    subtract: (amount: number) => _set(_atom - amount),
    sqrt: () => _set(Math.sqrt(_atom)),
    trunc: () => _set(Math.trunc(_atom)),
  };
  return { get: _get, set: _set, sub: _sub, reset: _reset, ..._extensions };
}

function SetAtom<T>(atom: T): Types.AtomSet<T> {
  const originalAtom = atom;
  let _atom: Set<T> = new Set<T>();
  if (atom) _atom.add(atom);
  const _subscribers: ((atom: Set<T>) => any)[] = [];
  const _call = () => _subscribers.forEach((i) => i(_atom));
  const _get = (): Set<T> => _atom;
  const _set = (atom: T) => ((_atom = new Set()), atom ? _atom.add(atom) : null, _call());
  const _sub = (cb: (atom: Set<T>) => any) => _subscribers.push(cb);
  const _reset = () => _set(originalAtom);
  const _extensions = {
    add: (item: T) => (_atom.add(item), _call()),
    clear: () => (_atom.clear(), _call()),
    delete: (item: T) => (_atom.delete(item), _call()),
    entries: _atom.entries,
    forEach: _atom.forEach,
    has: _atom.has,
    keys: _atom.keys,
    values: _atom.values,
  };
  return { get: _get, set: _set, sub: _sub, reset: _reset, ..._extensions };
}

// TODO serialize an object or array of atoms
const Serialize = () => {};

export const State = {
  Atom,
  Array: ArrayAtom,
  Number: NumberAtom,
  Set: SetAtom,
  Serialize,
};
