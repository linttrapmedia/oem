interface StateNumberApi {
  value: () => number;
  reset: () => void;
  set: (atom: number) => void;
  sub: (cb: (atom: number) => any) => number;
  inc: (amount: number) => void;
  dec: (amount: number) => void;
}

function StateNumber(atom: number): StateNumberApi {
  const originalAtom = atom;
  let _atom = atom;
  const _subscribers: ((atom: number) => any)[] = [];

  const _set = (atom: number) => ((_atom = atom), _subscribers.forEach((i) => i(_atom)));
  const _sub = (cb: (atom: number) => any) => _subscribers.push(cb);

  function _get() {
    return _atom;
  }
  _get.prototype = { sub: _sub };

  const _extensions = {
    dec: (amount: number) => _set(_atom - amount),
    inc: (amount: number) => _set(_atom + amount),
    reset: () => _set(originalAtom),
  };
  return { value: _get, set: _set, sub: _sub, ..._extensions };
}

const Tags = ['div', 'button'].reduce((acc, key) => {
  acc[key] =
    (...traits: any[]) =>
    (...children: any[]) => {
      const el = document.createElement(key);
      traits.forEach(([trait, ...args]: [keyof typeof TraitRegistry, any]) => TraitRegistry[trait](el, ...args));
      children.forEach((child) => {
        if (typeof child === 'string') el.innerText = child;
        if (child instanceof HTMLElement) el.appendChild(child);
      });
      return el;
    };
  return acc;
}, {} as Record<string, (...traits: any[]) => (...children: any[]) => any>);

function Row(el: HTMLElement, gap: CSSStyleDeclaration['gap'] | number) {
  el.style.display = 'flex';
  el.style.flexDirection = 'row';
  el.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
}

function InnerText(el: HTMLElement, text: string | Function) {
  const run = () => (el.innerText = typeof text === 'function' ? text() : text);
  if (typeof text === 'function' && text.prototype.sub) text.prototype.sub(run);
  run();
}

function OnClick(el: HTMLElement, cb: (...args: any[]) => void, ...args: any[]) {
  el.addEventListener('click', () => cb(...args));
}

const TraitRegistry = {
  row: Row,
  inner_text: InnerText,
  on_click: OnClick,
};

type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;
type Trait<T extends (...args: any[]) => any> = (...args: Tail<Parameters<T>>) => [string, ...any];

const AddTrait =
  <T extends (...args: any[]) => any>(trait: T) =>
  (...args: Tail<Parameters<T>>) =>
    [trait, ...args];

const Traits = {
  row: AddTrait(Row),
  inner_text: AddTrait(InnerText),
  on_click: AddTrait(OnClick),
};

const NewTrait = <T extends (...args: any) => any>(trait: string, func: T) => {
  (<any>TraitRegistry)[trait] = func;
  return (...args: Tail<Parameters<T>>) => [trait, ...args];
};

function trait(name: string) {
  return function (target: any, propertyKey: string) {
    this.traits[name] = target;
  };
}

class OEM {
  tags: Record<string, (...traits: any[]) => (...children: any[]) => any>;
  traits: Record<string, (el: HTMLElement, ...args: any[]) => void>;
  constructor() {}

  @trait('row')
  Row(el: HTMLElement, gap: CSSStyleDeclaration['gap'] | number) {
    el.style.display = 'flex';
    el.style.flexDirection = 'row';
    el.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
  }
}

const oem = new OEM();
oem.traits.row;

// Code

const { row, inner_text, on_click } = Traits;
const { div, button } = Tags;

function CounterExample() {
  const count = StateNumber(1);

  return div(row(30))(
    button(on_click(count.dec, 1))('-'),
    div(inner_text(count.value))(),
    button(on_click(count.inc, 1))('+'),
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const counter = CounterExample();
  console.log(counter);
  document.body.appendChild(counter);
});
