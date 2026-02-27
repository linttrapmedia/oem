---
name: Theme File
description: How to define and organize design tokens and theming in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Theme File

## What This File Is

`theme.ts` is the single file (or `theme/` folder) containing the application's theming infrastructure: one `useThemeState` instance and all `useTokenState` token definitions. Tokens are the single source of truth for every visual property in the app — colors, spacing, typography, radii, shadows, and more.

## Why It Must Be Its Own File

Tokens are referenced by every piece of UI code. Centralizing them ensures consistent visual properties across the entire app and prevents duplicate tokens. Every token must have a documentation comment so that LLMs can decide whether to reuse an existing token or create a new one.

## When to Create

Create `theme.ts` at the start of any new OEM application, before writing any UI code.

## When to Use

- **When writing UI code**: Import tokens and bind them to style traits using `token.$val`.
- **When adding new visual properties**: Check this file first — if a matching token exists, use it. Only create a new token if no existing token covers the intent.
- **When switching themes**: Call `theme.set('dark')` or `theme.set('light')` — all tokens update automatically.

## What Belongs Here

- The single `useThemeState` instance
- All `useTokenState` token definitions
- Documentation comments above every token (what / when to use / when not to use)

## What Does NOT Belong Here

- UI rendering code (that goes in `ui.ts`)
- State objects unrelated to theming (those go in `states.ts`)
- Trait definitions (those go in `traits.ts` or `templates.ts`)

## Example

```typescript
// theme.ts
import { useThemeState, useTokenState } from '@linttrap/oem';

// Single source of truth for current theme
export const theme = useThemeState('light');

// — Surface: primary background
// USE: main content area background
// AVOID: small interactive elements
export const surface_bg_primary = useTokenState('#ffffff', '#0b0f1a', theme);

// — Surface: secondary background
// USE: cards, panels, sidebars
// AVOID: full-page backgrounds
export const surface_bg_secondary = useTokenState('#f4f5f7', '#151922', theme);

// — Action: primary button background
// USE: primary CTA buttons
// AVOID: non-interactive surfaces
export const action_bg_primary = useTokenState('#2563eb', '#3b82f6', theme);

// — Text: primary foreground
// USE: body copy, headings
// AVOID: muted or disabled text
export const text_fg_primary = useTokenState('#111827', '#f9fafb', theme);

// — Space: medium padding
// USE: card padding, section padding
// AVOID: tight inline spacing
export const space_padding_md = useTokenState('16px', '16px', theme);

// — Radius: medium border radius
// USE: cards, buttons, inputs
// AVOID: full-bleed or pill shapes
export const radius_size_md = useTokenState('8px', '8px', theme);
```

## Token Naming Convention

Token names follow the pattern `<category>_<property>_<variant>`:

| Segment      | Purpose                   | Examples                                                                                      |
| ------------ | ------------------------- | --------------------------------------------------------------------------------------------- |
| **category** | Semantic role             | `surface`, `action`, `text`, `border`, `feedback`, `nav`, `space`, `radius`, `shadow`, `type` |
| **property** | CSS-adjacent property     | `bg`, `fg`, `border`, `size`, `weight`, `gap`, `padding`                                      |
| **variant**  | Hierarchy within category | `primary`, `secondary`, `muted`, `hover`, `active`, `disabled`                                |

## Rules

1. **One file for all tokens.** Only split into a folder if the file grows unmanageable.
2. **One `useThemeState` per app.** Never create multiple theme instances.
3. **Document every token.** Each token must have a comment stating what it is, when to use it, and when to avoid it.
4. **Never hardcode visual values.** Every color, size, spacing, and shadow must come from a token.
5. **Search before creating.** Read the existing tokens before adding a new one — reuse over reinvent.
6. **Follow the naming convention.** `<category>_<property>_<variant>` — no exceptions.
