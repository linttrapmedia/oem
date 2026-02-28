---
name: Responsive Design
description: How to build responsive layouts in OEM using useMediaQueryState and trait conditions.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Responsive Design

OEM handles responsive design without CSS media queries. Instead, viewport conditions are modeled as reactive `State<boolean>` objects using `useMediaQueryState`. Traits subscribe to these states via conditions, so style changes are automatic, surgical, and declarative.

**Everything is mobile-first.** Base styles — the traits written without any breakpoint condition — target the smallest viewport. Larger breakpoints (`isTablet`, `isDesktop`) layer on overrides via conditions. This means the app works on mobile by default, and wider layouts are progressive enhancements.

---

## Core Mechanism

`useMediaQueryState` returns a `State<boolean>` that tracks whether the viewport matches the given constraints. It listens to `window.resize` and updates automatically:

```ts
import { useMediaQueryState } from '@linttrap/oem';

const isMobile = useMediaQueryState({ maxWidth: 639 });
const isTablet = useMediaQueryState({ minWidth: 640, maxWidth: 1023 });
const isDesktop = useMediaQueryState({ minWidth: 1024 });
```

Each of these is a normal State object — it has `.val()`, `.set()`, `.sub()`, `.$val`, `.$test()`, and all the standard State methods.

### Props

| Property   | Type                           | Default    | Description                      |
| ---------- | ------------------------------ | ---------- | -------------------------------- |
| `type`     | `'screen' \| 'print' \| 'all'` | `'all'`    | Media type to match against      |
| `minWidth` | `number`                       | `0`        | Minimum viewport width in pixels |
| `maxWidth` | `number`                       | `Infinity` | Maximum viewport width in pixels |

Width boundaries are inclusive (`>= minWidth` and `<= maxWidth`).

---

## Where to Define Breakpoints

Define all breakpoint states in `states.ts` (or a dedicated `breakpoints.ts` if the app is large). They are module-level singletons, just like any other State:

```ts
// states.ts
import { useMediaQueryState } from '@linttrap/oem';

export const isMobile = useMediaQueryState({ maxWidth: 639 });
export const isTablet = useMediaQueryState({ minWidth: 640, maxWidth: 1023 });
export const isDesktop = useMediaQueryState({ minWidth: 1024 });
```

Import them wherever UI code needs responsive behavior.

---

## Using Breakpoints in Traits

Because `useMediaQueryState` returns a `State<boolean>`, its `.$test()` method produces conditions that traits natively understand. Use separate trait calls gated by breakpoint conditions — never ternaries:

### Responsive Styles

```ts
import { isTablet, isDesktop } from './states';

tag.div(
  // Base (mobile) — no condition
  trait.style('display', 'flex'),
  trait.style('flexDirection', 'column'),
  trait.style('padding', '8px'),
  trait.style('gap', space_gap_primary.$val),

  // Desktop override
  trait.style('flexDirection', 'row', isDesktop.$test(true)),
  trait.style('padding', '24px', isDesktop.$test(true)),
);
```

Each trait subscribes to the breakpoint state independently. When the viewport crosses a boundary, only the affected traits re-evaluate — no full re-render.

### Responsive Text

```ts
tag.h1(
  trait.text('Dashboard'),
  // Base (mobile)
  trait.style('fontSize', type_size_lg.$val),
  // Desktop override
  trait.style('fontSize', type_size_xl.$val, isDesktop.$test(true)),
);
```

### Showing / Hiding Elements

Use `display: none` gated by a breakpoint condition to show or hide elements at different viewport sizes:

```ts
// Sidebar — hidden by default (mobile), shown on desktop
tag.aside(
  trait.style('display', 'none'),
  trait.style('display', 'block', isDesktop.$test(true)),
  trait.style('width', '260px', isDesktop.$test(true)),
  sidebarContent,
),

// Mobile nav — shown by default (mobile), hidden on desktop
tag.nav(
  trait.style('display', 'flex'),
  trait.style('display', 'none', isDesktop.$test(true)),
  mobileNavItems,
),
```

### Responsive Grid Columns

```ts
tag.div(
  // Base (mobile) — single column
  trait.style('display', 'grid'),
  trait.style('gap', space_gap_primary.$val),
  trait.style('gridTemplateColumns', '1fr'),
  // Tablet override
  trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isTablet.$test(true)),
  // Desktop override
  trait.style('gridTemplateColumns', 'repeat(3, 1fr)', isDesktop.$test(true)),
  ...cards,
);
```

---

## Combining Breakpoints with Other Conditions

Breakpoint conditions compose with any other condition. When multiple conditions are passed to a trait, all must be truthy for it to apply:

```ts
trait.style(
  'backgroundColor',
  action_bg_primary.$val,
  isDesktop.$test(true),
  isHovered.$test(true),
);
// Only applies when viewport is desktop-sized AND the element is hovered
```

---

## Print Media

`useMediaQueryState` also supports the `type` property for print-specific styles:

```ts
const isPrint = useMediaQueryState({ type: 'print' });

tag.nav(trait.style('display', 'none', isPrint.$test(true)));

tag.main(
  trait.style('maxWidth', '100%', isPrint.$test(true)),
  trait.style('color', '#000', isPrint.$test(true)),
);
```

---

## Rules

1. **Mobile-first.** Base styles (no condition) target the smallest viewport. Larger breakpoints add overrides.
2. **Define breakpoints once in `states.ts`.** Never call `useMediaQueryState` inline inside UI code.
3. **Use `.$test(true)` / `.$test(false)` as conditions.** Never read `.val()` in a ternary.
4. **Separate trait calls per breakpoint.** Each viewport size gets its own `trait.style(...)` call with a condition — do not collapse multiple breakpoints into one trait.
5. **Keep breakpoint ranges non-overlapping.** Ensure `maxWidth` of one range is one pixel below the `minWidth` of the next (e.g., `639 / 640`, `1023 / 1024`).
6. **Base styles have no condition.** They represent the mobile layout and are always applied. Conditions only appear on tablet/desktop overrides.
