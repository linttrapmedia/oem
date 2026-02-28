// data.ts
import type { CodeExample, Feature, StateDoc, TraitDoc } from './types';

// ═══════════════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════════════

export const FEATURES: Feature[] = [
  {
    title: 'Zero Dependencies',
    description:
      'OEM ships nothing but itself. No virtual DOM, no compiler, no build step required. Pure TypeScript that runs in any browser.',
    icon: 'cube',
  },
  {
    title: 'Three Primitives',
    description:
      "Element, Trait, and State — that's it. Three concepts compose into any UI. No components, no hooks, no lifecycle soup.",
    icon: 'triangle',
  },
  {
    title: 'Surgical Reactivity',
    description:
      'Push-based subscriptions update only what changed. No diffing, no reconciliation, no tree walks. O(1) updates.',
    icon: 'bolt',
  },
  {
    title: 'Agent-First Design',
    description:
      'Flat, predictable patterns that LLMs can read, write, and reason about. Built for the age of AI-assisted development.',
    icon: 'brain',
  },
  {
    title: 'Token-Driven Theming',
    description:
      'Every visual value is a reactive token. Light/dark themes switch instantly. No CSS variables, no class toggling.',
    icon: 'palette',
  },
  {
    title: 'Automatic Cleanup',
    description:
      'WeakMap + MutationObserver handles all teardown. Remove an element, subscriptions vanish. Zero memory leaks.',
    icon: 'sparkle',
  },
] as const;

// ═══════════════════════════════════════════════
// PHILOSOPHY POINTS
// ═══════════════════════════════════════════════

export const PHILOSOPHY_POINTS = [
  {
    title: 'Composition Over Abstraction',
    body: 'OEM has no component model. Instead, plain functions return real DOM nodes. Traits attach behaviors. State objects broadcast changes. You compose these three primitives into any UI — no classes, no JSX, no framework ceremony.',
  },
  {
    title: 'Declarative DNA',
    body: 'A single nested expression declares structure, style, content, and reactivity in one place. What you write is what the browser builds — there is no intermediate representation, no compilation step, no hidden transforms.',
  },
  {
    title: 'Explicitness Over Magic',
    body: 'Every subscription is visible. Every style is inline on its element. Every event handler is wired where you can see it. OEM trades "convenience" features for total transparency.',
  },
  {
    title: 'Built for Machines',
    body: 'Flat file architecture, predictable patterns, and a tiny API surface make OEM uniquely well-suited for LLM-driven development. Agents can read, write, and reason about OEM code without special training.',
  },
] as const;

// ═══════════════════════════════════════════════
// SETUP STEPS
// ═══════════════════════════════════════════════

export const SETUP_CODE = `# Install with your preferred package manager
bun add @linttrap/oem
npm install @linttrap/oem
yarn add @linttrap/oem`;

export const HELLO_WORLD_CODE = `import { Template, useStyleTrait, useTextContentTrait } from '@linttrap/oem';

const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
});

const app = tag.div(
  trait.style('padding', '32px'),
  trait.style('fontFamily', 'system-ui, sans-serif'),
  tag.h1(
    trait.text('Hello, OEM'),
    trait.style('fontSize', '48px'),
    trait.style('background', 'linear-gradient(135deg, #555555, #444444)'),
    trait.style('WebkitBackgroundClip', 'text'),
    trait.style('WebkitTextFillColor', 'transparent'),
  ),
);

tag.$(document.body)(app);`;

// ═══════════════════════════════════════════════
// PRIMITIVES
// ═══════════════════════════════════════════════

export const PRIMITIVE_ELEMENT_CODE = `// Element — the tag proxy creates real DOM nodes
const [tag, trait] = Template({ style: useStyleTrait });

// Any HTML or SVG tag, called like a function
tag.div(
  tag.h1(trait.style('color', '#555555')),
  tag.p(trait.style('opacity', '0.8')),
  tag.svg(tag.circle()),
);

// Adopt existing elements
tag.$(document.body)(
  trait.style('margin', '0'),
  myApp,
);`;

