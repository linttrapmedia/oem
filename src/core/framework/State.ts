const Atom = <T>(atom: T): Types.Atom<T> => {
  let _atom = atom;
  const subscribers: ((atom: T) => any)[] = [];
  const get = (): T => _atom;
  const set = (atom: T) => ((_atom = atom), subscribers.forEach((i) => i(_atom)));
  const sub = (cb: () => any) => subscribers.push(cb);
  return { get, set, sub };
};

// TODO serialize an object or array of atoms
const Serialize = () => {};

export const State = {
  Atom,
  Serialize,
};
