---
name: Custom Traits File
description: How to define and organize custom trait functions in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Custom Traits File

## What This File Is

`traits.ts` is the single file (or `traits/` folder) containing any custom trait functions created for the application. Custom traits extend the behavior of OEM's template system beyond the built-in traits (style, event, attribute, textContent, className, innerHTML, etc.).

## Why It Must Be Its Own File

Custom traits are reusable behavioral building blocks — they are registered into Templates just like built-in traits. Isolating them in their own file keeps them discoverable and prevents them from being buried inside UI code where they'd be hard to find and reuse.

## When to Create

Create `traits.ts` only when the built-in trait library does not cover a behavior you need. Most applications do not need custom traits — the core library is designed to be sufficient for typical use cases.

## When to Use

- **When building a Template**: Import custom traits and register them alongside built-in traits.
- **When you need a repeating DOM behavior** that isn't covered by the built-in traits.
- **Before creating a custom trait**: Check whether a built-in trait already handles the use case.

## What Belongs Here

- Custom trait functions following the OEM trait signature: `(el: HTMLElement, ...args, ...rest: (StateType | Condition)[]) => (() => void) | void`
- Each trait should handle its own subscription to State objects and return a cleanup function

## What Does NOT Belong Here

- Built-in traits (those come from `@linttrap/oem`)
- UI rendering code (that goes in `ui.ts`)
- State definitions (those go in `states.ts`)

## Example

```typescript
// traits.ts
import { extractStates, extractConditions } from '@linttrap/oem';
import type { StateType, Condition } from '@linttrap/oem';

export function useScrollToTrait(
  el: HTMLElement,
  behavior: ScrollBehavior = 'smooth',
  ...rest: (StateType<any> | Condition)[]
) {
  const states = extractStates(...rest);
  const conditions = extractConditions(...rest);

  const apply = () => {
    const applies = conditions.every((c) => (typeof c === 'function' ? c() : c));
    if (applies) {
      el.scrollIntoView({ behavior });
    }
  };

  apply();
  const unsubs = states.map((state) => state.sub(apply));
  return () => unsubs.forEach((unsub) => unsub());
}
```

## Registering Custom Traits

```typescript
// templates.ts
import { Template, useStyleTrait, useEventTrait, useTextContentTrait } from '@linttrap/oem';
import { useScrollToTrait } from './traits';

export const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  text: useTextContentTrait,
  scrollTo: useScrollToTrait,
});

// Usage
trait.scrollTo('smooth', someCondition.$test(true));
```

## Rules

1. **One file for all custom traits.** Only split into a folder if the file grows unmanageable.
2. **Follow the trait signature convention.** First parameter is `el`, then trait-specific args, then `...rest: (StateType | Condition)[]`.
3. **Return a cleanup function.** Unsubscribe from all State listeners and remove any event listeners.
4. **Use `extractStates` and `extractConditions`** from OEM's util to handle the `...rest` parameter.
5. **Most apps need zero custom traits.** Only create one when the built-in library genuinely doesn't cover the behavior.
