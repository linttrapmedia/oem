---
name: UI File
description: How to structure and organize the UI rendering layer in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# UI File

## What This File Is

`ui.ts` is the single file (or `ui/` folder) containing the UI rendering code for the application. This is where `tag` and `trait` (from `templates.ts`) are used to construct the DOM tree. The UI file builds the entire visible interface by composing elements, applying traits, and binding state.

## Why It Must Be Its Own File

The UI layer consumes everything else — states, tokens, actions, templates — but should not define any of them. Isolating UI rendering into its own file keeps the DOM construction readable and ensures that reactive data, styling tokens, and behavioral logic are imported from their canonical locations rather than defined inline.

## When to Create

Create `ui.ts` at the start of any new OEM application, after `templates.ts` and `theme.ts` are set up.

## When to Use

- **When building the interface**: All DOM construction happens here.
- **When modifying the layout**: Edit this file to change structure, add elements, or adjust trait bindings.
- **When adding new views**: Add them inline in this file, or extract helper functions when warranted.

## What Belongs Here

- The root element construction (the main `tag.$(document.body)(...)` or equivalent)
- All `tag.*()` calls that build the DOM tree
- All `trait.*()` calls that apply behaviors to elements
- Helper functions ("components") that return elements — but ONLY when they are reused multiple times, serve as factories with parameters, or exceed ~1000 lines
- Responsive breakpoint conditions on traits — base styles target mobile, breakpoint overrides for larger viewports

## What Does NOT Belong Here

- State definitions (those go in `states.ts`)
- Token definitions (those go in `theme.ts`)
- Template definitions (those go in `templates.ts`)
- Action creators (those go in `actions.ts`)
- Machine logic (those go in `machines.ts`)
- Type definitions (those go in `types.ts`)

## Example

```typescript
// ui.ts
import { tag, trait } from './templates';
import { todos, filter, newTodoText, editingId } from './states';
import { dispatch } from './machines';
import { addTodo, toggleTodo, deleteTodo, setFilter } from './actions';
import { isDesktop } from './states';
import {
  surface_bg_primary,
  text_fg_primary,
  action_bg_primary,
  space_padding_md,
  radius_size_md,
} from './theme';

function TodoItem(todo: Todo) {
  return tag.li(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('padding', space_padding_md.$val),
    tag.input(
      trait.attr('type', 'checkbox'),
      trait.event('change', () => dispatch(toggleTodo(todo.id))),
    ),
    tag.span(
      trait.text(todo.text),
      trait.style(
        'textDecoration',
        'line-through',
        todos.$test((t) => t.find((i) => i.id === todo.id)?.completed),
      ),
    ),
    tag.button(
      trait.text('×'),
      trait.event('click', () => dispatch(deleteTodo(todo.id))),
    ),
  );
}

export const app = tag.div(
  // Base (mobile) styles — no breakpoint condition
  trait.style('backgroundColor', surface_bg_primary.$val),
  trait.style('color', text_fg_primary.$val),
  trait.style('padding', '8px'),
  trait.style('maxWidth', '100%'),

  // Desktop overrides
  trait.style('padding', space_padding_md.$val, isDesktop.$test(true)),
  trait.style('maxWidth', '960px', isDesktop.$test(true)),

  tag.h1(trait.text('Todo App')),
  tag.input(
    trait.inputValue(newTodoText.$val),
    trait.inputEvent('input', newTodoText.set),
    trait.event('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') {
        dispatch(addTodo(newTodoText.val()));
        newTodoText.set('');
      }
    }),
  ),
  tag.ul(trait.innerHTML(() => todos.val().map((todo) => TodoItem(todo)), todos)),
);
```

## Guidelines

- **Default to inlining everything.** Write the entire UI as one nested expression. Only extract helper functions when they are reused multiple times, serve as factories, or are extremely large (>1000 lines).
- **Apply traits directly.** Traits belong inline on their target element — do not store them in shared arrays.
- **Use `$val` for reactive bindings.** Prefer `token.$val` over the verbose `() => token.val(), token` form.
- **Use `$test` for conditions.** Prefer `state.$test(...)` over standalone `$test()` with separate state arguments.
- **Always pair `$test(true)` with `$test(false)`.** When using conditions to toggle a style between two values, always provide both branches. If only the truth condition is supplied, the element has no instruction for resetting when the condition becomes false — the previous value stays and the UI appears stuck. For example: `trait.style('display', 'flex', navOpen.$test(true))` must be paired with `trait.style('display', 'none', navOpen.$test(false))`.
- **Design mobile-first.** Base styles (no condition) target mobile. Use `isTablet.$test(true)` and `isDesktop.$test(true)` to layer on overrides for larger viewports. See [Responsive Design](responsive-design.md).
- **Keep the file readable.** Indentation reflects DOM nesting. Each `tag.*()` call is a visual representation of the DOM tree.

## Rules

1. **One file for all UI.** Only split into a `ui/` folder if the file exceeds manageable size.
2. **Import everything, define nothing.** States, tokens, templates, actions — all come from their own files.
3. **Helper functions are just functions.** There is no component API. A "component" is a function that returns an element.
4. **Extract functions sparingly.** Only when reused, parameterized, or massive.
5. **The UI file is the final consumer.** It reads from every other file but nothing reads from it except `main.ts`.
