---
name: Design Decision Guide
description: Heuristics, principles, and CSS-aware rules for making visual and structural design decisions in OEM applications.
license: MIT
metadata:
  author: Kevin Lint
  version: '1.0'
---

# Design Decision Guide

The following heuristics should be applied when making visual and structural design decisions. They reflect the reasoning of a world-class UI expert and ensure consistent, intentional output. Because OEM renders all styles via `trait.style()` directly onto DOM elements, the agent must internalize the knowledge that CSS resets, browser defaults, and layout edge cases normally handle — there is no stylesheet safety net.

---

## Browser Default Neutralization

Browsers apply default styles to HTML elements (the "user-agent stylesheet"). In traditional development, a `reset.css` or `normalize.css` removes these. In OEM, **every element must be explicitly styled to a known baseline**. The agent must apply these resets inline via traits whenever it creates the affected elements.

### Mandatory Resets — Apply to Every Application

These styles must be applied to `document.body` (via `tag.$(document.body)`) in every OEM app:

```ts
tag.$(document.body)(
  trait.style('margin', '0'),
  trait.style('padding', '0'),
  trait.style('boxSizing', 'border-box'),
  trait.style('fontFamily', type_family_base.$val),
  trait.style('fontSize', type_size_base.$val),
  trait.style('lineHeight', '1.5'),
  trait.style('color', text_fg_primary.$val),
  trait.style('backgroundColor', surface_bg_primary.$val),
  trait.style('-webkit-font-smoothing', 'antialiased'),
  trait.style('-moz-osx-font-smoothing', 'grayscale'),
);
```

### Element-Specific Resets

The following browser defaults cause subtle problems. Neutralize them whenever you create these elements:

| Element | Browser Default Problem | Required Reset |
| --- | --- | --- |
| `h1`–`h6` | Top/bottom margin; large bold font. An `h2` inside a card creates unwanted space above it. | `margin: '0'`, `padding: '0'`, `fontSize` and `fontWeight` from tokens, `lineHeight: '1.2'` |
| `p` | Top/bottom margin. Back-to-back paragraphs double-space. | `margin: '0'`, `padding: '0'`. Use the parent's `gap` for spacing between siblings. |
| `ul`, `ol` | Left padding (~40px), top/bottom margin, bullet/number markers. | `margin: '0'`, `padding: '0'`, `listStyle: 'none'` |
| `li` | Inherits list padding and marker. | `margin: '0'`, `padding: '0'` |
| `a` | Blue color, underline, cursor pointer. | `color: 'inherit'`, `textDecoration: 'none'`, then apply token-driven color and hover via traits |
| `button` | Browser-specific padding, border, background, font inheritance issues. | `border: 'none'`, `background: 'none'`, `padding: '0'`, `font: 'inherit'`, `cursor: 'pointer'`, `color: 'inherit'` |
| `input`, `textarea` | Border, padding, font-size mismatch, outline on focus, box-sizing: content-box. | `border: 'none'`, `outline: 'none'`, `padding: '0'`, `font: 'inherit'`, `boxSizing: 'border-box'`, `width: '100%'` |
| `select` | Browser-specific chrome, arrow, padding. | `appearance: 'none'`, `border: 'none'`, `outline: 'none'`, `font: 'inherit'`, `background: 'none'` |
| `img` | Inline display causes bottom gap in containers. | `display: 'block'`, `maxWidth: '100%'`, `height: 'auto'` |
| `table` | Border-collapse gaps, cell padding. | `borderCollapse: 'collapse'`, `borderSpacing: '0'`, `width: '100%'` |
| `th`, `td` | Padding, text-align varies. | `padding: '0'`, `textAlign: 'left'` |
| `fieldset` | Border, margin, padding. | `border: 'none'`, `margin: '0'`, `padding: '0'` |
| `legend` | Floating above fieldset border. | `padding: '0'`, `margin: '0'` |
| `hr` | Height, border, margin. | `border: 'none'`, `margin: '0'`, `height: '1px'`, set `backgroundColor` from a border token |
| `blockquote` | Left margin ~40px. | `margin: '0'`, `padding: '0'` |
| `pre`, `code` | Monospace font, sometimes different size. | `font: 'inherit'`, then apply `fontFamily: 'monospace'` and desired `fontSize` from tokens |
| `summary` | Disclosure triangle, cursor. | `listStyle: 'none'`, `cursor: 'pointer'`. Remove webkit triangle: `'::marker'` can't be targeted — hide via `listStyle: 'none'`. |

