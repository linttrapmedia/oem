# Types

## Overview
The types module provides common TypeScript type definitions used throughout the OEM framework. These types establish shared contracts for reactive conditions, testing, and utility type transformations.

## Purpose
Types serves as a central location for common type definitions, ensuring type consistency across the OEM codebase. It provides:
- Type definitions for conditional expressions
- Test function signatures for unit testing
- Utility types for type-level programming

Use this module when you need to import common type definitions or understand the type contracts used across OEM.

## Key Exports

### `Condition`
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

### `Test`
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

### `Tail<T>`
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

## Implementation Details

### Condition Design
The `Condition` type is designed to be flexible and accommodate various patterns:
- **Function form**: Enables dynamic conditions that can re-evaluate
- **Boolean form**: For static conditions known at creation time
- **Numeric form**: Allows using 1/0 as truthy/falsy, common in certain programming paradigms

### Test Design
The `Test` type follows the async test pattern common in modern testing frameworks:
- **Async by nature**: Returns a Promise to support async operations in tests
- **Sandbox parameter**: Provides isolation for DOM tests
- **Structured result**: Object with `pass` boolean and optional `message` for clear test output

### Tail Type Mechanics
The `Tail` type uses TypeScript's conditional types and `infer` keyword:
- Matches tuple types with at least one element `[any, ...infer R]`
- Infers the rest of the tuple as `R`
- Returns `never` for non-matching types (type safety)

## Related Modules
- [state.ts](src/core/state.ts) - Uses `Condition` type indirectly through util functions
- [util.ts](src/core/util.ts) - Provides runtime utilities for working with Condition types
- [template.ts](src/core/template.ts) - Uses `Tail` for trait parameter type inference
