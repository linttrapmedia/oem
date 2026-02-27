---
name: useEventTrait
description: Attaches event listeners to an HTML element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useEventTrait

Attaches a DOM event listener to an element. The listener is added or removed reactively based on Conditions and State changes.

## Signature

```ts
useEventTrait(
  el: HTMLElement,
  evt: keyof GlobalEventHandlersEventMap,
  cb: (evt?: GlobalEventHandlersEventMap[keyof GlobalEventHandlersEventMap]) => void,
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                                | Description                                                                                                                                 |
| --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                       | The target element                                                                                                                          |
| `evt`     | `keyof GlobalEventHandlersEventMap` | The event name (e.g. `'click'`, `'mouseenter'`, `'submit'`)                                                                                 |
| `cb`      | `(evt?) => void`                    | The event handler callback                                                                                                                  |
| `...rest` | `(StateType<any> \| Condition)[]`   | Optional State objects and/or Conditions. The listener is attached only when all Conditions are truthy and detached when any becomes falsy. |

## Behavior

1. Checks all Conditions — if all are truthy and the listener is not already attached, calls `el.addEventListener(evt, cb)`.
2. If any Condition becomes falsy, calls `el.removeEventListener(evt, cb)`.
3. Tracks attachment state internally to prevent duplicate listeners.
4. Subscribes to every State in `rest` so the trait re-evaluates on state changes.

## Returns

A cleanup function that removes the event listener and unsubscribes from all State listeners.

## Template Usage

```ts
trait.event('click', () => dispatch({ type: 'INCREMENT' }));
trait.event('submit', (e) => {
  e.preventDefault();
  save();
});
trait.event('mouseenter', showTooltip, visibilityState, () => enabled.get());
```