### The Box Model Rule

**Always apply `boxSizing: 'border-box'` to any element that receives explicit width, height, padding, or border.** The browser default is `content-box`, which causes padding and border to add to the element's declared dimensions — the single most common cause of layout overflow.

```ts
trait.style('boxSizing', 'border-box'),
trait.style('width', '100%'),
trait.style('padding', space_padding_md.$val),  // doesn't overflow
```

### Inherited Properties That Silently Break

The browser **inherits** some properties and **doesn't inherit** others. Know which is which:

| Inherited (flows to children) | Not inherited (must set explicitly) |
| --- | --- |
| `color`, `font-*`, `line-height`, `letter-spacing`, `text-align`, `visibility`, `cursor`, `white-space`, `word-spacing`, `direction` | `margin`, `padding`, `border`, `background`, `display`, `width`, `height`, `position`, `overflow`, `opacity`, `transform`, `box-sizing` |

If a child element looks wrong and you haven't styled it, check whether it's inheriting an unintended value from an ancestor.

---

## CSS Layout Gotchas

OEM has no stylesheet safety net — every style is applied inline via `trait.style()`. This means common CSS pitfalls that frameworks or resets normally absorb will silently break your layout. The following gotchas are **mandatory knowledge** for every OEM application.

### Fixed/Absolute Elements Overflow on Mobile

**Problem:** A `position: fixed` or `position: absolute` element with `left: 0; right: 0` (or `width: 100%`) plus horizontal padding will overflow the viewport. The browser default `box-sizing: content-box` adds padding *on top of* the declared width, so the element becomes `100% + padding-left + padding-right` — causing horizontal scroll on mobile.

**Fix:** Always apply `boxSizing: 'border-box'`, `maxWidth: '100vw'`, and `overflow: 'hidden'` to fixed/absolute full-width elements:

```ts
// Fixed header — CORRECT
tag.header(
  trait.style('position', 'fixed'),
  trait.style('top', '0'),
  trait.style('left', '0'),
  trait.style('right', '0'),
  trait.style('boxSizing', 'border-box'),   // padding stays inside bounds
  trait.style('maxWidth', '100vw'),          // safety clamp
  trait.style('overflow', 'hidden'),         // prevent child bleed
  trait.style('padding', `8px 16px`),
);
```

**Why it matters on mobile:** Desktop browsers have wide enough viewports that a few extra pixels of overflow go unnoticed. On mobile (320–428px wide), even 1px of overflow triggers a horizontal scrollbar and shifts the entire page.

### Flex Children Overflowing Their Container

**Problem:** A flex child with long text or a fixed-width element can push its container wider than the viewport. Flex items default to `min-width: auto`, which prevents them from shrinking below their content size.

**Fix:** Apply `minWidth: '0'` to flex children that contain variable-length content, and `overflow: 'hidden'` or `textOverflow: 'ellipsis'` where appropriate:

```ts
tag.div(
  trait.style('display', 'flex'),
  trait.style('gap', '8px'),

  tag.div(
    trait.style('flex', '1'),
    trait.style('minWidth', '0'),           // allow shrinking below content size
    trait.style('overflow', 'hidden'),
    trait.style('textOverflow', 'ellipsis'),
    trait.style('whiteSpace', 'nowrap'),
  ),
);
```

### Grid Blowout

**Problem:** A CSS grid child with content wider than its track (e.g., a `<pre>` block or long URL) expands the track and overflows the grid container. Unlike flex, grid tracks don't shrink by default.

**Fix:** Use `minmax(0, 1fr)` instead of bare `1fr`, and apply `overflow: 'auto'` to the content that may be too wide:

```ts
trait.style('gridTemplateColumns', 'minmax(0, 1fr) minmax(0, 1fr)'),
// Inside the cell:
tag.pre(
  trait.style('overflow', 'auto'),
  trait.style('maxWidth', '100%'),
);
```

### 100vh on Mobile Safari

**Problem:** `height: 100vh` on iOS Safari includes the area behind the address bar, so content is cut off at the bottom when the bar is visible. This affects modals, full-screen overlays, and hero sections.

**Fix:** Use `minHeight: '100dvh'` (dynamic viewport height) which adjusts as the address bar shows/hides. Fall back to `100vh` for browsers that don't support `dvh`:

