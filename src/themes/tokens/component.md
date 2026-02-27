---
name: Component Tokens
description: Complete component definitions with variants and interactive states
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Component Tokens (Layer 2)

**Prefix:** `cmp_`

## Overview

Component tokens cover all UI parts — both structural properties (heights, padding, radii, border widths) and visual/state properties (colors, shadows, transitions). This is a unified layer: there is no separate "element" or "feature" layer. Everything that describes a specific UI part lives under `cmp_`.

## Purpose

- Define structural properties for UI elements (sizes, radii, padding, border widths)
- Provide complete styling for component variants (primary, secondary, ghost, danger)
- Specify all interactive states (hover, active, disabled, focus)
- Enable component-level theming and customization
- Establish consistency across the entire UI

## Architecture Rules

- **May reference**: Semantic (Layer 1) via `{sem_token}` syntax
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Component-focused naming** - Names describe the specific component part and variant

## Token Categories

### Button (`cmp_btn_*`)

#### Base Properties

Shared across all button variants:

- Heights: `cmp_btn_hgt_sm`, `cmp_btn_hgt_md`, `cmp_btn_hgt_lg`
- Font: `cmp_btn_fnt_wgt`, `cmp_btn_fnt_siz_sm/md/lg`
- Border: `cmp_btn_bdr_wdt`, `cmp_btn_bdr_rad`
- Layout: `cmp_btn_gap`, `cmp_btn_pad_x_sm/md/lg`
- Transition: `cmp_btn_trn_dur`, `cmp_btn_trn_eas`

#### Primary Button (`cmp_btn_pri_*`)

High-emphasis action button:

- Background states: default, hover, active, disabled
- Text colors: default and disabled
- Border color
- Shadows: default and hover

#### Secondary Button (`cmp_btn_sec_*`)

Medium-emphasis action button:

- Background states: default, hover, active, disabled
- Text colors: default and disabled
- Border colors: default and hover

#### Ghost Button (`cmp_btn_gho_*`)

Low-emphasis action button:

- Background states: default, hover, active
- Text colors: default and hover

#### Danger Button (`cmp_btn_dng_*`)

Destructive action button:

- Background states: default, hover, active
- Text color
- Border color

### Input (`cmp_inp_*`)

Form text inputs:

- Heights: `cmp_inp_hgt_sm`, `cmp_inp_hgt_md`, `cmp_inp_hgt_lg`
- Font: `cmp_inp_fnt_siz_sm/md/lg`
- Border: `cmp_inp_bdr_wdt`, `cmp_inp_bdr_rad`
- Colors: `cmp_inp_bkg`, `cmp_inp_txt_color`, `cmp_inp_bdr_color`
- States: focus border color, disabled background, disabled text color, placeholder color
- Padding: `cmp_inp_pad_x`

### Checkbox (`cmp_chk_*`)

Checkbox input control:

- Size: `cmp_chk_siz_sm`, `cmp_chk_siz_md`
- Border: `cmp_chk_bdr_wdt`, `cmp_chk_bdr_rad`
- Colors: border (default, checked, focus), background (default, checked), checkmark color

### Radio (`cmp_rad_*`)

Radio button control:

- Size: `cmp_rad_siz_sm`, `cmp_rad_siz_md`
- Border: `cmp_rad_bdr_wdt`
- Colors: border (default, selected, focus), background (default, selected), dot color

### Switch (`cmp_swt_*`)

Toggle switch control:

- Dimensions: width, height (sm/md)
- Background states: off, on, disabled
- Thumb: size, background, shadow
- Transition: `cmp_swt_trn_dur`

### Badge (`cmp_bdg_*`)

Small status or count indicator:

- Heights: `cmp_bdg_hgt_sm`, `cmp_bdg_hgt_md`
- Padding: `cmp_bdg_pad_x_sm/md`
- Font: `cmp_bdg_fnt_siz_sm/md`, `cmp_bdg_fnt_wgt`
- Border: `cmp_bdg_bdr_rad`

### Avatar (`cmp_avt_*`)

User avatar / profile image:

- Sizes: `cmp_avt_siz_sm/md/lg/xl`
- Border: `cmp_avt_bdr_rad`, `cmp_avt_bdr_wdt`, `cmp_avt_bdr_color`
- Font: `cmp_avt_fnt_siz_sm/md/lg/xl`, `cmp_avt_fnt_wgt`

### Icon (`cmp_ico_*`)

Icon size tokens:

- Sizes: `cmp_ico_siz_xs/sm/md/lg/xl`
- Colors by context: `cmp_ico_color_default/muted/action/err/suc/wrn`

### Link (`cmp_lnk_*`)

