---
name: useInputEventTrait
description: Handles input-related events on form elements
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useInputEventTrait

Attaches an input-related event listener that extracts the value from `e.target.value` and passes it to a setter function. Designed for binding form element changes directly to state updates.

## Signature

```ts
useInputEventTrait(
  el: HTMLElement,
  evt: 'input' | 'change' | 'keyup' | 'keydown' | 'keypress' | 'beforeinput' | 'paste' | 'cut' | 'compositionstart' | 'compositionupdate' | 'compositionend',
  setter: (val: any) => void,
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                              | Description                                                                                                                                                                                             |
| --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                     | The target form element (typically `HTMLInputElement` or `HTMLTextAreaElement`)                                                                                                                         |
| `evt`     | `string`                          | The input event type. Restricted to: `'input'`, `'change'`, `'keyup'`, `'keydown'`, `'keypress'`, `'beforeinput'`, `'paste'`, `'cut'`, `'compositionstart'`, `'compositionupdate'`, `'compositionend'`. |
| `setter`  | `(val: any) => void`              | A function called with `e.target.value` when the event fires. Typically a State's `set` method.                                                                                                         |
| `...rest` | `(StateType<any> \| Condition)[]` | Optional State objects and/or Conditions. The listener is attached only when all Conditions are truthy.                                                                                                 |

## Behavior

1. Checks all Conditions — if all are truthy and the listener is not attached, adds the event listener.
2. When the event fires, calls `setter(e.target.value)`.
3. If any Condition becomes falsy, removes the listener.
4. Tracks attachment state to prevent duplicate listeners.
5. Subscribes to every State so the trait re-evaluates on state changes.

## Returns

A cleanup function that removes the event listener and unsubscribes from all State listeners.

## Template Usage

```ts
trait.inputEvent('input', nameState.set);
trait.inputEvent('change', (val) => filterState.set(val));
trait.inputEvent('keydown', searchState.set, enabled.$test(true));
```
