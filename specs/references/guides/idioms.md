---
name: Idiomatic OEM
description: Best practices and idioms for writing clean, consistent OEM code.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Idiomatic OEM

OEM is unlike traditional UI frameworks. There is no virtual DOM, no JSX, no component lifecycle, and no render loop. Instead, OEM models UI as a flat composition of **elements**, **traits**, and **state** — three primitives that combine into a declarative, reactive system that reads like a blueprint and behaves like a living document.

This guide codifies the patterns and conventions that make OEM code idiomatic: easy for humans to read, easy for LLMs to generate, and easy for the runtime to keep efficient.

---

## The Three Primitives

Everything in OEM reduces to three things:

| Primitive   | What it is                                                             | Created by                                   |
| ----------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| **Element** | A real DOM node (HTML or SVG)                                          | `tag.div(...)`, `tag.button(...)`, etc.      |
| **Trait**   | A behavior applied to an element (style, event, attribute, content, …) | `trait.style(...)`, `trait.event(...)`, etc. |
| **State**   | A reactive value that notifies subscribers when it changes             | `State(initialValue)`                        |

An OEM application is built by creating elements, decorating them with traits, and wiring those traits to state objects so the UI updates automatically.

---

## Template Destructuring

Every OEM file that produces UI starts by creating a template and destructuring it into `tag` and `trait`:

```ts
import { Template, useStyleTrait, useTextContentTrait, useEventTrait } from '@linttrap/oem';

export const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
  event: useEventTrait,
});
```

- `tag` is a proxy — access any HTML or SVG tag name as a property: `tag.div`, `tag.span`, `tag.svg`, `tag.circle`, etc.
- `trait` is a proxy — access any trait name from the config: `trait.style`, `trait.text`, `trait.event`, etc.
- A template is defined once per module and reused throughout that module.

---

## Element Construction

Elements are created by calling a tag function with traits and child elements as arguments. Traits and children are interleaved freely — order determines DOM order for children, and trait application order for behaviors:

```ts
tag.div(
  trait.style('padding', '16px'),
  trait.style('backgroundColor', surface_bg_primary.$val),
  tag.h1(
    trait.text('Hello, OEM'),
    trait.style('fontSize', type_size_xl.$val),
  ),
  tag.p(
    trait.text(message.$val),
    trait.style('color', text_fg_secondary.$val),
  ),
);
```

This is the heart of idiomatic OEM: a single nested expression that declaratively specifies structure, style, content, and reactivity in one place. Notice that `token.$val` is used rather than `() => token.val(), token` — `$val` is simultaneously a getter function AND a subscribable (it carries a `.sub` property), so traits auto-detect it as both the value source and the subscription source.

### Adopting Existing Elements

Use `tag.$(existingElement)` to wrap an existing DOM node and apply traits to it:

```ts
tag.$(document.body)(
  trait.style('margin', '0'),
  trait.style('fontFamily', 'system-ui, sans-serif'),
  myAppRoot,
);
```

---

## Traits Are Appliers

A trait call like `trait.style('color', 'red')` does **not** immediately mutate the DOM. It returns a function `(el: HTMLElement) => void` — an **applier**. The tag proxy calls each applier with the created element after it exists.

This is an implementation detail. Traits should always be applied directly and inline to their target element — do not store trait appliers in shared variables or pass them between elements.

---

## Reactivity Model

OEM's reactivity is **push-based** and **surgically scoped**:

1. A `State` object holds a value and a set of subscribers.
2. Traits subscribe to states they depend on. When a state changes, only the traits subscribed to that state re-run — no diffing, no reconciliation, no tree walk.
3. When an element is removed from the DOM, a `MutationObserver` fires and all its trait subscriptions are cleaned up automatically via a `WeakMap`.

### How traits subscribe to state

Every trait accepts `...rest: (StateType | Condition)[]` as trailing arguments. The runtime uses `extractStates()` and `extractConditions()` with duck-typing to separate these:

- Objects with a `.sub` property → **State** (subscribed to for re-evaluation)
- Objects with `.type === '$test'` → **Condition** (gates whether the trait applies)

The key insight is that `state.$val` has a `.sub` property attached to it, so it is auto-detected as a State by `extractStates`. This means `$val` serves as **both** the getter function and the subscription source, collapsing two arguments into one:

```ts
// ✅ Idiomatic: $val is both the getter and the subscription
trait.style('color', text_fg_primary.$val);
trait.text(message.$val);

// Verbose equivalent (only needed for computed/derived values):
trait.text(() => `Count: ${count.val()}`, count);
trait.style('color', () => text_fg_primary.val(), text_fg_primary);
```