```ts
trait.style('minHeight', '100vh'),         // fallback
trait.style('minHeight', '100dvh'),        // override: dynamic viewport on iOS
```

### Touch Target Size

**Problem:** Interactive elements smaller than 44×44px are difficult to tap accurately on mobile. This is both a usability issue and an accessibility failure (WCAG 2.5.5).

**Fix:** Ensure all buttons, links, and interactive controls have a minimum touch target of 44×44px. Use padding to expand the target area without changing the visual size:

```ts
tag.button(
  trait.style('minWidth', '44px'),
  trait.style('minHeight', '44px'),
  trait.style('padding', '10px 16px'),     // visually compact, touch-friendly
);
```

### Scrollbar Gutter Shift

**Problem:** When content transitions from non-scrollable to scrollable (e.g., opening an accordion), the appearance of the scrollbar shifts the layout by ~15px on desktop browsers. This causes a visible jank.

**Fix:** Apply `scrollbarGutter: 'stable'` to the scrollable container so the gutter space is always reserved:

```ts
trait.style('overflow', 'auto'),
trait.style('scrollbarGutter', 'stable'),
```

---

## Design Composition Principles

Beyond tokens and categories, great UI follows compositional principles borrowed from graphic design, architecture, and visual perception science. These are not aesthetic preferences — they are cognitive ergonomics.

### Motif — Variation on a Theme

A **motif** is a recurring visual element — a shape, rhythm, proportion, or treatment — that repeats across an interface with intentional variation. It is the single most powerful tool for making a design feel cohesive without making it feel monotonous.

**How motifs work:** Choose a small set of defining visual characteristics and echo them everywhere, varying intensity but not character. A motif is to UI what a leitmotif is to music — a recognizable pattern that binds the composition together.

**Examples of motifs:**

| Motif Type | What Repeats | How It Varies |
| --- | --- | --- |
| **Shape** | Rounded corners everywhere | `radius_size_sm` on inputs, `radius_size_md` on cards, `radius_size_lg` on modals — same rounding language, different scale |
| **Rhythm** | Consistent spacing from the 8pt grid | `space_gap_sm` between inline items, `space_gap_md` between card sections, `space_gap_lg` between page regions |
| **Color temperature** | Cool blues dominate the palette | Primary actions are blue, info feedback is blue, nav accent is blue — warm colors reserved only for warnings/danger |
| **Weight** | Light, airy feel with high whitespace | Large padding, generous line-height, light font weights for body, bold only for key headings |
| **Elevation** | Layered depth via shadow | Flat base surfaces, subtle `shadow_box_sm` on cards, pronounced `shadow_box_md` on floating elements |
| **Line** | Thin 1px borders as separators | Present on cards, table rows, nav dividers, input outlines — always the same weight and token color |

**Rules for motifs:**

1. **Establish the motif early.** The first few elements you create define the design language. Subsequent elements must echo it.
2. **Vary intensity, not character.** If the motif is rounded corners, every corner is rounded — but cards get `md`, pills get `full`, modals get `lg`. Never introduce a sharp-cornered element unless there's a deliberate contrast reason.
3. **Limit to 2–3 primary motifs per app.** Too many motifs cancel each other out. Pick shape + rhythm + one of (color temperature | weight | elevation).
4. **Motifs apply to tokens, not elements.** The motif lives in the token values. All elements that use the same token family automatically participate in the motif.
5. **Break the motif only to signal exception.** A sharp-cornered element in a rounded-corner motif screams "I am different." Use this power sparingly — e.g., an error state, a destructive action, a foreign embed.

### The Golden Ratio in Practice

The golden ratio (φ ≈ 1.618) appears in nature, architecture (the Parthenon), photography (rule of thirds ≈ φ), and renaissance painting. In UI, it governs proportional relationships that feel "right" without the user knowing why.

**Type scale:** A φ-based type scale produces sizes that feel naturally hierarchical:

```
base     = 16px
sm       = 16 / 1.618     ≈ 10px
lg       = 16 × 1.618     ≈ 26px
xl       = 16 × 1.618²    ≈ 42px
2xl      = 16 × 1.618³    ≈ 68px
```

**Spacing scale:** Spacing can also follow φ from a base unit:

```
base     = 8px
md       = 8 × 1.618      ≈ 13px → round to 12px (8pt grid)
lg       = 8 × 1.618²     ≈ 21px → round to 24px (8pt grid)
xl       = 8 × 1.618³     ≈ 34px → round to 32px (8pt grid)
```

