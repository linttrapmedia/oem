---
name: useAriaTrait
description: Reactively sets ARIA attributes and roles on an HTML element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useAriaTrait

Reactively sets ARIA attributes and the `role` attribute on an element. When the value is `undefined` or conditions evaluate to `false`, the attribute is removed. Provides first-class accessibility support with typed ARIA property names.

## Signature

```ts
useAriaTrait(
  el: HTMLElement,
  prop: 'role' | `aria-${string}`,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                                                                                           | Description                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                                                                  | The target element                                                                                                                           |
| `prop`    | `'role' \| \`aria-\${string}\``                                                                | The ARIA attribute name (e.g. `'aria-label'`, `'aria-expanded'`, `'role'`)                                                                  |
| `val`     | `(() => string \| number \| boolean \| undefined) \| string \| number \| boolean \| undefined` | The attribute value. Pass a function for reactive evaluation. `undefined` removes the attribute.                                             |
| `...rest` | `(StateType<any> \| Condition)[]`                                                              | Optional State objects and/or Conditions. The trait re-evaluates whenever a State publishes and only applies when all Conditions are truthy. |

## Behavior

1. Evaluates `val` (calls it if it's a function).
2. Checks all Conditions — if any are falsy, removes the attribute.
3. If all Conditions pass and `val` is `undefined`, removes the attribute.
4. Otherwise, sets the attribute via `el.setAttribute(prop, String(val))`.
5. Subscribes to every State in `rest` so the trait re-runs on state changes.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
// Static ARIA label
trait.aria('aria-label', 'Close dialog');

// Role assignment
trait.aria('role', 'navigation');

// Reactive expanded state
trait.aria(
  'aria-expanded',
  () => String(menuOpen.val()),
  menuOpen,
);

// Conditional aria-hidden
trait.aria('aria-hidden', 'true', visible.$test(false));
trait.aria('aria-hidden', 'false', visible.$test(true));

// Reactive aria-live region
trait.aria('aria-live', 'polite');
trait.aria(
  'aria-label',
  () => `${notifications.val().length} new notifications`,
  notifications,
);

// Aria-current for navigation
trait.aria(
  'aria-current',
  'page',
  activeRoute.$test((r) => r === '/about'),
);
```

## Common ARIA Patterns

### Accessible toggle button

```ts
const expanded = State<boolean>(false);

tag.button(
  trait.aria('aria-expanded', () => String(expanded.val()), expanded),
  trait.aria('aria-controls', 'panel-1'),
  trait.event('click', expanded.$reduce((v) => !v)),
  trait.textContent(() => (expanded.val() ? 'Collapse' : 'Expand'), expanded),
);
```

### Live region for status updates

```ts
tag.div(
  trait.aria('role', 'status'),
  trait.aria('aria-live', 'polite'),
  trait.textContent(() => statusMessage.val(), statusMessage),
);
```

### Tab panel

```ts
tag.div(
  trait.aria('role', 'tabpanel'),
  trait.aria('aria-labelledby', 'tab-1'),
  trait.aria(
    'aria-hidden',
    () => String(activeTab.val() !== 'tab-1'),
    activeTab,
  ),
);
```

## Comparison with useAttributeTrait

| Feature         | `useAriaTrait`                 | `useAttributeTrait`        |
| --------------- | ------------------------------ | -------------------------- |
| Type safety     | Typed to `role` and `aria-*`   | Accepts any string         |
| Intended use    | Accessibility attributes       | General HTML attributes    |
| Behavior        | Identical                      | Identical                  |

`useAriaTrait` is a semantic specialization — it constrains the `prop` parameter to valid ARIA attributes, making intent clearer and preventing accidental misuse.

## Notes

- Follows the same reactive pattern as `useAttributeTrait`
- Removing the attribute (via `undefined` or failing conditions) is the correct way to "unset" ARIA properties
- Boolean ARIA attributes like `aria-expanded` must be set as string `"true"` or `"false"` — they are not boolean HTML attributes