Anchor / hyperlink styling:

- Colors: default, hover, visited, active, focus
- Decoration: default and hover

### Divider (`cmp_div_*`)

Horizontal or vertical separator:

- Width (thickness): `cmp_div_wdt`
- Colors: default and subtle
- Spacing: `cmp_div_mar`

### Spinner (`cmp_spn_*`)

Loading spinner animation:

- Sizes: `cmp_spn_siz_sm/md/lg`
- Border width: `cmp_spn_bdr_wdt`
- Colors: default and track
- Animation: `cmp_spn_dur`

### Card (`cmp_cdl_*`)

Container for related content:

- `cmp_cdl_bkg` - Background
- `cmp_cdl_bdr_color`, `cmp_cdl_bdr_wdt`, `cmp_cdl_bdr_rad` - Border properties
- `cmp_cdl_pad` - Overall padding
- `cmp_cdl_shd`, `cmp_cdl_shd_hov` - Shadow states
- Section padding: `cmp_cdl_header_pad`, `cmp_cdl_body_pad`, `cmp_cdl_footer_pad`
- `cmp_cdl_gap` - Gap between sections

### Modal (`cmp_mod_*`)

Dialog overlay pattern:

#### Container

- `cmp_mod_bkg` - Modal background
- `cmp_mod_bdr_rad` - Border radius
- `cmp_mod_shd` - Shadow
- Max widths: `cmp_mod_max_wdt_sm` through `cmp_mod_max_wdt_xl`

#### Overlay

- `cmp_mod_overlay_bkg` - Backdrop color
- `cmp_mod_overlay_opac` - Backdrop opacity
- `cmp_mod_overlay_blur` - Backdrop blur

#### Layout

- Section padding: header, body, footer
- `cmp_mod_gap` - Gap between sections

#### Close Button

- `cmp_mod_close_siz` - Close button size
- `cmp_mod_close_color`, `cmp_mod_close_color_hov` - Close button colors

#### Animation

- Enter/exit durations and easing functions

### Dropdown (`cmp_drp_*`)

Dropdown menu pattern:

#### Container

- Background, border, shadow
- `cmp_drp_pad` - Internal padding
- `cmp_drp_max_hgt` - Maximum height (for scrolling)

#### Items

- Padding: `cmp_drp_item_pad_x`, `cmp_drp_item_pad_y`
- Background states: hover, active
- Text colors: default, active
- `cmp_drp_item_bdr_rad` - Item border radius

#### Divider

- `cmp_drp_divider_color` - Divider color
- `cmp_drp_divider_mar` - Divider margin

### Tooltip (`cmp_tip_*`)

Contextual information overlay:

- Background and text color
- Padding (x and y)
- Font size
- Border radius, shadow
- `cmp_tip_max_wdt` - Maximum width
- `cmp_tip_arrow_siz` - Arrow size
- `cmp_tip_off` - Offset from trigger
- Enter/exit animation durations

### Popover (`cmp_pop_*`)

Larger contextual overlay:

- Background, border, shadow
- `cmp_pop_pad` - Internal padding
- `cmp_pop_max_wdt` - Maximum width
- Arrow and offset properties

### Toast (`cmp_tst_*`)

Notification message pattern:

#### Base

- Background, border radius, shadow
- Padding, max width, gap

#### Variants by State

Each state (success, error, warning, info) has:

- Background color
- Border color
- Icon color

#### Animation

- Enter/exit durations

### Navigation (`cmp_nav_*`)

Top navigation bar:

#### Container

- Background, border, height
- Padding, shadow

#### Nav Items

- Padding (x and y), gap
- Text colors: default, hover, active
- Background states: hover, active
- Border radius
- Font weights: default and active

#### Active Indicator

- Height and color for active tab indicator

### Sidebar (`cmp_sidebar_*`)

Side navigation panel:

#### Container

- Widths: expanded and collapsed
- Background, border
- Padding

#### Sidebar Items

- Padding, gap, icon size
- Text colors and backgrounds (default, hover, active)
- Border radius

#### Animation

- `cmp_sidebar_trn_dur` - Transition duration for expand/collapse

### Table (`cmp_tbl_*`)

Data table pattern:

#### Table Container

- Background, border properties, shadow

#### Header

- Background, text color, font weight
- Padding (x and y)
- Border color

#### Cells

- Padding (x and y)
- Border color

#### Row States

- Hover background
- Selected background
- Striped background (alternating rows)

### Tabs (`cmp_tab_*`)

Tabbed interface pattern:

#### Container

- Border color, width, gap

#### Tab Items

