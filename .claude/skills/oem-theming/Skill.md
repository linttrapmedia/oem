---
name: OEM theming
description: OEM's 6-layer design token system for building flexible, themeable UIs without predefined components
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

---

# Token Layer Reference

## Expression Tokens

_Global personality controls affecting system-wide design behavior_

# Expression Tokens (Layer 2)

**Prefix:** `exp_`

## Overview

Expression tokens define the global personality and behavior of your design system. They control system-wide aesthetic choices that affect multiple components simultaneously, creating a cohesive visual and interactive experience.

## Purpose

- Control global design personality (motion, density, visual weight)
- Enable design system-wide customization without touching individual components
- Provide multipliers and modifiers that cascade through higher layers
- Allow users to customize the "feel" of the interface

## Architecture Rules

- **May reference**: Primitives (Layer 1) only
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Type-safe values** - `string | number`

## Token Categories

### Motion Energy

Controls animation speed and responsiveness across the entire system:

- `exp_motion_energy_low` - Calmer, slower (1.5x duration multiplier)
- `exp_motion_energy_med` - Balanced (1x duration - baseline)
- `exp_motion_energy_high` - Snappier, faster (0.7x duration multiplier)
- `exp_motion_energy_act` - Active setting reference

**Impact**: Affects all transitions, animations, and micro-interactions

### Density

Controls spacing tightness throughout the interface:

- `exp_density_compact` - 0.75x spacing multiplier
- `exp_density_comfortable` - 1x spacing (baseline)
- `exp_density_spacious` - 1.25x spacing multiplier
- `exp_density_act` - Active setting reference

**Impact**: Affects padding, margins, gaps in all components

### Roundness

Controls border radius style globally:

- `exp_roundness_sharp` - Minimal radius (geometric feel)
- `exp_roundness_moderate` - Balanced radius
- `exp_roundness_soft` - Generous radius (friendly feel)
- `exp_roundness_act` - Active setting reference

**Impact**: Affects all border-radius properties across components

### Elevation Style

Controls shadow intensity and depth perception:

- `exp_elevation_flat` - Minimal shadows (flat design aesthetic)
- `exp_elevation_raised` - Medium shadows (subtle depth)
- `exp_elevation_floating` - Pronounced shadows (strong depth)
- `exp_elevation_act` - Active setting reference

**Impact**: Affects all box-shadow properties

### Contrast Preference

Controls color contrast and visual hierarchy strength:

- `exp_contrast_low` - Subtle differences (softer, easier on eyes)
- `exp_contrast_med` - Balanced contrast
- `exp_contrast_high` - Strong differences (accessibility-focused)
- `exp_contrast_act` - Active setting reference

**Impact**: Affects text-background contrast, border visibility, state differentiation

## Usage Patterns

### Setting Current Preference

Use the `_act` (active) tokens to reference the current user preference:

```typescript
// Reference the active setting
exp_density_act: '{exp_density_comfortable}'
exp_motion_energy_act: '{exp_motion_energy_med}'
```

### Multiplier Pattern

Expression tokens often work as multipliers:

```typescript
// In semantic layer
sem_spc_inline_md: 'calc({pmt_spc_4} * {exp_density_act})'

// Results:
// - Comfortable mode: 1rem * 1 = 1rem
// - Compact mode: 1rem * 0.75 = 0.75rem
// - Spacious mode: 1rem * 1.25 = 1.25rem
```

## Use Cases

### User Preferences

Expression tokens enable users to customize their experience:

- **Power users**: Compact density + high motion energy
- **Accessibility needs**: Spacious density + low motion energy + high contrast
- **Modern aesthetic**: Soft roundness + floating elevation
- **Minimalist aesthetic**: Sharp roundness + flat elevation

### Brand Personality

Express your brand through global controls:

- **Playful brand**: Soft roundness + high motion energy
- **Professional brand**: Sharp roundness + low motion energy + raised elevation
- **Tech/Startup**: Moderate roundness + high motion energy + high contrast

## Usage Guidelines

### ✅ Do

- Use expression tokens to reference the active user preference
- Apply expression multipliers in semantic and element layers
- Provide 3 options per category (low/med/high or similar)
- Use `_act` suffix for the currently active setting