Use `$val` when you need the state's raw value. Use the verbose `() => expr, state` form only when you need to compute or transform the value (e.g., string interpolation, `.map()`, property access on complex objects).

For State objects with custom methods, each method auto-generates a `$`-prefixed deferred version. For complex state objects (Objects, Arrays), custom getter methods provide targeted access to specific keys or values. These custom `$`-prefixed methods work as thunks for event handlers, but they do NOT carry `.sub` — so for reactive binding of complex state values, use the verbose form or `$val` when the whole value is needed.

### Static vs. dynamic values

Every trait parameter that accepts a value also accepts a `() => value` function. Use a function when the value should re-evaluate on state changes; use a literal when it's constant:

```ts
trait.style('display', 'flex'); // static — never changes
trait.style('opacity', () => '...some computed value...'); // dynamic — re-evaluates on state change
```

---

## Conditions Over Ternaries

**Never use ternary operators in trait arguments.** Instead, use separate trait calls gated by conditions. This keeps each branch explicit, reactive, and independently addressable:

```ts
// ✅ Idiomatic: separate trait calls with conditions
trait.style('opacity', '1', enabled.$test(true)),
trait.style('opacity', '0.4', enabled.$test(false)),

// ❌ Anti-pattern: ternary hides branches
trait.style('opacity', enabled ? '1' : '0.4'),
```

### Creating conditions

State objects have `.test()` for immediate evaluation and `.$test()` for reactive conditions. The standalone `$test()` helper from `@linttrap/oem` handles cases where State's built-in `.$test` doesn't apply:

```ts
// Preferred: State's built-in $test (self-subscribing — has .sub attached)
count.$test(0); // true when count === 0
count.$test((v) => v > 10); // true when count > 10
filter.$test('active'); // true when filter === 'active'
filter.$test(/active|all/); // true when filter matches regex

// State's immediate .test (for non-reactive checks)
count.test(0); // returns boolean right now
count.test((v) => v > 10); // returns boolean right now

// Standalone $test helper (NOT self-subscribing — you must pass states separately)
import { $test } from '@linttrap/oem';
$test(true);
$test(() => count.val() > 0); // must also pass `count` in ...rest
```

**Important**: `state.$test(...)` is self-subscribing because it carries `.sub` — the trait auto-detects it as a subscription source AND a condition simultaneously. The standalone `$test()` from util does NOT have `.sub`, so when using it with state-derived values you must pass the state objects separately in `...rest`.

### Multiple conditions are AND-ed

When a trait receives multiple conditions, **all** must be truthy for the trait to apply:

```ts
trait.style(
  'backgroundColor',
  action_bg_primary.$val,
  disabled.$test(false),
  isHovered.$test(true),
);
```

---

## The `$` Thunk Convention

Every State method has a `$`-prefixed twin that returns a **closure** instead of executing immediately. This is the primary mechanism for wiring state to event handlers and traits without intermediate arrow functions:

```ts
const count = State(0);

// Direct execution
count.set(5); // sets immediately
count.reduce((prev) => prev + 1); // increments immediately

// Thunked (deferred) execution — returns () => void
count.$set(5); // returns () => count.set(5)
count.$reduce((prev) => prev + 1); // returns () => count.reduce(prev + 1)

// Perfect for event handlers
trait.event(
  'click',
  count.$reduce((prev) => prev + 1),
);
trait.event('click', darkMode.$set('dark'));
```

`$val` and `$test` are special — they also carry a `.sub` property, so they double as reactive subscription sources when passed to traits:

```ts
// $val: both a getter AND a subscribable — traits detect it automatically
trait.attr('data-count', count.$val);
trait.text(count.$val);
trait.style('color', text_fg_primary.$val);

// $test: both a condition AND a subscribable
trait.style('opacity', '1', count.$test((v) => v > 0));
```

### Custom methods follow the same pattern

```ts
const counter = State(
  { count: 0 },
  {
    increment: (state) => state.reduce((prev) => ({ count: prev.count + 1 })),
  },
);

// Direct
counter.increment();

// Deferred — wire directly to an event
trait.event('click', counter.$increment());
```

---

## State Lives Outside Functions

State objects are **module-level singletons**, not component-local. They are created once and imported wherever needed:

```ts
// states.ts
export const todos = State<Todo[]>([]);
export const filter = State<'all' | 'active' | 'completed'>('all');
export const editingId = State<string | null>(null);
```

This is fundamental to OEM's architecture. Because state is not scoped to a component tree, there is no prop drilling, no context providers, and no need for a global store pattern. Any trait in any template can subscribe to any state.

---

## Token-Driven Styling

**Never hardcode visual values.** Every color, spacing, font size, radius, shadow, and other design property must come from a `useTokenState` token:

