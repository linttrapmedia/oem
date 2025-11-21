# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OEM is a tiny layer-one utility for building reactive micro-templating engines. It provides three core primitives: `State`, `Template`, and `Storage` for creating reactive UIs with vanilla JavaScript/TypeScript.

## Development Environment

**Runtime:** This project uses Bun, not Node.js or npm.

- Run files: `bun <file>` (not `node` or `ts-node`)
- Run tests: `bun test`
- Install dependencies: `bun install`
- Run scripts: `bun run <script>`

Do not suggest npm, pnpm, yarn, vite, or Node.js alternatives.

## Commands

**Testing:**
```bash
# Run all tests
bun test

# Run specific test file
bun test src/oem.test.ts

# Run unit test suite in browser
bun test/unit.html
```

**Development:**
```bash
# Run examples
bun examples/todo/app.ts

# Format code
bun run prettier --write .
```

## Architecture

### Core Primitives

**State<T>** (`src/oem.ts:114-203`): Reactive state management with subscriptions
- `set(value)` / `$set(value)` - Set state and notify subscribers
- `val()` / `$val()` - Get current value
- `reduce(fn)` / `$reduce(fn)` - Update based on previous value
- `sub(callback)` - Subscribe to changes, returns unsubscribe function
- `test(predicate)` / `$test(predicate)` - Test state value
- `call(method, ...args)` / `$call(method, ...args)` - Call methods on boxed primitives
- `chain(...calls)` / `$chain(...calls)` - Chain method calls
- Methods prefixed with `$` return closures that can be passed as callbacks

**Template<P>** (`src/oem.ts:241-285`): Creates proxied tag and trait functions
- Returns `[tag, trait]` tuple
- `tag` proxy creates HTML/SVG elements
- `trait` proxy applies custom behaviors to elements
- Traits automatically clean up when elements are removed from DOM (via MutationObserver)

**Storage<Data, Sync>** (`src/oem.ts:22-71`): Persistent state with localStorage/sessionStorage
- Automatically syncs state to storage
- Supports `localStorage`, `sessionStorage`, or `memory`
- Can define custom sync methods

### Traits System

Traits are functions that apply behavior to DOM elements. Located in `src/traits/`:

- **Attribute.ts** - Set/remove HTML attributes conditionally
- **ClassName.ts** - Manage CSS classes
- **Event.ts** - Attach event listeners with conditional application
- **Focus.ts** - Control element focus
- **InnerHTML.ts** - Set innerHTML reactively
- **InputValue.ts** - Bind input values to state
- **InputEvent.ts** - Handle input events
- **Style.ts** - Apply inline styles and CSS variables
- **TextContent.ts** - Set text content reactively

All traits follow the pattern:
```typescript
(el: HTMLElement, ...params: any[], ...rest: (StateType<any> | Condition)[]) => () => void
```

The returned function is an unsubscribe/cleanup handler.

### Reactive Pattern

The `...rest` parameter pattern allows traits to accept:
1. State objects with `.sub()` method - trait reruns when state changes
2. Condition functions/values - trait applies only when conditions are truthy

Example from `src/traits/Attribute.ts:7-8`:
```typescript
val: (() => string) | string,
...rest: (StateType<any> | Condition)[]
```

States are identified by checking for `.sub` property (`src/traits/Attribute.ts:9`).

### Testing

Tests use a custom runner (`test/runner.ts`) that:
- Runs in the browser (see `test/unit.html`)
- Uses a sandbox element for DOM manipulation
- Groups tests by module
- Supports filtering via URL query param `?filter=TestName`
- Displays pass/fail results with prepending failed tests

Test signature: `Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>`

Each feature has co-located `.test.ts` files that export test functions.

## File Structure

- `src/oem.ts` - Core primitives (State, Template, Storage)
- `src/traits/` - Reusable DOM manipulation behaviors
- `src/states/` - Specialized state utilities (e.g., MediaQuery)
- `examples/` - Reference implementations
- `test/` - Test infrastructure and unit tests

## Key Patterns

1. **Trait cleanup:** All traits must return cleanup functions. These are stored in a WeakMap and executed when elements are removed from DOM.

2. **Curried state methods:** Methods prefixed with `$` return closures for event handlers:
   ```typescript
   trait.event('click', state.$set('newValue'))
   ```

3. **Boxed primitives:** State wraps primitives in their boxed equivalents (String, Number, Boolean) to enable method calls via `.call()` and `.chain()`.

4. **Conditional traits:** Traits accept conditions as rest params to conditionally apply behavior without removing elements.

5. **Path aliases:** Use `@/*` to import from `src/*` (configured in `tsconfig.json:33`).