export const PRIMITIVE_TRAIT_CODE = `// Trait — behaviors applied to elements
const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
});

tag.button(
  trait.text('Click me'),
  trait.style('padding', '12px 24px'),
  trait.style('backgroundColor', '#555555'),
  trait.style('color', '#c7c7c7'),
  trait.style('border', 'none'),
  trait.style('borderRadius', '8px'),
  trait.style('cursor', 'pointer'),
  trait.event('click', () => alert('Clicked!')),
  trait.attr('data-action', 'primary'),
);`;

export const PRIMITIVE_STATE_CODE = `import { State } from '@linttrap/oem';

// Create reactive state
const count = State(0);

// $val — getter function AND subscribable
trait.text(count.$val);

// $reduce — deferred mutation for event wiring
trait.event('click', count.$reduce(prev => prev + 1));

// $test — reactive condition
trait.style('color', '#444444', count.$test(v => v > 0));
trait.style('color', '#888888', count.$test(0));

// Custom methods auto-generate $ twins
const todos = State([], {
  add: (state, text: string) =>
    state.reduce(prev => [...prev, { text, done: false }]),
});

trait.event('click', todos.$add('New todo'));`;

// ═══════════════════════════════════════════════
// CODE EXAMPLES
// ═══════════════════════════════════════════════

export const EXAMPLES: CodeExample[] = [
  {
    title: 'Reactive Counter',
    description: 'State, traits, and events in 15 lines.',
    language: 'typescript',
    code: `const count = State(0);

const counter = tag.div(
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', '16px'),
  tag.button(
    trait.text('−'),
    trait.event('click', count.$reduce(n => n - 1)),
    trait.style('fontSize', '24px'),
  ),
  tag.span(
    trait.text(count.$val),
    trait.style('fontSize', '48px'),
    trait.style('fontWeight', '700'),
    trait.style('color', '#555555'),
  ),
  tag.button(
    trait.text('+'),
    trait.event('click', count.$reduce(n => n + 1)),
    trait.style('fontSize', '24px'),
  ),
);`,
  },
  {
    title: 'Dynamic List',
    description: 'innerHTML trait for reactive collections.',
    language: 'typescript',
    code: `const items = State<string[]>([]);
const input = State('');

const list = tag.div(
  tag.div(
    trait.style('display', 'flex'),
    trait.style('gap', '8px'),
    tag.input(
      trait.inputValue(input.$val),
      trait.inputEvent('input', input.$set),
      trait.style('flex', '1'),
    ),
    tag.button(
      trait.text('Add'),
      trait.event('click', () => {
        items.reduce(prev => [...prev, input.val()]);
        input.set('');
      }),
    ),
  ),
  tag.ul(
    trait.innerHTML(
      () => items.val().map(item =>
        tag.li(trait.text(item))
      ),
      items,
    ),
  ),
);`,
  },
  {
    title: 'Theme Toggle',
    description: 'Token-driven light/dark switching.',
    language: 'typescript',
    code: `import { useThemeState, useTokenState } from '@linttrap/oem';

const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);
const fg = useTokenState('#222222', '#c7c7c7', theme);
const accent = useTokenState('#555555', '#999999', theme);

const app = tag.div(
  trait.style('backgroundColor', bg.$val),
  trait.style('color', fg.$val),
  trait.style('transition', 'all 0.3s ease'),
  tag.button(
    trait.text(() =>
      theme.val() === 'dark' ? '☀️ Light' : '🌙 Dark',
      theme,
    ),
    trait.event('click', () =>
      theme.reduce(t => t === 'dark' ? 'light' : 'dark'),
    ),
    trait.style('color', accent.$val),
  ),
);`,
  },
  {
    title: 'Conditional Styles',
    description: 'Conditions replace ternaries for clean branching.',
    language: 'typescript',
    code: `const isActive = State(false);

tag.div(
  // Base styles — always applied
  trait.style('padding', '16px'),
  trait.style('borderRadius', '8px'),
  trait.style('cursor', 'pointer'),
  trait.style('transition', 'all 0.2s ease'),

  // Conditional branches — never ternaries
  trait.style('backgroundColor', '#555555',
    isActive.$test(true)),
  trait.style('backgroundColor', '#c7c7c7',
    isActive.$test(false)),
  trait.style('color', '#c7c7c7',
    isActive.$test(true)),
  trait.style('color', '#888888',
    isActive.$test(false)),
  trait.style('boxShadow', '0 0 20px rgba(80,80,80,0.3)',
    isActive.$test(true)),
  trait.style('boxShadow', 'none',
    isActive.$test(false)),

  trait.text(() =>
    isActive.val() ? 'Active' : 'Inactive', isActive),
  trait.event('click', isActive.$reduce(v => !v)),
);`,
  },
] as const;