### ❌ Don't

- Skip expression layer and go directly to primitives
- Use expression tokens for component-specific overrides (use element/component layers)
- Create more than 5-6 expression categories (keeps system manageable)
- Reference component or feature layers (violates layer hierarchy)

## Examples

```typescript
// ✅ Correct expression usage
exp_roundness_sharp: '{pmt_rad_2}'
exp_roundness_moderate: '{pmt_rad_6}'
exp_roundness_soft: '{pmt_rad_12}'
exp_roundness_act: '{exp_roundness_moderate}'

// In semantic layer
sem_rad_md: '{exp_roundness_act}'

// ❌ Incorrect - references higher layer
exp_roundness_act: '{elm_btn_bdr_rad}' // NO!
```

## Related Layers

- **References**: Primitives (Layer 1)
- **Referenced by**: Semantic (Layer 3), Element (Layer 4), Component (Layer 5), Feature (Layer 6)

---

## Component Tokens

_Complete component definitions with variants and interactive states_

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
elm_btn_hgt_md: '2.5rem'
elm_btn_pad_x_md: '1rem'
elm_btn_bdr_rad: '{sem_rad_md}'

// Component layer defines variant-specific styling
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'
cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}'
cmp_btn_pri_txt_color: '{sem_color_txt_inv}'

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
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'
cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}'
cmp_btn_pri_txt_color: '{sem_color_txt_inv}'
cmp_btn_pri_shd: '{sem_shd_sm}'

// ❌ Incorrect - don't redefine element properties
cmp_btn_pri_hgt: '{elm_btn_hgt_md}' // Just use elm_btn_hgt_md directly

