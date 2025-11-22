# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

OEM is a ~2KB lightweight library for building reactive UIs with vanilla TypeScript. It provides three core building blocks:

1. **State** - Reactive state management with pub/sub pattern
2. **Template** - Proxy-based HTML/SVG element creation with trait system
3. **Storage** - Persistent state with localStorage/sessionStorage/memory

**Key Philosophy**: OEM is a "roll your own framework" framework - minimal core with extensible trait-based behaviors. No virtual DOM, zero dependencies. **Traits and States are NOT bundled** - users must copy ready-made implementations from `src/traits/` and `src/states/` or create their own.

## Development Commands

**IMPORTANT**: This project uses **Bun exclusively** (not Node.js, npm, vite, or webpack). See `.cursor/rules/use-bun-instead-of-node-vite-npm-pnpm.mdc` for details.

```bash
# Install dependencies
make install        # or: bun install

# Run tests (opens unit.html in browser)
make test          # or: bun ./test/unit.html

# Build distribution files (dist/)
make dist

# Build documentation site (docs/app.js)
make docs

# Run documentation in dev mode with hot reload
make dev           # or: bun ./docs/dev.html --watch

# Run examples in dev mode
make examples      # or: bun ./examples/index.html --watch

# Clean build artifacts
make clean

# Format code
bun x prettier --write .

# Publish to npm
make publish

# Deploy docs to GitHub Pages (oem.js.org)
make deploy
```

## Architecture

### Core Module: `src/oem.ts`

The core library exports **only** three functions: `State`, `Template`, and `Storage`. Everything else (traits, utilities) are reference implementations.

**`State<T>(initialValue: T)`** - Creates reactive state with pub/sub pattern

Methods:
- `val()` - Get current value
- `set(value)` - Set new value and notify subscribers
- `reduce(fn)` - Update based on previous value
- `sub(callback)` - Subscribe to changes (returns unsubscribe function)
- `test(predicate, truthCheck?)` - Test value (supports regex, function, or direct comparison)
- `call(method, ...args)` - Call methods on boxed primitives (String, Number, Boolean)
- `chain(...calls)` - Chain multiple method calls

**The $ Pattern**: All methods have `$`-prefixed versions (`$val`, `$set`, `$reduce`, `$test`, `$call`, `$chain`) that return closures. This is crucial for two reasons:

1. **Event Handlers** - Avoids verbose wrapper functions:
```typescript
// Without $ - verbose
tag.button(trait.event('click', () => count.set(0)), 'Reset')

// With $ - clean
tag.button(trait.event('click', count.$set(0)), 'Reset')
```

2. **Reactive UI Updates** - Template automatically subscribes to $ methods:
```typescript
const count = State(0);

// Text auto-updates when count changes
tag.h1(count.$val)

// Conditional visibility
tag.div(
  trait.style('display', 'block', count.$test(0, false)), // Hide when 0
  'Count is not zero'
)
```

**`Template<P>(config?: P)`** - Creates HTML/SVG element factory with trait system

Returns tuple `[tag, trait]`:
- `tag` - Proxy for creating elements: `tag.div()`, `tag.button()`, `tag.svg()`, etc. (all HTML/SVG elements available)
- `trait` - Proxy for applying configured traits: `trait.style()`, `trait.event()`, etc.

```typescript
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});

const app = tag.div(
  trait.style('padding', '20px'),
  tag.button(
    trait.event('click', () => console.log('clicked')),
    'Click me'
  )
);
```

**Automatic Cleanup**: Uses `WeakMap` + `MutationObserver` to automatically cleanup trait subscriptions when elements are removed from DOM.

**`Storage<Data, Sync>(config)`** - Wraps State objects with storage persistence

```typescript
const storage = Storage({
  data: {
    username: {
      key: 'app-username',
      state: State(''),
      storage: 'localStorage', // or 'sessionStorage' or 'memory'
    },
  },
  sync: {
    // Optional custom sync methods for remote data
    fetchData: async () => { ... },
  },
});

// Access like normal state
storage.data.username.set('Alice'); // Auto-saves to localStorage
```

### Ready-Made Traits (`src/traits/`)

**IMPORTANT**: Traits are **ready-made implementations** that are NOT exported from the core library. Users must:
1. Copy trait implementations from `src/traits/` into their projects
2. Create their own custom traits following the same pattern

The `src/traits/` directory provides ready-made traits for common use cases:
- `useAttributeTrait` - Set/remove HTML attributes
- `useClassNameTrait` - Manage CSS classes
- `useEventTrait` - Attach/remove event listeners
- `useFocusTrait` - Control element focus
- `useInnerHTMLTrait` - Set innerHTML (supports arrays of elements)
- `useInputEventTrait` - Handle input events
- `useInputValueTrait` - Bind input values to state
- `useStyleTrait` - Apply CSS styles (supports CSS variables with `--` prefix)
- `useTextContentTrait` - Set text content

**Trait Pattern**: Standard signature for creating custom traits:

```typescript
function useTrait(
  el: HTMLElement,
  param1: string,
  ...rest: (StateType<any> | Condition)[]
) {
  // Extract states and conditions from rest params
  const isStateObj = (i: any) => Object.keys(i).includes('sub');
  const states = rest.filter(isStateObj) as StateType<any>[];
  const conditions = rest.filter((item) => !isStateObj(item));

  // Apply behavior
  const apply = () => {
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      // YOUR CODE HERE
    }
  };

  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
```