Round to the nearest 8pt grid value when the ratio produces non-grid numbers.

**Layout proportions:** When splitting a container into two unequal parts (e.g., sidebar + content), use φ:

```
sidebar  = 1 / (1 + 1.618)  ≈ 38.2%
content  = 1.618 / (1 + 1.618) ≈ 61.8%
```

This creates a split that feels balanced without being symmetric. Apply with `flexGrow`, percentage widths, or grid `fr` units.

**Do not force φ everywhere.** Use it as a starting heuristic for proportions, then adjust to the 8pt grid. The goal is harmonious proportion, not mathematical purity.

### Visual Balance

Balance is the distribution of visual weight across a composition. An unbalanced layout creates subconscious tension and makes the user feel that something is "off."

**Types of balance:**

| Type | Description | When to Use |
| --- | --- | --- |
| **Symmetrical** | Equal weight on both sides of a center axis | Forms, login screens, centered landing pages — when formality and stability are desired |
| **Asymmetrical** | Unequal distribution that achieves equilibrium through contrast | Dashboards, content pages — one large element on the left, several smaller elements on the right |
| **Radial** | Elements radiate from a central point | Rare in UI — use for circular menus, loading indicators, or hero focus points |

**Visual weight factors:**

| Factor | Heavier | Lighter |
| --- | --- | --- |
| Size | Large elements | Small elements |
| Color | Dark, saturated, warm | Light, desaturated, cool |
| Density | Dense text blocks, filled shapes | Whitespace, thin outlines |
| Position | Top and left (reading gravity) | Bottom and right |
| Contrast | High-contrast against background | Low-contrast / blended |

**Practical rules:**
- A large image on the left can be balanced by a dense text block + CTA button on the right.
- Generous whitespace on one side balances a heavy element cluster on the other.
- A single bold heading at the top balances an entire list of items below.
- Always check balance at every breakpoint — what's balanced on desktop may collapse unevenly on mobile.

### Focal Point and Visual Flow

Every screen must have exactly **one primary focal point** — the first thing the eye lands on. Everything else exists in service of that focal point.

**Establishing focal point:**

| Technique | How It Works |
| --- | --- |
| **Size** | Make the primary element the largest on the screen |
| **Contrast** | Give it the highest contrast against its background |
| **Color** | Use the most saturated or warmest color |
| **Isolation** | Surround it with generous whitespace |
| **Position** | Place it at a natural eye-entry point (top-left for LTR, center for symmetric layouts) |

**Visual flow patterns — how the eye moves:**

| Pattern | Shape | Use Case |
| --- | --- | --- |
| **F-pattern** | Eye scans across the top, then down the left edge, making shorter horizontal scans | Text-heavy content: articles, documentation, dashboards with sidebar nav |
| **Z-pattern** | Eye moves top-left → top-right → diagonal to bottom-left → bottom-right | Landing pages with minimal content, hero sections, marketing pages |
| **Gutenberg diagram** | Four quadrants: primary optical (top-left), strong fallow (top-right), weak fallow (bottom-left), terminal (bottom-right) | Balanced layouts — place primary CTA in the terminal area (bottom-right) |
| **Center-out** | Eye starts at center and radiates | Modal dialogs, centered forms, confirmation screens |

**Practical rules:**
1. Place the most important content along the natural flow path for the layout type.
2. Use size and weight to create **entry points** — the eye lands there first.
3. Use alignment and spacing to create **directional cues** — the eye follows them.
4. Place the primary CTA at a **terminal point** — where the eye naturally ends its scan.
5. **Never create two competing focal points.** If an element fights the primary for attention, reduce its visual weight.

### Rhythm and Repetition

Rhythm is the predictable repetition of visual elements at regular intervals. It creates a sense of order and makes interfaces scannable.

**Types of rhythm:**

| Type | Description | Example |
| --- | --- | --- |
| **Regular** | Same element, same interval | A list of cards with identical spacing |
| **Alternating** | Two patterns, cycling predictably | Zebra-striped table rows |
| **Progressive** | Interval or scale changes gradually | A type scale where sizes grow by φ at each step |

**Rules:**
1. **Consistent gap = consistent rhythm.** Use a single `space_gap_*` token within any repeated group. Never mix gap sizes within a list, grid, or nav.
2. **Rhythm breaks signal section changes.** A larger gap between groups of items communicates "new section" without needing a visible divider.
3. **Alignment creates invisible rhythm.** Left-align all text in a column. Align all card titles to the same baseline. Rhythm appears even without visible lines connecting them.