// ❌ Incorrect - references higher layer
cmp_btn_pri_bkg: '{ftr_checkout_cta_bkg}' // NO!
```

## Related Layers

- **References**: Element (Layer 4), Semantic (Layer 3), Expression (Layer 2), Primitives (Layer 1)
- **Referenced by**: Feature (Layer 6)
- **Inherits from**: Element layer provides base properties

---

## Semantic Tokens

_Purpose-based tokens that assign meaning to design values_

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
sem_color_bkg_pri: '{pmt_color_white}'
sem_color_txt_pri: '{pmt_color_gray_900}'
sem_color_bdr_default: '{pmt_color_gray_200}'

// Dark theme - same semantic names, different primitives
sem_color_bkg_pri: '{pmt_color_gray_900}'
sem_color_txt_pri: '{pmt_color_gray_50}'
sem_color_bdr_default: '{pmt_color_gray_700}'
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

---

## Element Tokens

_Atomic UI building blocks for reusable design system elements_

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

---

## Feature Tokens

_Product-specific overrides for contextual customization_

# Feature Tokens (Layer 6)

**Prefix:** `ftr_`

## Overview

Feature tokens are the top layer of the design token system, providing product-specific overrides for particular features or user flows. They enable contextual customization without modifying the foundational design system.

## Purpose

- Provide feature-specific visual overrides
- Enable contextual theming (e.g., checkout flow with distinct branding)
- Support product requirements that deviate from standard components
- Allow A/B testing and experimentation without touching core tokens
- Maintain design system consistency while allowing strategic flexibility

## Architecture Rules

- **May reference**: Any layer (Component, Element, Semantic, Expression, Primitives)
- **Highest layer** - Can override any lower layer token
- **Flat structure only** - No nested objects
- **snake_case naming** - Consistent naming convention
- **Feature-focused naming** - Names describe the feature context

## When to Use Feature Tokens

### ✅ Use Feature Tokens When:

- A specific user flow needs distinct visual treatment (checkout, onboarding)
- Product requirements demand feature-specific branding
- Business needs require contextual emphasis (CTAs in conversion flows)
- Testing variations without modifying core design system
- Supporting white-label or multi-brand products

### ❌ Don't Use Feature Tokens When:

- Creating a new reusable component (use component layer)
- Defining a new variant of an existing component (use component layer)
- The styling should apply system-wide (use semantic/expression layers)
- Creating temporary overrides (use local styles instead)

## Token Categories

### Checkout Feature (`ftr_checkout_*`)

E-commerce checkout flow styling:

- `ftr_checkout_cta_bkg` - Call-to-action button background
- `ftr_checkout_cta_bkg_hov` - CTA hover state
- `ftr_checkout_cta_txt_color` - CTA text color
- `ftr_checkout_prg_bar_color` - Checkout progress bar
- `ftr_checkout_trust_bdg_bkg` - Trust badge background
- `ftr_checkout_err_highlight_color` - Error highlight color

**Use case**: High-converting checkout needs distinct, bold CTAs

### Dashboard Feature (`ftr_dashboard_*`)

Analytics dashboard styling:

- `ftr_dashboard_widget_bkg` - Widget/card background
- `ftr_dashboard_widget_bdr_color` - Widget border
- `ftr_dashboard_widget_shd` - Widget shadow
- `ftr_dashboard_chart_pri_color` - Primary chart color
- `ftr_dashboard_chart_sec_color` - Secondary chart color
- `ftr_dashboard_stat_highlight_color` - Highlighted stat color

**Use case**: Dashboard has unique data visualization requirements

### Settings Feature (`ftr_settings_*`)

User settings interface:

- `ftr_settings_section_bkg` - Settings section background
- `ftr_settings_section_bdr_color` - Section border
- `ftr_settings_danger_zone_bkg` - Danger zone background
- `ftr_settings_danger_zone_bdr_color` - Danger zone border
- `ftr_settings_save_btn_bkg` - Save button background

**Use case**: Danger zone needs special emphasis to prevent accidental actions

### Auth Feature (`ftr_auth_*`)

Authentication flows (login, signup):

- `ftr_auth_cdl_bkg` - Auth card background
- `ftr_auth_cdl_shd` - Auth card shadow
- `ftr_auth_cdl_max_wdt` - Auth card max width
- `ftr_auth_divider_color` - "OR" divider color
- `ftr_auth_social_btn_bdr_color` - Social login button border
- `ftr_auth_lnk_color` - Auth link color

**Use case**: Auth screens need clean, focused design separate from main app

### Onboarding Feature (`ftr_onboarding_*`)

New user onboarding flow:

- `ftr_onboarding_prg_color` - Progress indicator color
- `ftr_onboarding_step_act_color` - Active step color
- `ftr_onboarding_step_completed_color` - Completed step color
- `ftr_onboarding_highlight_bkg` - Highlighted element background

**Use case**: Onboarding has unique progress visualization

### Profile Feature (`ftr_profile_*`)

User profile pages:

- `ftr_profile_header_bkg` - Profile header background
- `ftr_profile_avt_bdr_color` - Avatar border color
- `ftr_profile_avt_bdr_wdt` - Avatar border width
- `ftr_profile_bdg_verified_color` - Verified badge color

**Use case**: Profile pages have distinct visual hierarchy

### Messaging Feature (`ftr_messaging_*`)

Chat and messaging interface:

- `ftr_messaging_bubble_sent_bkg` - Sent message background
- `ftr_messaging_bubble_received_bkg` - Received message background
- `ftr_messaging_bubble_sent_txt_color` - Sent message text
- `ftr_messaging_bubble_received_txt_color` - Received message text
- `ftr_messaging_inp_bkg` - Message input background
- `ftr_messaging_timestamp_color` - Timestamp color

**Use case**: Chat UI requires distinct sent/received styling

### Search Feature (`ftr_search_*`)

Search interface and results:

- `ftr_search_overlay_bkg` - Search overlay background
- `ftr_search_inp_bkg` - Search input background
- `ftr_search_result_bkg_hov` - Hovered search result
- `ftr_search_highlight_color` - Search term highlight
- `ftr_search_shortcut_bdg_bkg` - Keyboard shortcut badge

**Use case**: Search has command-palette style that differs from main UI

## Usage Patterns

### Override Pattern

Feature tokens typically override component tokens:

```typescript
// Component layer - default button
cmp_btn_pri_bkg: '{sem_color_interactive_pri}'

// Feature layer - checkout button override
ftr_checkout_cta_bkg: '{pmt_color_green_600}'

// In checkout context, use feature token
// In other contexts, use component token
```

### Conditional Application

Feature tokens are applied conditionally based on context:

```typescript
// Pseudocode for button in checkout
background = isCheckoutFlow
  ? theme.ftr_checkout_cta_bkg
  : theme.cmp_btn_pri_bkg
