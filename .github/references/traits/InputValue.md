---
name: useInputValueTrait
description: Binds a value to an input or textarea element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useInputValueTrait

Reactively sets the `value` property of an `<input>` or `<textarea>` element. Pairs with `useInputEventTrait` for two-way data binding.

## Signature

```ts
useInputValueTrait(
  el: HTMLInputElement | HTMLTextAreaElement,
  value: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                                                                     | Description                                                                                                                        |
| --------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLInputElement \| HTMLTextAreaElement`                                | The target input or textarea element                                                                                               |
| `value`   | `(() => string \| number \| undefined) \| string \| number \| undefined` | The value to set. Pass a function for reactive evaluation.                                                                         |
| `...rest` | `(StateType<any> \| Condition)[]`                                        | Optional State objects and/or Conditions. The trait re-evaluates on state changes and only applies when all Conditions are truthy. |

## Behavior

1. Evaluates `value` (calls it if it's a function).
2. Checks all Conditions — if all are truthy, sets `el.value`.
3. Subscribes to every State in `rest` so the trait re-runs on state changes.
4. Typically used alongside `useInputEventTrait` to create a reactive loop: state → input value → user types → event → update state → input value updates.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
// Two-way binding pattern
tag.input(
  trait.inputValue(() => nameState.get(), nameState),
  trait.inputEvent('input', (val) => nameState.pub(val)),
);

// Conditional binding
tag.input(
  trait.inputValue(
    () => searchState.get(),
    searchState,
    () => isEditing.get(),
  ),
);
```