### Proximity and Gestalt Grouping

Elements that are **close together** are perceived as belonging to the same group (Gestalt law of proximity). This is the most important layout principle after hierarchy.

**Rules:**
1. **Related items must be closer to each other than to unrelated items.** The gap between a label and its input must be smaller than the gap between two separate form fields.
2. **Spacing encodes relationship.** Within a card: `space_gap_sm` (4–8px) between label and value. Between cards: `space_gap_lg` (24px). Between page sections: `space_gap_xl` (32–48px).
3. **If you need a divider line, your spacing is wrong.** Proper proximity-based grouping eliminates most divider lines. Use dividers only when spacing alone is ambiguous (e.g., dense data tables).
4. **Group size should not exceed 5–7 items** (Miller's Law). Beyond that, create sub-groups.

### Whitespace as a Design Element

Whitespace (negative space) is not "empty" — it is an active structural element. It does the work that borders, backgrounds, and dividers do elsewhere, but with more elegance.

**Functions of whitespace:**

| Function | How |
| --- | --- |
| **Separation** | Space between groups replaces divider lines |
| **Emphasis** | Isolating an element with whitespace increases its visual weight |
| **Breathing room** | Generous padding prevents cognitive overload |
| **Hierarchy** | More whitespace = higher importance (luxury brands use vast whitespace) |

**Rules:**
1. **More whitespace is almost always better.** When in doubt, increase padding and gap by one step on the 8pt grid.
2. **Content density inversely correlates with perceived quality.** Dense = utilitarian. Spacious = premium.
3. **Outer margins ≥ inner margins.** Page padding must be greater than card padding, which must be greater than element spacing within cards. This creates visual nesting.
4. **Never let content touch its container edge.** Every container must have internal padding.

### Contrast and Readability

Contrast is the measurable difference between foreground and background. Insufficient contrast is the #1 accessibility failure and the most common visual design error.

**WCAG requirements:**

| Content Type | Minimum Contrast Ratio | Target |
| --- | --- | --- |
| Body text (< 18px) | 4.5:1 | 7:1 (AAA) |
| Large text (≥ 18px or ≥ 14px bold) | 3:1 | 4.5:1 (AAA) |
| UI components & icons | 3:1 | 4.5:1 |
| Non-essential decorative elements | No requirement | — |

**Practical rules:**
1. **Primary text on primary surface must exceed 7:1.** This is the most common combination — get it right.
2. **Muted/secondary text must still meet 4.5:1.** "Muted" does not mean "invisible."
3. **Text on colored backgrounds requires calculation.** White text on `action_bg_primary` must meet 4.5:1 — verify the pairing.
4. **Dark mode contrast is different.** Pure white (#fff) on dark backgrounds causes halation (glowing edges). Use off-white (#f9fafb, #e5e7eb) as `text_fg_primary` in dark mode.
5. **Suppress contrast for disabled states** — drop to 40-50% opacity, which intentionally fails contrast minimums as a signal that the element is non-interactive.

### Color Psychology and Harmony

Color choices affect perception, mood, and usability beyond mere brand identity.

**Hue associations in UI context:**

| Hue | Perception | UI Role |
| --- | --- | --- |
| Blue | Trust, stability, calm | Primary actions, links, information |
| Green | Success, growth, safety | Confirmation, completed states, positive indicators |
| Red | Urgency, danger, error | Destructive actions, validation errors, critical alerts |
| Amber/Yellow | Caution, attention | Warnings, pending states |
| Violet/Purple | Creativity, premium | Feature highlights, premium tiers (use sparingly) |
| Neutral grays | Professionalism, clarity | Surfaces, borders, secondary text — the backbone of any palette |

**Harmony rules:**
1. **Use one dominant hue** for primary interactions (typically blue). All other hues serve specific semantic roles.
2. **Limit the palette to 1 primary + 4 semantic colors** (success, warning, danger, info) + neutrals. More hues create visual noise.
3. **Saturation decreases with surface area.** Large backgrounds are desaturated or neutral. Small elements (badges, buttons) can be saturated.
4. **Adjacent hues (analogous) create harmony.** Complementary hues (opposite on the wheel) create tension — use only for intentional contrast.
5. **Test every color pairing in both light and dark mode.** What works on white may wash out on dark surfaces.

### Alignment and the Invisible Grid

Every element on screen sits on invisible alignment axes. When elements don't share an edge or center line, the layout feels chaotic — even if no single element is "wrong."

**Rules:**
1. **Establish 1-3 vertical alignment axes per layout.** All left edges, all center lines, or all right edges should snap to these axes.
2. **Text baselines in adjacent columns must align.** If a card title and a sidebar heading are at the same vertical position, their text baselines must be on the same line.
3. **Icons and text must be vertically centered to each other**, not top-aligned. Use `display: 'flex'` + `alignItems: 'center'` for every icon-text pair.
4. **Ragged right edges are acceptable for text.** Do not justify body copy in UI — it creates uneven word spacing. Left-align everything.
5. **Grid tracks create alignment automatically.** Prefer CSS Grid (`display: 'grid'`) over manual positioning for any layout with more than two alignment axes.

### Proportion and Content Density

The relationship between an element's content and its container determines whether it feels cramped, comfortable, or empty.

**Rules:**
1. **Buttons:** Horizontal padding ≥ 2× vertical padding. A button with `padding: '8px 16px'` feels right; `padding: '8px 8px'` feels cramped.
2. **Cards:** Internal padding should be 16-24px. Content should fill 60-80% of the card width (leave some breathing room at the right edge).
3. **Inputs:** Height should be 36-44px for comfortable touch targets (WCAG 2.5.8 target size). Internal padding 8-12px.
4. **Modals:** Max width 480-640px. Internal padding 24-32px. Never let a modal stretch to the full screen width on desktop.
5. **Sidebar navigation:** Width 240-280px. Item padding 8-12px vertical, 16-20px horizontal.
6. **Line length:** Optimal reading length is 45-75 characters per line (≈ 600-800px at 16px). Beyond 80 characters, readability drops sharply. Constrain with `maxWidth`.

### Motion and Transition Principles

Animation in UI is not decoration — it communicates spatial relationships, confirms actions, and guides attention.

**Duration heuristics:**

| Interaction | Duration | Easing |
| --- | --- | --- |
| Hover state change | 100-150ms | `ease-out` |
| Button press feedback | 100ms | `ease-out` |
| Fade in/out | 150-250ms | `ease-out` / `ease-in` |
| Slide or expand | 200-350ms | `ease-out` (enter) / `ease-in` (exit) |
| Page transition | 300-500ms | `ease-in-out` |
| Loading skeleton | 1000-2000ms | `ease-in-out` (looping) |

**Principles:**
1. **Enter fast, exit faster.** Entering elements should take longer than exiting ones. The user's attention should be on what's appearing, not what's leaving.
2. **Elements should enter from where they came from.** A dropdown opens downward. A sidebar slides from the left. A modal fades from center. Never animate from an unexpected direction.
3. **Opacity + transform together.** Combine fade with a subtle translate (4-8px) for entrances. Opacity alone feels flat.
4. **Never animate layout properties** (`width`, `height`, `top`, `left`) — they cause reflow. Animate `transform` and `opacity` only for 60fps performance.
5. **Reduced motion:** Always respect `prefers-reduced-motion`. When active, replace all animation with instant state changes (duration: 0).

---

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

## Decision Checklist — Before Styling Any Element

1. **Did I neutralize browser defaults?** Check the Element-Specific Resets table. Apply `margin: '0'`, `padding: '0'`, and any other required resets for this element type.
2. **Is `boxSizing: 'border-box'` applied?** If the element has explicit width/height/padding/border, it must be border-box.
3. **Does this element participate in the motif?** Does its radius, shadow, spacing, or color temperature echo the 2–3 established motifs?
4. **Is there a clear focal point?** What is the one thing the eye should land on first? Is anything competing with it?
5. **Does the layout follow a flow pattern?** F-pattern for content-heavy, Z-pattern for sparse, center-out for modals.
6. **Is proximity encoding relationship correctly?** Are related items closer together than unrelated items?
7. **Is there enough whitespace?** Outer margins ≥ inner margins. Content not touching container edges.
8. **Does contrast meet WCAG?** ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components.
9. **Is the line length readable?** 45-75 characters per line. Constrain with `maxWidth` if needed.
10. **Are proportions harmonious?** Check element proportions against the golden ratio. Button padding h ≥ 2× v. Cards 60-80% filled.
