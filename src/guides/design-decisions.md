---
name: Design Decision Guide
description: Heuristics and rules for making visual and structural design decisions in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Design Decision Guide

The following heuristics should be applied when making visual and structural design decisions. They reflect the reasoning of a world-class UI expert and ensure consistent, intentional output.

## Foundational Principles

| Principle                  | Rule                                                                                                                                           |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Golden Ratio (1.618)**   | Use for scaling relationships — type scales, spacing progressions, element proportions. If a base is 16px, the next step is ~26px, then ~42px. |
| **8-Point Grid**           | All spacing and sizing should be multiples of 8 (4 allowed for tight contexts). Padding, margin, gap, height, width.                           |
| **Visual Hierarchy**       | Every screen has exactly one primary focal point. Use size, weight, color, and whitespace to create a clear reading order.                     |
| **Progressive Disclosure** | Show only what is needed at each step. Reduce cognitive load by hiding secondary information behind intentional interactions.                  |
| **Consistency**            | Similar elements must look and behave identically. Reuse tokens ruthlessly.                                                                    |

## Category: Structure

Tokens: `surface_*`, `space_*`, `radius_*`, `shadow_*`

| Aspect              | Heuristic                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Intent**          | Define containment, grouping, and spatial relationships                                                              |
| **Hierarchy**       | primary → secondary → tertiary maps to: page → section → card                                                        |
| **Spacing**         | Use 8pt grid: `xs=4`, `sm=8`, `md=16`, `lg=24`, `xl=32`, `2xl=48`, `3xl=64`                                          |
| **Radius**          | None for full-bleed, sm (4px) for subtle softening, md (8px) for cards, lg (12px) for modals, full for pills/avatars |
| **Shadow**          | Elevation communicates layer: none (flat), sm (raised), md (floating), lg (overlay)                                  |
| **When to use**     | Any element that contains, separates, or groups other elements                                                       |
| **When NOT to use** | Inline text runs, single atomic icons                                                                                |

## Category: Actions

Tokens: `action_*`

| Aspect                   | Heuristic                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| **Intent**               | Communicate clickability, interactivity, and importance                                           |
| **Hierarchy**            | primary (filled, high contrast) → secondary (outlined or ghost) → tertiary (text-only link)       |
| **Psychological effect** | Primary attracts commitment; secondary suggests alternatives; tertiary feels low-friction         |
| **Hover / Active**       | Every interactive element must have visible hover and active states — minimum 10% luminance shift |
| **Disabled**             | 40-50% opacity, no pointer events, cursor not-allowed                                             |
| **When to use**          | Buttons, links, toggles, interactive chips                                                        |
| **When NOT to use**      | Static labels, read-only badges, non-interactive status indicators                                |

## Category: Surfaces

Tokens: `surface_*`

| Aspect              | Heuristic                                                                            |
| ------------------- | ------------------------------------------------------------------------------------ |
| **Intent**          | Provide visual containment and background context                                    |
| **Hierarchy**       | primary (page base) → secondary (card/panel) → tertiary (nested section within card) |
| **Contrast**        | Adjacent surfaces must differ by at least 3-5% luminance for clear delineation       |
| **Visual role**     | Ground layer (primary), content container (secondary), inset region (tertiary)       |
| **When to use**     | Backgrounds, cards, modals, sidebars, popovers                                       |
| **When NOT to use** | Inline text styling, icon fills                                                      |

## Category: Feedback

Tokens: `feedback_*`

| Aspect                   | Heuristic                                                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Intent**               | Communicate system status to the user                                                                                            |
| **Category mapping**     | success (green) → positive outcome · warning (amber) → caution · danger (red) → error/destructive · info (blue) → neutral notice |
| **Psychological effect** | Color primes emotional response — green reassures, red alerts, amber cautions                                                    |
| **Hierarchy**            | Background tint (subtle) → border accent (moderate) → solid fill (strong)                                                        |
| **When to use**          | Toasts, banners, inline validation, status badges                                                                                |
| **When NOT to use**      | Decorative elements, branding, navigation states                                                                                 |

