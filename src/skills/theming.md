---
name: Theming & Design Tokens
description: How OEM's token-driven theming system works — architecture, token creation, naming conventions, and usage rules.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Theming & Design Tokens

OEM does not ship pre-built components or a fixed token palette. Instead, every visual property — color, spacing, typography, radius, shadow, etc. — is expressed as a reactive token that LLMs generate on the fly while building UI. This gives every app a bespoke design system that grows organically and stays perfectly consistent.

## Architecture Overview

```
useThemeState('light')          ← single source of truth for current theme
        │
        ├─▸ useTokenState(lightVal, darkVal, themeState)   ← one per design token
        ├─▸ useTokenState(...)
        └─▸ ...
```

1. **Create one `useThemeState` instance per app.** It holds the current theme (`'light'` or `'dark'`).
2. **Create tokens with `useTokenState`.** Each token receives a light value, a dark value, and the shared `themeState` dependency. When the theme changes, every token automatically updates.
3. **Reference tokens in traits.** Tokens are plain `State` objects, so they plug directly into traits as reactive values.

## Step 1 — Create the Theme Instance

Every app must create exactly **one** `useThemeState` instance and export it from a central `theme.ts` file:

```ts
import { useThemeState, useTokenState } from '@linttrap/oem';

// Single source of truth
export const theme = useThemeState('light');
```

## Step 2 — Generate Tokens On-the-Fly

LLMs create tokens as they build UI. Each token is an instance of `useTokenState` that derives its value from the shared theme:

```ts
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
```

## Token Naming Convention

Token names follow a strict pattern that prevents duplication and communicates intent:

```
<category>_<property>_<variant>
```

| Segment      | Purpose                                     | Examples                                                                                                                      |
| ------------ | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **category** | Semantic role of the element                | `surface`, `action`, `text`, `border`, `feedback`, `nav`, `data`, `focus`, `space`, `radius`, `shadow`, `type`                |
| **property** | CSS-adjacent property being set             | `bg`, `fg`, `border`, `size`, `weight`, `gap`, `padding`, `radius`, `shadow`, `opacity`                                       |
| **variant**  | Specificity / hierarchy within the category | `primary`, `secondary`, `tertiary`, `muted`, `inverse`, `success`, `warning`, `danger`, `info`, `hover`, `active`, `disabled` |

**Examples:**

```
surface_bg_primary        // main page background
surface_bg_secondary      // card / panel background
action_bg_primary         // primary CTA
action_bg_hover           // primary CTA hover state
action_fg_primary         // primary CTA label color
text_fg_primary           // body text
text_fg_muted             // secondary / helper text
border_color_primary      // standard border
feedback_bg_success       // success banner background
feedback_fg_danger        // error text
nav_bg_active             // active nav item background
space_gap_md              // medium spacing gap
radius_size_md            // medium border radius
shadow_box_md             // medium elevation shadow
type_size_base            // base font size
type_weight_bold          // bold font weight
```

## Preventing Token Duplication

Before creating a new token, **always** check whether an existing token already covers the same intent. Follow these rules:

1. **Search the `theme.ts` file first.** Read the documentation comment above each token — it states the intended use case and when to avoid the token.
2. **Reuse over reinvent.** If `action_bg_primary` already exists and fits a new button, use it. Do not create `button_bg_main`.
3. **Extend, don't fork.** If you need a new variant (e.g., a danger button), add a new variant token (`action_bg_danger`) rather than duplicating the primary with different values.
4. **Document every token.** Each token **must** have a comment block above it stating: what it is, when to use it, and when not to use it. This ensures future LLM sessions can make informed reuse decisions.

```ts
// — Action: danger button background
// USE: destructive actions (delete, remove)
// AVOID: non-destructive call-to-actions
export const action_bg_danger = useTokenState('#dc2626', '#ef4444', theme);
```

## Using Tokens in Traits

Tokens are `State` objects. Pass them as reactive watchers to traits:

```ts
trait.style('backgroundColor', surface_bg_primary.$val);
trait.style('color', text_fg_primary.$val);
```

When the theme changes, every token fires its subscribers and the UI updates automatically.

## Token Usage Rules

- **Never** write a hex value, rgb value, or pixel literal directly in a `trait.style()` call.
- **Always** create or reference a token from `theme.ts`.
- **Never** invent a token name that doesn't follow the `<category>_<property>_<variant>` convention.
- When no existing token fits, create a new one with full documentation and add it to `theme.ts`.

## Contrast Rules (CRITICAL)

Every text/foreground token MUST meet WCAG contrast minimums against the surfaces it will appear on, **in both light and dark mode**.

| Content Type | Minimum Contrast Ratio |
| --- | --- |
| Body text (< 18px) | 4.5:1 |
| Large text (≥ 18px bold) | 3:1 |
| UI components & icons | 3:1 |

**Rules:**
1. When creating a `text_fg_*` token, check its contrast against every `surface_bg_*` it will sit on — in BOTH themes.
2. "Muted" does not mean "invisible." `text_fg_muted` must still meet 4.5:1 against its typical background.
3. When a token is used as text on a colored background (e.g., selected chip text on an accent background), verify contrast for that specific pairing.
4. Dark mode: avoid pure white (#fff) — use off-white (#c7c7c7–#e5e7eb) to prevent halation.
5. Light mode: avoid pairing mid-grays as both foreground and background — they collapse into unreadable mush.
6. Add a `// CONTRAST:` comment to every text token documenting which surface it was verified against.
