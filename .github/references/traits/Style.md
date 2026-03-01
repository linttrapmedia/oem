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
// Token value (re-evaluates on theme change via $val)
trait.style('backgroundColor', surface_bg_primary.$val);
trait.style('padding', space_padding_md.$val);

// Conditional toggle — unconditional default + conditional override
// IMPORTANT: Never use two opposing $test conditions on the same property.
// Each conditional trait has its own saved-value slot, and opposing conditions
// will corrupt each other's snapshots, preventing the style from reverting.
trait.style('opacity', '0'); // default
trait.style('opacity', '1', visible.$test(true)); // override when true

// Custom CSS property
trait.style('--header-height', '64px');

// Conditional application
trait.style(
  'display',
  'none',
  someState.$test((s) => !s.visible),
);
```
