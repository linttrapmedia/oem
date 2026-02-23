---
name: OEM states
description: OEM's reactive state system — core State primitive plus UrlState, MediaQueryState, and ThemeState
---

## State

### Overview

The state function is an an event bus with reactive state management convention used by the OEM framework. It implements a publish-subscribe pattern with support for reducing, testing and augmenting with custom methods. State is designed to be simple and flexible, allowing you to manage reactive data in your applications without the overhead of more complex state management libraries.

### Purpose

State solves the problem of managing reactive data in applications where UI components need to automatically update when data changes. It provides a lightweight alternative to more complex state management libraries, with built-in support for:

- Reactive subscriptions
- State transformations
- Predicate testing
- Deferred execution patterns

Use this module when you need to manage any state, especially with reactive data binding between your application state and UI components. State objects should live outside of function components to ensure they are shared across the application and not recreated on each render.

### Key Exports

#### `State<T, M>`

- **Type**: Function
- **Signature**: `function State<T, M>(param: T, customMethods?: M): StateType<T, M>`
- **Description**: Creates a reactive state container that holds a value and notifies subscribers when it changes. Optionally accepts custom methods to extend state behavior.
- **Parameters**:
  - `param`: The initial value for the state
  - `customMethods` (optional): An object containing custom methods that receive the state object as their first parameter
- **Returns**: A `StateType<T, M>` object with methods for state management
- **Usage Example**:

```typescript
// Basic usage
const count = State(0);
count.sub((value) => console.log('Count changed:', value));
count.set(5); // Logs: "Count changed: 5"

// With custom methods
const counter = State(
  { count: 0 },
  {
    increment: (state) => {
      state.reduce((prev) => ({ count: prev.count + 1 }));
    },
    incrementBy: (state, amount: number) => {
      state.reduce((prev) => ({ count: prev.count + amount }));
    },
  },
);

counter.increment(); // Increments count by 1
counter.incrementBy(5); // Increments count by 5
counter.$increment()(); // Deferred increment
```

#### `StateType<T>`

- **Type**: Interface/Type
- **Description**: The return type of `State()` function, providing methods for state manipulation and observation

##### Methods

###### `val()`

- **Returns**: The current state value
- **Usage**: `const currentValue = count.val();`

###### `set(atom: T)`

- **Description**: Sets a new state value and notifies all subscribers
- **Parameters**: `atom` - The new value to set

###### `reduce(cb: (prev: T) => T)`

- **Description**: Updates state based on the previous value
- **Parameters**: `cb` - A function that receives the current value and returns the new value
- **Usage**: `count.reduce(prev => prev + 1);`

###### `sub(cb: (atom: T) => any)`

- **Description**: Subscribes to state changes
- **Parameters**: `cb` - Callback function called with new value on each change
- **Returns**: An unsubscribe function
- **Usage**:

```typescript
const unsub = count.sub((value) => console.log(value));
// Later: unsub() to stop listening
```

###### `test(predicate, checkFor?)`

- **Description**: Tests the current state value against a predicate
- **Parameters**:
  - `predicate`: A RegExp, value, or function to test against
  - `checkFor`: Optional boolean (default `true`) to invert the test result
- **Returns**: Boolean indicating if the test passed
- **Usage**:

```typescript
const isZero = count.test(0); // true if count is 0
const isPositive = count.test((v) => v > 0);
```

###### `call(method, ...params)`

- **Description**: Calls a method on the boxed version of primitive types
- **Parameters**:
  - `method`: The method name to call
  - `params`: Arguments to pass to the method
- **Returns**: The result of the method call
- **Usage**: `stringState.call('toUpperCase')`

##### Deferred Execution Methods ($ prefix)

Each core method has a dollar-prefixed version (`$val`, `$set`, `$reduce`, `$test`, `$call`) that returns a closure for deferred execution. These closures include:

- A `sub` property for subscribing to changes
- A `type` property identifying the closure type

**Usage Example**:

```typescript
const getDouble = count.$reduce((prev) => prev * 2);
// Later: getDouble() executes the reduction
```

##### Custom Methods

State supports extending functionality with custom methods via the second parameter. Custom methods:

- Receive the state object as their first parameter
- Can accept additional parameters
- Have automatic deferred execution versions ($ prefix)
- Provide full TypeScript intellisense and type safety

**Usage Example**:

