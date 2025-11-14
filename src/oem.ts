// HELPERS

type RestArgs<T extends unknown[]> = T extends [any, ...infer U] ? U : never;
export type Condition = (() => boolean) | boolean | 1 | 0;
export type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>;

type Persistence = {
  key: string;
  storage: Storage;
  overwrite?: boolean;
};

function getPersistedVal<T>(param: T, persistence?: Persistence): T {
  if (!persistence) return param;
  const storageParam: any = persistence.storage.getItem(persistence.key);
  const parsedStorageParam = JSON.parse(storageParam);
  const isStorageParamValid = parsedStorageParam !== null && parsedStorageParam !== undefined;
  if ((persistence.overwrite ?? true) && isStorageParamValid) return parsedStorageParam;
  if (!(persistence.overwrite ?? true) && isStorageParamValid) {
    if (Array.isArray(param) && Array.isArray(parsedStorageParam)) {
      return [...param, ...parsedStorageParam] as any;
    } else if (typeof param === 'object' && typeof parsedStorageParam === 'object') {
      return { ...param, ...parsedStorageParam };
    }
  }
  return param;
}

// STATE

type Boxed<T> = T extends string ? String : T extends number ? Number : T extends boolean ? Boolean : T;

type MethodsOf<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};

type ProtoMethods<T> = {
  // all normal methods
  [K in keyof MethodsOf<Boxed<T>> as K extends string ? K : never]: MethodsOf<Boxed<T>>[K];
} & {
  // $-prefixed methods
  [K in keyof MethodsOf<Boxed<T>> as K extends string ? `$${K}` : never]: MethodsOf<Boxed<T>>[K] extends (
    ...args: infer A
  ) => infer R
    ? (...args: A) => () => R
    : never;
};

export type StateType<T> = {
  reduce: (cb: (prev: T) => T) => void;
  set: (atom: T) => void;
  sub: (cb: (atom: T) => any) => () => void;
  test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => boolean;
  val: () => T;
  $reduce: (cb: (prev: T) => T) => () => void;
  $set: (atom: T) => () => void;
  $test: (regex: RegExp | T | ((atom: T) => boolean), checkFor?: true | false) => () => boolean;
  $val: () => T;
  _subs: Set<(atom: T) => any>;
  proto: ProtoMethods<T>;
};

export function State<T>(param: T, persistence?: Persistence): StateType<T> {
  let _internalVal: T = getPersistedVal(param, persistence);
  const _subs: Set<(param: T) => any> = new Set();

  const _set = (atom: T) => {
    _internalVal = atom;
    _subs.forEach((i) => i(atom));
    if (persistence) persistence.storage.setItem(persistence.key, JSON.stringify(atom));
  };
  const $set = (atom: T) => () => _set(atom);

  const _reduce = (cb: (prev: T) => T) => _set(cb(_internalVal));
  const $reduce = (cb: (prev: T) => T) => () => _set(cb(_val()));

  const _sub = (cb: (val: T) => any) => {
    _subs.add(cb);
    return () => _subs.delete(cb);
  };

  const test = (predicate: RegExp | T | ((atom: T) => boolean), truthCheck: true | false = true) => {
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

  const $test = (predicate: RegExp | T | ((atom: T) => boolean), truthCheck: true | false = true) => {
    const closure = () => test(predicate, truthCheck);
    closure.sub = _sub;
    closure.type = '$test';
    return closure;
  };

  const _val = (): T => _internalVal;
  const $val = (): T => _internalVal;
  $val.sub = _sub;
  $val.type = '$val';

  const _proto = new Proxy(
    {},
    {
      get: (_, prop: string) => {
        // Box primitives
        const boxedVal: any = _internalVal instanceof Object ? _internalVal : Object(_internalVal);

        if (prop.startsWith('$')) {
          const actualProp = prop.slice(1);
          const fn = boxedVal[actualProp];

          if (typeof fn === 'function') {
            // assert fn is callable
            return (...args: any[]) => {
              // tunnel subscription to $ callbacks
              const closure = () => (fn as (...args: any[]) => any).apply(_val(), args);
              closure.sub = _sub;
              return closure;
            };
          }

          return () => fn; // for properties
        }

        const val = boxedVal[prop];
        if (typeof val === 'function') return val.bind(boxedVal);
        return val;
      },
    },
  );

  const methods: any = {
    $reduce: $reduce,
    $set: $set,
    $test: $test,
    proto: _proto as ProtoMethods<T>,
    reduce: _reduce,
    set: _set,
    sub: _sub,
    test: test,
    val: _val,
    $val: $val,
    _subs,
  };

  if (typeof _internalVal === 'string') {
    methods.append = (str: string) => _set(((_internalVal as unknown as string) + str) as T);
    methods.prepend = (str: string) => _set((str + (_internalVal as unknown as string)) as T);
    methods.$append = (str: string) => () => methods.append(str);
    methods.$prepend = (str: string) => () => methods.prepend(str);
  }

  if (typeof _internalVal === 'number') {
    methods.increment = (by: number = 1) => _set(((_internalVal as unknown as number) + by) as T);
    methods.decrement = (by: number = 1) => _set(((_internalVal as unknown as number) - by) as T);
    methods.$increment =
      (by: number = 1) =>
      () =>
        methods.increment(by);
    methods.$decrement =
      (by: number = 1) =>
      () =>
        methods.decrement(by);
  }

  return methods;
}

// HTML

// Global observer and registry
const traitCleanupMap = new WeakMap<HTMLElement, (() => void)[]>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement && traitCleanupMap.has(node)) {
          // Call all cleanup functions for this element
          const funcs = traitCleanupMap.get(node)!;
          funcs.forEach((fn) => fn());
          traitCleanupMap.delete(node);
        }
      });
    }
  }
});

