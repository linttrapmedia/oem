// HELPERS

export type Condition = (() => boolean) | boolean | 1 | 0;
export type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

// STORAGE

type StorageType<Data extends Record<string, any>, Sync extends Record<string, any>> = {
  data: {
    [K in keyof Data]: {
      state: StateType<Data[K]>;
      key: string;
      storage: 'localStorage' | 'sessionStorage' | 'memory';
    };
  };
  sync?: {
    [K in keyof Sync]: () => void;
  };
};

export function Storage<Data extends Record<string, any>, Sync extends Record<string, any> = {}>(
  config: StorageType<Data, Sync>,
): {
  data: { [K in keyof Data]: StateType<Data[K]> };
  sync: { [K in keyof Sync]: () => void };
} {
  const { data, sync = {} } = config;

  Object.keys(data).forEach((stateKey) => {
    const { state, key, storage } = data[stateKey];

    if (storage === 'localStorage' || storage === 'sessionStorage') {
      const _storage = storage === 'localStorage' ? window.localStorage : window.sessionStorage;

      const storedVal = _storage.getItem(key);
      if (storedVal) {
        try {
          const parsedVal = JSON.parse(storedVal);
          state.set(parsedVal);
        } catch (e) {
          console.error(`Failed to parse stored value for key "${key}":`, e);
        }
      }

      state.sub((val) => {
        try {
          const serializedVal = JSON.stringify(val);
          _storage.setItem(key, serializedVal);
        } catch (e) {
          console.error(`Failed to serialize value for key "${key}":`, e);
        }
      });
    }
  });

  const methods = {
    data: {} as { [K in keyof Data]: StateType<Data[K]> },
    sync: {} as { [K in keyof Sync]: () => void },
  };

  for (const k in data) {
    methods.data[k] = data[k].state;
  }

  for (const k in sync) {
    (methods.sync as any)[k] = (<any>sync)[k];
  }

  return methods;
}

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

type MethodCall<T, K extends keyof Boxed<T> = keyof Boxed<T>> = K extends K
  ? [K, ...Parameters<MethodFn<Boxed<T>, K>>]
  : never;

export type StateType<T> = {
  call: <K extends keyof Boxed<T>>(method: K, ...params: Parameters<MethodFn<Boxed<T>, K>>) => any;
  chain: (...calls: MethodCall<T>[]) => any;
  reduce: (cb: (prev: T) => T) => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => () => void;
  test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => boolean;
  val: () => T;
  $chain: (...calls: MethodCall<T>[]) => () => any;
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
    const serialized_currentVal = JSON.stringify(_internalVal);
    if (predicate instanceof RegExp) {
      const result = predicate.test(serialized_currentVal);
      return truthCheck ? result : !result;
    } else if (typeof predicate === 'function' && predicate instanceof Function) {
      const result = (predicate as (atom: T) => boolean)(_internalVal);
      return truthCheck ? result : !result;
    } else {
      const string_comparison = JSON.stringify(predicate);
      const result = serialized_currentVal === string_comparison;
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

  const chain = (...calls: MethodCall<T>[]) =>
    calls.reduce((acc: any, [method, ...params]) => acc[method](...params), _internalVal);

  const $chain = (...calls: MethodCall<T>[]) => {
    const closure = () =>
      calls.reduce((acc: any, [method, ...params]) => acc[method](...params), _val());
    closure.sub = _sub;
    closure.type = '$chain';
    return closure;
  };

  const methods: any = {
    $call: $call,
    $chain: $chain,
    $reduce: $reduce,
    $set: $set,
    $test: $test,
    $val: $val,
    call: call,
    chain: chain,
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

const traitCleanupMap = new WeakMap<HTMLElement, (() => void)[]>();
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
          const el = document.createElement(prop);

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
