// theme.ts
import { useThemeState, useTokenState } from '../../src/registry';

// Single source of truth for current theme
export const theme = useThemeState('light');

// ═══════════════════════════════════════════════
// SURFACES
// ═══════════════════════════════════════════════

// — Surface: primary background
// USE: main page background, body
// AVOID: cards, panels
export const surface_bg_primary = useTokenState('#f0f2f5', '#0d1117', theme);

// — Surface: secondary background
// USE: cards, panels, main app container
// AVOID: full-page backgrounds
export const surface_bg_secondary = useTokenState('#ffffff', '#161b22', theme);

// — Surface: tertiary background
// USE: hover rows, nested sections, input backgrounds
// AVOID: primary content areas
export const surface_bg_tertiary = useTokenState('#f6f8fa', '#1c2128', theme);

// — Surface: input background
// USE: text inputs, search fields
// AVOID: buttons, cards
export const surface_bg_input = useTokenState('#f6f8fa', '#0d1117', theme);

// ═══════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════

// — Action: primary button background
// USE: primary CTA buttons
// AVOID: non-interactive surfaces
export const action_bg_primary = useTokenState('#2563eb', '#388bfd', theme);

// — Action: primary button hover background
// USE: hover state for primary buttons
// AVOID: default state
export const action_bg_hover = useTokenState('#1d4ed8', '#58a6ff', theme);

// — Action: primary foreground (text on primary bg)
// USE: text on primary action buttons
// AVOID: body text
export const action_fg_primary = useTokenState('#ffffff', '#ffffff', theme);

// — Action: danger foreground
// USE: delete buttons, destructive icon color
// AVOID: non-destructive actions
export const action_fg_danger = useTokenState('#dc2626', '#f85149', theme);

// — Action: danger hover foreground
// USE: hover state for danger icons/buttons
// AVOID: default state
export const action_fg_danger_hover = useTokenState('#b91c1c', '#ff7b72', theme);

// ═══════════════════════════════════════════════
// TEXT
// ═══════════════════════════════════════════════

// — Text: primary foreground
// USE: body copy, headings, todo text
// AVOID: muted or placeholder text
export const text_fg_primary = useTokenState('#1f2328', '#e6edf3', theme);

// — Text: secondary foreground
// USE: labels, counts, secondary info
// AVOID: primary headings
export const text_fg_secondary = useTokenState('#656d76', '#8b949e', theme);

// — Text: muted foreground
// USE: placeholders, disabled text, completed todos
// AVOID: primary or secondary text
export const text_fg_muted = useTokenState('#afb8c1', '#484f58', theme);

// — Text: brand/accent foreground
// USE: header title accent color
// AVOID: body text
export const text_fg_accent = useTokenState('#2563eb', '#388bfd', theme);

// ═══════════════════════════════════════════════
// BORDERS
// ═══════════════════════════════════════════════

// — Border: primary color
// USE: card borders, dividers, separators
// AVOID: decorative elements
export const border_color_primary = useTokenState('#d0d7de', '#30363d', theme);

// — Border: secondary (subtle) color
// USE: inner dividers, row separators
// AVOID: prominent boundaries
export const border_color_secondary = useTokenState('#e8ebef', '#21262d', theme);

// — Border: accent color
// USE: focused inputs, active states
// AVOID: standard borders
export const border_color_accent = useTokenState('#2563eb', '#388bfd', theme);

// ═══════════════════════════════════════════════
// NAVIGATION / FILTERS
// ═══════════════════════════════════════════════

// — Nav: active background
// USE: active filter button
// AVOID: inactive filter buttons
export const nav_bg_active = useTokenState('#2563eb', '#388bfd', theme);

// — Nav: active foreground
// USE: text on active filter button
// AVOID: inactive filter text
export const nav_fg_active = useTokenState('#ffffff', '#ffffff', theme);

// — Nav: default background
// USE: inactive filter buttons
// AVOID: active filter buttons
export const nav_bg_default = useTokenState('#f0f2f5', '#21262d', theme);

// — Nav: default foreground
// USE: inactive filter button text
// AVOID: active filter text
export const nav_fg_default = useTokenState('#656d76', '#8b949e', theme);

// — Nav: default hover background
// USE: hover state for inactive filter buttons
// AVOID: active filter buttons
export const nav_bg_hover = useTokenState('#e1e4e8', '#30363d', theme);

// ═══════════════════════════════════════════════
// CHECKBOX / TOGGLE
// ═══════════════════════════════════════════════

// — Checkbox: unchecked border color
// USE: unchecked todo checkbox border
// AVOID: checked state
export const checkbox_border_default = useTokenState('#d0d7de', '#30363d', theme);

// — Checkbox: checked background color
// USE: checked checkbox fill
// AVOID: unchecked state
export const checkbox_bg_checked = useTokenState('#2563eb', '#388bfd', theme);

// — Checkbox: checkmark color
// USE: checkmark icon on checked checkbox
// AVOID: unchecked state
export const checkbox_fg_checked = useTokenState('#ffffff', '#ffffff', theme);

// ═══════════════════════════════════════════════
// FEEDBACK
// ═══════════════════════════════════════════════

// — Feedback: success background
// USE: completed indicator, success badges
// AVOID: non-success states
export const feedback_bg_success = useTokenState('#dcfce7', '#064e3b', theme);