// ═══════════════════════════════════════════════
// TRAIT DOCS
// ═══════════════════════════════════════════════

export const TRAIT_DOCS: TraitDoc[] = [
  {
    name: 'useAnimationTrait',
    signature: '(el, keyframes, options, ...rest)',
    description:
      'Plays Web Animations API keyframe animations reactively. Supports conditional gating and state-driven re-triggering.',
  },
  {
    name: 'useAriaTrait',
    signature: '(el, prop, val, ...rest)',
    description:
      'Sets ARIA attributes and role reactively. Removes attributes when value is undefined or conditions are falsy.',
  },
  {
    name: 'useAttributeTrait',
    signature: '(el, prop, val, ...rest)',
    description: 'Sets or removes HTML attributes. Undefined value removes the attribute.',
  },
  {
    name: 'useClassNameTrait',
    signature: '(el, className, ...rest)',
    description: 'Sets the entire class attribute. Reserved for third-party library integration.',
  },
  {
    name: 'useDataAttributeTrait',
    signature: '(el, name, val, ...rest)',
    description:
      'Sets or removes data-* attributes via the dataset API. Accepts bare or prefixed names.',
  },
  {
    name: 'useEventTrait',
    signature: '(el, evt, cb, ...rest)',
    description:
      'Attaches DOM event listeners. Auto-cleaned on element removal. Gated by conditions.',
  },
  {
    name: 'useFocusTrait',
    signature: '(el, ...rest)',
    description: 'Programmatically focuses an element when reactive conditions are met.',
  },
  {
    name: 'useInnerHTMLTrait',
    signature: '(el, children, ...rest)',
    description: 'Clears and re-appends children on state change. Used for dynamic lists.',
  },
  {
    name: 'useInputEventTrait',
    signature: '(el, evt, setter, ...rest)',
    description: 'Attaches input events that extract e.target.value and pipe to a setter.',
  },
  {
    name: 'useInputValueTrait',
    signature: '(el, value, ...rest)',
    description: 'Binds a value to input/textarea elements reactively.',
  },
  {
    name: 'useScrollIntoViewTrait',
    signature: '(el, options?, ...rest)',
    description:
      'Scrolls an element into view when conditions are met. Accepts ScrollIntoViewOptions.',
  },
  {
    name: 'useStyleTrait',
    signature: '(el, prop, val, ...rest)',
    description:
      'Sets a single CSS style property. Supports camelCase and custom properties. Reactive via $val.',
  },
  {
    name: 'useStyleOnEventTrait',
    signature: '(el, evt, prop, val, ...rest)',
    description:
      'Applies a CSS style when a specific DOM event fires. Perfect for hover/focus patterns.',
  },
  {
    name: 'useTextContentTrait',
    signature: '(el, text, ...rest)',
    description: 'Sets text content reactively. Accepts strings, arrays, or getter functions.',
  },
] as const;

