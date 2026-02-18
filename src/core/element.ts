import { Condition, extractConditions, extractStates, State, StateType, Tail } from '@/registry';

type TraitFn = (...args: any[]) => any;
type Applier = (el: HTMLElement | SVGElement) => void;
type Child = Applier | HTMLElement | SVGElement;

// --- Helper functions for creating reactive props ---

export function createProp<T>(handler: (el: Element, val: T, applies: boolean) => void) {
  return (el: Element, val: T | (() => T), ...rest: (StateType<any> | Condition)[]) => {
    const states = extractStates(val, ...rest);
    const conditions = extractConditions(...rest);
    const apply = () => {
      const _val = typeof val === 'function' ? (val as () => T)() : val;
      const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
      handler(el, _val, applies);
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => unsubs.forEach((unsub) => unsub());
  };
}

export function createEventProp<E extends Event>(
  handler: (el: HTMLElement | SVGElement, fn: (e: E) => void) => (() => void) | void,
) {
  return (el: Element, fn: (e: E) => void, ...rest: (StateType<any> | Condition)[]) => {
    const states = extractStates(fn, ...rest);
    const conditions = extractConditions(...rest);
    let cleanup: (() => void) | void;
    const apply = () => {
      const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
      if (applies && !cleanup) {
        cleanup = handler(el as HTMLElement | SVGElement, fn);
      } else if (!applies && cleanup) {
        cleanup();
        cleanup = undefined;
      }
    };
    apply();
    const unsubs = states.map((state) => state.sub(apply));
    return () => {
      if (cleanup) cleanup();
      unsubs.forEach((unsub) => unsub());
    };
  };
}

// --- Cleanup: auto-unsubscribe traits when elements are removed from the DOM ---

const cleanups = new WeakMap<HTMLElement | SVGElement, (() => void)[]>();

new MutationObserver((mutations) => {
  for (const { type, removedNodes } of mutations) {
    if (type !== 'childList') continue;
    removedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement || node instanceof SVGElement)) return;
      cleanups.get(node)?.forEach((fn) => fn());
      cleanups.delete(node);
    });
  }
}).observe(document.documentElement, { childList: true, subtree: true });

// --- Element factory type ---

type ElementFactory<P extends Record<string, TraitFn>> = {
  tag: (...children: Child[]) => HTMLElement | SVGElement;
} & {
  [K in keyof P]: (...args: Tail<Parameters<P[K]>>) => Applier;
};

// --- Define Element ---

export function defineElement<P extends Record<string, TraitFn>>(config: {
  markup: () => HTMLElement | SVGElement;
  props: P;
}): ElementFactory<P> {
  // Create the main element factory function
  const createElement = (...children: Child[]) => {
    const el = config.markup();
    children.forEach((c: any) => {
      if (c instanceof HTMLElement || c instanceof SVGElement) el.appendChild(c);
      else c(el);
    });
    return el;
  };

  // Build the factory object with tag and prop methods
  const factory: any = {
    tag: createElement,
  };

  // Add prop methods to the factory
  for (const [name, propFn] of Object.entries(config.props)) {
    factory[name] = (...args: any[]) => {
      const apply = (el: HTMLElement | SVGElement) => {
        const unsub = propFn(el, ...args);
        const list = cleanups.get(el) || [];
        list.push(unsub);
        cleanups.set(el, list);
      };
      (apply as any).type = 'trait';
      return apply;
    };
  }

  return factory as ElementFactory<P>;
}

// --- Example: Button element ---

const button = defineElement({
  markup: () => {
    const el = document.createElement('button');
    el.className = 'btn';
    return el;
  },
  props: {
    enabled: createProp<boolean>((el, val, applies) => {
      if (applies) {
        el.toggleAttribute('disabled', !val);
      } else {
        el.setAttribute('disabled', '');
      }
    }),
    label: createProp<string>((el, text, applies) => {
      if (applies) {
        el.textContent = text;
      }
    }),
    click: createEventProp<MouseEvent>((el, fn) => {
      el.addEventListener('click', fn as EventListener);
      return () => el.removeEventListener('click', fn as EventListener);
    }),
  },
});

// --- Example: Card element ---

const card = defineElement({
  markup: () => {
    const el = document.createElement('div');
    el.className = 'card';
    return el;
  },
  props: {
    id: createProp<string>((el, id, applies) => {
      if (applies) {
        el.id = id;
      } else {
        el.removeAttribute('id');
      }
    }),
    title: createProp<string>((el, text, applies) => {
      if (applies) {
        el.setAttribute('data-title', text);
      }
    }),
    click: createEventProp<MouseEvent>((el, fn) => {
      el.addEventListener('click', fn as EventListener);
      return () => el.removeEventListener('click', fn as EventListener);
    }),
  },
});

// --- Usage Examples ---

const isProcessing = State(true);
const handleClick = () => alert('Button clicked!');

// button instance 1
button.tag(
  button.label('Click me!', isProcessing.$test(false)),
  button.label('Process', isProcessing.$test(true)),
  button.enabled(true),
  button.click(handleClick, isProcessing.$test(false)),
);

// --> <button class="btn">Click me!</button> (with click listener attached)

// button instance 2
button.tag(
  button.label('Another button'),
  button.label('Processing...', isProcessing.$test(true)),
  button.click(() => alert('Another button clicked!')),
);

// --> <button class="btn">Another button</button> (with click listener attached)

// card instance
card.tag(
  card.title('My Card'),
  card.click(() => console.log('Card clicked')),
  button.tag(
    button.label('Nested button'),
    button.click(() => alert('Nested button clicked!')),
  ),
);

// --> <div class="card" data-title="My Card"><button>Nested button</button></div>
