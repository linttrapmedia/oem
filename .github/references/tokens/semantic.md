---
name: Semantic Tokens
description: Purpose-based tokens that assign meaning to design values
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Semantic Tokens (Layer 1)

**Prefix:** `sem_`

## Overview

Semantic tokens hold direct CSS values organized by purpose. They describe **what** a value is used for, not **how** it looks — enabling theme switching without touching any UI code.

## Purpose

- Provide meaningful names that describe usage (e.g., `sem_color_txt_pri` vs `'#171717'`)
- Enable theme switching (light/dark) by mapping semantic meanings to different CSS values
- Create consistency across components through shared semantic values
- Decouple visual appearance from functional purpose

## Architecture Rules

- **Holds direct CSS values** - No references to other token layers
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

- Use semantic tokens in component tokens via `{sem_token}` references
- Use semantic tokens directly in UI when no component token fits
- Name tokens by purpose (what they do) not appearance (what they look like)
- Group related tokens logically (all text colors together)

### ❌ Don't

- Hardcode hex values, rgb values, or pixel literals in `trait.style()` calls when a token exists
- Name tokens by their visual appearance (`sem_color_dark_gray` ❌, use `sem_color_txt_sec` ✅)
- Invent semantic token keys that don't exist in `SemanticTokens`

## Theme Switching Example

Semantic tokens enable easy theme switching by holding different CSS values per theme:

```typescript
// Light theme — sem_ tokens hold CSS values directly
sem_color_bkg_pri: '#ffffff';
sem_color_txt_pri: '#171717';
sem_color_bdr_default: '#e5e5e5';

// Dark theme — same semantic names, different values
sem_color_bkg_pri: '#0a0a0a';
sem_color_txt_pri: '#fafafa';
sem_color_bdr_default: '#404040';
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

## Usage in Generated Code

Semantic tokens are the **fallback layer** for generated UI code. Use them when no `cmp_` token matches the UI need:

- Styling a custom divider with no matching `cmp_` token? Use `sem_color_bdr_default` and `sem_spc_*`.
- Need a background for a bespoke layout? Use `sem_color_bkg_pri` or `sem_color_bkg_sec`.
- Need typography for body text outside a component? Use `sem_typo_body_md_*`.

**Token selection cascade:** `cmp_` → **`sem_`** → inline style

> Semantic tokens sit at position 2 in the cascade. Always check for a more specific `cmp_` token before reaching for `sem_` tokens.