```

### Composition Pattern

Feature tokens can reference any layer:

```typescript
// Reference primitive directly for specific need
ftr_checkout_cta_bkg: '{pmt_color_green_600}'

// Reference component for consistency
ftr_dashboard_widget_bkg: '{cmp_cdl_bkg}'

// Reference semantic for theme-aware value
ftr_auth_lnk_color: '{sem_color_txt_lnk}'
```

## Usage Guidelines

### ✅ Do

- Use feature tokens for contextual overrides in specific flows
- Document the business reason for the override
- Reference lower layer tokens when appropriate
- Group tokens by feature/context
- Use sparingly - most styling should come from component layer

### ❌ Don't

- Use feature tokens as a dumping ground for one-off styles
- Create feature tokens for every minor variation
- Use feature tokens when component variants would suffice
- Bypass the component layer unnecessarily
- Create circular references between features

## Naming Convention

Follow the pattern: `ftr_[feature]_[element]_[property]_[state]`

Examples:
- `ftr_checkout_cta_bkg_hov` - Checkout CTA background hover
- `ftr_dashboard_chart_pri_color` - Dashboard primary chart color
- `ftr_settings_danger_zone_bkg` - Settings danger zone background

## Feature Token Strategy

### Minimize Usage

Feature tokens should be the exception, not the rule:

```typescript
// ❌ Bad - too many feature-specific overrides
ftr_checkout_btn_bkg: ...
ftr_checkout_btn_txt: ...
ftr_checkout_btn_bdr: ...
ftr_checkout_inp_bkg: ...
ftr_checkout_inp_bdr: ...
// This should be a theme variant instead!

// ✅ Good - strategic, high-impact overrides
ftr_checkout_cta_bkg: ...
ftr_checkout_prg_bar_color: ...
ftr_checkout_trust_bdg_bkg: ...
```

### Document Intent

Always document why a feature token exists:

```typescript
// ✅ Good - clear documentation
/**
 * Checkout CTA uses high-converting green instead of brand blue
 * per A/B test results (ticket: CHK-123)
 */
ftr_checkout_cta_bkg: '{pmt_color_green_600}'
```

## Multi-Brand/White-Label Use Case

Feature tokens enable multi-brand products:

```typescript
// Brand A theme
ftr_checkout_cta_bkg: '{pmt_color_blue_600}'
ftr_dashboard_chart_pri_color: '{pmt_color_blue_500}'

// Brand B theme (different file/config)
ftr_checkout_cta_bkg: '{pmt_color_purple_600}'
ftr_dashboard_chart_pri_color: '{pmt_color_purple_500}'
```

## Examples

```typescript
// ✅ Correct feature usage - strategic override
ftr_checkout_cta_bkg: '{pmt_color_green_600}'
ftr_checkout_cta_txt_color: '{pmt_color_white}'

// Applied in checkout component
<Button
  background={isCheckout ? ftr_checkout_cta_bkg : cmp_btn_pri_bkg}
  color={isCheckout ? ftr_checkout_cta_txt_color : cmp_btn_pri_txt_color}
/>

// ❌ Incorrect - this should be a component variant
ftr_header_nav_bkg: '{sem_color_bkg_pri}' // Just make a nav variant!

// ❌ Incorrect - too granular
ftr_settings_cancel_btn_hov_bdr_color: ... // Just use existing button variant
```

## Related Layers

- **References**: All layers (Component, Element, Semantic, Expression, Primitives)
- **Referenced by**: None (top layer)
- **Usage**: Applied conditionally based on feature/context

---

## Primitives Tokens

_Foundation layer containing raw design values with no references_

# Primitives Tokens (Layer 1)

**Prefix:** `pmt_`

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
pmt_color_blue_500: '#3B82F6'
pmt_spc_4: '1rem'
pmt_fnt_wgt_bold: 700
pmt_dur_normal: '200ms'

// ❌ Incorrect - no references allowed in primitives
pmt_color_primary: '{pmt_color_blue_500}' // NO!
```

## Related Layers

- **Referenced by**: Expression (Layer 2), Semantic (Layer 3)
- **References**: None (foundation layer)