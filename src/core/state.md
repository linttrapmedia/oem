# State

## Overview
The state module provides a reactive state management system for OEM applications. It implements a publish-subscribe pattern with support for primitive type method calls through boxed types.

## Purpose
State solves the problem of managing reactive data in applications where UI components need to automatically update when data changes. It provides a lightweight alternative to more complex state management libraries, with built-in support for:
- Reactive subscriptions
- State transformations
- Predicate testing
- Deferred execution patterns

Use this module when you need reactive data binding between your application state and UI components.

## Key Exports

### `State<T, M>`
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
      state.reduce(prev => ({ count: prev.count + 1 }));
    },
    incrementBy: (state, amount: number) => {
      state.reduce(prev => ({ count: prev.count + amount }));
    }
  }
);

counter.increment(); // Increments count by 1
counter.incrementBy(5); // Increments count by 5
counter.$increment()(); // Deferred increment
```

### `StateType<T>`
- **Type**: Interface/Type
- **Description**: The return type of `State()` function, providing methods for state manipulation and observation

#### Methods

##### `val()`
- **Returns**: The current state value
- **Usage**: `const currentValue = count.val();`

##### `set(atom: T)`
- **Description**: Sets a new state value and notifies all subscribers
- **Parameters**: `atom` - The new value to set

##### `reduce(cb: (prev: T) => T)`
- **Description**: Updates state based on the previous value
- **Parameters**: `cb` - A function that receives the current value and returns the new value
- **Usage**: `count.reduce(prev => prev + 1);`

##### `sub(cb: (atom: T) => any)`
- **Description**: Subscribes to state changes
- **Parameters**: `cb` - Callback function called with new value on each change
- **Returns**: An unsubscribe function
- **Usage**:
```typescript
const unsub = count.sub(value => console.log(value));
// Later: unsub() to stop listening
```

##### `test(predicate, checkFor?)`
- **Description**: Tests the current state value against a predicate
- **Parameters**:
  - `predicate`: A RegExp, value, or function to test against
  - `checkFor`: Optional boolean (default `true`) to invert the test result
- **Returns**: Boolean indicating if the test passed
- **Usage**:
```typescript
const isZero = count.test(0); // true if count is 0
const isPositive = count.test(v => v > 0);
```

##### `call(method, ...params)`
- **Description**: Calls a method on the boxed version of primitive types
- **Parameters**:
  - `method`: The method name to call
  - `params`: Arguments to pass to the method
- **Returns**: The result of the method call
- **Usage**: `stringState.call('toUpperCase')`

#### Deferred Execution Methods ($ prefix)

Each core method has a dollar-prefixed version (`$val`, `$set`, `$reduce`, `$test`, `$call`) that returns a closure for deferred execution. These closures include:
- A `sub` property for subscribing to changes
- A `type` property identifying the closure type

**Usage Example**:
```typescript
const getDouble = count.$reduce(prev => prev * 2);
// Later: getDouble() executes the reduction
```

#### Custom Methods

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
      state.reduce(prev => ({ ...prev, count: prev.count + 1 }));
    },
    incrementBy: (state, amount: number) => {
      state.reduce(prev => ({ ...prev, count: prev.count + amount }));
    },
    reset: (state) => {
      state.set({ count: 0, name: state.val().name });
    },
    getDisplayText: (state) => {
      const { count, name } = state.val();
      return `${name}: ${count}`;
    }
  }
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

### Type Utilities

#### `MethodKeys<T>`
- **Type**: Type utility
- **Description**: Extracts only the method keys from a type

#### `Boxed<T>`
- **Type**: Type utility
- **Description**: Maps primitive types to their boxed equivalents (string → String, number → Number, boolean → Boolean)

## Implementation Details

The state module uses a closure-based approach to maintain private state:
- Internal value is stored in `_internalVal`
- Subscribers are stored in a `Set<(atom: T) => any>`
- When state changes via `set()` or `reduce()`, all subscribers are notified synchronously
- The boxed type system allows calling methods like `toUpperCase()` on string states

## Related Modules
- [util.ts](src/core/util.ts) - Provides utility functions for extracting and working with State objects
- [template.ts](src/core/template.ts) - Integrates with State for reactive DOM rendering
