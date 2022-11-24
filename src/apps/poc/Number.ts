import { State } from './Types';

export function NumberAtom(atom: number): State<number> & {
  dec: (amount: number) => void;
  inc: (amount: number) => void;
} {
  const originalAtom = atom;
  let _atom = atom;
  const _subscribers: ((atom: number) => any)[] = [];
  const _set = (atom: number) => ((_atom = atom), _subscribers.forEach((i) => i(_atom)));
  const _sub = (cb: (atom: number) => any) => _subscribers.push(cb);
  const _val = () => _atom;
  const _extensions = {
    dec: (amount: number) => _set(_atom - amount),
    inc: (amount: number) => _set(_atom + amount),
    reset: () => _set(originalAtom),
  };
  _val.prototype = { sub: _sub, atom: 'Number' };
  return { val: _val, set: _set, sub: _sub, ..._extensions };
}