## Category: Navigation

Tokens: `nav_*`

| Aspect              | Heuristic                                                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Intent**          | Orient the user and indicate current location                                                                                                  |
| **Hierarchy**       | active (highlighted) → default (neutral) → disabled (unreachable)                                                                              |
| **Visual cues**     | Active items receive background fill or bold weight + accent underline; default items are muted foreground; disabled items drop to 40% opacity |
| **When to use**     | Tabs, sidebars, breadcrumbs, pagination, steppers                                                                                              |
| **When NOT to use** | In-page links within body copy (use text links instead)                                                                                        |

## Category: Data

Tokens: `data_*`

| Aspect              | Heuristic                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Intent**          | Present structured information clearly                                                                                      |
| **Hierarchy**       | header (bold, larger) → row (standard) → muted (secondary detail)                                                           |
| **Visual rules**    | Alternate row tinting at 2-3% luminance shift; header bottom border 1px solid; right-align numeric columns; left-align text |
| **Density**         | Default (40px rows), compact (32px rows), comfortable (48px rows)                                                           |
| **When to use**     | Tables, lists, key-value pairs, stat cards                                                                                  |
| **When NOT to use** | Free-form content, marketing sections                                                                                       |

## Category: Text & Typography

Tokens: `text_*`, `type_*`

| Aspect              | Heuristic                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Intent**          | Establish reading hierarchy and legibility                                                                                                                |
| **Scale**           | Use a ratio-based type scale — base 16px, scaled by ~1.25 (minor third) or ~1.333 (perfect fourth). Heading sizes: h1 ≈ 2.5×, h2 ≈ 2×, h3 ≈ 1.5×, body 1× |
| **Weight**          | Regular (400) for body, Medium (500) for emphasis, Bold (700) for headings and CTAs                                                                       |
| **Line height**     | Body: 1.5–1.6, Headings: 1.2–1.3, Compact UI: 1.3–1.4                                                                                                     |
| **Color hierarchy** | primary (high contrast body) → secondary (labels, captions) → muted (placeholders, disabled) → inverse (text on filled backgrounds)                       |
| **When to use**     | All visible text content                                                                                                                                  |
| **When NOT to use** | N/A — every text element needs typographic tokens                                                                                                         |

## Category: Focus & Accessibility

Tokens: `focus_*`

| Aspect              | Heuristic                                                                               |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Intent**          | Make keyboard navigation visible and accessible                                         |
| **Visual rule**     | 2px solid ring, offset 2px, high-contrast color (typically brand blue or white on dark) |
| **Contrast**        | Focus indicator must have ≥ 3:1 contrast against adjacent colors (WCAG 2.2)             |
| **When to use**     | Every focusable element: buttons, inputs, links, custom controls                        |
| **When NOT to use** | Mouse-only decorative hover effects                                                     |

## Category: Borders

Tokens: `border_*`

| Aspect              | Heuristic                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| **Intent**          | Separate, contain, or emphasize elements                                                         |
| **Hierarchy**       | primary (visible dividers) → secondary (subtle separation) → accent (emphasis, active indicator) |
| **Width**           | 1px standard, 2px for emphasis or focus                                                          |
| **When to use**     | Dividers, input outlines, card edges, active tab indicators                                      |
| **When NOT to use** | Decorative gradients, background patterns                                                        |

## Decision Checklist — Before Creating Any Token

1. **What category does this belong to?** (structure, action, surface, feedback, nav, data, text, focus, border)
2. **What property am I setting?** (bg, fg, border, size, weight, gap, padding, radius, shadow, opacity)
3. **What variant describes the hierarchy or state?** (primary, secondary, muted, hover, active, disabled, success, danger …)
4. **Does a token with this exact name already exist?** → Reuse it.
5. **Does a token with the same intent but different name exist?** → Reuse it and consider whether it should be renamed.
6. **Is this truly new?** → Create it with a documentation comment (what / when to use / when NOT to use).
