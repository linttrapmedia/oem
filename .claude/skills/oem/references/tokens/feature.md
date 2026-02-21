---
name: Feature Tokens
description: Product-specific overrides for contextual customization
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

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
