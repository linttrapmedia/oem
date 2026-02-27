---
name: useFocusTrait
description: Focuses an HTML element based on conditions
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useFocusTrait

Programmatically focuses an HTML element. Unlike most traits, Focus accepts `conditions` and `states` as explicit arrays rather than using the rest-parameter extraction pattern.

## Signature

```ts
useFocusTrait(
  el: HTMLElement,
  conditions?: Condition[],
  states?: StateType<any>[]
) => () => void
```

## Parameters

| Parameter    | Type               | Description                                                                                                             |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `el`         | `HTMLElement`      | The target element to focus                                                                                             |
| `conditions` | `Condition[]`      | Optional array of Conditions. The element is focused only when all evaluate to truthy. Defaults to `[]`.                |
| `states`     | `StateType<any>[]` | Optional array of State objects to subscribe to. The trait re-evaluates whenever any State publishes. Defaults to `[]`. |

## Behavior

1. Checks all Conditions — if all are truthy, calls `el.focus()`.
2. Subscribes to every State so the trait re-runs on state changes.
3. Useful for auto-focusing inputs when a modal opens, a route changes, or a condition becomes true.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
trait.focus([modalState.$test((s) => s.open)], [modalState]);
trait.focus([], [routeState]);
```
