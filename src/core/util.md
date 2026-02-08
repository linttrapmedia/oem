## Util

### Overview
The util module provides utility functions for working with State objects and Conditions in the OEM framework. It offers runtime helpers for filtering, testing, and extracting reactive objects from mixed arrays.

### Purpose
Util solves the problem of identifying and working with OEM's special object types (State, Condition) at runtime. Key features include:
- Creating conditional closures for reactive testing
- Extracting State objects from mixed parameter arrays
- Extracting Condition objects from mixed parameter arrays

Use this module when you need to programmatically work with State or Condition objects, particularly when processing variable argument lists that may contain a mix of different types.

### Key Exports

#### `$test()`
- **Type**: Function
- **Signature**: `function $test(val: (() => any) | any, expected: any = true): Condition`
- **Description**: Creates a conditional closure that tests a value against an expected result
- **Parameters**:
  - `val`: Either a function that returns a value, or a static value
  - `expected`: The expected value to compare against (default: `true`)
- **Returns**: A `Condition` function with a `type` property set to `'$test'`
- **Usage Example**:
```typescript
// Test a static value
const isTrue = $test(true); // () => true === true

// Test a function result
const count = State(5);
const isPositive = $test(() => count.val() > 0, true);

// Use in conditional rendering
const element = h.div(
  isPositive && h.span('Count is positive')
);

// Custom expected value
const isFive = $test(count.val, 5);
```
- **Behavior**:
  - If `val` is a function, it's called on each evaluation
  - If `val` is a static value, it's compared directly
  - Returns true if `val === expected`, false otherwise
  - The returned closure includes a `type` property for runtime identification

#### `extractStates()`
- **Type**: Function
- **Signature**: `function extractStates(...rest: any): StateType<any>[]`
- **Description**: Filters an array of mixed values to extract only State objects
- **Parameters**:
  - `...rest`: Variable number of arguments of any type
- **Returns**: An array containing only the State objects from the input
- **Usage Example**:
```typescript
const count = State(0);
const name = State('Alice');
const regularValue = 42;
const regularFunc = () => 'hello';

const states = extractStates(count, regularValue, name, regularFunc);
// states = [count, name]

// Use case: Subscribing to all states in a component
states.forEach(state => {
  state.sub(value => {
    console.log('State changed:', value);
  });
});
```
- **Detection Logic**: Checks if objects have a `sub` property (characteristic of State objects)
- **Use Cases**:
  - Component lifecycle management
  - Batch subscription to multiple states
  - Analyzing dependencies

#### `extractConditions()`
- **Type**: Function
- **Signature**: `function extractConditions(...rest: any[]): Condition[]`
- **Description**: Filters an array of mixed values to extract only Condition objects
- **Parameters**:
  - `...rest`: Variable number of arguments of any type
- **Returns**: An array containing only the Condition objects from the input
- **Usage Example**:
```typescript
const isVisible = $test(true);
const isEnabled = $test(() => count.val() > 0);
const regularValue = 42;
const regularFunc = () => 'hello';

const conditions = extractConditions(isVisible, regularValue, isEnabled, regularFunc);
// conditions = [isVisible, isEnabled]

// Use case: Evaluating all conditions
const allTrue = conditions.every(condition =>
  typeof condition === 'function' ? condition() : condition
);
```
- **Detection Logic**: Checks if objects have a `type` property equal to `'$test'`
- **Use Cases**:
  - Conditional rendering logic
  - Form validation
  - Feature flag evaluation
  - Access control checks

### Implementation Details

#### Object Type Detection
Both `extractStates` and `extractConditions` use runtime property checking to identify objects:
- **State detection**: Uses `Object.hasOwn(i, 'sub')` to check for the subscription method
- **Condition detection**: Uses `i.type === '$test'` to check for the type marker

This approach relies on duck typing rather than instanceof checks, making it flexible but requiring consistent object shapes.

#### $test Closure Structure
The `$test` function returns a closure with:
- **Function body**: Performs the comparison logic
- **Type property**: Marker for runtime identification (`type: '$test'`)
- This structure allows Conditions to be both executable and identifiable

#### Type Safety Considerations
- `extractStates` returns `StateType<any>[]`, losing specific type information
- `extractConditions` returns `Condition[]`
- Both functions use `any` types internally for flexibility with mixed arrays
- Type information should be managed at the call site when possible

### Related Modules
- [state.ts](src/core/state.ts) - Defines the StateType interface that extractStates detects
- [types.ts](src/core/types.ts) - Defines the Condition type used throughout this module
- [template.ts](src/core/template.ts) - May use these utilities for processing mixed trait arrays
