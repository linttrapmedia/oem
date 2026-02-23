---
name: OEM templates
description: OEM's Template function, tag/trait proxies, TypeScript types, and core utilities
---



## Template & Traits

### Overview

The template module allows you to create your own template engine. It is the core mechanism that supports OEM's unique approach to declarative, reactive applications that combine HTML, Styling, Logic and Behavior.

### Key Exports

#### `Template<P>`

- **Type**: Function
- **Signature**: `function Template<P extends Record<string, TemplateTraitFunc>>(config?: P): TemplateReturnType<P>`
- **Description**: Creates a tuple of [tagProxy, traitProxy] for element creation and trait application
- **Parameters**:
  - `config`: Optional object mapping trait names to trait implementation functions
- **Returns**: A tuple `[tagProxy, traitProxy]` typically destructured as `[tag, trait]`
- **Basic Example**:

```typescript
// Import Template and some traits from OEM
import { Template, useEventTrait, useTextContentTrait } from '@linttrap/oem';

// Create template and add traits
export const [tag, trait] = Template({
  event: useEventTrait,
  text: useTextContentTrait,
});

// Now you can generate elements with the tag proxy and apply available traits
const button = tag.button(
  trait.event('click', () => console.log('Clicked!')),
  trait.text('Click Me'),
);
```

#### Tag Proxy (First element of tuple)

- **Type**: Proxy object
- **Description**: Creates HTML or SVG elements using property access
- **Usage**: Access any valid HTML or SVG tag name as a property, which returns a function that creates that element

##### Supported Element Types

- **HTML Elements**: All standard HTML tags (div, span, button, input, etc.)
- **SVG Elements**: svg, g, rect, circle, ellipse, line, polyline, polygon, path, text, defs, use, mask, clipPath

##### Element Creation Function

- **Signature**: `(...traits: Trait[]) => HTMLElement | SVGElement`
- **Parameters**: Variable number of traits (strings, numbers, functions, elements, or trait appliers)
- **Returns**: The created element

#### Trait Proxy (Second element of tuple)

- **Type**: Proxy object
- **Description**: Creates trait applier functions from the config object
- **Usage**: Access trait names defined in config, which returns a function that creates a trait applier

##### Trait Applier Function

- **Signature**: `(...args: Parameters<TraitFunc>) => (el: HTMLElement) => void`
- **Parameters**: Arguments defined by the trait implementation (excluding the element parameter)
- **Returns**: A function that applies the trait to an element

#### Type Definitions

##### `TemplateTraitFunc`

- **Type**: Type alias
- **Description**: `(...args: Args) => Return` - Function type for trait implementations

##### `TemplateTraitApplier`

- **Type**: Type alias
- **Description**: `(el: HTMLElement | SVGElement) => void` - Function that applies a trait to an element

##### `TemplateReturnType<P>`

- **Type**: Type alias
- **Description**: Complex type defining the return value structure with proper TypeScript inference for element types

### Implementation Details

#### Automatic Cleanup System

The template module uses a sophisticated cleanup system:

- **WeakMap**: Stores cleanup functions keyed by element reference
- **MutationObserver**: Watches for element removal from the DOM
- When an element is removed, all its cleanup functions are executed automatically
- This prevents memory leaks from event listeners and subscriptions

#### SVG Element Detection

SVG elements are created using `createElementNS` with the SVG namespace. The module maintains a hardcoded set of common SVG tag names for detection.

### Traits

A trait is any function that takes an element as its first parameter, applies some behavior or configuration to it and returns a cleanup function. Traits can be defined in the config object passed to `Template()` and are accessed via the trait proxy.

Here's an example of the Style Trait

```typescript
export function useStyleTrait(
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      (prop as string).startsWith('--')
        ? el.style.setProperty(prop as string, _val as string)
        : (el.style[prop as any] = _val as any);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
```

### Conditional Patterns

**IMPORTANT**: OEM prescribes using explicit conditions rather than ternary expressions when applying traits.

#### Using Conditions (Preferred)

All traits accept `...rest: (StateType<any> | Condition)[]` parameters. Use `$test()` from `@/core/util` to create conditions:

```typescript
import { $test } from '@/core/util';

// ✅ CORRECT: Use separate trait calls with conditions
trait.style('opacity', '0.6', $test(disabled)),
trait.style('opacity', '1', $test(!disabled)),

// ✅ CORRECT: Multiple conditions
trait.style('backgroundColor', 'red', $test(isError && !disabled)),

// ✅ CORRECT: Conditional event handlers
trait.event('click', handleClick, $test(!disabled)),

// ✅ CORRECT: Conditional attributes
trait.attr('disabled', 'true', $test(disabled)),
```

#### Avoiding Ternary Expressions (Anti-pattern)

```typescript
// ❌ INCORRECT: Do not use ternary expressions
trait.style('opacity', disabled ? '0.6' : '1'),

// ❌ INCORRECT: Do not use conditional spreads
...(!disabled ? [trait.event('click', handleClick)] : []),

// ❌ INCORRECT: Do not use inline conditionals
trait.style('color', isError ? 'red' : 'blue'),
```

#### How Conditions Work

Traits extract conditions using `extractConditions()` (see `@/core/util`) and only apply when all conditions evaluate to `true`:

