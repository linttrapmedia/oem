---
name: Actions File
description: How to define and organize action creator functions in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Actions File

## What This File Is

`actions.ts` is the single file (or `actions/` folder) containing all action creator functions for the application. Each action is a function that returns an object with a `type` and an optional `payload`. Actions describe **what happened** — they do not execute the change themselves.

## Why It Must Be Its Own File

Actions are the vocabulary of the application's behavior. Centralizing them in one file gives LLMs and developers a complete inventory of every user intent the app can handle. It also keeps action definitions separate from the machine logic that processes them.

## When to Create

Create `actions.ts` when the application uses a state machine pattern (i.e., it has a `machines.ts` file). Actions are the inputs to machines.

## When to Use

- **When dispatching from event handlers**: Import action creators and call them to produce action objects.
- **When writing machines**: Reference action types to handle each case.
- **When adding new user interactions**: Define a new action creator here before wiring it into the machine.

## What Belongs Here

- Action creator functions (functions that return `{ type, payload }` objects)
- Action type constants (if not using string literals directly)
- The Action union type (or import it from `types.ts`)

## What Does NOT Belong Here

- State mutation logic (that goes in `machines.ts` or State custom methods in `states.ts`)
- UI code or trait calls
- State object definitions

## Example

```typescript
// actions.ts
import type { Action } from './types';

export const addTodo = (text: string): Action => ({
  type: 'ADD_TODO',
  payload: { text },
});

export const toggleTodo = (id: string): Action => ({
  type: 'TOGGLE_TODO',
  payload: { id },
});

export const deleteTodo = (id: string): Action => ({
  type: 'DELETE_TODO',
  payload: { id },
});

export const setFilter = (filter: 'all' | 'active' | 'completed'): Action => ({
  type: 'SET_FILTER',
  payload: { filter },
});
```

## Rules

1. **One file for all actions.** Only split into a folder if the file grows unmanageable.
2. **Actions are pure functions.** They return data objects, nothing more — no side effects, no state mutation.
3. **One function per action type.** Each action creator maps to exactly one `type` string.
4. **Keep payloads minimal.** Only include the data needed to process the action.
5. **Name action creators as verbs** (`addTodo`, `toggleTodo`) and action types as UPPER_SNAKE_CASE strings (`'ADD_TODO'`, `'TOGGLE_TODO'`).
