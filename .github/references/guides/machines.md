---
name: Machines File
description: How to define and organize state machines in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Machines File

## What This File Is

`machines.ts` is the single file (or `machines/` folder) containing all state machines for the application. Each machine is a function that takes the current state and a dispatched action, then uses a switch statement to determine what state mutation to perform.

## Why It Must Be Its Own File

Machines are the decision-making layer of the application. They determine how the app responds to actions. Isolating them from state definitions, actions, and UI makes the behavioral logic easy to read, test, and modify without affecting other layers.

## When to Create

Create `machines.ts` when the application has complex state transitions that benefit from a centralized dispatch pattern — especially when multiple actions affect multiple State objects in coordinated ways.

## When to Use

- **When processing dispatched actions**: The machine reads the action type and performs the appropriate state mutations.
- **When adding new behavior**: Add a new case to the relevant machine's switch statement.
- **When debugging behavior**: Read the machine to trace how an action maps to a state change.

## What Belongs Here

- Machine functions (switch statements on action type)
- Dispatch functions that feed actions into machines
- Any coordination logic that involves multiple State objects reacting to a single action

## What Does NOT Belong Here

- State object definitions (those go in `states.ts`)
- Action creator functions (those go in `actions.ts`)
- Type definitions (those go in `types.ts`)
- UI code or trait calls

## Example

```typescript
// machines.ts
import type { Action } from './types';
import { todos, filter, editingId } from './states';

export function dispatch(action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      todos.reduce((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: action.payload.text,
          completed: false,
          createdAt: Date.now(),
        },
      ]);
      break;

    case 'TOGGLE_TODO':
      todos.reduce((prev) =>
        prev.map((t) => (t.id === action.payload.id ? { ...t, completed: !t.completed } : t)),
      );
      break;

    case 'DELETE_TODO':
      todos.reduce((prev) => prev.filter((t) => t.id !== action.payload.id));
      break;

    case 'SET_FILTER':
      filter.set(action.payload.filter);
      break;
  }
}

// $ thunk — returns a closure for use in event handlers
export const $dispatch = (action: Action) => () => dispatch(action);
```

## Usage in UI

Use `$dispatch` to wire actions directly to event handlers without wrapping in an arrow function:

```typescript
import { $dispatch } from './machines';
import { toggleTodo, deleteTodo, setFilter } from './actions';

// $dispatch returns a closure — no arrow function needed
trait.event('click', $dispatch(toggleTodo(todo.id))),
trait.event('click', $dispatch(deleteTodo(todo.id))),
trait.event('click', $dispatch(setFilter('active'))),
```

For actions that need a value read at event time (e.g., current input text), use `dispatch` directly:

```typescript
import { dispatch } from './machines';
import { addTodo } from './actions';

// dispatch directly when the payload depends on state at call time
trait.event('click', () => dispatch(addTodo(newTodoText.val()))),
```

## Rules

1. **One file for all machines.** Only split into a folder if the file grows unmanageable.
2. **Use simple switch statements.** Each case handles one action type. No nesting, no complex conditionals.
3. **Machines mutate State objects.** They call `.set()`, `.reduce()`, or custom methods on imported State objects.
4. **Machines are synchronous.** If you need async operations, trigger them from the machine case but resolve the state mutation synchronously.
5. **Keep cases focused.** Each case should be a few lines. If a case grows complex, extract the logic into a helper function within the same file.
6. **Export `$dispatch` alongside `dispatch`.** `$dispatch(action)` returns `() => dispatch(action)` — use it in `trait.event()` calls where the action payload is already known. Use `dispatch` directly only when the payload must be read at event time.
