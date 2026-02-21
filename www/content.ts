// ─── Content helpers ────────────────────────────────────────────────────────

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'className') e.className = v;
    else e.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === 'string') e.appendChild(document.createTextNode(c));
    else e.appendChild(c);
  }
  return e;
}

function h(tag: string, className = '', ...children: (Node | string)[]): HTMLElement {
  const e = document.createElement(tag);
  if (className) e.className = className;
  for (const c of children) {
    if (typeof c === 'string') e.insertAdjacentHTML('beforeend', c);
    else e.appendChild(c);
  }
  return e;
}

function codeBlock(code: string, lang = 'typescript'): HTMLElement {
  const pre = document.createElement('pre');
  const btn = document.createElement('button');
  btn.className = 'oem-copy-btn';
  btn.textContent = 'Copy';
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });
  });
  const code_el = document.createElement('code');
  code_el.className = `language-${lang}`;
  code_el.textContent = code;
  pre.appendChild(btn);
  pre.appendChild(code_el);
  setTimeout(() => {
    if ((window as any).Prism) (window as any).Prism.highlightElement(code_el);
  }, 0);
  return pre;
}

function callout(type: 'info' | 'warning' | 'success' | 'error', title: string, body: string): HTMLElement {
  const icons = { info: 'ℹ️', warning: '⚠️', success: '✅', error: '❌' };
  const d = document.createElement('div');
  d.className = `oem-callout oem-callout--${type}`;
  d.innerHTML = `<strong>${icons[type]} ${title}</strong>${body}`;
  return d;
}

function table(headers: string[], rows: string[][]): HTMLElement {
  const t = document.createElement('table');
  t.className = 'oem-table';
  const thead = t.createTHead();
  const hr = thead.insertRow();
  for (const h of headers) { const th = document.createElement('th'); th.textContent = h; hr.appendChild(th); }
  const tbody = t.createTBody();
  for (const row of rows) {
    const tr = tbody.insertRow();
    for (const cell of row) { const td = tr.insertCell(); td.innerHTML = cell; }
  }
  return t;
}

// ─── Nav data (also used by app.ts) ────────────────────────────────────────

export type NavItem = {
  id: string;
  title: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  {
    id: 'introduction', title: 'Introduction',
    children: [
      { id: 'introduction/what-is-oem', title: 'What is OEM?' },
      { id: 'introduction/installation', title: 'Installation' },
      { id: 'introduction/quick-start', title: 'Quick Start' },
    ],
  },
  {
    id: 'core', title: 'Core',
    children: [
      { id: 'core/templates', title: 'Templates & Traits' },
      { id: 'core/state', title: 'State' },
      { id: 'core/types', title: 'Types' },
    ],
  },
  {
    id: 'traits', title: 'Trait Library',
    children: [
      { id: 'traits/attribute',    title: 'Attribute' },
      { id: 'traits/classname',    title: 'ClassName' },
      { id: 'traits/event',        title: 'Event' },
      { id: 'traits/focus',        title: 'Focus' },
      { id: 'traits/innerhtml',    title: 'InnerHTML' },
      { id: 'traits/inputevent',   title: 'InputEvent' },
      { id: 'traits/inputvalue',   title: 'InputValue' },
      { id: 'traits/style',        title: 'Style' },
      { id: 'traits/styleonevent', title: 'StyleOnEvent' },
      { id: 'traits/textcontent',  title: 'TextContent' },
    ],
  },
  {
    id: 'states', title: 'State Library',
    children: [
      { id: 'states/urlstate',        title: 'UrlState' },
      { id: 'states/mediaquerystate', title: 'MediaQueryState' },
      { id: 'states/themestate',      title: 'ThemeState' },
    ],
  },
  {
    id: 'tokens', title: 'Theme Library',
    children: [
      { id: 'tokens/overview',    title: 'Overview' },
      { id: 'tokens/primitives',  title: 'Primitives' },
      { id: 'tokens/expression',  title: 'Expression' },
      { id: 'tokens/semantic',    title: 'Semantic' },
      { id: 'tokens/element',     title: 'Element' },
      { id: 'tokens/component',   title: 'Component' },
      { id: 'tokens/feature',     title: 'Feature' },
    ],
  },
  {
    id: 'modules', title: 'Module Library',
    children: [
      { id: 'modules/theme', title: 'Theme Module' },
    ],
  },
  {
    id: 'patterns', title: 'Pattern Library',
    children: [
      { id: 'patterns/conditions', title: 'Conditions' },
      { id: 'patterns/spa',        title: 'SPA Architecture' },
    ],
  },
  {
    id: 'prompts', title: 'Prompts',
    children: [
      { id: 'prompts/overview', title: 'Overview' },
      { id: 'prompts/wizard',   title: 'Prompt Wizard' },
      { id: 'prompts/bdd',      title: 'BDD Manager' },
    ],
  },
];

// flat list for prev/next
export const flatPages: { id: string; title: string; section: string }[] = navItems.flatMap(s =>
  (s.children ?? []).map(p => ({ id: p.id, title: p.title, section: s.title }))
);

// ─── Page renderers ─────────────────────────────────────────────────────────

type PageRenderer = () => HTMLElement;
const pages: Record<string, PageRenderer> = {};

// ── Introduction / What is OEM ──────────────────────────────────────────────
pages['introduction/what-is-oem'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>What is OEM?</h1>
    <p class="page-subtitle">An agent-first UI framework engineered for seamless human-AI collaboration.</p>
    <h2 id="overview">Overview</h2>
    <p>OEM introduces a <strong>distinctive compositional syntax</strong> that declaratively unifies markup, styling, and behavior into a single coherent model. Unlike virtual-DOM frameworks, OEM works directly with real DOM elements, making it lightweight and predictable.</p>
    <p>OEM is designed from the ground up to be readable and writable by both humans and LLMs. Its explicit, flat structure avoids the "magic" that makes other frameworks opaque to code generation.</p>
    <h2 id="philosophy">Core Philosophy</h2>
    <ul>
      <li><strong>Compositional</strong> — behavior is composed from small, named traits</li>
      <li><strong>Declarative</strong> — describe what you want, not how to achieve it</li>
      <li><strong>Reactive</strong> — state changes propagate automatically via subscriptions</li>
      <li><strong>Dependency-free</strong> — zero runtime dependencies</li>
      <li><strong>Agent-first</strong> — syntax is optimized for LLM generation and comprehension</li>
    </ul>
    <h2 id="three-pillars">Three Pillars</h2>`;

  c.appendChild(table(
    ['Pillar', 'What it does'],
    [
      ['<code>Template</code>', 'Creates a <code>[tag, trait]</code> tuple — the tag proxy builds DOM elements, the trait proxy applies behaviors'],
      ['<code>State</code>', 'Reactive pub/sub containers. Call <code>.set()</code> to update, <code>.sub()</code> to listen'],
      ['Traits', 'Pure functions that attach behavior to elements — event handlers, styles, text, attributes, and more'],
    ]
  ));

  c.innerHTML += `
    <h2 id="quick-example">Quick Example</h2>
    <p>A reactive counter in ~10 lines of OEM:</p>`;
  c.appendChild(codeBlock(`import { Template, State, useEventTrait, useTextContentTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  event: useEventTrait,
  text:  useTextContentTrait,
});

