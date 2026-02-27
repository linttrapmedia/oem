---
name: Types File
description: How to define and organize TypeScript type definitions for OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Types File

## What This File Is

`types.ts` is the single file (or `types/` folder) containing all TypeScript type definitions for the application. This includes types for state shapes, action payloads, data structures, function signatures, and any other custom types used across the app.

## Why It Must Be Its Own File

Types are referenced by every other category — states, actions, machines, UI, and traits all depend on shared type definitions. Centralizing them in one file eliminates circular imports, ensures a single source of truth, and lets LLMs quickly scan the entire type surface of the app.

## When to Create

Create `types.ts` at the start of any new OEM application, immediately after the BDD files define the data model.

## When to Use

- **Before writing state or actions**: Define the shape of your state and action types here first.
- **When adding a new feature**: Add any new types to this file before implementing them elsewhere.
- **When refactoring**: Check this file first to understand the app's data model.

## What Belongs Here

- State shape interfaces (e.g., `Todo`, `AppState`, `Filter`)
- Action type unions and payload interfaces
- Enum-like union types (e.g., `type Theme = 'light' | 'dark'`)
- Utility types specific to the app
- Props/parameter interfaces for helper functions

## What Does NOT Belong Here

- OEM framework types (these come from `@linttrap/oem`)
- Implementation logic of any kind
- Constants or literal values (those go in `constants.ts`)
- Runtime code

## Example

```typescript
// types.ts

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  editedAt?: number;
};

export type Filter = 'all' | 'active' | 'completed';

export type Action =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: Filter } };
```

## Rules

1. **One file for all types.** Only split into a `types/` folder if the file exceeds manageable size.
2. **Export everything.** Every type should be exported so other files can import it.
3. **No runtime code.** This file contains only `type`, `interface`, and `enum` declarations.
4. **Name types clearly.** Use PascalCase and descriptive names that match the domain.
5. **Define types before implementation.** Types should exist before the code that uses them.