// Start observing once
observer.observe(document.documentElement, { childList: true, subtree: true });

function Trait<T extends any[]>(traitFn: (...args: T) => () => void) {
  return (...traitProps: T) => {
    const el: HTMLElement = traitProps[0] as HTMLElement;
    const cleanupFunc = traitFn(...traitProps);

    // Register cleanup function
    const list = traitCleanupMap.get(el) || [];
    list.push(cleanupFunc);
    traitCleanupMap.set(el, list);

    // Return a manual cleanup function
    return () => {
      const arr = traitCleanupMap.get(el);
      if (arr) {
        const idx = arr.indexOf(cleanupFunc);
        if (idx !== -1) arr.splice(idx, 1);
        if (arr.length === 0) traitCleanupMap.delete(el);
      }
      cleanupFunc();
    };
  };
}

function CreateEl(tag: string, ns: string, config: any) {
  return (...props: any[]) => {
    const el: any = document.createElementNS(ns, tag as string);
    return Tag(el, props, config);
  };
}

function Tag(el: HTMLElement | SVGElement, traits: any[] = [], config: any = {}) {
  traits.forEach(([trait, ...args]) => Trait(config[trait])(el, ...args));
  function fn(...children: any[]) {
    children.forEach((child) => {
      if (child) el.append(child);
    });
    return el;
  }
  return fn;
}

export type TraitFunc<Args extends any[]> = (el: HTMLElement, ...args: Args) => () => void;

export type HtmlReturnType<P extends Record<string, TraitFunc<any>>> = Record<
  keyof HTMLElementTagNameMap,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => HTMLElement
>;

export function HTML<P extends Record<string, any>>(config?: P) {
  return new Proxy(
    {},
    {
      get: (_, prop) => CreateEl(prop as string, 'http://www.w3.org/1999/xhtml', config),
    },
  ) as HtmlReturnType<P>;
}

// ---------------------------
// Helper types
// ---------------------------
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;
type TraitFunc2<Args extends any[] = any[], Return = any> = (...args: Args) => Return;

// A trait is a function that applies itself to an element
type AppliedTrait = (el: HTMLElement) => void;

// ---------------------------
// Html2ReturnType
// ---------------------------
export type Html2ReturnType<P extends Record<string, TraitFunc2>> = [
  Record<keyof HTMLElementTagNameMap, (...traits: (string | number | AppliedTrait)[]) => HTMLElement>,
  {
    [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => AppliedTrait;
  },
];

// ---------------------------
// HTML2 factory
// ---------------------------
export function HTML2<P extends Record<string, TraitFunc2>>(config: P): Html2ReturnType<P> {
  // Trait proxy: returns functions that apply themselves to an element
  const traitProxy = new Proxy(
    {},
    {
      get:
        (_, prop: string) =>
        (...args: any[]) =>
        (el: HTMLElement) => {
          const fn = config[prop as keyof P] as (...args: any[]) => any;
          fn(el, ...args); // first argument is the element
        },
    },
  ) as Html2ReturnType<P>[1];

  // HTML proxy: creates elements and applies traits
  const htmlProxy = new Proxy(
    {},
    {
      get: (_, prop: string) => {
        const tagFunc = (...traits: AppliedTrait[]) => {
          const el = document.createElement(prop);

          traits.forEach((trait) => {
            if (typeof trait === 'function') {
              trait(el);
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
  ) as Html2ReturnType<P>[0];

  return [htmlProxy, traitProxy];
}

export type SvgReturnType<P extends Record<string, TraitFunc<any>>> = Record<
  keyof SVGElementTagNameMap,
  <K extends Array<keyof P>>(
    ...attributes: {
      [I in keyof K]-?: [K[I], ...RestArgs<Parameters<P[K[I]]>>];
    }
  ) => (...nodes: any[]) => HTMLElement
>;

export function SVG<P extends Record<string, any>>(config?: P) {
  return new Proxy(
    {},
    {
      get: (_, prop) => CreateEl(prop as string, 'http://www.w3.org/2000/svg', config),
    },
  ) as SvgReturnType<P>;
}
