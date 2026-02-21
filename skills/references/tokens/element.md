---
name: Element Tokens
description: Atomic UI building blocks for reusable design system elements
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Element Tokens (Layer 4)

**Prefix:** `elm_`

## Overview

Element tokens define the visual properties of atomic UI parts - the smallest interactive building blocks of your design system. Elements are generic, reusable pieces that can be composed into larger components.

## Purpose

- Provide base styling for atomic UI elements
- Establish consistent sizes, spacing, and visual treatment across primitive controls
- Enable element-level customization without affecting higher-level components
- Serve as building blocks for component layer

## Architecture Rules

- **May reference**: Semantic (Layer 3), Primitives (Layer 1), Expression (Layer 2)
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Element-focused naming** - Names describe the UI element type

## Token Categories

### Button Element

Base button properties that apply to all button variants:

#### Sizes
- Heights: `elm_btn_hgt_sm`, `elm_btn_hgt_md`, `elm_btn_hgt_lg`
- Horizontal padding: `elm_btn_pad_x_sm`, `elm_btn_pad_x_md`, `elm_btn_pad_x_lg`
- Font sizes: `elm_btn_fnt_siz_sm`, `elm_btn_fnt_siz_md`, `elm_btn_fnt_siz_lg`

#### Styling
- `elm_btn_fnt_wgt` - Font weight
- `elm_btn_bdr_wdt` - Border width
- `elm_btn_bdr_rad` - Border radius
- `elm_btn_gap` - Gap between icon and text

#### Transitions
- `elm_btn_trn_dur` - Transition duration
- `elm_btn_trn_eas` - Transition easing

### Input Element

Text input field properties:

#### Sizes
- Heights: `elm_inp_hgt_sm`, `elm_inp_hgt_md`, `elm_inp_hgt_lg`
- Horizontal padding: `elm_inp_pad_x_sm`, `elm_inp_pad_x_md`, `elm_inp_pad_x_lg`
- Font sizes: `elm_inp_fnt_siz_sm`, `elm_inp_fnt_siz_md`, `elm_inp_fnt_siz_lg`

#### Border States
- `elm_inp_bdr_wdt` - Border width
- `elm_inp_bdr_rad` - Border radius
- `elm_inp_bdr_color` - Default border
- `elm_inp_bdr_color_hov` - Hover state
- `elm_inp_bdr_color_foc` - Focus state
- `elm_inp_bdr_color_err` - Error state

#### Colors
- `elm_inp_bkg` - Background
- `elm_inp_bkg_dis` - Disabled background
- `elm_inp_txt_color` - Text color
- `elm_inp_txt_color_dis` - Disabled text
- `elm_inp_placeholder_color` - Placeholder text

#### Animation
- `elm_inp_trn_dur` - Transition duration

### Checkbox/Radio Element

Checkbox and radio button properties:

#### Sizes
- `elm_chk_siz_sm`, `elm_chk_siz_md`, `elm_chk_siz_lg`

#### Styling
- `elm_chk_bdr_wdt` - Border width
- `elm_chk_bdr_rad` - Border radius (checkbox)
- `elm_rad_bdr_rad` - Border radius (radio, typically circular)
- `elm_chk_bdr_color` - Unchecked border
- `elm_chk_bdr_color_chk` - Checked border

#### States
- `elm_chk_bkg` - Unchecked background
- `elm_chk_bkg_chk` - Checked background
- `elm_chk_checkmark_color` - Checkmark color

### Switch Element

Toggle switch properties:

#### Sizes
- Width: `elm_swt_wdt_sm`, `elm_swt_wdt_md`, `elm_swt_wdt_lg`
- Height: `elm_swt_hgt_sm`, `elm_swt_hgt_md`, `elm_swt_hgt_lg`
- Thumb size: `elm_swt_thumb_siz_sm`, `elm_swt_thumb_siz_md`, `elm_swt_thumb_siz_lg`

#### Colors
- `elm_swt_bkg` - Unchecked background
- `elm_swt_bkg_chk` - Checked background
- `elm_swt_thumb_color` - Thumb color

#### Styling
- `elm_swt_bdr_rad` - Border radius
- `elm_swt_trn_dur` - Transition duration

