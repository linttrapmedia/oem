---
name: useTextContentTrait
description: Sets the text content of an HTML element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useTextContentTrait

Sets the text content of an element reactively. Supports single values, arrays of values (concatenated as text nodes), and function getters.

## Signature

```ts
useTextContentTrait(
  el: HTMLElement,
  text: TextContent | TextContent[] | (() => TextContent | TextContent[]),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

Where `TextContent = string | number | undefined | unknown`.

## Parameters

| Parameter | Type                                                                   | Description                                                                                                                        |
| --------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                                          | The target element                                                                                                                 |
| `text`    | `TextContent \| TextContent[] \| (() => TextContent \| TextContent[])` | The text to display. Can be a single value, an array of values (each appended as a text node), or a function returning either.     |
| `...rest` | `(StateType<any> \| Condition)[]`                                      | Optional State objects and/or Conditions. The trait re-evaluates on state changes and only applies when all Conditions are truthy. |

## Behavior

1. Clears `el.textContent`.
2. Evaluates `text` (calls it if it's a function).
3. Checks all Conditions — if any are falsy, the element remains empty.
4. For arrays: filters out `undefined` values and appends each as a text node.
5. For single values: sets `el.textContent` to the stringified value.
6. Subscribes to every State in `rest` so the trait re-runs on state changes.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
trait.textContent('Hello, World!');
trait.textContent(() => `Count: ${counter.get()}`, counter);
trait.textContent(
  () => items.get().length,
  items,
  () => items.get().length > 0,
);
```
