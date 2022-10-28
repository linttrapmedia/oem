import { Types } from './types';

function Atom<T>(atom: T): Types.Atom<T>;
function Atom<T>(atom: T): Types.Atom<T>;
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

type NumberMathBase = {
  [Func in Extract<
    keyof Math,
    | 'abs'
    | 'ceil'
    | 'cbrt'
    | 'clz32'
    | 'exp'
    | 'expm1'
    | 'fround'
    | 'log'
    | 'log10'
    | 'log1p'
    | 'log2'
    | 'round'
    | 'sign'
    | 'sqrt'
    | 'trunc'
  >]: () => void;
};

interface NumberAtom extends NumberMathBase {
  pow: (pow: number) => void;
  add: (amount: number) => void;
  subtract: (amount: number) => void;
}
function Number(atom: number): Types.Atom<number> & NumberAtom;
function Number(atom: number): Types.Atom<number> & NumberAtom;
function Number(atom: number): Types.Atom<number> & NumberAtom {
  const originalAtom = atom;
  let _atom = atom;
  const _subscribers: ((atom: T) => any)[] = [];
  const _get = (): number => _atom;
  const _set = (atom: number) => ((_atom = atom), _subscribers.forEach((i) => i(_atom)));
  const _sub = (cb: (atom: number) => any) => _subscribers.push(cb);
  const _reset = () => _set(originalAtom);
  const _math = {
    add: (amount: number) => _set(_get() + amount),
    abs: () => _set(Math.floor(_get())),
    cbrt: () => _set(Math.cbrt(_get())),
    ceil: () => _set(Math.ceil(_get())),
    clz32: () => _set(Math.clz32(_get())),
    exp: () => _set(Math.exp(_get())),
    expm1: () => _set(Math.expm1(_get())),
    floor: () => _set(Math.floor(_get())),
    fround: () => _set(Math.fround(_get())),
    log: () => _set(Math.log(_get())),
    log10: () => _set(Math.log10(_get())),
    log1p: () => _set(Math.log1p(_get())),
    log2: () => _set(Math.log2(_get())),
    pow: (pow: number) => _set(Math.pow(_get(), pow)),
    round: () => _set(Math.round(_get())),
    sign: () => _set(Math.sign(_get())),
    subtract: (amount: number) => _set(_get() - amount),
    sqrt: () => _set(Math.sqrt(_get())),
    trunc: () => _set(Math.trunc(_get())),
  };

  return { get: _get, set: _set, sub: _sub, reset: _reset, ..._math };
}

// TODO serialize an object or array of atoms
const Serialize = () => {};

export const State = {
  Atom,
  Number,
  Serialize,
};
