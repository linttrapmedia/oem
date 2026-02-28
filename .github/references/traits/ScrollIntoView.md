---
name: useScrollIntoViewTrait
description: Reactively scrolls an HTML element into view based on conditions
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useScrollIntoViewTrait

Reactively scrolls an element into the visible area of its scrollable ancestor when conditions are met. Supports smooth and instant scrolling via standard `ScrollIntoViewOptions`.

## Signature

```ts
useScrollIntoViewTrait(
  el: HTMLElement,
  options?: ScrollIntoViewOptions,
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter  | Type                          | Description                                                                                                                                  |
| ---------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`       | `HTMLElement`                 | The target element to scroll into view                                                                                                       |
| `options`  | `ScrollIntoViewOptions`       | Standard scroll options: `behavior` (`'smooth'` or `'instant'`), `block` (`'start'`, `'center'`, `'end'`, `'nearest'`), `inline` (same)     |
| `...rest`  | `(StateType<any> \| Condition)[]` | Optional State objects and/or Conditions. Scrolls when all Conditions are truthy. Re-evaluates on State changes.                          |

## Behavior

1. Checks all Conditions — if all are truthy, calls `el.scrollIntoView(options)`.
2. Subscribes to every State in `rest` so the trait re-evaluates on state changes.
3. Scrolls on initialization if conditions are met.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
// Scroll when an item becomes active
trait.scrollIntoView(
  { behavior: 'smooth', block: 'center' },
  activeItem.$test((id) => id === itemId),
);

// Scroll to error field on validation failure
trait.scrollIntoView(
  { behavior: 'smooth', block: 'start' },
  form.$test((f) => !!f.errors.email && f.touched.email),
);

// Always scroll into view on mount (no conditions)
trait.scrollIntoView({ behavior: 'instant', block: 'start' });
```

## Common Patterns

### Chat auto-scroll

```ts
const messages = State<Message[]>([]);

// Scroll the last message into view when messages change
tag.div(
  trait.scrollIntoView(
    { behavior: 'smooth', block: 'end' },
    messages.$test(() => true),
  ),
);
```

### Anchor navigation

```ts
const activeSection = State<string>('intro');

// Each section scrolls into view when it becomes active
['intro', 'features', 'pricing'].forEach((id) => {
  tag.section(
    trait.scrollIntoView(
      { behavior: 'smooth', block: 'start' },
      activeSection.$test(id),
    ),
  );
});
```

### Focus first error

```ts
const form = useFormState({ name: '', email: '' }, validators);

tag.input(
  trait.scrollIntoView(
    { behavior: 'smooth', block: 'center' },
    form.$test((f) => !!f.errors.name && f.touched.name),
  ),
);
```

## Notes

- Uses the standard `Element.scrollIntoView()` API
- Scrolls every time conditions become truthy after a state change — not just on the first occurrence
- For one-time scroll (e.g., on mount), pass no states and the scroll will fire only on initialization
- Consider using `{ behavior: 'smooth' }` for user-visible navigation and `{ behavior: 'instant' }` for programmatic repositioning
