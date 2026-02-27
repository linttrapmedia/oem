---
name: Semantic Tokens
description: Purpose-based tokens that assign meaning to design values
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Semantic Tokens (Layer 3)

**Prefix:** `sem_`

## Overview

Semantic tokens assign meaning to design values. They translate raw primitives and expression controls into purposeful, context-aware tokens that describe **what** a value is used for, not **how** it looks.

## Purpose

- Provide meaningful names that describe usage (e.g., `sem_color_txt_pri` vs `pmt_color_gray_900`)
- Enable theme switching (light/dark) by mapping semantic meanings to different primitives
- Create consistency across components through shared semantic values
- Decouple visual appearance from functional purpose

## Architecture Rules

- **May reference**: Primitives (Layer 1) and Expression (Layer 2)
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Semantic naming** - Names describe purpose, not appearance

## Token Categories

### Semantic Colors

#### Backgrounds

- `sem_color_bkg_pri` - Primary background (main canvas)
- `sem_color_bkg_sec` - Secondary background (cards, panels)
- `sem_color_bkg_ter` - Tertiary background (nested elements)
- `sem_color_bkg_inv` - Inverted background (dark on light theme)
- `sem_color_bkg_overlay` - Modal/overlay backgrounds
- `sem_color_bkg_elevated` - Elevated surfaces (raised cards)
- `sem_color_bkg_sunken` - Sunken surfaces (wells, inputs)

#### Text

- `sem_color_txt_pri` - Primary text (body copy, headings)
- `sem_color_txt_sec` - Secondary text (supporting information)
- `sem_color_txt_ter` - Tertiary text (captions, metadata)
- `sem_color_txt_inv` - Inverted text (light on dark)
- `sem_color_txt_dis` - Disabled text
- `sem_color_txt_placeholder` - Input placeholder text
- `sem_color_txt_lnk` - Link text default
- `sem_color_txt_lnk_hov` - Link text on hover

#### Borders

- `sem_color_bdr_default` - Standard border
- `sem_color_bdr_str` - Strong/emphasized border
- `sem_color_bdr_sub` - Subtle/de-emphasized border
- `sem_color_bdr_inv` - Inverted border
- `sem_color_bdr_dis` - Disabled border
- `sem_color_bdr_foc` - Focus ring border

#### States

Organized by state type (error, success, warning, info):

- Background: `sem_color_state_err_bkg`, `sem_color_state_suc_bkg`, etc.
- Border: `sem_color_state_err_bdr`, `sem_color_state_wrn_bdr`, etc.
- Text: `sem_color_state_err_txt`, `sem_color_state_inf_txt`, etc.
- Base: `sem_color_state_err`, `sem_color_state_suc`, etc.

#### Interactive

Primary, secondary, and accent interactive states:

- Base, hover, active, disabled variants for each
- Example: `sem_color_interactive_pri`, `sem_color_interactive_pri_hov`, `sem_color_interactive_pri_act`

### Semantic Spacing

#### Inline Spacing (horizontal)

- Five sizes: `sem_spc_inline_xs` through `sem_spc_inline_xl`
- Used for gaps between inline elements (buttons, badges, etc.)

#### Stack Spacing (vertical)

- Six sizes: `sem_spc_stack_xs` through `sem_spc_stack_2xl`
- Used for vertical spacing between stacked elements

#### Inset Spacing (padding)

- Five sizes: `sem_spc_inset_xs` through `sem_spc_inset_xl`
- Used for internal padding within components

### Semantic Typography

Complete type scale with size, weight, line height, and letter spacing:

#### Display Text

- Large, medium, small variants
- Example: `sem_typo_display_lrg_siz`, `sem_typo_display_lrg_wgt`, `sem_typo_display_lrg_lnh`

#### Headings

- Four levels: XL, LG, MD, SM
- Each with size, weight, and line height tokens

#### Body Text

- Three sizes: LG, MD, SM
- Each with size, weight, and line height tokens

#### Caption & Overline

- Specialized text styles for small annotations
- Overline includes letter spacing for uppercase text

#### Code

- Monospace font family, size, and weight

### Semantic Radius

Six border radius options from `sem_rad_none` to `sem_rad_full`

### Semantic Shadows

Seven shadow depths:

- `sem_shd_none` through `sem_shd_2xl`
- `sem_shd_inner` for inset shadows

### Semantic Motion

#### Duration

- Four speeds: `instant`, `fast`, `normal`, `slow`
- Respects expression layer motion energy settings

#### Easing

- Four curves: `std`, `accelerate`, `decelerate`, `bounce`

### Semantic Effects

#### Focus Ring

- Width, color, offset, style for focus indicators
- Example: `sem_effect_foc_ring_wdt`, `sem_effect_foc_ring_color`

#### State Effects

- Disabled opacity: `sem_effect_dis_opac`
- Hover opacity: `sem_effect_hov_opac`

## Usage Guidelines

### ✅ Do

- Use semantic tokens in element, component, and feature layers
- Name tokens by purpose (what they do) not appearance (what they look like)
- Map semantic tokens to different primitives for theme variants
- Group related tokens logically (all text colors together)

### ❌ Don't

- Use primitives directly in components (use semantic tokens instead)
- Name tokens by their visual appearance (`sem_color_dark_gray` ❌, use `sem_color_txt_sec` ✅)
- Skip semantic layer and go straight from expression to element
- Reference higher layers (component/feature)

## Theme Switching Example

Semantic tokens enable easy theme switching:

```typescript
// Light theme
sem_color_bkg_pri: '{pmt_color_white}';
sem_color_txt_pri: '{pmt_color_gray_900}';
sem_color_bdr_default: '{pmt_color_gray_200}';

// Dark theme - same semantic names, different primitives
sem_color_bkg_pri: '{pmt_color_gray_900}';
sem_color_txt_pri: '{pmt_color_gray_50}';
sem_color_bdr_default: '{pmt_color_gray_700}';
```

## Semantic Naming Philosophy

**Bad (appearance-based):**

- `sem_color_light_blue`
- `sem_spc_16px`
- `sem_typo_20px_bold`

**Good (purpose-based):**

- `sem_color_interactive_pri`
- `sem_spc_inset_md`
- `sem_typo_heading_lg_siz`

## Related Layers

- **References**: Primitives (Layer 1), Expression (Layer 2)
- **Referenced by**: Element (Layer 4), Component (Layer 5), Feature (Layer 6)

## Usage in Generated Code

Semantic tokens are the **fallback layer** for generated UI code. Use them only when no `elm_` or `cmp_` token matches the UI need:

- Styling a custom divider with no matching `elm_` token? Use `sem_color_bdr_default` and `sem_spc_*`.
- Need a background for a bespoke layout? Use `sem_color_bkg_pri` or `sem_color_bkg_sec`.
- Need typography for body text outside a component? Use `sem_typo_body_md_*`.

**Token selection cascade:** `ftr_` → `cmp_` → `elm_` → **`sem_`** → inline style

> Semantic tokens sit at position 4 in the cascade. Always check for a more specific `ftr_`, `cmp_`, or `elm_` token before reaching for `sem_` tokens.