// ═══════════════════════════════════════════════
// SPACING
// ═══════════════════════════════════════════════

// — Space: extra small padding (4px)
// USE: tight inline spacing, checkbox padding
// AVOID: section padding
export const space_padding_xs = useTokenState('4px', '4px', theme);

// — Space: small padding (8px)
// USE: button padding, compact spacing
// AVOID: section padding
export const space_padding_sm = useTokenState('8px', '8px', theme);

// — Space: medium padding (16px)
// USE: card padding, section padding
// AVOID: tight inline spacing
export const space_padding_md = useTokenState('16px', '16px', theme);

// — Space: large padding (24px)
// USE: page-level padding, header padding
// AVOID: compact elements
export const space_padding_lg = useTokenState('24px', '24px', theme);

// — Space: extra large padding (32px)
// USE: hero sections, generous spacing, desktop padding
// AVOID: compact layouts
export const space_padding_xl = useTokenState('32px', '32px', theme);

// — Space: 2x large padding (48px)
// USE: major section breaks, empty state padding
// AVOID: tight layouts
export const space_padding_2xl = useTokenState('48px', '48px', theme);

// — Space: small gap (8px)
// USE: tight gaps between inline elements
// AVOID: section-level gaps
export const space_gap_sm = useTokenState('8px', '8px', theme);

// — Space: medium gap (12px)
// USE: gap between list items, flex children
// AVOID: tight inline gaps
export const space_gap_md = useTokenState('12px', '12px', theme);

// — Space: large gap (16px)
// USE: gap between cards, sections
// AVOID: tight inline gaps
export const space_gap_lg = useTokenState('16px', '16px', theme);

// ═══════════════════════════════════════════════
// RADII
// ═══════════════════════════════════════════════

// — Radius: small (6px)
// USE: buttons, tags, small inputs
// AVOID: large cards or modals
export const radius_size_sm = useTokenState('6px', '6px', theme);

// — Radius: medium (10px)
// USE: cards, inputs, panels
// AVOID: pill shapes
export const radius_size_md = useTokenState('10px', '10px', theme);

// — Radius: large (16px)
// USE: main container, modals
// AVOID: small elements
export const radius_size_lg = useTokenState('16px', '16px', theme);

// — Radius: full (9999px)
// USE: pills, avatar circles, round buttons, filter chips
// AVOID: rectangular containers
export const radius_size_full = useTokenState('9999px', '9999px', theme);

// ═══════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════

// — Shadow: small elevation
// USE: buttons, subtle lifts
// AVOID: large containers
export const shadow_box_sm = useTokenState(
  '0 1px 2px rgba(0,0,0,0.05)',
  '0 1px 2px rgba(0,0,0,0.3)',
  theme,
);

// — Shadow: medium elevation
// USE: floating cards, dropdowns
// AVOID: flat inline elements
export const shadow_box_md = useTokenState(
  '0 4px 12px rgba(0,0,0,0.08)',
  '0 4px 12px rgba(0,0,0,0.3)',
  theme,
);

// — Shadow: large elevation
// USE: main app container, hero card
// AVOID: inline elements
export const shadow_box_lg = useTokenState(
  '0 8px 30px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.06)',
  '0 8px 30px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.2)',
  theme,
);

// ═══════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════

// — Type: extra small font size (12px)
// USE: fine print, badges
// AVOID: readable body text
export const type_size_xs = useTokenState('12px', '12px', theme);

// — Type: small font size (13px)
// USE: captions, counts, metadata, footer text
// AVOID: primary text
export const type_size_sm = useTokenState('13px', '13px', theme);

// — Type: base font size (15px)
// USE: body text, todo items
// AVOID: headings
export const type_size_base = useTokenState('15px', '15px', theme);

// — Type: medium font size (18px)
// USE: input text, prominent body
// AVOID: headings
export const type_size_md = useTokenState('18px', '18px', theme);

// — Type: large font size (24px)
// USE: section headings
// AVOID: body text
export const type_size_lg = useTokenState('24px', '24px', theme);

// — Type: extra large font size (40px)
// USE: page title, hero heading
// AVOID: body text
export const type_size_xl = useTokenState('40px', '40px', theme);

// — Type: bold weight (600)
// USE: headings, emphasis
// AVOID: body text
export const type_weight_bold = useTokenState('600', '600', theme);

// — Type: medium weight (500)
// USE: labels, sub-headings, filter buttons
// AVOID: body text
export const type_weight_medium = useTokenState('500', '500', theme);

// — Type: regular weight (400)
// USE: body text
// AVOID: headings
export const type_weight_regular = useTokenState('400', '400', theme);

// — Type: light weight (300)
// USE: hero title, light display text
// AVOID: body text, small sizes
export const type_weight_light = useTokenState('300', '300', theme);

// ═══════════════════════════════════════════════
// TRANSITIONS
// ═══════════════════════════════════════════════

// — Transition: fast (150ms)
// USE: hover states, small visual changes
// AVOID: major layout shifts
export const transition_fast = useTokenState('all 0.15s ease', 'all 0.15s ease', theme);

// — Transition: medium (250ms)
// USE: color transitions, theme switching
// AVOID: instant feedback elements
export const transition_medium = useTokenState('all 0.25s ease', 'all 0.25s ease', theme);
