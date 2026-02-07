// HELPERS

export type Condition = (() => boolean) | boolean | 1 | 0;
export type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

export const $test = (val: (() => any) | any, expected: any = true): Condition => {
  const closure = () => {
    const result = typeof val === 'function' ? (val as () => any)() : val;
    return result === expected;
  };
  closure.type = '$test';
  return closure;
};

export const extractStates = (...rest: any): StateType<any>[] => {
  return rest.filter((i: any) => i && Object.hasOwn(i, 'sub')) as StateType<any>[];
};

export const extractConditions = (...rest: any[]): Condition[] => {
  return rest.filter((i: any) => i && i.type === '$test') as Condition[];
};

// STATE

export type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type Boxed<T> = T extends string
  ? String
  : T extends number
  ? Number
  : T extends boolean
  ? Boolean
  : T;

type MethodFn<T, K extends keyof T> = T[K] extends (...args: any[]) => any ? T[K] : never;

export type StateType<T> = {
  call: <K extends keyof Boxed<T>>(method: K, ...params: Parameters<MethodFn<Boxed<T>, K>>) => any;
  reduce: (cb: (prev: T) => T) => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => () => void;
  test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => boolean;
  val: () => T;
  $call: <K extends keyof Boxed<T>>(
    method: K,
    ...params: Parameters<MethodFn<Boxed<T>, K>>
  ) => ReturnType<MethodFn<Boxed<T>, K>>;
  $reduce: (cb: (prev: T) => T) => () => void;
  $set: (atom: T) => () => void;
  $test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => () => boolean;
  $val: () => T;

  _subs: Set<(atom: T) => any>;
};

export function State<T>(param: T): StateType<T> {
  let _internalVal: T = param;
  const _subs: Set<(param: T) => any> = new Set();

  const _set = (atom: T) => {
    _internalVal = atom;
    _subs.forEach((i) => i(atom));
  };
  const $set = (atom: T) => () => _set(atom);

  const _reduce = (cb: (prev: T) => T) => _set(cb(_internalVal));
  const $reduce = (cb: (prev: T) => T) => () => _set(cb(_val()));

  const _sub = (cb: (val: T) => any) => {
    _subs.add(cb);
    return () => _subs.delete(cb);
  };

  const test = (
    predicate: RegExp | T | ((atom: T) => boolean),
    truthCheck: true | false = true,
  ) => {
    if (predicate instanceof RegExp) {
      const result = predicate.test(_internalVal as unknown as string);
      return truthCheck ? result : !result;
    } else if (typeof predicate === 'function' && predicate instanceof Function) {
      const result = (predicate as (atom: T) => boolean)(_internalVal);
      return truthCheck ? result : !result;
    } else {
      const string_comparison = predicate;
      const result = _internalVal === string_comparison;
      return truthCheck ? result : !result;
    }
  };

  const $test = (
    predicate: RegExp | T | ((atom: T) => boolean),
    truthCheck: true | false = true,
  ) => {
    const closure = () => test(predicate, truthCheck);
    closure.sub = _sub;
    closure.type = '$test';
    return closure;
  };

  const _val = (): T => _internalVal;
  const $val = (): T => _internalVal;
  $val.sub = _sub;
  $val.type = '$val';

  const call = (method: any, ...params: any) => (<any>_internalVal)[method](...params);

  const $call = (method: any, params: any) => {
    const closure = () => (<any>_internalVal)[method](params);
    closure.sub = _sub;
    closure.type = '$call';
    return closure;
  };

  const methods: any = {
    $call: $call,
    $reduce: $reduce,
    $set: $set,
    $test: $test,
    $val: $val,
    call: call,
    reduce: _reduce,
    set: _set,
    sub: _sub,
    test: test,
    val: _val,
    _subs,
  };

  return methods;
}

// TEMPLATE

const traitCleanupMap = new WeakMap<HTMLElement | SVGElement, (() => void)[]>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && traitCleanupMap.has(node)) {
          const funcs = traitCleanupMap.get(node)!;
          funcs.forEach((fn) => fn());
          traitCleanupMap.delete(node);
        }
      });
    }
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

type TemplateTraitFunc<Args extends any[] = any[], Return = any> = (...args: Args) => Return;
type TemplateTraitApplier = (el: HTMLElement | SVGElement) => void;
type TemplateReturnType<P extends Record<string, TemplateTraitFunc>> = [
  {
    [K in keyof HTMLElementTagNameMap]: (
      ...traits: (string | number | TemplateTraitApplier | HTMLElement | SVGElement)[]
    ) => HTMLElementTagNameMap[K];
  } & {
    [K in keyof SVGElementTagNameMap]: (
      ...traits: (string | number | TemplateTraitApplier | HTMLElement | SVGElement)[]
    ) => SVGElementTagNameMap[K];
  },
  {
    [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => TemplateTraitApplier;
  },
];

export function Template<P extends Record<string, TemplateTraitFunc>>(
  config?: P,
): TemplateReturnType<P> {
  // HTML proxy: creates elements and applies traits
  const tagProxy = new Proxy(
    {},
    {
      get: (_, prop: string) => {
        const tagFunc = (...traits: TemplateTraitApplier[]) => {
          const svgTags = new Set([
            'svg',
            'g',
            'rect',
            'circle',
            'ellipse',
            'line',
            'polyline',
            'polygon',
            'path',
            'text',
            'defs',
            'use',
            'mask',
            'clipPath',
          ]);

          const el = svgTags.has(prop)
            ? document.createElementNS('http://www.w3.org/2000/svg', prop)
            : document.createElement(prop);

          traits.forEach((trait: any) => {
            // apply
            if (trait.type === 'trait') {
              trait(el);
              // is some type of function
            } else if (typeof trait === 'function') {
              // if a state object
              if (trait.hasOwnProperty('sub')) {
                const text = document.createTextNode('');
                el.appendChild(text);
                const apply = () => (text.data = trait(el) as any);
                apply();
                const unsub = (trait as any).sub(apply);
                traitCleanupMap.set(el, [...(traitCleanupMap.get(el) || []), unsub]);
                // is just a function
              } else {
                el.append(trait(el) as any);
              }
              // static value
            } else {
              el.append(trait);
            }
          });
          return el;
        };
        tagFunc.type = 'tag';
        return tagFunc;
      },
    },
  ) as TemplateReturnType<P>[0];

  // Trait proxy: returns functions that apply themselves to an element
  const traitProxy = new Proxy(
    {},
    {
      get:
        (_, prop: string) =>
        (...args: any[]) => {
          const trait = (el: HTMLElement) => {
            const fn = (<any>config)[prop as keyof P] as (...args: any[]) => any;
            const unsub = fn(el, ...args); // first argument is the element
            const list = traitCleanupMap.get(el) || [];
            list.push(unsub);
            traitCleanupMap.set(el, list);
          };
          trait.type = 'trait';
          return trait;
        },
    },
  ) as TemplateReturnType<P>[1];

  return [tagProxy, traitProxy];
}