// ═══════════════════════════════════════════════
// STATE DOCS
// ═══════════════════════════════════════════════

export const STATE_DOCS: StateDoc[] = [
  {
    name: 'State',
    signature: 'State<T, M>(initial, methods?)',
    description:
      'Core reactive container. Holds a value, notifies subscribers on change. Custom methods auto-generate $-prefixed deferred twins.',
  },
  {
    name: 'useFormState',
    signature: 'useFormState(initialValues, validators?)',
    description:
      'Reactive form state with validation, dirty tracking, touched fields, and field-level control.',
  },
  {
    name: 'useIntersectionObserverState',
    signature: 'useIntersectionObserverState(el, options?)',
    description:
      'Tracks element visibility within the viewport using the Intersection Observer API.',
  },
  {
    name: 'useMediaQueryState',
    signature: 'useMediaQueryState({ minWidth?, maxWidth? })',
    description:
      'Reactive state tracking viewport size. Returns State<boolean>. Use $test for responsive conditions.',
  },
  {
    name: 'useOnlineState',
    signature: 'useOnlineState()',
    description: 'Tracks browser online/offline connectivity. Returns State<boolean>.',
  },
  {
    name: 'useThemeState',
    signature: "useThemeState('light' | 'dark')",
    description: 'Single source of truth for current theme. Returns a State<Theme> object.',
  },
  {
    name: 'useTimerState',
    signature: 'useTimerState(intervalMs, options?)',
    description:
      'Interval-driven counter with start, stop, and reset controls. Auto-start optional.',
  },
  {
    name: 'useTokenState',
    signature: 'useTokenState(lightVal, darkVal, themeState)',
    description:
      'Derived state that selects between light/dark values based on themeState. Updates automatically on theme change.',
  },
  {
    name: 'useUrlState',
    signature: 'useUrlState(routes)',
    description:
      'Tracks the current URL, matching against defined routes and extracting params, query, and hash.',
  },
  {
    name: 'useWindowSizeState',
    signature: 'useWindowSizeState()',
    description: 'Tracks viewport width and height in real-time. Returns State<{ width, height }>.',
  },
] as const;

// ═══════════════════════════════════════════════
// ARCHITECTURE
// ═══════════════════════════════════════════════

export const ARCH_FILES = [
  { name: 'types.ts', purpose: 'TypeScript type definitions. No runtime code.' },
  { name: 'constants.ts', purpose: 'UPPER_SNAKE_CASE values. Immutable, no reactivity.' },
  { name: 'data.ts', purpose: 'Static data known at build time. Arrays, objects, content.' },
  { name: 'states.ts', purpose: 'All State() instances. Module-level singletons.' },
  { name: 'actions.ts', purpose: 'Pure functions returning { type, payload } objects.' },
  { name: 'machines.ts', purpose: 'Switch statements dispatching actions to state mutations.' },
  { name: 'traits.ts', purpose: 'Custom trait functions. Most apps need zero.' },
  { name: 'templates.ts', purpose: 'Template() calls creating [tag, trait] pairs.' },
  { name: 'theme.ts', purpose: 'useThemeState + all useTokenState tokens.' },
  { name: 'icons.ts', purpose: 'SVG icon functions with private Template.' },
  { name: 'ui.ts', purpose: 'All DOM construction. Imports everything, defines nothing.' },
  { name: 'main.ts', purpose: 'Entry point. Import UI, mount to body. Side effects OK here.' },
] as const;

export const ARCH_DIAGRAM_CODE = `// The dependency flow — every arrow points down
//
//   types.ts
//      ↓
//   constants.ts    config.ts
//      ↓               ↓
//   data.ts         states.ts
//      ↓               ↓
//   actions.ts ←── machines.ts
//      ↓               ↓
//   theme.ts     templates.ts    traits.ts    icons.ts
//      ↓               ↓            ↓            ↓
//      └───────── ui.ts ────────────┘────────────┘
//                   ↓
//               main.ts`;
