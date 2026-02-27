---
name: Component Tokens
description: Complete component definitions with variants and interactive states
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Component Tokens (Layer 5)

**Prefix:** `cmp_`

## Overview

Component tokens define complete, production-ready design system components with all their variants and states. They combine element foundations with semantic meanings to create fully-styled, interactive UI patterns.

## Purpose

- Provide complete styling for design system components
- Define component variants (primary, secondary, ghost, danger, etc.)
- Specify component states (hover, active, disabled, focus)
- Enable component-level theming and customization
- Establish consistency across complex UI patterns

## Architecture Rules

- **May reference**: Element (Layer 4), Semantic (Layer 3), Primitives (Layer 1), Expression (Layer 2)
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Component-focused naming** - Names describe the specific component and variant

## Token Categories

### Button Component Variants

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

### Card Component (`cmp_cdl_*`)

Container for related content:

- `cmp_cdl_bkg` - Background
- `cmp_cdl_bdr_color`, `cmp_cdl_bdr_wdt`, `cmp_cdl_bdr_rad` - Border properties
- `cmp_cdl_pad` - Overall padding
- `cmp_cdl_shd`, `cmp_cdl_shd_hov` - Shadow states
- Section padding: `cmp_cdl_header_pad`, `cmp_cdl_body_pad`, `cmp_cdl_footer_pad`
- `cmp_cdl_gap` - Gap between sections

### Modal Component (`cmp_mod_*`)

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

### Dropdown Component (`cmp_drp_*`)

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

### Tooltip Component (`cmp_tip_*`)

Contextual information overlay:

- Background and text color
- Padding (x and y)
- Font size
- Border radius, shadow
- `cmp_tip_max_wdt` - Maximum width
- `cmp_tip_arrow_siz` - Arrow size
- `cmp_tip_off` - Offset from trigger
- Enter/exit animation durations

### Popover Component (`cmp_pop_*`)

Larger contextual overlay:

- Background, border, shadow
- `cmp_pop_pad` - Internal padding
- `cmp_pop_max_wdt` - Maximum width
- Arrow and offset properties

### Toast Component (`cmp_tst_*`)

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

### Navigation Component (`cmp_nav_*`)

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

### Sidebar Component (`cmp_sidebar_*`)

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

### Table Component (`cmp_tbl_*`)

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

### Tabs Component (`cmp_tab_*`)

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

### Accordion Component (`cmp_acc_*`)

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

### Breadcrumb Component (`cmp_brd_*`)

Navigation breadcrumb trail:

- Gap between items
- Font size
- Text colors: default and current
- Link colors: default and hover
- Separator color and size

### Pagination Component (`cmp_pgn_*`)

Page navigation controls:

- Gap between items
- Item size, border radius
- Background states: default, hover, active
- Text colors: default and active
- Border colors: default and active

### Progress Bar Component (`cmp_prg_*`)

Progress indicator:

- Heights: small, medium, large
- Background (track)
- Fill background
- Border radius
- Transition duration

### Slider Component (`cmp_sldr_*`)

Range input control:

#### Track

- Height, background (empty and filled)
- Border radius

#### Thumb

- Size, background
- Border color and width
- Shadow states: default, hover, active

### Alert Component (`cmp_alt_*`)

Alert/banner message pattern:

#### Base

- Padding, border radius, width, gap

#### Variants by State

Each state (info, success, warning, error) has:

- Background color
- Border color
- Text color
- Icon color

### Select Component (`cmp_sel_*`)

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

- Create complete component definitions with all variants
- Define all interactive states (hover, active, disabled, focus)
- Reference element tokens for base properties
- Use semantic tokens for colors and spacing
- Group related tokens by component

### ❌ Don't

- Duplicate element-level properties (inherit them instead)
- Create one-off components (use feature layer for specific contexts)
- Reference feature tokens (violates layer hierarchy)
- Mix multiple components in one token set

## Component Composition Pattern

Components build on elements:

```typescript
// Element layer defines base button properties
elm_btn_hgt_md: '2.5rem';
elm_btn_pad_x_md: '1rem';
elm_btn_bdr_rad: '{sem_rad_md}';

// Component layer defines variant-specific styling
cmp_btn_pri_bkg: '{sem_color_interactive_pri}';
cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}';
cmp_btn_pri_txt_color: '{sem_color_txt_inv}';

// Button implementation uses both:
// - elm_btn_* for size, padding, radius
// - cmp_btn_pri_* for colors and states
```

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

## Examples

```typescript
// ✅ Correct component usage
cmp_btn_pri_bkg: '{sem_color_interactive_pri}';
cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}';
cmp_btn_pri_txt_color: '{sem_color_txt_inv}';
cmp_btn_pri_shd: '{sem_shd_sm}';

// ❌ Incorrect - don't redefine element properties
cmp_btn_pri_hgt: '{elm_btn_hgt_md}'; // Just use elm_btn_hgt_md directly

// ❌ Incorrect - references higher layer
cmp_btn_pri_bkg: '{ftr_checkout_cta_bkg}'; // NO!
```

## Related Layers

- **References**: Element (Layer 4), Semantic (Layer 3), Expression (Layer 2), Primitives (Layer 1)
- **Referenced by**: Feature (Layer 6)
- **Inherits from**: Element layer provides base properties

## Primary Token Layer for Code Generation

Component tokens are the **first choice** for any generated UI code. When an LLM needs to style a button, card, modal, dropdown, table, or any other recognized UI pattern, it should **first search for matching `cmp_` tokens** before falling back.

**Token selection cascade:** `ftr_` → **`cmp_`** → `elm_` → `sem_` → inline style

### How to Map a UI Requirement to Tokens

1. **Identify the concept** — e.g., "primary button", "card", "modal"
2. **Search by prefix** — `cmp_btn_pri_*`, `cmp_cdl_*`, `cmp_mod_*`
3. **Apply via `trait.style()`** — use the deferred `theme.$` getters for reactive traits

### Example: Generating a Primary Button

```typescript
import { theme } from './theme';
import { tag, trait } from './templates';

tag(
  'button',
  // Component tokens for variant-specific styling
  trait.style('backgroundColor', theme.$cmp_btn_pri_bkg),
  trait.style('color', theme.$cmp_btn_pri_txt_color),
  trait.style('borderColor', theme.$cmp_btn_pri_bdr_color),
  trait.style('boxShadow', theme.$cmp_btn_pri_shd),
  // Element tokens for shared base properties
  trait.style('height', theme.$elm_btn_hgt_md),
  trait.style('padding', theme.$elm_btn_pad_x_md),
  trait.style('borderRadius', theme.$elm_btn_bdr_rad),
  trait.style('fontWeight', theme.$elm_btn_fnt_wgt),
  trait.style('fontSize', theme.$elm_btn_fnt_siz_md),
  trait.style(
    'transition',
    `background-color ${theme.elm_btn_trn_dur()} ${theme.elm_btn_trn_eas()}`,
  ),
  // Hover state
  trait.styleOnEvent('mouseenter', 'backgroundColor', theme.$cmp_btn_pri_bkg_hov),
  trait.styleOnEvent('mouseenter', 'boxShadow', theme.$cmp_btn_pri_shd_hov),
);
```

> **OEM has no component library.** The tokens above don’t correspond to a prebuilt `<Button>` component. The LLM generates the full element from scratch using these tokens as the design specification.
