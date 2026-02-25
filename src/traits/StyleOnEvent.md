---
name: useStyleOnEventTrait
description: Applies CSS styles to an element on a specific event
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useStyleOnEventTrait

Applies a CSS style property when a DOM event fires on the element. Unlike `useStyleTrait`, this trait does not subscribe to State objects — it runs the style application inside the event handler itself.

## Signature

```ts
useStyleOnEventTrait(
  el: HTMLElement,
  evt: keyof HTMLElementEventMap,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: Condition[]
) => () => void
```

## Parameters

| Parameter | Type                                                                     | Description                                                                                                |
| --------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                                            | The target element                                                                                         |
| `evt`     | `keyof HTMLElementEventMap`                                              | The event that triggers the style application (e.g. `'mouseenter'`, `'mouseleave'`, `'focus'`)             |
| `prop`    | `keyof CSSStyleDeclaration \| \`--\${string}\``                          | The CSS property name (camelCase or `--custom-prop`)                                                       |
| `val`     | `(() => string \| number \| undefined) \| string \| number \| undefined` | The CSS value. Pass a function for reactive evaluation at event time.                                      |
| `...rest` | `Condition[]`                                                            | Optional Conditions. The style is applied only when all Conditions are truthy at the time the event fires. |

## Behavior

1. Attaches an event listener for `evt` on `el`.
2. When the event fires: evaluates `val`, checks Conditions, and applies the style if all pass.
3. For custom properties (`--*`): uses `el.style.setProperty(prop, val)`.
4. For standard properties: assigns directly to `el.style[prop]`.
5. Does **not** subscribe to State objects — only re-evaluates when the event fires.

## Returns

A cleanup function that removes the event listener.

## Template Usage

```ts
// Hover highlight pattern
trait.styleOnEvent('mouseenter', 'backgroundColor', theme.sem_color_bkg_hover());
trait.styleOnEvent('mouseleave', 'backgroundColor', theme.sem_color_bkg_pri());

// Focus ring
trait.styleOnEvent('focus', 'outline', () => `2px solid ${theme.sem_color_bdr_focus()}`);
trait.styleOnEvent('blur', 'outline', 'none');
```