### Badge Element

Small status/count indicators:

#### Sizes
- Horizontal padding: `elm_bdg_pad_x_sm`, `elm_bdg_pad_x_md`
- Vertical padding: `elm_bdg_pad_y_sm`, `elm_bdg_pad_y_md`
- Font sizes: `elm_bdg_fnt_siz_sm`, `elm_bdg_fnt_siz_md`

#### Styling
- `elm_bdg_fnt_wgt` - Font weight
- `elm_bdg_bdr_rad` - Border radius
- `elm_bdg_bdr_wdt` - Border width

### Avatar Element

User avatar/profile picture properties:

#### Sizes
- Six sizes from `elm_avt_siz_xs` to `elm_avt_siz_2xl`

#### Styling
- `elm_avt_bdr_rad` - Border radius
- `elm_avt_bdr_wdt` - Border width
- `elm_avt_bdr_color` - Border color
- `elm_avt_bkg` - Background (for initials)
- `elm_avt_txt_color` - Text color (for initials)

### Icon Element

Icon display properties:

#### Sizes
- Six sizes from `elm_ico_siz_xs` to `elm_ico_siz_2xl`

#### Colors by Context
- `elm_ico_color_default` - Default icon
- `elm_ico_color_muted` - De-emphasized icon
- `elm_ico_color_pri` - Primary/brand icon
- `elm_ico_color_suc` - Success state
- `elm_ico_color_wrn` - Warning state
- `elm_ico_color_err` - Error state

### Link Element

Hyperlink properties:

- `elm_lnk_color` - Default link color
- `elm_lnk_color_hov` - Hover color
- `elm_lnk_color_vis` - Visited link color
- `elm_lnk_txt_decoration` - Default decoration (underline, none, etc.)
- `elm_lnk_txt_decoration_hov` - Hover decoration
- `elm_lnk_fnt_wgt` - Font weight

### Divider Element

Horizontal/vertical rule properties:

- `elm_div_wdt` - Line width
- `elm_div_color` - Default color
- `elm_div_color_str` - Strong/emphasized color
- `elm_div_spc` - Spacing around divider

### Spinner Element

Loading spinner properties:

#### Sizes
- `elm_spn_siz_sm`, `elm_spn_siz_md`, `elm_spn_siz_lg`

#### Styling
- `elm_spn_color` - Spinner color
- `elm_spn_track_color` - Track/background color
- `elm_spn_bdr_wdt` - Spinner stroke width
- `elm_spn_dur` - Rotation duration

## Usage Guidelines

### ✅ Do

- Use element tokens as the foundation for component variants
- Apply consistent sizing scales across related elements
- Reference semantic tokens for colors and spacing
- Define reusable element properties that span multiple components

### ❌ Don't

- Create element tokens for component-specific variations (use component layer)
- Hardcode primitive values (reference through semantic layer)
- Create overly specific element tokens that only apply to one component
- Mix element and component concerns

## Relationship Between Layers

```
Element Layer → Component Layer
Example:
elm_btn_hgt_md → cmp_btn_pri_* (uses button element sizes)
elm_btn_bdr_rad → cmp_btn_sec_* (uses button element radius)
```

## Examples

```typescript
// ✅ Correct element usage
elm_btn_hgt_md: '{sem_spc_inset_md}'
elm_btn_bdr_rad: '{sem_rad_md}'
elm_btn_fnt_siz_md: '{sem_typo_body_md_siz}'

// Used in component layer
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'
// Inherits height from element layer
// Component uses elm_btn_hgt_md implicitly

// ❌ Incorrect - references primitive directly
elm_btn_bdr_rad: '{pmt_rad_8}' // Should reference semantic
```

## Element vs Component

**Element tokens** define the base properties shared across variants:
- Button height, padding, font size (applies to all buttons)
- Input border width, radius (applies to all inputs)

**Component tokens** define variant-specific styling:
- Primary button background color
- Secondary button border color
- Ghost button hover state

## Related Layers

- **References**: Semantic (Layer 3), Expression (Layer 2), Primitives (Layer 1)
- **Referenced by**: Component (Layer 5), Feature (Layer 6)
- **Implicit usage**: Components inherit element properties as defaults
