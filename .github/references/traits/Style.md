---
name: useStyleTrait
description: Applies CSS styles to an HTML element
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useStyleTrait

Reactively sets a single CSS style property on an element. Supports both standard `CSSStyleDeclaration` properties and CSS custom properties (`--*`).

## Signature

```ts
useStyleTrait(
  el: HTMLElement,
  prop: keyof CSSStyleDeclaration | `--${string}`,
  val: (() => string | number | undefined) | (string | number | undefined),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                                                                     | Description                                                                                                                         |
| --------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                                            | The target element                                                                                                                  |
| `prop`    | `keyof CSSStyleDeclaration \| \`--\${string}\``                          | The CSS property name. Use camelCase for standard properties (e.g. `'backgroundColor'`) or `'--custom-prop'` for custom properties. |
| `val`     | `(() => string \| number \| undefined) \| string \| number \| undefined` | The CSS value. Pass a function for reactive evaluation.                                                                             |
| `...rest` | `(StateType<any> \| Condition)[]`                                        | Optional State objects and/or Conditions. The style is applied only when all Conditions are truthy.                                 |

## Behavior

1. Evaluates `val` (calls it if it's a function).
2. Checks all Conditions — if all are truthy, applies the style.
3. For custom properties (`--*`): uses `el.style.setProperty(prop, val)`.
4. For standard properties: assigns directly to `el.style[prop]`.
5. Subscribes to every State in `rest` so the trait re-runs on state changes.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
// Static token value
trait.style('backgroundColor', theme.sem_color_bkg_pri());
trait.style('padding', theme.sem_spc_pad_md());

// Reactive value from state
trait.style('opacity', () => (visible.get() ? '1' : '0'), visible);

// Deferred token getter (re-evaluates on theme change)
trait.style('color', theme.$sem_color_txt_pri);

// Custom CSS property
trait.style('--header-height', '64px');

// Conditional application
trait.style('display', 'none', someState, () => !someState.get().visible);
```
