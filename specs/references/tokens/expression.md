---
name: Expression Tokens
description: Global personality controls affecting system-wide design behavior
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

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
