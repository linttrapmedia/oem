---
name: useDataAttributeTrait
description: Reactively sets data-* attributes on an HTML element via the dataset API
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# useDataAttributeTrait

Reactively sets or removes `data-*` attributes on an element using the `dataset` API. Accepts either bare names (e.g. `'active'`) or prefixed names (e.g. `'data-active'`). When the value is `undefined` or conditions are falsy, the data attribute is removed.

## Signature

```ts
useDataAttributeTrait(
  el: HTMLElement,
  name: string,
  val: (() => string | number | boolean | undefined) | (string | number | boolean | undefined),
  ...rest: (StateType<any> | Condition)[]
) => () => void
```

## Parameters

| Parameter | Type                                                                                           | Description                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `el`      | `HTMLElement`                                                                                  | The target element                                                                                                                           |
| `name`    | `string`                                                                                       | The data attribute name. Can be bare (`'active'`) or prefixed (`'data-active'`). Automatically converted to the proper `dataset` key.        |
| `val`     | `(() => string \| number \| boolean \| undefined) \| string \| number \| boolean \| undefined` | The attribute value. Pass a function for reactive evaluation. `undefined` removes the attribute.                                             |
| `...rest` | `(StateType<any> \| Condition)[]`                                                              | Optional State objects and/or Conditions. The trait re-evaluates whenever a State publishes and only applies when all Conditions are truthy. |

## Behavior

1. Normalizes the `name` — adds `data-` prefix if missing, converts to camelCase `dataset` key.
2. Evaluates `val` (calls it if it's a function).
3. Checks all Conditions — if any are falsy, removes the data attribute.
4. If all Conditions pass and `val` is `undefined`, removes the data attribute.
5. Otherwise, sets `el.dataset[key] = String(val)`.
6. Subscribes to every State in `rest` so the trait re-runs on state changes.

## Returns

A cleanup function that unsubscribes from all State listeners.

## Template Usage

```ts
// Static data attribute
trait.data('id', '42');
// → el.dataset.id = '42' (renders as data-id="42")

// With data- prefix (also works)
trait.data('data-id', '42');
// → same result

// Reactive value
trait.data('active-tab', () => activeTab.val(), activeTab);
// → el.dataset.activeTab = 'home' (renders as data-active-tab="home")

// Conditional data attribute
trait.data(
  'selected',
  'true',
  item.$test((i) => i.selected),
);

// Remove when undefined
trait.data('tooltip', () => tooltipText.val() || undefined, tooltipText);
```

## Common Patterns

### Track element state for CSS selectors

```ts
// Set data-state for CSS-based styling or external queries
trait.data('state', () => panelState.val(), panelState);
// → [data-state="open"], [data-state="closed"]
```

### Wire up delegation targets

```ts
items.forEach((item) =>
  tag.li(
    trait.data('id', item.id),
    trait.event('click', (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      selectItem(id);
    }),
  ),
);
```

### Flag elements for testing

```ts
trait.data('testid', 'submit-button');
```

## Comparison with useAttributeTrait

| Feature       | `useDataAttributeTrait`            | `useAttributeTrait`     |
| ------------- | ---------------------------------- | ----------------------- |
| API           | Uses `el.dataset` (camelCase keys) | Uses `el.setAttribute`  |
| Name handling | Auto-prefixes `data-` if missing   | Requires full attr name |
| Intended use  | `data-*` attributes only           | Any HTML attribute      |

## Notes

- Names are automatically normalized: `'active-tab'` → `dataset.activeTab` → renders as `data-active-tab`
- Uses the `dataset` API for setting/removing, which is the idiomatic way to work with data attributes
- Removal uses `delete el.dataset[key]` which fully removes the attribute from the DOM
