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

### `State<T>`
- **Type**: Function
- **Signature**: `function State<T>(param: T): StateType<T>`
- **Description**: Creates a reactive state container that holds a value and notifies subscribers when it changes
- **Parameters**:
  - `param`: The initial value for the state
- **Returns**: A `StateType<T>` object with methods for state management
- **Usage Example**:
```typescript
const count = State(0);
count.sub((value) => console.log('Count changed:', value));
count.set(5); // Logs: "Count changed: 5"
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
