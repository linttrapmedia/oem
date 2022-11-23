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

type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never;

type Trait = {
  row: [el: HTMLElement, gap: CSSStyleDeclaration['gap'] | number];
  inner_text: [el: HTMLElement, text: string | Function];
  on_click: [el: HTMLElement, cb: (...args: any[]) => void, ...args: any[]];
};

function Row(...[el, gap]: Trait['row']) {
  el.style.display = 'flex';
  el.style.flexDirection = 'row';
  el.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
}

function InnerText(...[el, text]: Trait['inner_text']) {
  const run = () => (el.innerText = typeof text === 'function' ? text() : text);
  if (typeof text === 'function' && text.prototype.sub) text.prototype.sub(run);
  run();
}

function OnClick(...[el, cb, ...args]: Trait['on_click']) {
  el.addEventListener('click', () => cb(...args));
}

const TraitMap = {
  row: Row,
  inner_text: InnerText,
  on_click: OnClick,
};

const trait =
  <T extends keyof typeof TraitMap>(trait: T) =>
  (...args: Tail<Trait[T]>) =>
    [trait, ...args];

const custom = <T extends (...args: any) => any>(trait: string, func: T) => {
  (<any>TraitMap)[trait] = func;
  return (...args: Tail<Parameters<T>>) => [trait, ...args];
};

const traits = Object.keys(TraitMap).reduce((acc, key: keyof typeof TraitMap) => {
  acc[key] = trait(key);
  return acc;
}, {} as Record<keyof typeof TraitMap, (...args: any) => any>);

const tags = ['div', 'button'].reduce((acc, key) => {
  acc[key] =
    (...traits: any[]) =>
    (...children: any[]) => {
      const el = document.createElement(key);
      traits.forEach(([trait, ...args]: [keyof typeof TraitMap, any]) => TraitMap[trait](el, ...args));
      children.forEach((child) => {
        if (typeof child === 'string') el.innerText = child;
        if (child instanceof HTMLElement) el.appendChild(child);
      });
      return el;
    };
  return acc;
}, {} as Record<string, (...traits: any[]) => (...children: any[]) => any>);

// const suffix = custom('suffix', (el: HTMLElement, text: string | Function) => {
//   const run = () => (el.innerText = el.innerText + (typeof text === 'function' ? text() : text));
//   if (typeof text === 'function' && text.prototype.sub) text.prototype.sub(run);
//   run();
// });

// Code

const { row, inner_text, on_click } = traits;
const { div, button } = tags;

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