const count = State(0);

const counter = tag.div(
  tag.button(
    trait.event('click', () => count.reduce(n => n + 1)),
    trait.text('Increment'),
  ),
  tag.span(
    trait.text(() => String(count.val()), count),
  ),
);

document.body.appendChild(counter);`));

  c.appendChild(callout('info', 'Agent-First Design',
    'OEM\'s flat, explicit syntax means an LLM can read any component and understand exactly what it does without implicit conventions or framework magic.'));

  return c;
};

// ── Introduction / Installation ─────────────────────────────────────────────
pages['introduction/installation'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Installation</h1>
    <p class="page-subtitle">Get OEM into your project in under a minute.</p>
    <h2 id="package-manager">Package Manager</h2>`;
  c.appendChild(codeBlock('npm install @linttrap/oem', 'bash'));
  c.appendChild(codeBlock('bun add @linttrap/oem', 'bash'));
  c.innerHTML += `
    <h2 id="imports">Imports</h2>
    <p>Import everything you need directly from the main registry:</p>`;
  c.appendChild(codeBlock(`import {
  Template,
  State,
  $test,
  useEventTrait,
  useStyleTrait,
  useTextContentTrait,
  useInnerHTMLTrait,
  useAttributeTrait,
  useClassNameTrait,
  useInputEventTrait,
  useInputValueTrait,
  useFocusTrait,
  useStyleOnEventTrait,
  useMediaQueryState,
} from '@linttrap/oem';`));
  c.innerHTML += `
    <h2 id="theme">Theme Module</h2>
    <p>The theme module provides a pre-built singleton with light and dark themes:</p>`;
  c.appendChild(codeBlock(`import { theme } from '@linttrap/oem/modules/theme';

// Switch to dark mode
theme.setTheme('dark');

// Read a token reactively
const bg = theme.$sem_color_bkg_pri; // deferred getter
element.style.background = bg();      // evaluated now`));
  c.innerHTML += `<h2 id="typescript">TypeScript</h2>
    <p>OEM is written in TypeScript and ships full type definitions. No <code>@types</code> package needed. Set <code>"strict": true</code> in your <code>tsconfig.json</code> for the best experience.</p>`;
  c.appendChild(callout('info', 'Path aliases',
    'If you use <code>@/</code> path aliases in your project, map them to your <code>src/</code> directory in tsconfig: <code>"paths": { "@/*": ["src/*"] }</code>'));
  return c;
};

// ── Introduction / Quick Start ───────────────────────────────────────────────
pages['introduction/quick-start'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Quick Start</h1>
    <p class="page-subtitle">Build your first OEM application step by step.</p>
    <h2 id="step-1">Step 1 — Create a Template</h2>
    <p>A Template gives you two tools: <code>tag</code> to create DOM elements and <code>trait</code> to apply behaviors.</p>`;
  c.appendChild(codeBlock(`import { Template, useEventTrait, useStyleTrait, useTextContentTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
  text:  useTextContentTrait,
});`));
  c.innerHTML += `<h2 id="step-2">Step 2 — Create State</h2>`;
  c.appendChild(codeBlock(`import { State } from '@linttrap/oem';

const todos = State<string[]>([]);
const input  = State('');`));
  c.innerHTML += `<h2 id="step-3">Step 3 — Build UI</h2>
    <p>Pass traits as arguments to element creators. Reactive traits re-apply automatically when their state dependencies change.</p>`;
  c.appendChild(codeBlock(`const app = tag.div(
  tag.input(
    trait.style('border', '1px solid #ccc'),
    trait.style('padding', '8px 12px'),
    trait.event('input', (e) => input.set((e.target as HTMLInputElement).value)),
    trait.event('keydown', (e) => {
      if (e.key === 'Enter' && input.val().trim()) {
        todos.reduce(list => [...list, input.val().trim()]);
        input.set('');
      }
    }),
  ),
  tag.ul(
    trait.html(() => todos.val().map(t =>
      tag.li(trait.text(t))
    ), todos),
  ),
);

document.getElementById('root')!.appendChild(app);`));
  c.innerHTML += `<h2 id="step-4">Step 4 — Conditional Traits</h2>
    <p>Use <code>$test()</code> for conditions — never ternary expressions:</p>`;
  c.appendChild(codeBlock(`import { $test } from '@linttrap/oem';

const disabled = State(false);

const btn = tag.button(
  trait.text('Submit'),
  trait.style('opacity', '0.4', $test(disabled.val())),
  trait.style('opacity', '1',   $test(!disabled.val())),
  trait.event('click', handleSubmit, $test(!disabled.val())),
);`));
  c.appendChild(callout('warning', 'No Ternaries',
    'OEM prescribes separate trait calls with <code>$test()</code> conditions rather than ternary expressions. This keeps each branch explicit and reactive.'));
  return c;
};

// ── Core / Templates & Traits ────────────────────────────────────────────────
pages['core/templates'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Templates &amp; Traits</h1>
    <p class="page-subtitle">The composition engine at the heart of OEM.</p>
    <h2 id="template">Template</h2>
    <p><code>Template(config?)</code> returns a tuple <code>[tag, trait]</code>. The config maps trait names to trait implementation functions.</p>`;
  c.appendChild(codeBlock(`import { Template, useEventTrait, useStyleTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
});`));
  c.innerHTML += `<h3 id="tag-proxy">Tag Proxy</h3>
    <p>Access any HTML or SVG tag name as a property. It returns a function that accepts any number of traits:</p>`;
  c.appendChild(codeBlock(`// HTML elements
const div    = tag.div(...traits);
const button = tag.button(...traits);
const input  = tag.input(...traits);

// SVG elements
const svg  = tag.svg(...traits);
const path = tag.path(...traits);`));
  c.innerHTML += `<h3 id="trait-proxy">Trait Proxy</h3>
    <p>Calling <code>trait.styleName(...args)</code> returns a <em>trait applier</em> — a function <code>(el) => void</code> that the tag proxy applies to the created element.</p>`;
  c.appendChild(codeBlock(`const styledButton = tag.button(
  trait.style('backgroundColor', '#2563eb'),
  trait.style('color', '#fff'),
  trait.style('padding', '8px 16px'),
  trait.event('click', () => alert('Clicked!')),
);`));
  c.innerHTML += `<h2 id="traits">Traits</h2>
    <p>A trait is any function with this shape:</p>`;
  c.appendChild(codeBlock(`type TraitFunc = (el: HTMLElement, ...args: any[]) => (() => void) | void;`));
  c.innerHTML += `<p>Traits accept the element as their first parameter. Additional parameters (excluding <code>el</code>) become the arguments exposed via the trait proxy.</p>
    <h3 id="automatic-cleanup">Automatic Cleanup</h3>
    <p>When a trait returns a function, OEM stores it as a cleanup handler. A <code>MutationObserver</code> watches for element removal — when the element leaves the DOM, all its cleanup functions run automatically, preventing memory leaks from subscriptions and event listeners.</p>
    <h2 id="custom-traits">Custom Traits</h2>`;
  c.appendChild(codeBlock(`// A custom trait that shows a tooltip on hover
function useTooltipTrait(el: HTMLElement, text: string) {
  const tip = document.createElement('div');
  tip.textContent = text;
  tip.style.cssText = 'position:fixed;background:#000;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;pointer-events:none;opacity:0;transition:opacity 100ms';
  document.body.appendChild(tip);

  const show = (e: MouseEvent) => {
    tip.style.left = e.clientX + 10 + 'px';
    tip.style.top  = e.clientY + 10 + 'px';
    tip.style.opacity = '1';
  };
  const hide = () => { tip.style.opacity = '0'; };

  el.addEventListener('mouseenter', show);
  el.addEventListener('mouseleave', hide);
  el.addEventListener('mousemove', show);

  return () => {
    el.removeEventListener('mouseenter', show);
    el.removeEventListener('mouseleave', hide);
    el.removeEventListener('mousemove', show);
    tip.remove();
  };
}

// Register and use it
const [tag, trait] = Template({ tooltip: useTooltipTrait });
const btn = tag.button(trait.tooltip('Save your work'));`));
  return c;
};

