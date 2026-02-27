---
name: Design Token System
description: Overview of the 2-layer design token architecture
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Design Token System Overview

## No Component Library — Token-Driven Code Generation

OEM deliberately has **no predefined component library**. All UI is synthesized by LLMs interpreting design tokens. Tokens like `cmp_btn_pri_*` prescribe the _design intent_ for a primary button — the LLM uses these to construct the button's styling in `trait.style()` calls. This token-driven approach allows any UI to be generated on demand without importing prebuilt components.

## Token Selection for Code Generation

When generating UI code, always search for the **most specific matching token** first and fall through the cascade:

```
1. cmp_  (component)  → Check first — buttons, inputs, cards, modals, etc.
2. sem_  (semantic)   → Fallback — colors, spacing, typography by purpose
3. inline style       → Absolute last resort for truly unique one-off values
```

### Decision Heuristic

When styling a UI element, identify its concept and search for matching tokens by prefix:

1. **Building a primary button?** → Search `cmp_btn_pri_*` first → fall back to `sem_*` for anything else
2. **Building a card?** → Search `cmp_cdl_*` first → fall back to `sem_*`
3. **Building a custom separator?** → No component token fits → use `sem_color_bdr_default` and `sem_spc_*`
4. **Truly unique one-off value?** → Inline style as last resort

## Architecture

The design token system uses two public layers. Each layer holds direct CSS values — no internal indirection layers exist.

## The 2 Layers

```
┌─────────────────────────────────────┐
│  2. COMPONENT (cmp_)                │ ← All UI parts: structure + styling
│     May reference: sem_             │
├─────────────────────────────────────┤
│  1. SEMANTIC (sem_)                 │ ← Purpose-based values
│     Holds direct CSS values         │
└─────────────────────────────────────┘
```

## Layer Details

### 1. Semantic (`sem_`)

[→ Full Documentation](./semantic.md)

Purpose-based design values that hold direct CSS values. Describes **what** a value is used for, not how it looks.

**Contains:**

- Colors (backgrounds, text, borders, states, interactive)
- Spacing (inline, stack, inset)
- Typography (display, headings, body, caption, overline, code)
- Radius (none to full)
- Shadows (none to 2xl, plus inner)
- Motion (duration, easing)
- Effects (focus ring, opacity states)

**Key principle:** Names describe purpose, not appearance

### 2. Component (`cmp_`)

[→ Full Documentation](./component.md)

All UI parts — both structural properties (sizes, spacing, radii) and visual/state properties (colors, shadows, transitions). This is the primary token layer for all generated UI code.

**Contains:**

- Button base properties (heights, padding, radius, font) and variants (primary, secondary, ghost, danger)
- Input, Checkbox, Radio, Switch, Badge, Avatar, Icon, Link, Divider, Spinner
- Card, Modal, Dropdown, Tooltip, Popover, Toast
- Navigation, Sidebar, Table, Tabs, Accordion
- Breadcrumb, Pagination
- Progress Bar, Slider
- Alert, Select

**Key principle:** Search here first for any recognized UI pattern

## Naming Conventions

### General Rules

- **Flat structure only** - No nested objects
- **snake_case** - All token names use snake_case
- **Prefixes** - Each layer has a unique 3-letter prefix
- **Minimum 3 letters** - Abbreviations are at least 3 letters (except `_x`, `_y`, `_sm`, `_md`, `_lg`, `_xl`)

### Common Abbreviations

#### Properties

- `bkg` = background
- `txt` = text
- `bdr` = border
- `pad` = padding
- `spc` = spacing
- `fnt` = font
- `siz` = size
- `wgt` = weight
- `hgt` = height
- `wdt` = width
- `rad` = radius
- `shd` = shadow
- `opac` = opacity
- `trn` = transition
- `dur` = duration
- `eas` = easing

#### States

- `hov` = hover
- `act` = active
- `dis` = disabled
- `foc` = focus
- `sel` = selected

#### Semantic Meanings

- `pri` = primary
- `sec` = secondary
- `ter` = tertiary
- `inv` = inverted
- `err` = error
- `suc` = success
- `wrn` = warning
- `inf` = info

#### UI Elements

- `btn` = button
- `inp` = input
- `chk` = checkbox
- `rad` = radio
- `swt` = switch
- `bdg` = badge
- `avt` = avatar
- `ico` = icon
- `lnk` = link
- `div` = divider
- `spn` = spinner
- `cdl` = card
- `mod` = modal
- `drp` = dropdown
- `tip` = tooltip
- `pop` = popover
- `tst` = toast
- `nav` = navigation
- `tbl` = table
- `acc` = accordion
- `brd` = breadcrumb
- `pgn` = pagination
- `prg` = progress
- `sldr` = slider
- `alt` = alert

## Token Reference Syntax

Component tokens may reference semantic tokens using the `{token_name}` syntax:

```typescript
// Semantic layer — direct CSS values
sem_color_interactive_pri: '#2563eb';
sem_rad_md: '0.375rem';

// Component layer — may reference sem_
cmp_btn_pri_bkg: '{sem_color_interactive_pri}';
cmp_btn_bdr_rad: '{sem_rad_md}';
```

## Usage Guidelines

### ✅ Do

- Search `cmp_` first for any recognized UI pattern
- Fall back to `sem_` when no component token fits
- Reference tokens using `{token_name}` syntax (cmp_ → sem_ only)
- Keep the structure flat (no nesting)
- Use consistent abbreviations

### ❌ Don't

- Hardcode hex values, rgb values, or pixel literals in `trait.style()` calls
- Invent token keys that don't exist in `DesignTokens`
- Create circular token references
- Mix naming conventions

## Type Safety

Both layers are TypeScript typed for compile-time validation:

```typescript
// Complete token set
export type DesignTokens = SemanticTokens & ComponentTokens;
```

## Benefits of This System

### 1. **Simplicity**

Two layers are easy to reason about — component tokens for UI parts, semantic tokens for purpose-based values.

### 2. **Consistency**

Shared semantic tokens ensure components look cohesive across the system.

### 3. **Theming**

Swap semantic values to create light/dark themes without touching component tokens.

### 4. **Type Safety**

TypeScript types catch invalid token references at compile time.

### 5. **Code Generation**

A flat, predictable cascade (`cmp_` → `sem_` → inline) is easy for LLMs to apply consistently.

## Getting Started

1. **Define semantics** — Establish purpose-based colors, spacing, typography, etc.
2. **Map components** — Define UI parts using semantic tokens and direct values
3. **Generate UI** — LLMs compose UI from tokens using the selection cascade (`cmp_` → `sem_` → inline)

## Example: Token Flow

```typescript
// SEMANTIC: Purpose-based value (direct CSS)
sem_color_interactive_pri: '#2563eb';
sem_rad_md: '0.375rem';
sem_spc_inset_md: '1rem';

// COMPONENT: UI part references semantics
cmp_btn_pri_bkg: '{sem_color_interactive_pri}';
cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}';
cmp_btn_pri_txt_color: '{sem_color_txt_inv}';
cmp_btn_bdr_rad: '{sem_rad_md}';
cmp_btn_hgt_md: '2.5rem';
cmp_btn_pad_x_md: '{sem_spc_inset_md}';
```

## Further Reading

- [Semantic Documentation](./semantic.md)
- [Component Documentation](./component.md)