```ts
// ❌ Anti-pattern
trait.style('backgroundColor', '#2563eb');
trait.style('padding', '16px');

// ✅ Idiomatic
trait.style('backgroundColor', action_bg_primary.$val);
trait.style('padding', space_padding_md.$val);
```

Tokens are State objects — they react to theme changes automatically. Tokens are the **only** mechanism for reusable visual consistency across elements. Do not create shared trait arrays as "reusable styles" — reuse comes from referencing the same tokens. See the [Theming & Design Tokens](theming.md) guide for full details on token naming, creation, and reuse.

---

## Composition Patterns

### Apply traits directly and inline

Traits should be applied directly to their target element, not stored in shared variables. Reusable visual consistency comes from tokens, not from shared trait arrays:

```ts
// ✅ Idiomatic: traits applied directly, tokens provide consistency
tag.div(
  trait.style('backgroundColor', surface_bg_secondary.$val),
  trait.style('borderRadius', radius_size_md.$val),
  trait.style('padding', space_padding_lg.$val),
  tag.h2(trait.text('Card Title')),
  tag.p(trait.text('Card body')),
);
```

### Helper functions ("components")

Extract a subtree into a plain function **only** when: (a) it is used multiple times, (b) it needs to exist as a factory with parameters, or (c) it is extremely large (>1000 lines). There is no special component API — it's just a function that returns an element. Default to inlining everything:

```ts
function TodoItem(todo: Todo) {
  return tag.li(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.event('dblclick', () => editingId.set(todo.id)),
    tag.input(
      trait.attr('type', 'checkbox'),
      trait.event('change', () => toggleTodo(todo.id)),
    ),
    tag.span(
      trait.text(todo.text),
      trait.style(
        'textDecoration',
        'line-through',
        todos.$test((t) => t.find((i) => i.id === todo.id)?.completed),
      ),
    ),
  );
}
```

### Looping / Dynamic Lists

Use `trait.innerHTML` with a reactive function to render lists that update when state changes:

```ts
tag.ul(
  trait.innerHTML(
    () => todos.val().map((todo) => TodoItem(todo)),
    todos,
  ),
);
```

The `innerHTML` trait clears the element and re-appends children on every state change — it is a full tear-down-and-rebuild, not a diff. Child elements are appended directly via `appendChild` (no serialization). Pass all State objects the list depends on as trailing arguments:

```ts
// List depends on both `todos` and `filter` state
tag.ul(
  trait.innerHTML(
    () => filteredTodos().map((todo) => TodoItem(todo)),
    todos,
    filter,
  ),
);
```

---

## Event Handling

Wire events with `trait.event`. Handlers can be plain functions or `$`-thunked state operations:

```ts
// Plain handler
trait.event('click', () => console.log('clicked'));

// Thunked state mutation
trait.event(
  'click',
  count.$reduce((prev) => prev + 1),
);

// Conditional event — only attached when condition is true
trait.event(
  'click',
  handleSubmit,
  isSubmitting.$test(false),
);
```

Events are automatically removed when the element is removed from the DOM.

---

## Automatic Cleanup

OEM manages memory automatically:

1. Every trait returns an unsubscribe function.
2. `Template` stores these in a `WeakMap<Element, cleanup[]>`.
3. A global `MutationObserver` watches for element removal.
4. When an element is removed, all its cleanup functions execute — event listeners are detached, state subscriptions are dropped.

You never need to manually unsubscribe or tear down. Build elements, append them, remove them — the framework handles the rest.

---

## Summary of Rules

| Rule                                          | Why                                                                  |
| --------------------------------------------- | -------------------------------------------------------------------- |
| Destructure `Template` into `[tag, trait]`    | Establishes the two proxies used everywhere                          |
| Prefer `$val` over verbose `() => val(), st`  | Collapses getter + subscription into one reference                   |
| Never use ternaries in trait args             | Conditions keep branches explicit and reactive                       |
| Prefer `state.$test()` for conditions         | Self-subscribing — auto-detected as both Condition and State         |
| Never hardcode visual values                  | Tokens ensure consistency and automatic theming                      |
| Reuse tokens, not trait arrays                | Tokens are the reusable visual primitives, not shared trait groups   |
| Apply traits directly and inline              | Traits belong to their element; do not store or share them           |
| Use `$`-thunked methods for event handlers    | Avoids wrapping lambdas; clean event wiring                          |
| State lives at module level                   | No prop drilling; any trait can subscribe to any state               |
| Extract functions only when reused or huge    | Default to inlining; extract only for reuse, factories, or >1k lines |
| Use `innerHTML` for dynamic lists             | Clears and re-renders on state change; appends real DOM nodes        |
| Let cleanup happen automatically              | MutationObserver + WeakMap handles all teardown                      |