// ── Core / State ─────────────────────────────────────────────────────────────
pages['core/state'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>State</h1>
    <p class="page-subtitle">Lightweight reactive pub/sub state containers.</p>
    <h2 id="creating-state">Creating State</h2>`;
  c.appendChild(codeBlock(`import { State } from '@linttrap/oem';

const count   = State(0);
const user    = State({ name: 'Alice', role: 'admin' });
const active  = State(false);
const items   = State<string[]>([]);`));
  c.innerHTML += `<h2 id="api">Core API</h2>`;
  c.appendChild(table(
    ['Method', 'Description', 'Example'],
    [
      ['<code>val()</code>', 'Get current value', '<code>count.val() // 5</code>'],
      ['<code>set(v)</code>', 'Set value, notify subscribers', '<code>count.set(10)</code>'],
      ['<code>reduce(fn)</code>', 'Update based on previous value', '<code>count.reduce(n => n + 1)</code>'],
      ['<code>sub(cb)</code>', 'Subscribe to changes, returns unsub fn', '<code>const off = count.sub(v => log(v))</code>'],
      ['<code>test(pred)</code>', 'Test current value', '<code>count.test(v => v > 0)</code>'],
    ]
  ));
  c.innerHTML += `<h2 id="subscriptions">Subscriptions</h2>`;
  c.appendChild(codeBlock(`const count = State(0);

// Subscribe — callback fires on every change
const unsub = count.sub((value) => {
  console.log('Count is now:', value);
});

count.set(5);   // logs "Count is now: 5"
count.set(10);  // logs "Count is now: 10"

// Unsubscribe when done
unsub();`));
  c.innerHTML += `<h2 id="custom-methods">Custom Methods</h2>
    <p>Pass an object of custom methods as the second argument. Each method receives the state as its first parameter:</p>`;
  c.appendChild(codeBlock(`const counter = State(
  { count: 0, name: 'MyCounter' },
  {
    increment: (state) => {
      state.reduce(prev => ({ ...prev, count: prev.count + 1 }));
    },
    incrementBy: (state, amount: number) => {
      state.reduce(prev => ({ ...prev, count: prev.count + amount }));
    },
    reset: (state) => {
      state.set({ count: 0, name: state.val().name });
    },
  }
);

counter.increment();       // count: 1
counter.incrementBy(5);    // count: 6

// Deferred ($ prefix) — returns a closure for event handlers
button.addEventListener('click', counter.$increment());`));
  c.innerHTML += `<h2 id="deferred">Deferred Execution (<code>$</code> prefix)</h2>
    <p>Every method has a <code>$</code>-prefixed variant that returns a closure instead of executing immediately. Useful for event handlers and reactive bindings.</p>`;
  c.appendChild(codeBlock(`const count = State(0);

// $set returns a function that sets the value when called
const reset = count.$set(0);
button.addEventListener('click', reset); // calls count.set(0) on click

// $reduce returns a function
const increment = count.$reduce(n => n + 1);
button.addEventListener('click', increment);`));
  return c;
};

// ── Core / Types ─────────────────────────────────────────────────────────────
pages['core/types'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Types</h1>
    <p class="page-subtitle">Core TypeScript type definitions used across OEM.</p>
    <h2 id="condition">Condition</h2>
    <p>Used to conditionally apply traits:</p>`;
  c.appendChild(codeBlock(`type Condition = (() => boolean) | boolean | 1 | 0;`));
  c.innerHTML += `<p>Create conditions with <code>$test()</code>:</p>`;
  c.appendChild(codeBlock(`import { $test } from '@linttrap/oem';

const disabled = State(false);

// Static condition
trait.style('opacity', '0.5', $test(true));

// Dynamic condition — re-evaluates when disabled changes
trait.style('opacity', '0.5', $test(disabled.val()), disabled);
trait.style('opacity', '1',   $test(!disabled.val()), disabled);`));
  c.innerHTML += `<h2 id="statetype">StateType</h2>`;
  c.appendChild(codeBlock(`import type { StateType } from '@linttrap/oem';

// Typing function parameters
function renderCounter(countState: StateType<number>) {
  const [tag, trait] = Template({ text: useTextContentTrait });
  return tag.span(
    trait.text(() => String(countState.val()), countState),
  );
}`));
  c.innerHTML += `<h2 id="tail">Tail&lt;T&gt;</h2>
    <p>Utility type that removes the first element of a tuple — used internally by Template for trait parameter inference:</p>`;
  c.appendChild(codeBlock(`type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

type Original = [string, number, boolean];
type Rest = Tail<Original>; // [number, boolean]`));
  c.innerHTML += `<h2 id="test-type">Test</h2>
    <p>Signature for async test functions in OEM's testing system:</p>`;
  c.appendChild(codeBlock(`type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>;

const myTest: Test = async (sandbox) => {
  const div = tag.div(trait.text('Hello'));
  sandbox?.appendChild(div);
  return {
    pass: div.textContent === 'Hello',
    message: 'TextContent should be "Hello"',
  };
};`));
  return c;
};

// ── Trait pages (shared renderer) ────────────────────────────────────────────

