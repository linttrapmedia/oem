---
name: Design Token System
description: Overview of the 6-layer design token architecture
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Design Token System Overview

## Architecture

This design token system uses a strict 6-layer hierarchy where each layer can only reference layers below it. This creates a unidirectional dependency flow that prevents circular references and maintains system integrity.

## The 6 Layers

```
┌─────────────────────────────────────┐
│  6. FEATURE (ftr_)                  │ ← Product-specific overrides
│     May reference: any layer        │
├─────────────────────────────────────┤
│  5. COMPONENT (cmp_)                │ ← Complete component styling
│     May reference: 1-4              │
├─────────────────────────────────────┤
│  4. ELEMENT (elm_)                  │ ← Atomic UI parts
│     May reference: 1-3              │
├─────────────────────────────────────┤
│  3. SEMANTIC (sem_)                 │ ← UI meaning & purpose
│     May reference: 1-2              │
├─────────────────────────────────────┤
│  2. EXPRESSION (exp_)               │ ← Global personality
│     May reference: 1                │
├─────────────────────────────────────┤
│  1. PRIMITIVES (pmt_)               │ ← Raw values (no references)
│     May reference: none             │
└─────────────────────────────────────┘
```

## Layer Details

### 1. Primitives (`pmt_`)
[→ Full Documentation](./primitives.md)

Raw, measurable design values with no references to other tokens.

**Contains:**
- Color palettes (grays, blues, greens, reds, yellows, purples)
- Spacing scale (0-32)
- Typography (families, sizes, weights, line heights, letter spacing)
- Border radius (0-full)
- Border widths
- Opacity levels
- Animation durations
- Easing functions
- Z-index layers

**Key principle:** No token references, only literal values

### 2. Expression (`exp_`)
[→ Full Documentation](./expression.md)

Global personality controls that affect the entire system.

**Contains:**
- Motion energy (animation speed: low/med/high)
- Density (spacing tightness: compact/comfortable/spacious)
- Roundness (border radius style: sharp/moderate/soft)
- Elevation (shadow intensity: flat/raised/floating)
- Contrast (color contrast: low/med/high)

**Key principle:** Each category has 3 options + 1 active reference

### 3. Semantic (`sem_`)
[→ Full Documentation](./semantic.md)

Assigns meaning to design values - describes **what** not **how**.

**Contains:**
- Colors (backgrounds, text, borders, states, interactive)
- Spacing (inline, stack, inset)
- Typography (display, headings, body, caption, overline, code)
- Radius (none to full)
- Shadows (none to 2xl, plus inner)
- Motion (duration, easing)
- Effects (focus ring, opacity states)

**Key principle:** Names describe purpose, not appearance

### 4. Element (`elm_`)
[→ Full Documentation](./element.md)

Atomic UI building blocks - the smallest interactive pieces.

**Contains:**
- Button (sizes, padding, borders, transitions)
- Input (sizes, borders, colors, states)
- Checkbox/Radio (sizes, colors, states)
- Switch (sizes, colors, animation)
- Badge (sizes, styling)
- Avatar (sizes, styling)
- Icon (sizes, colors by context)
- Link (colors, decoration, states)
- Divider (width, colors, spacing)
- Spinner (sizes, colors, animation)

**Key principle:** Generic, reusable element properties

### 5. Component (`cmp_`)
[→ Full Documentation](./component.md)

Complete design system components with variants and states.

**Contains:**
- Buttons (primary, secondary, ghost, danger)
- Card, Modal, Dropdown, Tooltip, Popover, Toast
- Navigation, Sidebar, Table, Tabs, Accordion
- Breadcrumb, Pagination
- Progress Bar, Slider
- Alert, Select

**Key principle:** Fully-styled components ready for production

### 6. Feature (`ftr_`)
[→ Full Documentation](./feature.md)

Product-level overrides for specific features or flows.

**Contains:**
- Checkout (CTA, progress, trust badges)
- Dashboard (widgets, charts, stats)
- Settings (sections, danger zone)
- Auth (cards, social buttons, links)
- Onboarding (progress, steps, highlights)
- Profile (header, avatar, badges)
- Messaging (bubbles, input, timestamps)
- Search (overlay, results, highlights)

**Key principle:** Contextual overrides, use sparingly

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

Tokens reference other tokens using the `{token_name}` syntax:

```typescript
// Correct reference syntax
pmt_color_blue_500: '#3B82F6'              // Literal value
sem_color_interactive_pri: '{pmt_color_blue_500}'  // References primitive
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'     // References semantic
```

## Usage Guidelines

### ✅ Do

- Follow the layer hierarchy strictly (only reference lower layers)
- Use semantic names that describe purpose, not appearance
- Reference tokens using `{token_name}` syntax
- Keep the structure flat (no nesting)
- Use consistent abbreviations

### ❌ Don't

- Reference tokens from higher layers (creates circular dependencies)
- Use arbitrary values outside the defined scales
- Create deeply nested structures
- Mix naming conventions
- Use appearance-based names in semantic+ layers

## Type Safety

All layers are TypeScript typed for compile-time validation:

```typescript
export type DesignTokens =
  PrimitiveTokens &
  ExpressionTokens &
  SemanticTokens &
  ElementTokens &
  ComponentTokens &
  FeatureTokens;
```

## Benefits of This System

### 1. **Maintainability**
Change a primitive, and all references update automatically through the hierarchy.

### 2. **Consistency**
Shared semantic tokens ensure components look cohesive.

### 3. **Theming**
Change semantic mappings to create light/dark themes without touching components.

### 4. **Scalability**
Add new components without modifying foundation layers.

### 5. **Type Safety**
TypeScript types catch invalid token references at compile time.

### 6. **Documentation**
Clear layer separation makes the system self-documenting.

### 7. **Flexibility**
Feature layer allows product-specific overrides without breaking the system.

## Getting Started

1. **Define primitives** - Establish your raw design values
2. **Set expression** - Choose your design personality settings
3. **Map semantics** - Assign meaning to your primitives
4. **Create elements** - Build atomic UI parts
5. **Compose components** - Combine elements into full components
6. **Add features** - Only add feature tokens when necessary for context-specific overrides

## Example: Complete Token Flow

```typescript
// 1. PRIMITIVE: Raw value
pmt_color_blue_600: '#2563EB'
pmt_spc_4: '1rem'
pmt_rad_6: '0.375rem'

// 2. EXPRESSION: Personality control
exp_roundness_moderate: '{pmt_rad_6}'
exp_roundness_act: '{exp_roundness_moderate}'

// 3. SEMANTIC: Meaning
sem_color_interactive_pri: '{pmt_color_blue_600}'
sem_rad_md: '{exp_roundness_act}'
sem_spc_inset_md: '{pmt_spc_4}'

// 4. ELEMENT: Atomic part
elm_btn_bdr_rad: '{sem_rad_md}'
elm_btn_pad_x_md: '{sem_spc_inset_md}'

// 5. COMPONENT: Full component
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'
// Inherits elm_btn_bdr_rad and elm_btn_pad_x_md

// 6. FEATURE: Contextual override (optional)
ftr_checkout_cta_bkg: '{pmt_color_green_600}' // Override for conversion
```

## Further Reading

- [Primitives Documentation](./primitives.md)
- [Expression Documentation](./expression.md)
- [Semantic Documentation](./semantic.md)
- [Element Documentation](./element.md)
- [Component Documentation](./component.md)
- [Feature Documentation](./feature.md)
