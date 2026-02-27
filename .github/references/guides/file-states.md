---
name: States File
description: How to define and organize reactive State objects in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# States File

## What This File Is

`states.ts` is the single file (or `states/` folder) containing all reactive State objects for the application. State objects are created with the `State()` function from OEM and are the mechanism for storing any value that needs to trigger UI re-renders when it changes.

## Why It Must Be Its Own File

State objects are module-level singletons shared across the entire application. Centralizing them in one file gives LLMs and developers a single inventory of all reactive data in the app. It also prevents accidental duplication — before creating a new State, check this file to see if one already exists.

## When to Create

Create `states.ts` at the start of any new OEM application, as soon as the types are defined.

## When to Use

- **When rendering UI**: Import State objects and bind them to traits using `$val` or the verbose form.
- **When handling events**: Import State objects and use `$set`, `$reduce`, or custom `$`-prefixed methods.
- **When adding a new feature**: Add any new State objects to this file.
- **Before creating a new State**: Read this file to check if an appropriate State already exists.

## What Belongs Here

- All `State()` instances for the application
- Custom methods defined on State objects (passed as the second argument to `State()`)
- State objects for any data that UI traits subscribe to

## What Does NOT Belong Here

- Type definitions (those go in `types.ts`)
- Static data that never changes (those go in `data.ts`)
- Constants (those go in `constants.ts`)
- Design tokens (those go in `theme.ts` using `useTokenState`)
- Action creator functions (those go in `actions.ts`)
- Machine/dispatch logic (those go in `machines.ts`)

## Example

```typescript
// states.ts
import { State } from '@linttrap/oem';
import type { Todo, Filter } from './types';

export const todos = State<Todo[]>([]);
export const filter = State<Filter>('all');
export const editingId = State<string | null>(null);
export const newTodoText = State('');

// State with custom methods
export const todoList = State<Todo[]>([], {
  add: (state, text: string) => {
    state.reduce((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() },
    ]);
  },
  toggle: (state, id: string) => {
    state.reduce((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  },
  remove: (state, id: string) => {
    state.reduce((prev) => prev.filter((t) => t.id !== id));
  },
});
```

## Usage Patterns

```typescript
// In UI — binding to traits using $val
trait.text(filter.$val);
trait.style(
  'opacity',
  '1',
  editingId.$test((id) => id !== null),
);

// In event handlers — using $ thunks
trait.event('click', filter.$set('active'));
trait.event('click', todoList.$toggle(todo.id));

// Verbose form for computed values
trait.text(() => `${todos.val().filter((t) => !t.completed).length} items left`, todos);
```

## Persistence

If a State needs to survive page reloads, subscribe to it and persist its value. Load the persisted value back on startup:

```typescript
// states.ts
import { State } from '@linttrap/oem';
import type { Todo } from './types';
import { STORAGE_KEY } from './constants';

const saved = localStorage.getItem(STORAGE_KEY);
const initial: Todo[] = saved ? JSON.parse(saved) : [];

export const todos = State<Todo[]>(initial);

todos.sub((value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});
```

## Rules

1. **One file for all State objects.** Only split into a folder if the file grows unmanageable.
2. **State objects are module-level singletons.** Never create State inside a function or loop.
3. **Import types from `types.ts`.** State objects should be typed with the app's type definitions.
4. **Check before creating.** Read the file first to avoid duplicate State objects.
5. **Use custom methods** for complex mutations that would otherwise require inline `reduce` callbacks everywhere.