function traitPage(opts: {
  name: string;
  description: string;
  signature: string;
  params: string[][];
  example: string;
  notes?: string;
}): HTMLElement {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>${opts.name}</h1>
    <p class="page-subtitle">${opts.description}</p>
    <h2 id="signature">Signature</h2>`;
  c.appendChild(codeBlock(opts.signature));
  c.innerHTML += `<h2 id="parameters">Parameters</h2>`;
  c.appendChild(table(
    ['Parameter', 'Type', 'Description'],
    opts.params
  ));
  c.innerHTML += `<h2 id="example">Example</h2>`;
  c.appendChild(codeBlock(opts.example));
  if (opts.notes) {
    c.innerHTML += `<h2 id="notes">Notes</h2><p>${opts.notes}</p>`;
  }
  return c;
}

pages['traits/attribute'] = () => traitPage({
  name: 'Attribute',
  description: 'Adds or removes an HTML attribute reactively.',
  signature: `useAttributeTrait(
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element (injected by Template)'],
    ['<code>prop</code>', 'string', 'The attribute name (e.g. <code>"disabled"</code>, <code>"aria-label"</code>)'],
    ['<code>val</code>', 'value or getter', 'The attribute value. Pass <code>undefined</code> to remove the attribute'],
    ['<code>...rest</code>', 'StateType | Condition', 'Optional reactive states and <code>$test()</code> conditions'],
  ],
  example: `import { $test } from '@linttrap/oem';

const disabled = State(false);

const btn = tag.button(
  trait.attr('type', 'submit'),
  trait.attr('disabled', 'true', $test(disabled.val()), disabled),
  trait.attr('aria-disabled', 'true', $test(disabled.val()), disabled),
);`,
  notes: 'When <code>val</code> is <code>undefined</code>, the attribute is removed. When a <code>$test()</code> condition evaluates to false, the attribute is also removed.',
});

