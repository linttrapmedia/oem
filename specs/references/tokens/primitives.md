---
name: Primitives Tokens
description: Foundation layer containing raw design values with no references
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Primitives Tokens (Layer 1)

**Prefix:** `pmt_`

> **⚠ Internal Layer — Do Not Use in UI Code**
>
> Primitive tokens exist solely to feed the Expression and Semantic layers.
> They must **never** be referenced in `trait.style()` calls or any generated
> UI code. Use semantic (`sem_`), element (`elm_`), component (`cmp_`), or
> feature (`ftr_`) tokens instead.

## Overview

Primitives are the foundation layer of the design token system. They contain raw, measurable values with **no references to other tokens**. These are the atomic building blocks that all other layers build upon.

## Purpose

- Define the complete palette of available values
- Establish consistent scales for all design properties
- Provide the base values that higher layers reference
- Ensure design constraints are maintained at the lowest level

## Architecture Rules

- **No references allowed** - All values must be literal (strings or numbers)
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Type-safe values** - `string | number` for maximum flexibility

## Token Categories

### Color Palette

Complete color scales for theming:

- **Base colors**: `pmt_color_black`, `pmt_color_white`
- **Grays**: 11 shades from `pmt_color_gray_50` to `pmt_color_gray_950`
- **Blues (Primary)**: 11 shades from `pmt_color_blue_50` to `pmt_color_blue_950`
- **Greens (Success)**: 9 shades from `pmt_color_green_50` to `pmt_color_green_900`
- **Reds (Error/Danger)**: 9 shades from `pmt_color_red_50` to `pmt_color_red_900`
- **Yellows (Warning)**: 9 shades from `pmt_color_yellow_50` to `pmt_color_yellow_900`
- **Purples (Accent)**: 9 shades from `pmt_color_purple_50` to `pmt_color_purple_900`

### Spacing Scale

T-shirt sizing with pixel/rem equivalents:

- `pmt_spc_0` through `pmt_spc_32`
- Examples: `pmt_spc_4` = 1rem/16px, `pmt_spc_8` = 2rem/32px

### Typography

#### Font Families

- `pmt_fnt_family_sans`, `pmt_fnt_family_serif`, `pmt_fnt_family_mono`

#### Font Sizes

- Range: `pmt_fnt_siz_10` (0.625rem) to `pmt_fnt_siz_72` (4.5rem)

#### Font Weights

- Nine weights from `pmt_fnt_wgt_thin` (100) to `pmt_fnt_wgt_black` (900)

#### Line Heights

- Five options: `pmt_lnh_tight` (1.25) to `pmt_lnh_loose` (2)

#### Letter Spacing

- Six options: `pmt_lsp_tighter` (-0.05em) to `pmt_lsp_widest` (0.1em)

### Border Radius

- Ten options from `pmt_rad_0` to `pmt_rad_24`, plus `pmt_rad_full`

### Border Width

- Five options from `pmt_bdr_wdt_0` to `pmt_bdr_wdt_8`

### Opacity

- Thirteen levels from `pmt_opac_0` to `pmt_opac_100` in increments

### Duration (Animation Timing)

- Seven speeds from `pmt_dur_instant` (0ms) to `pmt_dur_slowest` (1000ms)

### Easing Functions

- Seven cubic-bezier curves: linear, in, out, in-out, and back variants

### Z-Index

- Layering system with standard levels (0-50) and special UI layers:
  - `pmt_zix_mod` (modal: 1000)
  - `pmt_zix_pop` (popover: 1100)
  - `pmt_zix_tip` (tooltip: 1200)
  - `pmt_zix_tst` (toast: 1300)

## Usage Guidelines

### ✅ Do

- Use primitives when defining theme values
- Reference primitives from expression and semantic layers
- Keep values literal and measurable
- Maintain consistent scales

### ❌ Don't

- Reference other tokens within primitives
- Use arbitrary values outside the defined scales
- Nest objects or create hierarchies
- Mix naming conventions

## Examples

```typescript
// ✅ Correct primitive definitions
pmt_color_blue_500: '#3B82F6';
pmt_spc_4: '1rem';
pmt_fnt_wgt_bold: 700;
pmt_dur_normal: '200ms';

// ❌ Incorrect - no references allowed in primitives
pmt_color_primary: '{pmt_color_blue_500}'; // NO!
```

## Related Layers

- **Referenced by**: Expression (Layer 2), Semantic (Layer 3)
- **References**: None (foundation layer)
