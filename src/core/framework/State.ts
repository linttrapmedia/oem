import { Types } from './types'

function Atom<T>(atom: T): Types.Atom<T>
function Atom<T>(atom: T): Types.Atom<T>
function Atom<T>(atom: T) {
  let _atom = atom
  const _subscribers: ((atom: T) => any)[] = []
  const _get = (): T => _atom
  const _set = (atom: T) => ((_atom = atom), _subscribers.forEach(i => i(_atom)))
  const _sub = (cb: (atom: T) => any) => _subscribers.push(cb)
  return { get: _get, set: _set, sub: _sub }
}

// TODO serialize an object or array of atoms
const Serialize = () => {}

export const State = {
  Atom,
  Serialize,
}