pages['traits/classname'] = () => traitPage({
  name: 'ClassName',
  description: 'Sets the CSS class name(s) of an element reactively.',
  signature: `useClassNameTrait(
  el: HTMLElement,
  val: (() => string) | string,
  ...rest: (StateType<any> | Condition)[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element'],
    ['<code>val</code>', 'string or getter', 'The class string or a function returning it'],
    ['<code>...rest</code>', 'StateType | Condition', 'Optional reactive states and conditions'],
  ],
  example: `const isActive = State(false);
const theme    = State<'light' | 'dark'>('light');

const card = tag.div(
  trait.cls(() => \`card \${isActive.val() ? 'card--active' : ''}\`, isActive),
  trait.cls(() => \`theme--\${theme.val()}\`, theme),
);`,
});

pages['traits/event'] = () => traitPage({
  name: 'Event',
  description: 'Attaches an event listener to an element, with optional conditional activation.',
  signature: `useEventTrait(
  el: HTMLElement,
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  ...rest: (StateType<any> | Condition)[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element'],
    ['<code>eventName</code>', 'string', 'DOM event name (e.g. <code>"click"</code>, <code>"keydown"</code>)'],
    ['<code>handler</code>', 'EventListener', 'The callback function'],
    ['<code>...rest</code>', 'StateType | Condition', 'Optional conditions — listener only fires when all pass'],
  ],
  example: `const disabled = State(false);

const btn = tag.button(
  trait.event('click', () => console.log('clicked!'), $test(!disabled.val()), disabled),
  trait.event('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') console.log('Enter pressed');
  }),
);`,
  notes: 'The returned cleanup function calls <code>removeEventListener</code>, so the listener is automatically removed when the element leaves the DOM.',
});

pages['traits/focus'] = () => traitPage({
  name: 'Focus',
  description: 'Programmatically focuses an element when a condition is met.',
  signature: `useFocusTrait(
  el: HTMLElement,
  condition: Condition,
  ...rest: StateType<any>[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element'],
    ['<code>condition</code>', 'Condition', 'When truthy, <code>el.focus()</code> is called'],
    ['<code>...rest</code>', 'StateType[]', 'States that trigger re-evaluation'],
  ],
  example: `const isOpen = State(false);

// Auto-focus the input when the modal opens
const modal = tag.div(
  tag.input(
    trait.focus($test(isOpen.val()), isOpen),
    trait.attr('placeholder', 'Type to search...'),
  ),
);`,
});

pages['traits/innerhtml'] = () => traitPage({
  name: 'InnerHTML',
  description: 'Sets the children of an element reactively, replacing them when state changes.',
  signature: `useInnerHTMLTrait(
  el: HTMLElement,
  children: (() => (HTMLElement | Node | string)[]) | (HTMLElement | Node | string)[],
  ...states: StateType<any>[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The container element'],
    ['<code>children</code>', 'array or getter', 'Elements/nodes to place inside, or a function returning them'],
    ['<code>...states</code>', 'StateType[]', 'States that trigger re-render'],
  ],
  example: `const items = State<string[]>(['Apple', 'Banana', 'Cherry']);

const list = tag.ul(
  trait.html(
    () => items.val().map(item => tag.li(trait.text(item))),
    items,
  ),
);

// Whenever items changes, the list re-renders
items.reduce(arr => [...arr, 'Date']);`,
  notes: 'OEM\'s <code>MutationObserver</code> cleanup fires on child removal, so trait subscriptions inside re-rendered children are properly disposed.',
});

pages['traits/inputevent'] = () => traitPage({
  name: 'InputEvent',
  description: 'Handles input-related events on form elements, extracting the current value.',
  signature: `useInputEventTrait(
  el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  handler: (value: string, event: Event) => void,
  eventName?: string
): () => void`,
  params: [
    ['<code>el</code>', 'form element', 'Input, textarea, or select'],
    ['<code>handler</code>', 'function', 'Receives the current string value and the raw event'],
    ['<code>eventName</code>', 'string', 'Event to listen on (default: <code>"input"</code>)'],
  ],
  example: `const query = State('');

const searchInput = tag.input(
  trait.attr('type', 'search'),
  trait.attr('placeholder', 'Search...'),
  trait.input((value) => query.set(value)),
);`,
});

pages['traits/inputvalue'] = () => traitPage({
  name: 'InputValue',
  description: 'Two-way binds a State value to an input or textarea element.',
  signature: `useInputValueTrait(
  el: HTMLInputElement | HTMLTextAreaElement,
  state: StateType<string>,
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLInputElement | HTMLTextAreaElement', 'The form element'],
    ['<code>state</code>', 'StateType&lt;string&gt;', 'The state to bind — reads and writes'],
  ],
  example: `const name = State('');

const form = tag.form(
  tag.input(
    trait.value(name),
    trait.attr('placeholder', 'Your name'),
  ),
  tag.p(
    trait.text(() => \`Hello, \${name.val() || 'stranger'}!\`, name),
  ),
);`,
});

pages['traits/style'] = () => traitPage({
  name: 'Style',
  description: 'Applies a CSS style property to an element, reactively updating when state changes.',
  signature: `useStyleTrait(
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | \`--\${string}\`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element'],
    ['<code>prop</code>', 'CSSProperty | CSS variable', 'Style property or custom property (<code>--my-var</code>)'],
    ['<code>val</code>', 'value or getter', 'The CSS value, or a function returning it'],
    ['<code>...rest</code>', 'StateType | Condition', 'States and conditions'],
  ],
  example: `const isDark   = State(false);
const isActive = State(false);

const card = tag.div(
  trait.style('background', '#fff', $test(!isDark.val()), isDark),
  trait.style('background', '#1e1e1e', $test(isDark.val()), isDark),
  trait.style('transform', 'scale(1.02)', $test(isActive.val()), isActive),
  trait.style('transform', 'scale(1)',    $test(!isActive.val()), isActive),
  // CSS custom property
  trait.style('--accent', () => isDark.val() ? '#60a5fa' : '#2563eb', isDark),
);`,
  notes: 'Custom properties (<code>--name</code>) use <code>setProperty()</code> internally. Standard properties use direct assignment.',
});

pages['traits/styleonevent'] = () => traitPage({
  name: 'StyleOnEvent',
  description: 'Applies CSS styles to an element in response to a DOM event.',
  signature: `useStyleOnEventTrait(
  el: HTMLElement,
  eventName: string,
  styles: Record<string, string>
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element'],
    ['<code>eventName</code>', 'string', 'DOM event to respond to'],
    ['<code>styles</code>', 'Record&lt;string, string&gt;', 'Style properties to apply when the event fires'],
  ],
  example: `const btn = tag.button(
  trait.text('Hover Me'),
  trait.style('transition', 'background 150ms'),
  trait.styleOnEvent('mouseenter', { background: '#eff6ff', color: '#2563eb' }),
  trait.styleOnEvent('mouseleave', { background: '',        color: '' }),
);`,
});

pages['traits/textcontent'] = () => traitPage({
  name: 'TextContent',
  description: 'Sets the text content of an element reactively.',
  signature: `useTextContentTrait(
  el: HTMLElement,
  val: (() => string | number) | (string | number),
  ...states: StateType<any>[]
): () => void`,
  params: [
    ['<code>el</code>', 'HTMLElement', 'The target element'],
    ['<code>val</code>', 'string | number | getter', 'The text value, or a function returning it'],
    ['<code>...states</code>', 'StateType[]', 'States that trigger re-evaluation'],
  ],
  example: `const count = State(0);
const user  = State({ name: 'Alice' });

tag.span(trait.text(() => \`Count: \${count.val()}\`, count));
tag.h1(trait.text(() => user.val().name, user));
tag.p(trait.text('Static text'));`,
});

// ── State Library ─────────────────────────────────────────────────────────────

pages['states/urlstate'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>UrlState</h1>
    <p class="page-subtitle">Reactive state that tracks the current URL hash for client-side routing.</p>
    <h2 id="overview">Overview</h2>
    <p><code>UrlState</code> provides hash-based routing for single-page applications. It listens to <code>hashchange</code> and <code>popstate</code> events and exposes the current path as reactive state.</p>
    <h2 id="usage">Usage</h2>`;
  c.appendChild(codeBlock(`import { State } from '@linttrap/oem';

// Simple hash-based router using State
const route = State(window.location.hash.slice(1) || 'home');

window.addEventListener('hashchange', () => {
  route.set(window.location.hash.slice(1) || 'home');
});

// Navigate
function navigate(path: string) {
  window.location.hash = path;
  route.set(path);
}

// Render based on route
route.sub((path) => {
  contentEl.replaceChildren(renderPage(path));
});`));
  c.innerHTML += `<h2 id="spa-pattern">SPA Pattern</h2>`;
  c.appendChild(codeBlock(`const [tag, trait] = Template({
  text:  useTextContentTrait,
  event: useEventTrait,
  style: useStyleTrait,
});

const route = State('home');

// Navigation link that updates the route
function navLink(path: string, label: string) {
  return tag.a(
    trait.text(label),
    trait.event('click', (e) => {
      e.preventDefault();
      navigate(path);
    }),
    trait.style('color', '#2563eb', $test(route.val() === path), route),
    trait.style('fontWeight', '600',  $test(route.val() === path), route),
  );
}`));
  return c;
};

pages['states/mediaquerystate'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>MediaQueryState</h1>
    <p class="page-subtitle">Reactive viewport tracking — respond to breakpoint changes in real time.</p>
    <h2 id="usage">Usage</h2>`;
  c.appendChild(codeBlock(`import { useMediaQueryState } from '@linttrap/oem';

const isMobile  = useMediaQueryState('(max-width: 767px)');
const isTablet  = useMediaQueryState('(min-width: 768px) and (max-width: 1023px)');
const isDesktop = useMediaQueryState('(min-width: 1024px)');
const prefDark  = useMediaQueryState('(prefers-color-scheme: dark)');`));
  c.innerHTML += `<h2 id="reactive-layout">Reactive Layout</h2>`;
  c.appendChild(codeBlock(`const isMobile = useMediaQueryState('(max-width: 767px)');

const sidebar = tag.nav(
  trait.style('display', 'none',  $test(isMobile.val()),  isMobile),
  trait.style('display', 'block', $test(!isMobile.val()), isMobile),
  // ... nav items
);

// Subscribe to respond programmatically
isMobile.sub((matches) => {
  if (matches) closeMobileMenu();
  else openSidebar();
});`));
  c.innerHTML += `<h2 id="api">API</h2>`;
  c.appendChild(table(
    ['Method', 'Description'],
    [
      ['<code>val()</code>', 'Returns <code>true</code> if the media query currently matches'],
      ['<code>sub(cb)</code>', 'Subscribe to match changes, returns unsub function'],
    ]
  ));
  return c;
};

pages['states/themestate'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>ThemeState</h1>
    <p class="page-subtitle">Centralized multi-theme management with reactive design token access.</p>
    <h2 id="setup">Setup</h2>`;
  c.appendChild(codeBlock(`import { ThemeState } from '@linttrap/oem/states/ThemeState';
import { lightTheme, darkTheme } from '@linttrap/oem/themes';

const theme = ThemeState(
  [
    { name: 'light', tokens: lightTheme },
    { name: 'dark',  tokens: darkTheme  },
  ],
  'light' // initial theme
);`));
  c.innerHTML += `<h2 id="token-access">Token Access</h2>
    <p>Tokens are accessed as methods on the theme object:</p>`;
  c.appendChild(codeBlock(`// Immediate getter — returns current value
const bg = theme.sem_color_bkg_pri(); // '#ffffff'

// Deferred getter ($ prefix) — returns a function
// Use in traits so they re-evaluate when theme changes
const btn = tag.button(
  trait.style('background', theme.$cmp_btn_pri_bkg, theme),
  trait.style('color',      theme.$cmp_btn_pri_txt, theme),
);`));
  c.innerHTML += `<h2 id="switching">Switching Themes</h2>`;
  c.appendChild(codeBlock(`const toggle = tag.button(
  trait.event('click', () => {
    theme.setTheme(theme.getTheme() === 'light' ? 'dark' : 'light');
  }),
  trait.text(() => theme.getTheme() === 'light' ? '🌙 Dark' : '☀️ Light', theme),
);`));
  c.innerHTML += `<h2 id="token-layers">Token Layers</h2>`;
  c.appendChild(table(
    ['Prefix', 'Layer', 'Example'],
    [
      ['<code>pmt_</code>', 'Primitives', '<code>theme.pmt_color_blue_500()</code>'],
      ['<code>exp_</code>', 'Expression', '<code>theme.exp_roundness_act()</code>'],
      ['<code>sem_</code>', 'Semantic',   '<code>theme.sem_color_txt_pri()</code>'],
      ['<code>elm_</code>', 'Element',    '<code>theme.elm_btn_hgt_md()</code>'],
      ['<code>cmp_</code>', 'Component',  '<code>theme.cmp_btn_pri_bkg()</code>'],
      ['<code>ftr_</code>', 'Feature',    '<code>theme.ftr_checkout_cta_bkg()</code>'],
    ]
  ));
  return c;
};

// ── Token Library ─────────────────────────────────────────────────────────────

pages['tokens/overview'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Design Token System</h1>
    <p class="page-subtitle">A strict 6-layer hierarchy for consistent, themeable design.</p>
    <h2 id="architecture">Architecture</h2>
    <p>Each layer can only reference layers <em>below</em> it, creating a unidirectional dependency flow that prevents circular references and makes theming predictable.</p>`;
  c.appendChild(codeBlock(`┌─────────────────────────────────────┐
│  6. FEATURE (ftr_)                  │ ← Product-specific overrides
│     May reference: any layer        │
├─────────────────────────────────────┤
│  5. COMPONENT (cmp_)                │ ← Complete component styling
│     May reference: 1-4              │
├─────────────────────────────────────┤
│  4. ELEMENT (elm_)                  │ ← Atomic UI parts
│     May reference: 1-3              │
├─────────────────────────────────────┤
│  3. SEMANTIC (sem_)                 │ ← UI meaning & purpose
│     May reference: 1-2              │
├─────────────────────────────────────┤
│  2. EXPRESSION (exp_)               │ ← Global personality
│     May reference: 1                │
├─────────────────────────────────────┤
│  1. PRIMITIVES (pmt_)               │ ← Raw values (no references)
│     May reference: none             │
└─────────────────────────────────────┘`, 'bash'));
  c.innerHTML += `<h2 id="example-flow">Complete Token Flow</h2>`;
  c.appendChild(codeBlock(`// 1. PRIMITIVE: Raw value
pmt_color_blue_600: '#2563EB'
pmt_spc_4:          '1rem'
pmt_rad_6:          '0.375rem'

// 2. EXPRESSION: Personality control
exp_roundness_moderate: '{pmt_rad_6}'
exp_roundness_act:      '{exp_roundness_moderate}'

// 3. SEMANTIC: Meaning
sem_color_interactive_pri: '{pmt_color_blue_600}'
sem_rad_md:                '{exp_roundness_act}'
sem_spc_inset_md:          '{pmt_spc_4}'

// 4. ELEMENT: Atomic part
elm_btn_bdr_rad:   '{sem_rad_md}'
elm_btn_pad_x_md:  '{sem_spc_inset_md}'

// 5. COMPONENT: Full component
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'

// 6. FEATURE: Contextual override (use sparingly)
ftr_checkout_cta_bkg: '{pmt_color_green_600}'`));
  c.innerHTML += `<h2 id="naming">Naming Conventions</h2>`;
  c.appendChild(table(
    ['Abbreviation', 'Meaning', 'Abbreviation', 'Meaning'],
    [
      ['<code>bkg</code>', 'background',  '<code>txt</code>', 'text'],
      ['<code>bdr</code>', 'border',      '<code>pad</code>', 'padding'],
      ['<code>spc</code>', 'spacing',     '<code>fnt</code>', 'font'],
      ['<code>hgt</code>', 'height',      '<code>wdt</code>', 'width'],
      ['<code>rad</code>', 'radius',      '<code>shd</code>', 'shadow'],
      ['<code>pri</code>', 'primary',     '<code>sec</code>', 'secondary'],
      ['<code>hov</code>', 'hover',       '<code>act</code>', 'active'],
      ['<code>dis</code>', 'disabled',    '<code>foc</code>', 'focus'],
    ]
  ));
  return c;
};

function simpleTokenPage(title: string, prefix: string, desc: string, categories: string[][]): HTMLElement {
  const c = document.createElement('div');
  const badge = `<span class="oem-badge oem-badge--${prefix.replace('_','')}">${prefix.toUpperCase()}</span>`;
  c.innerHTML = `<h1>${title} ${badge}</h1><p class="page-subtitle">${desc}</p><h2 id="categories">Token Categories</h2>`;
  c.appendChild(table(['Category', 'Token Pattern', 'Example'], categories));
  return c;
}

pages['tokens/primitives'] = () => simpleTokenPage(
  'Primitives', 'pmt',
  'Foundation layer — raw design values with no references to other tokens.',
  [
    ['Colors', '<code>pmt_color_{hue}_{shade}</code>', '<code>pmt_color_blue_500: "#3b82f6"</code>'],
    ['Spacing', '<code>pmt_spc_{n}</code>', '<code>pmt_spc_4: "1rem"</code>'],
    ['Font Family', '<code>pmt_fnt_family_{type}</code>', '<code>pmt_fnt_family_mono</code>'],
    ['Font Size', '<code>pmt_fnt_siz_{n}</code>', '<code>pmt_fnt_siz_16: "1rem"</code>'],
    ['Font Weight', '<code>pmt_fnt_wgt_{name}</code>', '<code>pmt_fnt_wgt_semibold: 600</code>'],
    ['Border Radius', '<code>pmt_rad_{n}</code>', '<code>pmt_rad_6: "0.375rem"</code>'],
    ['Duration', '<code>pmt_dur_{name}</code>', '<code>pmt_dur_normal: "200ms"</code>'],
    ['Z-Index', '<code>pmt_zix_{n}</code>', '<code>pmt_zix_mod: 1000</code>'],
  ]
);

pages['tokens/expression'] = () => simpleTokenPage(
  'Expression', 'exp',
  'Global personality controls — each category has 3 options plus an active reference.',
  [
    ['Motion Energy', '<code>exp_motion_energy_{level}_act</code>', '<code>exp_motion_energy_act → "200ms"</code>'],
    ['Density', '<code>exp_density_{level}_act</code>', '<code>exp_density_act → 1</code>'],
    ['Roundness', '<code>exp_roundness_{style}_act</code>', '<code>exp_roundness_act → "0.375rem"</code>'],
    ['Elevation', '<code>exp_elevation_{level}_act</code>', '<code>exp_elevation_act → 0.5</code>'],
    ['Contrast', '<code>exp_contrast_{level}_act</code>', '<code>exp_contrast_act → 1</code>'],
  ]
);

pages['tokens/semantic'] = () => simpleTokenPage(
  'Semantic', 'sem',
  'Purpose-based tokens — names describe what a token is for, not how it looks.',
  [
    ['Backgrounds', '<code>sem_color_bkg_{purpose}</code>', '<code>sem_color_bkg_pri, sem_color_bkg_sec</code>'],
    ['Text', '<code>sem_color_txt_{purpose}</code>', '<code>sem_color_txt_pri, sem_color_txt_inv</code>'],
    ['Borders', '<code>sem_color_bdr_{purpose}</code>', '<code>sem_color_bdr_default, sem_color_bdr_foc</code>'],
    ['States', '<code>sem_color_state_{state}</code>', '<code>sem_color_state_err, sem_color_state_suc</code>'],
    ['Interactive', '<code>sem_color_interactive_{variant}</code>', '<code>sem_color_interactive_pri</code>'],
    ['Spacing', '<code>sem_spc_{direction}_{size}</code>', '<code>sem_spc_inset_md, sem_spc_stack_lg</code>'],
    ['Typography', '<code>sem_typo_{scale}_{prop}</code>', '<code>sem_typo_heading_lg_siz</code>'],
    ['Radius', '<code>sem_rad_{size}</code>', '<code>sem_rad_md, sem_rad_full</code>'],
    ['Shadows', '<code>sem_shd_{size}</code>', '<code>sem_shd_sm, sem_shd_xl</code>'],
  ]
);

pages['tokens/element'] = () => simpleTokenPage(
  'Element', 'elm',
  'Atomic UI building blocks — the smallest reusable interactive pieces.',
  [
    ['Button', '<code>elm_btn_{prop}_{size}</code>', '<code>elm_btn_hgt_md: "40px"</code>'],
    ['Input', '<code>elm_inp_{prop}</code>', '<code>elm_inp_bdr_rad, elm_inp_bkg</code>'],
    ['Checkbox', '<code>elm_chk_{prop}</code>', '<code>elm_chk_siz_md, elm_chk_bkg_chk</code>'],
    ['Switch', '<code>elm_swt_{prop}_{size}</code>', '<code>elm_swt_wdt_md: "44px"</code>'],
    ['Avatar', '<code>elm_avt_siz_{size}</code>', '<code>elm_avt_siz_md: "40px"</code>'],
    ['Badge', '<code>elm_bdg_{prop}_{size}</code>', '<code>elm_bdg_fnt_siz_sm</code>'],
    ['Icon', '<code>elm_ico_siz_{size}</code>', '<code>elm_ico_siz_md: "20px"</code>'],
  ]
);

pages['tokens/component'] = () => simpleTokenPage(
  'Component', 'cmp',
  'Complete component definitions with full variants and interactive states.',
  [
    ['Buttons', '<code>cmp_btn_{variant}_{prop}</code>', '<code>cmp_btn_pri_bkg, cmp_btn_sec_txt</code>'],
    ['Card', '<code>cmp_cdl_{prop}</code>', '<code>cmp_cdl_bkg, cmp_cdl_bdr_rad</code>'],
    ['Modal', '<code>cmp_mod_{prop}</code>', '<code>cmp_mod_overlay_bkg</code>'],
    ['Table', '<code>cmp_tbl_{part}_{prop}</code>', '<code>cmp_tbl_hdr_bkg, cmp_tbl_row_hov</code>'],
    ['Navigation', '<code>cmp_nav_{prop}</code>', '<code>cmp_nav_bkg, cmp_nav_item_hov</code>'],
    ['Alert', '<code>cmp_alt_{severity}_{prop}</code>', '<code>cmp_alt_err_bkg</code>'],
  ]
);

pages['tokens/feature'] = () => simpleTokenPage(
  'Feature', 'ftr',
  'Product-specific overrides for contextual flows. Use sparingly — prefer component tokens.',
  [
    ['Checkout', '<code>ftr_checkout_{prop}</code>', '<code>ftr_checkout_cta_bkg</code>'],
    ['Dashboard', '<code>ftr_dashboard_{prop}</code>', '<code>ftr_dashboard_widget_bkg</code>'],
    ['Auth', '<code>ftr_auth_{prop}</code>', '<code>ftr_auth_card_bkg</code>'],
    ['Onboarding', '<code>ftr_onboarding_{prop}</code>', '<code>ftr_onboarding_step_active</code>'],
    ['Profile', '<code>ftr_profile_{prop}</code>', '<code>ftr_profile_header_bkg</code>'],
    ['Messaging', '<code>ftr_msg_{prop}</code>', '<code>ftr_msg_bubble_own_bkg</code>'],
  ]
);

// ── Module Library ────────────────────────────────────────────────────────────

pages['modules/theme'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Theme Module</h1>
    <p class="page-subtitle">A pre-built ThemeState singleton with light and dark themes ready to use.</p>
    <h2 id="usage">Usage</h2>`;
  c.appendChild(codeBlock(`import { theme } from '@linttrap/oem/modules/theme';
// or relative import
import { theme } from '../src/modules/theme';`));
  c.innerHTML += `<p>The module creates and exports a singleton <code>ThemeState</code> initialized with both light and dark themes, defaulting to <code>'light'</code>.</p>
    <h2 id="reactive-styling">Reactive Styling</h2>`;
  c.appendChild(codeBlock(`const [tag, trait] = Template({ style: useStyleTrait });

const card = tag.div(
  trait.style('background', theme.$sem_color_bkg_pri, theme),
  trait.style('color',      theme.$sem_color_txt_pri,  theme),
  trait.style('border',     \`1px solid \${theme.sem_color_bdr_default()}\`),
);

// Toggle theme — all subscribed elements update instantly
document.querySelector('#theme-toggle')!.addEventListener('click', () => {
  theme.setTheme(theme.getTheme() === 'light' ? 'dark' : 'light');
});`));
  c.innerHTML += `<h2 id="module-source">Module Source</h2>`;
  c.appendChild(codeBlock(`import { ThemeState, type Theme } from '@/states/ThemeState';
import { darkTheme, lightTheme } from '@/themes';

const availableThemes: Theme[] = [
  { name: 'light', tokens: lightTheme },
  { name: 'dark',  tokens: darkTheme  },
];

export const theme = ThemeState(availableThemes, 'light');`));
  c.appendChild(callout('info', 'Singleton Pattern',
    'The theme module exports a single shared instance. Import it anywhere in your app and all consumers react to the same state changes.'));
  return c;
};

// ── Pattern Library ───────────────────────────────────────────────────────────

pages['patterns/conditions'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Conditions</h1>
    <p class="page-subtitle">How OEM handles conditional trait application.</p>
    <h2 id="philosophy">Philosophy</h2>
    <p>OEM prescribes <strong>explicit conditions with <code>$test()</code></strong> rather than ternary expressions. This keeps each branch visible, reactive, and independently composable.</p>
    <h2 id="correct-pattern">Correct Pattern</h2>`;
  c.appendChild(codeBlock(`import { $test } from '@linttrap/oem';

const disabled = State(false);
const isError  = State(false);

const input = tag.input(
  // ✅ Two separate trait calls — each condition is explicit
  trait.style('opacity', '0.4', $test(disabled.val()),  disabled),
  trait.style('opacity', '1',   $test(!disabled.val()), disabled),

  // ✅ Compound conditions
  trait.style('borderColor', '#ef4444', $test(isError.val() && !disabled.val()), isError, disabled),
  trait.style('borderColor', '#e5e5e5', $test(!isError.val()),                  isError),

  // ✅ Conditional event binding
  trait.event('click', handleClick, $test(!disabled.val()), disabled),

  // ✅ Conditional attribute
  trait.attr('disabled', 'true', $test(disabled.val()), disabled),
);`));
  c.innerHTML += `<h2 id="anti-patterns">Anti-Patterns</h2>`;
  c.appendChild(codeBlock(`// ❌ Do NOT use ternary expressions
trait.style('opacity', disabled.val() ? '0.4' : '1'),

// ❌ Do NOT use conditional spreads
...(!disabled.val() ? [trait.event('click', handleClick)] : []),

// ❌ Do NOT use inline short-circuit
disabled.val() && trait.attr('disabled', 'true'),`));
  c.appendChild(callout('warning', 'Why No Ternaries?',
    'Ternary conditions are evaluated once at creation time. <code>$test()</code> conditions are re-evaluated reactively whenever listed states change — making UI truly reactive without re-rendering the whole component.'));
  c.innerHTML += `<h2 id="how-it-works">How $test() Works</h2>`;
  c.appendChild(codeBlock(`// $test() creates a Condition object
const cond = $test(disabled.val()); // { type: '$test', value: false }

// Traits extract conditions and states from ...rest args
// On each state change, conditions re-evaluate
// If ALL conditions pass → trait applies
// If ANY condition fails → trait does not apply (or removes attribute)`));
  return c;
};

pages['patterns/spa'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>SPA Architecture</h1>
    <p class="page-subtitle">Recommended file structure and patterns for single-page applications.</p>
    <h2 id="file-structure">File Structure</h2>
    <p>Based on <strong>High Cohesion, Low Coupling</strong> — each folder has a single clear responsibility:</p>`;
  c.appendChild(codeBlock(`src/
├── actions/      # Action creators — pure functions returning { type, payload }
├── machines/     # State machines — switch statements on state + action
├── main.ts       # Entry — initializes machine, renders initial UI
├── templates/    # [tag, trait] tuples and element factories
├── traits/       # Custom trait implementations
├── types/        # Type definitions (state shape, action types)
├── ui/           # Render functions keyed to machine states
└── theme/        # Semantic token overrides for this app`, 'bash'));
  c.innerHTML += `<h2 id="state-machine">State Machine Pattern</h2>`;
  c.appendChild(codeBlock(`// machines/app.ts
type AppState = 'idle' | 'loading' | 'ready' | 'error';
type AppAction = { type: 'LOAD' } | { type: 'LOADED'; data: any } | { type: 'ERROR'; msg: string };

const appState = State<AppState>('idle');

function dispatch(action: AppAction) {
  const current = appState.val();
  switch (current) {
    case 'idle':
      if (action.type === 'LOAD') {
        appState.set('loading');
        fetchData().then(data => dispatch({ type: 'LOADED', data }));
      }
      break;
    case 'loading':
      if (action.type === 'LOADED') appState.set('ready');
      if (action.type === 'ERROR')  appState.set('error');
      break;
  }
}`));
  c.innerHTML += `<h2 id="ui-rendering">UI Rendering</h2>`;
  c.appendChild(codeBlock(`// ui/index.ts
const views: Record<AppState, () => HTMLElement> = {
  idle:    renderIdle,
  loading: renderLoading,
  ready:   renderReady,
  error:   renderError,
};

const root = document.getElementById('root')!;

appState.sub((state) => {
  root.replaceChildren(views[state]());
});`));
  c.innerHTML += `<h2 id="actions">Actions</h2>`;
  c.appendChild(codeBlock(`// actions/index.ts
export const loadData   = (): AppAction => ({ type: 'LOAD' });
export const dataLoaded = (data: any):    AppAction => ({ type: 'LOADED', data });
export const dataError  = (msg: string):  AppAction => ({ type: 'ERROR', msg });`));
  return c;
};

// ── Prompts / Overview ────────────────────────────────────────────────────────

pages['prompts/overview'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `
    <h1>Prompts</h1>
    <p class="page-subtitle">Ready-made prompt templates to generate OEM applications with AI.</p>
    <h2 id="what-are-prompts">What are Prompts?</h2>
    <p>OEM prompts are structured markdown documents that give an LLM everything it needs to generate a complete, working OEM application. Each prompt includes:</p>
    <ul>
      <li><strong>Requirements</strong> — detailed feature specifications</li>
      <li><strong>BDD Scenarios</strong> — Gherkin-format acceptance tests in Given/When/Then form</li>
      <li><strong>Acceptance Criteria</strong> — a checklist of completion conditions</li>
    </ul>
    <h2 id="available-prompts">Available Templates</h2>`;
  c.appendChild(table(
    ['Template', 'Pattern', 'Description'],
    [
      ['Documentation App', 'documentation', 'Docs viewer with sidebar, search, and TOC'],
      ['Todo App', 'crud-list', 'CRUD todo list with filters and localStorage'],
      ['Chat Interface', 'conversational-ui', 'Messaging UI with typing indicators'],
      ['Analytics Dashboard', 'data-visualization', 'Metrics, charts, and sortable tables'],
      ['Multi-Step Wizard', 'multi-step-flow', 'Validated form wizard with progress'],
      ['Contact Form', 'form', 'Validated form with submission feedback'],
      ['Data Table', 'data-display', 'Sortable/filterable table with pagination'],
    ]
  ));
  c.innerHTML += `<h2 id="prompt-structure">Prompt Structure</h2>`;
  c.appendChild(codeBlock(`---
name: My App
description: A brief description
license: MIT
metadata:
  author: Your Name
  version: '1.0'
  pattern: crud-list
---

# My App

Brief summary of the application.

## Requirements
...

## BDD Scenarios
\`\`\`gherkin
Scenario: Core feature
  Given I am on the app
  When I perform an action
  Then I should see a result
\`\`\`

## Acceptance Criteria
- [ ] Feature 1 works
- [ ] Feature 2 works`, 'bash'));
  c.innerHTML += `<h2 id="use-wizard">Use the Wizard</h2>
    <p>Use the <strong>Prompt Wizard</strong> to create a customized prompt step by step, and the <strong>BDD Manager</strong> to author and manage your Gherkin scenarios.</p>`;
  c.appendChild(callout('info', 'Tip',
    'Paste the generated prompt directly into an AI assistant with the OEM skill loaded for best results.'));
  return c;
};

// Wizard and BDD pages are rendered by their own modules (wizard.ts, bdd.ts)
// These are placeholder renderers that get replaced by the app
pages['prompts/wizard'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `<h1>Prompt Wizard</h1><p class="page-subtitle">Loading...</p>`;
  return c;
};

pages['prompts/bdd'] = () => {
  const c = document.createElement('div');
  c.innerHTML = `<h1>BDD Manager</h1><p class="page-subtitle">Loading...</p>`;
  return c;
};

// ─── Public API ──────────────────────────────────────────────────────────────

export function renderPage(pageId: string): HTMLElement {
  const renderer = pages[pageId];
  if (renderer) return renderer();
  // 404 fallback
  const c = document.createElement('div');
  c.innerHTML = `<h1>Page Not Found</h1><p class="page-subtitle">The page <code>${pageId}</code> does not exist.</p>`;
  return c;
}

export function searchPages(query: string): { id: string; title: string; section: string }[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return flatPages.filter(p =>
    p.title.toLowerCase().includes(q) || p.section.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
  ).slice(0, 8);
}