```typescript
type CounterState = { count: number; name: string };

const counter = State<CounterState>(
  { count: 0, name: 'MyCounter' },
  {
    increment: (state) => {
      state.reduce((prev) => ({ ...prev, count: prev.count + 1 }));
    },
    incrementBy: (state, amount: number) => {
      state.reduce((prev) => ({ ...prev, count: prev.count + amount }));
    },
    reset: (state) => {
      state.set({ count: 0, name: state.val().name });
    },
    getDisplayText: (state) => {
      const { count, name } = state.val();
      return `${name}: ${count}`;
    },
  },
);

// Direct execution
counter.increment();
counter.incrementBy(5);
console.log(counter.getDisplayText()); // "MyCounter: 6"

// Deferred execution with $ prefix
const incrementBtn = document.querySelector('#increment');
incrementBtn.addEventListener('click', counter.$increment());

const addFiveBtn = document.querySelector('#add-five');
addFiveBtn.addEventListener('click', counter.$incrementBy(5));
```

Custom methods have access to all state methods:

- `state.val()` - Get current value
- `state.set(newValue)` - Set new value
- `state.reduce(cb)` - Update based on previous value
- `state.sub(cb)` - Subscribe to changes
- `state.test(predicate)` - Test current value

#### Type Utilities

##### `MethodKeys<T>`

- **Type**: Type utility
- **Description**: Extracts only the method keys from a type

##### `Boxed<T>`

- **Type**: Type utility
- **Description**: Maps primitive types to their boxed equivalents (string → String, number → Number, boolean → Boolean)

### Implementation Details

The state module uses a closure-based approach to maintain private state:

- Internal value is stored in `_internalVal`
- Subscribers are stored in a `Set<(atom: T) => any>`
- When state changes via `set()` or `reduce()`, all subscribers are notified synchronously
- The boxed type system allows calling methods like `toUpperCase()` on string states

### Related Modules

- [util.ts](src/core/util.ts) - Provides utility functions for extracting and working with State objects
- [template.ts](src/core/template.ts) - Integrates with State for reactive DOM rendering

---

# Extended State Library

The following are pre-built extensions of the core State primitive for common reactive patterns.

## UrlState

_State Object to track the current URL in the application._

## UrlState

---

## MediaQueryState

_Reactive state for tracking media query matches based on viewport width and media type_

# MediaQueryState

A reactive state hook that tracks whether the current viewport matches specified media query conditions.

## Features

- **Responsive tracking**: Automatically updates when window is resized
- **Width-based queries**: Support for min and max width constraints
- **Media type support**: Filter by screen, print, or all media types
- **Reactive**: Returns a State object that updates when conditions change

## Usage

```typescript
import { useMediaQueryState } from '@/states/MediaQueryState';

// Track mobile viewport (max 768px)
const isMobile = useMediaQueryState({
  maxWidth: 768
});

// Track tablet viewport (768px - 1024px)
const isTablet = useMediaQueryState({
  minWidth: 768,
  maxWidth: 1024
});

// Track desktop viewport (min 1024px)
const isDesktop = useMediaQueryState({
  minWidth: 1024
});

// Track print media
const isPrint = useMediaQueryState({
  type: 'print'
});
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'screen' \| 'print' \| 'all'` | `'all'` | Media type to match against |
| `minWidth` | `number` | `0` | Minimum viewport width in pixels |
| `maxWidth` | `number` | `Infinity` | Maximum viewport width in pixels |

## Return Value

Returns a `State<boolean>` that is `true` when the media query matches and `false` otherwise.

## Behavior

The state automatically:
- Evaluates the media query on initialization
- Adds a resize event listener to track viewport changes
- Updates the state value when conditions change
- Checks both width constraints AND media type (both must match)

## Common Patterns

### Responsive Breakpoints

```typescript
// Define standard breakpoints
const isMobile = useMediaQueryState({ maxWidth: 639 });
const isTablet = useMediaQueryState({ minWidth: 640, maxWidth: 1023 });
const isDesktop = useMediaQueryState({ minWidth: 1024 });
```

### Conditional Rendering

```typescript
const isMobile = useMediaQueryState({ maxWidth: 768 });

if (isMobile.val()) {
  // Render mobile layout
} else {
  // Render desktop layout
}
```

## Notes

- The resize listener is added globally and will remain active
- Consider cleanup if using in components that mount/unmount frequently
- Width boundaries are inclusive (>= minWidth, <= maxWidth)

---

## ThemeState

_Centralized theme management with reactive design token access_

# ThemeState

A sophisticated state management system for handling multiple themes with reactive design token access. Supports dynamic theme switching and provides both immediate and deferred token getters.

## Features

- **Multi-theme support**: Manage multiple theme definitions
- **Dynamic switching**: Change themes at runtime
- **Type-safe tokens**: Full TypeScript support for design tokens
- **Reactive access**: Tokens update automatically when theme changes
- **Deferred getters**: Support for computed token values with `$` prefix
- **Validation**: Ensures themes exist before switching