**Reactive Traits**: Traits accept optional State objects or Condition functions as additional parameters for reactive updates:

```typescript
// Using $ methods (preferred)
trait.style('display', 'block', isVisible.$val)
trait.style('display', 'none', isVisible.$test(false))

// Using state objects as additional params
trait.style('opacity', () => computeOpacity(), state1, state2)
```

**Condition Type**: `(() => boolean) | boolean | 1 | 0`

### Ready-Made States (`src/states/`)

**IMPORTANT**: Like traits, state utilities are **ready-made implementations** that are NOT exported from the core library. Users must copy them from `src/states/` into their projects.

The `src/states/` directory provides ready-made state utilities for common patterns:
- `useMediaQueryState` - Reactive media query state that updates on window resize

Example usage:
```typescript
import { useMediaQueryState } from '@linttrap/oem/states/MediaQuery';

const isMobile = useMediaQueryState({ maxWidth: 768 });

// Use in UI
tag.nav(
  trait.style('display', 'block', isMobile.$test(true)),
  'Mobile Navigation'
);
```

**More coming soon**: Router state, form state, async data state, and other common patterns will be added to `src/states/`.

### Component Pattern

Components are just functions that return elements:

```typescript
function Button(text: string, onClick: () => void) {
  return tag.button(
    trait.style('padding', '10px 20px'),
    trait.event('click', onClick),
    text
  );
}

// Use it
const app = tag.div(Button('Click me', () => console.log('clicked')));
```

### Path Aliases

TypeScript is configured with `@/` alias pointing to `src/`:

```typescript
import { State, Template } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
```

## Testing

Tests run in the browser via a custom test runner. Test pattern:

```typescript
export const CanDoSomething: Test = async (sandbox) => {
  // Setup
  const state = State(0);

  // Test logic
  state.set(5);

  // Return result
  return {
    pass: state.val() === 5,
    message: 'Expected 5, got ' + state.val(),
  };
};
```

Tests are organized in `test/unit.ts` by category (HTML, SVG, State, Lib) and individual `*.test.ts` files alongside source code.

## Project Structure

- `src/oem.ts` - Core library (State, Template, Storage) - **this is what gets published**
- `src/traits/` - Ready-made trait implementations (copy these or create your own)
- `src/states/` - Ready-made state utilities (copy these or create your own)
- `test/` - Test runner and test suites
- `docs/` - Self-hosted documentation site built with OEM
  - `config.ts` - Shared Template instance with traits
  - `docs.ts` - Main documentation content
  - `app.ts` - Application entry point
  - `parts/` - Reusable UI components
- `examples/` - Sample applications (counter, todo)
- `dist/` - Built distribution files (IIFE format with `window.oem`)

## How It All Works Together

Understanding the complete reactive loop:

1. **Create State**: `const count = State(0);`
2. **Configure Template with Traits**: `const [tag, trait] = Template({ event: useEventTrait });`
3. **Build Elements with Reactive Bindings**:
   ```typescript
   const app = tag.div(
     tag.h1(count.$val),  // Template sees $val and subscribes
     tag.button(trait.event('click', count.$reduce(n => n + 1)), 'Increment')
   );
   ```
4. **Behind the Scenes**:
   - Template detects `count.$val` and automatically subscribes to state changes
   - When button is clicked, `count.$reduce` updates the state
   - State notifies all subscribers (including the h1's text node)
   - UI updates automatically without manual DOM manipulation

**This is the entire reactive loop**: No virtual DOM diffing, no complex lifecycle hooks. Just pub/sub with smart subscription management via WeakMap and MutationObserver for cleanup.

## Key Implementation Details

**Element Creation**: The `tag` proxy uses `document.createElement()` for HTML elements and automatically handles both HTML and SVG namespaces.

**Children Handling**: Elements accept strings, numbers, other elements, functions, or State `$val` closures as children. State closures create text nodes that auto-update.

**Trait Cleanup Map**: `traitCleanupMap` is a `WeakMap<HTMLElement, (() => void)[]>` that stores cleanup functions. The global `MutationObserver` watches for removed nodes and calls their cleanup functions.

**Dollar Methods**: `$`-prefixed State methods attach a `.sub` property and `.type` property to returned closures, enabling Template to detect and subscribe to them automatically.

## Common Patterns

**Reactive Lists**:
```typescript
const items = State(['Apple', 'Banana', 'Orange']);

tag.ul(
  trait.html(
    items.$call('map', (item) => tag.li(item))
  )
);
```

**Conditional Rendering**:
```typescript
const isVisible = State(true);

tag.div(
  trait.style('display', 'block', isVisible.$test(true)),
  'Visible content'
);
```

**Form Input Binding**:
```typescript
const name = State('');

tag.input(
  trait.value(name.val, name),
  trait.event('input', (e) => name.set(e.target.value))
);
```

## Important Notes

- **Core is minimal**: Only State, Template, and Storage are exported. Traits and state utilities are ready-made implementations that must be copied/created by users.
- **Ready-made implementations**: Both `src/traits/` and `src/states/` contain pre-built implementations to copy into your project, not import from the library.
- **Browser-only**: No server-side rendering support
- **ES6+ required**: Minimum browser versions: Chrome 49+, Firefox 18+, Safari 10+, Edge 12+
- **Type safety**: Heavy use of TypeScript generics and conditional types
- **Bun conventions**: Use `bun <file.html>` for serving HTML with automatic TypeScript transpilation and bundling
- **No build step for development**: Bun handles TypeScript and imports directly from HTML files