- Padding (x and y)
- Text colors: default, hover, active
- Background states: hover, active
- Border radius
- Font weights: default and active

#### Active Indicator

- Height, color, transition duration

#### Tab Panel

- `cmp_tab_panel_pad` - Content padding

### Accordion (`cmp_acc_*`)

Collapsible content sections:

#### Container

- Border color, width, radius

#### Items

- Padding (x and y)
- Background states: default, hover, active

#### Trigger

- Font weight, text color
- Icon size, icon transition duration

#### Content

- Padding (x and y)
- Animation duration for expand/collapse

### Breadcrumb (`cmp_brd_*`)

Navigation breadcrumb trail:

- Gap between items
- Font size
- Text colors: default and current
- Link colors: default and hover
- Separator color and size

### Pagination (`cmp_pgn_*`)

Page navigation controls:

- Gap between items
- Item size, border radius
- Background states: default, hover, active
- Text colors: default and active
- Border colors: default and active

### Progress Bar (`cmp_prg_*`)

Progress indicator:

- Heights: small, medium, large
- Background (track)
- Fill background
- Border radius
- Transition duration

### Slider (`cmp_sldr_*`)

Range input control:

#### Track

- Height, background (empty and filled)
- Border radius

#### Thumb

- Size, background
- Border color and width
- Shadow states: default, hover, active

### Alert (`cmp_alt_*`)

Alert/banner message pattern:

#### Base

- Padding, border radius, width, gap

#### Variants by State

Each state (info, success, warning, error) has:

- Background color
- Border color
- Text color
- Icon color

### Select (`cmp_sel_*`)

Dropdown select input:

#### Trigger

- Heights: small, medium, large
- Padding, background
- Border properties
- Icon size and color

#### Menu

- Background, border, shadow
- Max height

#### Options

- Padding (x and y)
- Background states: hover, selected
- Text colors: default, selected

## Usage Guidelines

### ✅ Do

- Search `cmp_` tokens first for any recognized UI pattern
- Use `{sem_token}` references for colors, spacing, and typography shared across components
- Define all interactive states (hover, active, disabled, focus)
- Group related tokens by component

### ❌ Don't

- Hardcode hex values, rgb values, or pixel literals in `trait.style()` calls
- Invent `cmp_` token keys that don't exist in `ComponentTokens`
- Reference tokens that don't exist at all

## Primary Token Layer for Code Generation

Component tokens are the **first choice** for any generated UI code. When an LLM needs to style a button, card, modal, dropdown, table, or any other recognized UI pattern, it should **first search for matching `cmp_` tokens** before falling back to `sem_`.

**Token selection cascade:** **`cmp_`** → `sem_` → inline style

### Example: Generating a Primary Button

```typescript
import { theme } from './theme';
import { tag, trait } from './templates';

tag(
  'button',
  // Component tokens — variant styling
  trait.style('backgroundColor', theme.$cmp_btn_pri_bkg),
  trait.style('color', theme.$cmp_btn_pri_txt_color),
  trait.style('borderColor', theme.$cmp_btn_pri_bdr_color),
  trait.style('boxShadow', theme.$cmp_btn_pri_shd),
  // Component tokens — structural properties
  trait.style('height', theme.$cmp_btn_hgt_md),
  trait.style('paddingInline', theme.$cmp_btn_pad_x_md),
  trait.style('borderRadius', theme.$cmp_btn_bdr_rad),
  trait.style('fontWeight', theme.$cmp_btn_fnt_wgt),
  trait.style('fontSize', theme.$cmp_btn_fnt_siz_md),
  trait.style(
    'transition',
    `background-color ${theme.cmp_btn_trn_dur()} ${theme.cmp_btn_trn_eas()}`,
  ),
  // Hover state
  trait.styleOnEvent('mouseenter', 'backgroundColor', theme.$cmp_btn_pri_bkg_hov),
  trait.styleOnEvent('mouseenter', 'boxShadow', theme.$cmp_btn_pri_shd_hov),
);
```

> **OEM has no component library.** The tokens above don't correspond to a prebuilt `<Button>` component. The LLM generates the full element from scratch using these tokens as the design specification.

## Variant Naming Convention

Use clear variant suffixes:

- `_pri` - Primary variant
- `_sec` - Secondary variant
- `_gho` - Ghost/minimal variant
- `_dng` - Danger/destructive variant
- `_inf` - Info state
- `_suc` - Success state
- `_wrn` - Warning state
- `_err` - Error state

## State Naming Convention

Use clear state suffixes:

- `_hov` - Hover state
- `_act` - Active/selected state
- `_dis` - Disabled state
- `_foc` - Focus state
- `_sel` - Selected state