## Usage

### Basic Setup

```typescript
import { ThemeState } from '@/states/ThemeState';
import { lightTheme, darkTheme } from '@/themes';

// Initialize with themes
const theme = ThemeState([lightTheme, darkTheme], 'light');

// Get current theme name
const currentTheme = theme.getTheme(); // 'light'

// Switch themes
theme.setTheme('dark');
```

### Token Access

#### Immediate Token Getter

```typescript
// Access token directly (evaluated immediately)
const primaryColor = theme.pmt_color_blue_500();
// Returns the current value: '#3B82F6'
```

#### Deferred Token Getter

```typescript
// Deferred token (starts with $, re-evaluates when theme changes)
const primaryColorDeferred = theme.$pmt_color_blue_500;
// Returns a function that always gets the current theme's value
```

### Reactive Updates

```typescript
// Subscribe to theme changes
theme.sub((value) => {
  console.log('Current theme:', value.currentTheme);
  console.log('Available themes:', value.themes);
});

// Change theme (triggers subscribers)
theme.setTheme('dark');
```

## Type Definition

### Theme Object

```typescript
type Theme = {
  name: string;
  tokens: DesignTokens;
};
```

### State Value

```typescript
type ThemeStateValue = {
  themes: Theme[];
  currentTheme: string;
};
```

## API

### Constructor

```typescript
ThemeState(themes: Theme[], initialTheme?: string)
```

**Parameters:**
- `themes`: Array of theme definitions (must have at least one)
- `initialTheme`: Optional initial theme name (defaults to first theme)

**Throws:**
- Error if themes array is empty

### Methods

#### `getTheme()`

Returns the name of the currently active theme.

```typescript
const currentTheme = theme.getTheme(); // 'light'
```

#### `setTheme(themeName: string)`

Sets the active theme by name.

```typescript
theme.setTheme('dark');
```

**Throws:**
- Error if theme name doesn't exist

### Token Getters

#### Immediate Getter Pattern

```typescript
theme.{tokenKey}()
```

Returns the current value of the token. Call immediately to get the value.

```typescript
const spacing = theme.sem_spc_inset_md(); // '1rem'
```

#### Deferred Getter Pattern

```typescript
theme.${tokenKey}
```

Returns a function that retrieves the token value when called. Use for reactive scenarios.

```typescript
const getSpacing = theme.$sem_spc_inset_md;
// Later...
const spacing = getSpacing(); // Always gets current theme value
```

## Implementation Details

### Proxy-Based Token Access

ThemeState uses a JavaScript Proxy to dynamically generate token getters:

- Properties in `baseState` are accessed normally
- Properties starting with `$` return deferred getters
- All other properties return immediate token getter functions

### Token Lookup

1. Finds the current theme from state
2. Looks up the token key in that theme's tokens
3. Returns the value or empty string if not found

## Common Patterns

### Theme Switcher Component

```typescript
const theme = ThemeState([lightTheme, darkTheme]);

const toggleTheme = () => {
  const current = theme.getTheme();
  theme.setTheme(current === 'light' ? 'dark' : 'light');
};
```

### Responsive Token Usage

```typescript
const theme = ThemeState([lightTheme, darkTheme]);

// Use deferred getter for reactive styling
const buttonBackground = theme.$cmp_btn_pri_bkg;

// Later in render
element.style.background = buttonBackground();
```

### Multi-Brand Support

```typescript
const theme = ThemeState([
  brandATheme,
  brandBTheme,
  brandCTheme
], 'brandA');

// Switch brands dynamically
theme.setTheme('brandB');
```

## Error Handling

### Theme Not Found

```typescript
theme.setTheme('nonexistent');
// Throws: Theme "nonexistent" not found
```

### Empty Themes Array

```typescript
ThemeState([]);
// Throws: At least one theme must be provided
```

## Performance Considerations

- Token getters are created lazily via Proxy
- No overhead for unused tokens
- Theme switching updates state once, triggering all subscribers
- Consider memoizing frequently accessed tokens in performance-critical paths

## Integration with Design Token System

ThemeState works seamlessly with the 6-layer design token architecture:

```typescript
// Access any layer's tokens
const primitive = theme.pmt_color_blue_500();
const expression = theme.exp_roundness_act();
const semantic = theme.sem_color_interactive_pri();
const element = theme.elm_btn_hgt_md();
const component = theme.cmp_btn_pri_bkg();
const feature = theme.ftr_checkout_cta_bkg();
```

All tokens are type-safe and validated at compile time.