1. **Condition Creation**: `$test(value, expected = true)` creates a condition that checks if `value === expected`
2. **Condition Extraction**: Traits filter rest parameters for objects with `type === '$test'`
3. **Condition Evaluation**: All conditions must pass for the trait to apply
4. **Reactive Updates**: When states change, conditions are re-evaluated

```typescript
// Example from Attribute.ts trait
export const useAttributeTrait = (
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => {
  const states = extractStates(val, ...rest);
  const conditions = extractConditions(...rest);
  const apply = () => {
    const _val = typeof val === 'function' ? val() : val;
    const applies = conditions.every((i) => (typeof i === 'function' ? i() : i));
    if (applies) {
      if (_val === undefined) {
        el.removeAttribute(prop);
      } else {
        el.setAttribute(prop, String(_val));
      }
    } else {
      el.removeAttribute(prop);
    }
  };
  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
};
```

This pattern ensures:
- **Clarity**: Each condition is explicit and separate
- **Reactivity**: Conditions can re-evaluate when states change
- **Composability**: Multiple conditions can be combined
- **Type Safety**: TypeScript can properly type-check each branch


---

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


---



## Types

### Overview
The types module provides common TypeScript type definitions used throughout the OEM framework. These types establish shared contracts for reactive conditions, testing, and utility type transformations.

### Purpose
Types serves as a central location for common type definitions, ensuring type consistency across the OEM codebase. It provides:
- Type definitions for conditional expressions
- Test function signatures for unit testing
- Utility types for type-level programming

Use this module when you need to import common type definitions or understand the type contracts used across OEM.

### Key Exports

#### `Condition`
- **Type**: Type alias
- **Signature**: `type Condition = (() => boolean) | boolean | 1 | 0`
- **Description**: Represents a conditional expression that can be evaluated to determine truthiness
- **Supported Forms**:
  - `() => boolean`: A function that returns a boolean
  - `boolean`: A static true/false value
  - `1`: Truthy numeric value
  - `0`: Falsy numeric value
- **Usage Example**:
```typescript
const condition1: Condition = true;
const condition2: Condition = () => count.val() > 0;
const condition3: Condition = 1;

// Used in OEM conditional rendering
const element = h.div(
  condition1 && h.span('Visible when true')
);
```
- **Use Cases**:
  - Conditional rendering in templates
  - Control flow in reactive systems
  - Feature flags and toggles

#### `Test`
- **Type**: Type alias
- **Signature**: `type Test = (sandbox?: HTMLElement) => Promise<{ pass: boolean; message?: string }>`
- **Description**: Defines the signature for test functions in OEM's testing system
- **Parameters**:
  - `sandbox`: Optional HTMLElement that serves as a testing container for DOM operations
- **Returns**: A Promise resolving to a test result object
  - `pass`: Boolean indicating if the test passed
  - `message`: Optional message providing test details or failure information
- **Usage Example**:
```typescript
const myTest: Test = async (sandbox) => {
  const element = h.div('Test content');
  sandbox?.appendChild(element);

  const hasContent = element.textContent === 'Test content';

  return {
    pass: hasContent,
    message: hasContent ? 'Content matches' : 'Content mismatch'
  };
};
```
- **Use Cases**:
  - Unit testing DOM components
  - Integration testing with isolated DOM sandboxes
  - Automated test suites

#### `Tail<T>`
- **Type**: Utility type
- **Signature**: `type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never`
- **Description**: Extracts all elements from a tuple type except the first element
- **Type Parameters**:
  - `T`: A tuple type (array with fixed length and types)
- **Returns**: A tuple type containing all elements except the first
- **Usage Example**:
```typescript
type Original = [string, number, boolean];
type Rest = Tail<Original>; // [number, boolean]

type SingleElement = [string];
type Empty = Tail<SingleElement>; // []

// Used internally in Template trait parameter inference
type TraitParams = Tail<Parameters<TraitFunction>>;
```
- **Use Cases**:
  - Removing the first parameter from function signatures (e.g., removing the `element` parameter from trait functions)
  - Type-level tuple manipulation
  - Generic type transformations

### Implementation Details

#### Condition Design
The `Condition` type is designed to be flexible and accommodate various patterns:
- **Function form**: Enables dynamic conditions that can re-evaluate
- **Boolean form**: For static conditions known at creation time
- **Numeric form**: Allows using 1/0 as truthy/falsy, common in certain programming paradigms

#### Test Design
The `Test` type follows the async test pattern common in modern testing frameworks:
- **Async by nature**: Returns a Promise to support async operations in tests
- **Sandbox parameter**: Provides isolation for DOM tests
- **Structured result**: Object with `pass` boolean and optional `message` for clear test output

#### Tail Type Mechanics
The `Tail` type uses TypeScript's conditional types and `infer` keyword:
- Matches tuple types with at least one element `[any, ...infer R]`
- Infers the rest of the tuple as `R`
- Returns `never` for non-matching types (type safety)

### Related Modules
- [state.ts](src/core/state.ts) - Uses `Condition` type indirectly through util functions
- [util.ts](src/core/util.ts) - Provides runtime utilities for working with Condition types
- [template.ts](src/core/template.ts) - Uses `Tail` for trait parameter type inference
