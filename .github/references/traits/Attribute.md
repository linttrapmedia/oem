---
name: useAttributeTrait
description: Adds an attribute to an HTML element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useAttributeTrait

Sets or removes an HTML attribute on an element reactively. When the value is `undefined` or conditions evaluate to `false`, the attribute is removed from the element.

## Signature

```ts
useAttributeTrait(
  el: HTMLElement,
  prop: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                                                                                           | Description                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                                                                  | The target element                                                                                                                           |
| `prop`    | `string`                                                                                       | The attribute name (e.g. `'disabled'`, `'aria-label'`, `'data-id'`)                                                                          |
| `val`     | `(() => string \| number \| boolean \| undefined) \| string \| number \| boolean \| undefined` | The attribute value. Pass a function for reactive evaluation, or a static value. `undefined` removes the attribute.                          |
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

When used through a Template's `trait` proxy, the `el` parameter is supplied automatically:

```ts
trait.attribute('disabled', () => !formState.get().isValid, formState);
trait.attribute('aria-label', 'Close dialog');
trait.attribute(
  'data-active',
  () => tabState.get().active === id,
  tabState,
  () => visible.get(),
);
```
