---
name: useClassNameTrait
description: Sets the class name of an HTML element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useClassNameTrait

Sets the `class` attribute of an HTML element reactively. Replaces the entire class string — does not toggle individual classes.

## Signature

```ts
useClassNameTrait(
  el: HTMLElement,
  className: string | (() => string),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter   | Type                              | Description                                                                                                                                  |
| ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`        | `HTMLElement`                     | The target element                                                                                                                           |
| `className` | `string \| (() => string)`        | The class string to apply. Pass a function for reactive evaluation.                                                                          |
| `...rest`   | `(StateType<any> \| Condition)[]` | Optional State objects and/or Conditions. The trait re-evaluates whenever a State publishes and only applies when all Conditions are truthy. |

## Behavior

1. Evaluates `className` (calls it if it's a function).
2. Checks all Conditions — if all are truthy, sets the class attribute via `el.setAttribute('class', ...)`.
3. If any Condition is falsy, the class is not applied (the previous value remains).
4. Subscribes to every State in `rest` so the trait re-runs on state changes.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
trait.className('btn btn-primary');
trait.className('tab active', isActive.$test(true));
trait.className('tab', isActive.$test(false));
```
