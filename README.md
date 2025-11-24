# OEM - <small>The Roll Your Own Framework Framework</small>

[**Full Docs at oem.js.org**](https://oem.js.org)

OEM is a minimal, convention-driven toolkit for crafting your own reactive, component-based UI layer—fully local, fully understood, and entirely yours.

## TOC

- [Philosophy](#philosophy)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [State](#state)
- [Templating](#templating)
- [Storage](#storage)
- [Traits](#traits)

## Philosophy

### Transparency by Design

OEM’s primary goal is **transparency**. It strips away the “black box” complexity of modern frameworks and replaces it with small, local behaviors you can actually reason about.

- **Readable Core:** ~300 lines of plain TypeScript you can grasp in a single sitting
- **Local Behavior:** Features are implemented as **Traits**—small files that live next to your markup and are meant to be **copied, edited, and extended**
- **No Hidden Magic:** Everything reduces to simple reactive patterns (pub/sub, observers, state flows) that you can inspect and reshape

### Why OEM?

- ✓ ~2.7KB minified core, zero dependencies
- ✓ Reactive DOM with no virtual DOM layer
- ✓ Locality of behavior makes reasoning—and debugging—trivial
- ✓ AI can generate Traits directly, and you can understand and refine every line
- ✓ Full TypeScript types without framework overhead
- ✓ Copy only what you need; no bulk, no lock-in

OEM is small enough for **humans to master** and **AI to extend**—a feedback loop where you understand the code, adjust it, and let the AI build on your exact patterns.

## Installation

## Download

ke it yours! You don't need to "install" anything. Use the [OEM Download Generator](https://oem.js.org) to customize and download a package with only the Traits and States you need.

### Using npm

```bash
npm install @linttrap/oem
```

## 🎯 Quick Start

This is the simplest way to show how **State** and **Templating** work together to create a reactive component.

```typescript
// 1. Configure the template with needed traits
const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
});

// 2. Create reactive state
const count = State(0);

// 3. Generate DOM with reactive bindings
const app = tag.div(
  // Reactive text: auto-updates when count changes
  tag.h1(count.$val),

  // Style trait: applies CSS styles
  // Event trait: uses the $ pattern for clean syntax
  tag.button(
    trait.style('padding', '10px'),
    trait.style('font-size', '16px'),
    trait.event(
      'click',
      count.$reduce((n) => n + 1),
    ),
    'Increment',
  ),
);

document.body.appendChild(app);
```

## How It Works

Understanding the complete reactive loop:

1. **Create State**: `const count = State(0);`
2. **Configure Template with Traits**: `const [tag, trait] = Template({ event: useEventTrait });`
3. **Build Elements with Reactive Bindings**:
   ```typescript
   const app = tag.div(
     tag.h1(count.$val), // Template sees $val and subscribes
     tag.button(
       trait.event(
         'click',
         count.$reduce((n) => n + 1),
       ),
       'Increment',
     ),
   );
   ```
4. **Behind the Scenes**:
   - Template detects `count.$val` and automatically subscribes to state changes
   - When button is clicked, `count.$reduce` updates the state
   - State notifies all subscribers (including the h1's text node)
   - UI updates automatically without manual DOM manipulation

**This is the entire reactive loop**: No virtual DOM diffing, no complex lifecycle hooks. Just pub/sub with smart subscription management via WeakMap and MutationObserver for cleanup.

## State

The `State` object provides simple reactive state management using the **pub/sub pattern**.

| Method       | `$` Version       | Description                                         |
| :----------- | :---------------- | :-------------------------------------------------- |
| `val()`      | **`$val()`**      | Get the value                                       |
| `set(v)`     | **`$set(v)`**     | Set a new value                                     |
| `reduce(fn)` | **`$reduce(fn)`** | Update value based on the previous value            |
| `sub(cb)`    | N/A               | Subscribe to state changes (returns unsubscribe fn) |
| `test(p)`    | **`$test(p)`**    | Test if the value matches a predicate/condition     |
| `call(m)`    | **`$call(m)`**    | Call methods on boxed primitives                    |

**Understanding the $ Pattern**

The dollar sign (`$`) prefix on State methods is essential for reactivity and clean syntax:

1. **Reactive UI Updates:** When you use a `$` method inside a template function (e.g., `tag.h1(count.$val)`), the template automatically **subscribes** to that state. When the state changes, the UI updates.
2. **Clean Event Handlers:** It returns a **closure** (a function that executes later), allowing for clean, wrapper-free event binding.

```typescript
// Verbose: Needs an arrow function wrapper
trait.event('click', () => count.set(0));

// Clean: Use the $ pattern
trait.event('click', count.$set(0));
```

### Ready-Made States

**state utilities are NOT bundled** - you copy ready-made implementations from `src/states/` into your project or build your own.

### Available States

| State                | Description                                              |
| :------------------- | :------------------------------------------------------- |
| `useMediaQueryState` | Reactive media query state that updates on window resize |

### Example Usage

```typescript
import { useMediaQueryState } from '@linttrap/oem/states/MediaQuery';

// Create reactive state for mobile breakpoint
const isMobile = useMediaQueryState({ maxWidth: 768 });

// Use in your UI
const nav = tag.nav(trait.style('display', 'block', isMobile.$test(true)), 'Mobile Navigation');

// Desktop breakpoint
const isDesktop = useMediaQueryState({ minWidth: 1024 });
```

**More coming soon!** We're adding router state, form state, async data state, and more. Check `src/states/` for updates.

## Templating

The `Template` function creates the DOM-building tools you need by configuring available **Traits**.

**Configuration:**

```typescript
import { Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';

// This returns two proxies:
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});
```

- **The `tag` Proxy:** Creates standard HTML and SVG elements (`tag.div()`, `tag.h1()`, `tag.svg()`, etc.) with full TypeScript support
- **The `trait` Proxy:** Provides access to the configured trait functions (`trait.style(...)`, `trait.event(...)`, etc.)

**Components and Children:**

```typescript
// Components are just functions that return elements
function Button(text: string, onClick: () => void) {
  return tag.button(trait.event('click', onClick), text);
}

const app = tag.div(Button('Click Me', () => console.log('Hi')));
```

## Storage

The `Storage` utility automatically manages and syncs state objects with web storage (`localStorage`, `sessionStorage`) or custom sync methods.

```typescript
import { Storage, State } from '@linttrap/oem';

const storage = Storage({
  data: {
    username: {
      key: 'app-username',
      state: State(''),
      storage: 'localStorage', // Persists across sessions
    },
  },
  sync: {
    // Custom method to load data from an API
    fetchTodos: async () => {
      // ... API fetch logic ...
      storage.data.todos.set(todos);
    },
  },
});

// Access state directly
storage.data.username.set('Alice'); // Auto-saves to localStorage
```

## Traits

A **Trait** is a function that applies behavior to a DOM element.

**Key Concept: Localized Behavior**

Traits keep behavior directly alongside your markup, preserving Locality of Behavior. You can attach multiple traits—even multiple of the same kind—to a single element. This produces a clean, declarative syntax that eliminates messy conditionals and manual DOM manipulation.

```typescript
tag.input(
  trait.value(name.$val), // Input value binding
  trait.event('input', handler), // Event handler
  trait.style('color', 'red', isAlert.$test(true)), // conditional style
  trait.style('color', 'blue', isAlert.$test(false)), // conditional style
);
```

**Trait Availability and Customization**

Traits are your framework: you build and manage your own library of traits. Ready-made traits live in src/traits/. Simply copy what you need into your project, and customize or extend them as you like.

### Ready-Made Traits

| Trait                 | Description                                      |
| :-------------------- | :----------------------------------------------- |
| `useAttributeTrait`   | Apply HTML attributes (`disabled`, `type`, etc.) |
| `useStyleTrait`       | Apply CSS styles                                 |
| `useEventTrait`       | Attach event listeners                           |
| `useInputValueTrait`  | Bind input values to state                       |
| `useInnerHTMLTrait`   | Set `innerHTML` reactively (useful for lists)    |
| `useClassNameTrait`   | Manage CSS classes                               |
| `useFocusTrait`       | Control element focus                            |
| `useTextContentTrait` | Set text content reactively                      |

### Creating Custom Traits

A trait is simply a function whose first argument is the element it modifies, and it returns a cleanup function. All behavior—including "reactivity"—is handled inside the trait itself. Here’s the basic anatomy of a reactive trait:

```typescript
function useMyCustomTrait(
  el: HTMLElement,
  aCustomProperty: string,
  anotherCustomProperty: number,
  ...rest: (StateType<any> | Condition)[]
) {
  // Separate State objects from static conditions
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = [val ?? '', ...rest].filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));

  // 1. Define the logic that applies the behavior
  const apply = () => {
    // YOUR CODE GOES HERE: Apply text, change style, etc.
  };

  // 2. Initial application
  apply();

  // 3. Subscribe to all passed State objects
  const states = rest.filter(/* ... logic to find state objects ... */);
  const unsubs = states.map((state) => state.sub(apply));

  // 4. Return cleanup function (crucial for memory management)
  return () => unsubs.forEach((unsub) => unsub());
}
```

## 🌐 Browser Support

Requires ES6+ support:

- Chrome 49+
- Firefox 18+
- Safari 10+
- Edge 12+

## 📄 License

<img src="docs/assets/oem.png" width="150" style="border-radius:5px; margin:20px 0;" alt="OEM Logo" />

MIT License

©Copyright 2024. All rights reserved. Made in the USA 🇺🇸 by [Lint Trap Media](http://linttrap.media).
