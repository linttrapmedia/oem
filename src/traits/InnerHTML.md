---
name: useInnerHTMLTrait
description: Sets the innerHTML of an element with reactive children
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useInnerHTMLTrait

Sets the inner content of an element by appending child elements or text nodes. Clears the element first, then appends children — making it safe for HTMLElement and SVGElement children (no serialization).

## Signature

```ts
useInnerHTMLTrait(
  el: HTMLElement,
  children: Child | Child[] | (() => Child | Child[]),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

Where `Child = string | number | HTMLElement | SVGElement | undefined | unknown`.

## Parameters

| Parameter  | Type                                           | Description                                                                                                                                                                        |
| ---------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`       | `HTMLElement`                                  | The parent element whose content will be set                                                                                                                                       |
| `children` | `Child \| Child[] \| (() => Child \| Child[])` | The child content. Can be a single value, an array, or a function returning either. HTMLElement/SVGElement children are appended directly; primitives are converted to text nodes. |
| `...rest`  | `(StateType<any> \| Condition)[]`              | Optional State objects and/or Conditions. The trait re-evaluates on state changes and only applies when all Conditions are truthy.                                                 |

## Behavior

1. Clears `el.innerHTML`.
2. Evaluates `children` (calls it if it's a function).
3. Checks all Conditions — if any are falsy, the element remains empty.
4. For arrays: filters out falsy values, appends HTMLElement/SVGElement children via `appendChild`, and wraps primitives in text nodes.
5. For single HTMLElement/SVGElement: appends directly.
6. For single primitives: sets `el.innerHTML` to the stringified value.
7. Subscribes to every State in `rest` so the trait re-runs on state changes.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
tag.div(
  trait.innerHTML(
    () => [tag.h1(trait.textContent('Hello')), tag.p(trait.textContent(message.$val))],
    message,
  ),
);

tag.ul(
  trait.innerHTML(() => items.val().map((item) => tag.li(trait.textContent(item.label))), items),
);
```
