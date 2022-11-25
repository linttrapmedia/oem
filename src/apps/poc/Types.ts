export type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;
export type Trait = (el: HTMLElement, ...args: any[]) => (...args: any[]) => void;
export enum TraitTypes {
  attr = 'attr',
  text = 'text',
  node = 'node',
}
export type State<T> = {
  reset: () => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => T;
  val: () => T;
};
