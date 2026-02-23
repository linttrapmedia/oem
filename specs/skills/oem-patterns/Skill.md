---
name: OEM patterns
description: Idiomatic OEM conventions, SPA architectural patterns, and LLM-optimized file structure
---

# Pattern Library

## Idiomatic OEM

### Conditions over Ternaries

OEM prescribes explicit `$test()` conditions rather than ternary expressions. Ternaries
produce static values that cannot react to state changes.

```typescript
import { $test } from '@linttrap/oem';

// ✅ Separate trait calls with conditions
trait.style('opacity', '0.6', $test(disabled)),
trait.style('opacity', '1', $test(!disabled)),

// ❌ Do not use ternary expressions
trait.style('opacity', disabled ? '0.6' : '1'),
```

### State Lives Outside Renders

State objects are module-level singletons — never recreated inside render functions.

```typescript
// ✅ Module-level state — shared across the app
const count = State(0);
function renderCounter() {
  return tag.p(trait.text(count.$val));
}

// ❌ State inside render — recreated on every call
function renderCounter() {
  const count = State(0); // new instance each render
  return tag.p(trait.text(count.$val));
}
```

### Traits over Imperative DOM

Prefer trait-based declarations over `element.style`, `element.addEventListener`, etc.
Traits integrate with the automatic cleanup system and state subscription lifecycle.

## Git Commits

Follow conventional commits: `type(scope): description`

- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring without behavior change
- `docs`: Documentation only
- `chore`: Build, tooling, config
- `style`: Formatting, whitespace
- `test`: Adding or updating tests

## SPA Architecture

File structure follows High Cohesion and Low Coupling, optimized for LLM interpretation.
Each item may be a single file or a folder depending on complexity.

```
my-app/
├── actions/       # Action creators → { type, payload }
├── machines/      # State machines (switch on state + action)
├── main.ts        # Entry point — init, wire events, mount
├── templates/     # [tag, trait] = Template(...) definitions
├── traits/        # Custom app-specific traits
├── types/         # TypeScript types (state, actions, data)
├── ui/            # Render functions keyed on machine state
└── theme/         # Semantic design tokens
```

### actions/

Pure functions returning plain action objects. No side effects.

```typescript
export const addTodo = (text: string) => ({ type: 'ADD_TODO' as const, payload: { text } });
export const toggleTodo = (id: string) => ({ type: 'TOGGLE_TODO' as const, payload: { id } });
```

### machines/

Simple switch-statement machines. Switch on current state, then on action type.

```typescript
export function machine(state: AppState, action: Action): AppState {
  switch (state.view) {
    case 'list':
      switch (action.type) {
        case 'ADD_TODO':
          return { ...state, todos: [...state.todos, createTodo(action.payload.text)] };
        case 'TOGGLE_TODO':
          return { ...state, todos: state.todos.map((t) =>
            t.id === action.payload.id ? { ...t, done: !t.done } : t
          )};
        default: return state;
      }
    default: return state;
  }
}
```

### main.ts

Initializes app state, wires the machine, mounts the UI.

```typescript
import { appState, dispatch } from './state';
import { renderApp } from './ui';

appState.sub((state) => {
  document.body.replaceChildren(renderApp(state, dispatch));
});
```

### templates/

Define all `[tag, trait]` template instances here. Import traits from `@linttrap/oem`
and register only what each template needs.

### ui/

Render functions that take state (and optionally `dispatch`) and return DOM nodes.
Each function corresponds to a view or sub-view in the machine.

### theme/

Semantic design tokens for the app. Follow the 6-layer naming convention.
Token values reference the `sem_` or `elm_` layer; avoid raw primitives here.