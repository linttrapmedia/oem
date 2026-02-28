// theme.ts
import { useThemeState, useTokenState } from '../../src/registry';

// Single source of truth for current theme — defaults to dark
export const theme = useThemeState('dark');

// ═══════════════════════════════════════════════
// SURFACES
// ═══════════════════════════════════════════════

// — Surface: page background
// USE: body / root background
// AVOID: cards, panels
export const surface_bg_primary = useTokenState('#f0f2f5', '#0d1117', theme);

// — Surface: card / container background
// USE: main todo container, cards
// AVOID: full page backgrounds
export const surface_bg_card = useTokenState(
  'rgba(255, 255, 255, 0.7)',
  'rgba(22, 27, 34, 0.8)',
  theme,
);

// — Surface: input background
// USE: text inputs, search bars
// AVOID: buttons, cards
export const surface_bg_input = useTokenState(
  'rgba(255, 255, 255, 0.9)',
  'rgba(30, 37, 46, 0.9)',
  theme,
);

// — Surface: todo item background
// USE: individual todo rows
// AVOID: buttons, header
export const surface_bg_item = useTokenState(
  'rgba(255, 255, 255, 0.6)',
  'rgba(22, 27, 34, 0.6)',
  theme,
);

// — Surface: todo item hover
// USE: hovered todo row
// AVOID: active/pressed states
export const surface_bg_item_hover = useTokenState(
  'rgba(255, 255, 255, 0.9)',
  'rgba(30, 37, 46, 0.9)',
  theme,
);

// — Surface: completed todo overlay
// USE: completed todo background
// AVOID: active items
export const surface_bg_completed = useTokenState(
  'rgba(0, 0, 0, 0.02)',
  'rgba(0, 0, 0, 0.15)',
  theme,
);

// ═══════════════════════════════════════════════
// ACCENTS
// ═══════════════════════════════════════════════

// — Accent: primary (vibrant purple-blue)
// USE: primary action buttons, focus rings, active states
// AVOID: body text, muted elements
export const accent_primary = useTokenState('#6366f1', '#818cf8', theme);

// — Accent: primary hover
// USE: hovered primary buttons
// AVOID: non-interactive
export const accent_primary_hover = useTokenState('#4f46e5', '#6366f1', theme);

// — Accent: success (green)
// USE: completed checkmarks, success feedback
// AVOID: errors, warnings
export const accent_success = useTokenState('#22c55e', '#34d399', theme);

// — Accent: success glow
// USE: glow behind check animation
// AVOID: standard elements
export const accent_success_glow = useTokenState(
  'rgba(34, 197, 94, 0.3)',
  'rgba(52, 211, 153, 0.3)',
  theme,
);

// — Accent: danger (red)
// USE: delete buttons, destructive actions
// AVOID: standard actions
export const accent_danger = useTokenState('#ef4444', '#f87171', theme);

// — Accent: danger hover
// USE: hovered delete actions
// AVOID: non-interactive
export const accent_danger_hover = useTokenState('#dc2626', '#ef4444', theme);

// — Accent: gradient start
// USE: header gradient left
// AVOID: text
export const accent_gradient_start = useTokenState('#6366f1', '#6366f1', theme);

// — Accent: gradient end
// USE: header gradient right
// AVOID: text
export const accent_gradient_end = useTokenState('#a855f7', '#a855f7', theme);

// ═══════════════════════════════════════════════
// TEXT
// ═══════════════════════════════════════════════

// — Text: primary foreground
// USE: body text, headings, todo text
// AVOID: muted or disabled text
export const text_fg_primary = useTokenState('#1e293b', '#e2e8f0', theme);

// — Text: secondary foreground
// USE: labels, descriptions, counts
// AVOID: headings, primary text
export const text_fg_secondary = useTokenState('#64748b', '#94a3b8', theme);

// — Text: muted foreground
// USE: placeholders, disabled text, timestamps
// AVOID: readable body text
export const text_fg_muted = useTokenState('#94a3b8', '#475569', theme);

// — Text: on accent foreground
// USE: text on accent-colored backgrounds (buttons)
// AVOID: text on light/dark surfaces
export const text_fg_on_accent = useTokenState('#ffffff', '#ffffff', theme);

// — Text: completed / struck-through
// USE: completed todo text
// AVOID: active items
export const text_fg_completed = useTokenState('#94a3b8', '#475569', theme);

// ═══════════════════════════════════════════════
// BORDERS
// ═══════════════════════════════════════════════

// — Border: primary
// USE: cards, inputs, dividers
// AVOID: accented borders
export const border_color_primary = useTokenState(
  'rgba(0, 0, 0, 0.08)',
  'rgba(255, 255, 255, 0.06)',
  theme,
);

// — Border: input
// USE: input borders, form elements
// AVOID: decorative borders
export const border_color_input = useTokenState(
  'rgba(0, 0, 0, 0.12)',
  'rgba(255, 255, 255, 0.1)',
  theme,
);

// — Border: input focus
// USE: focused input border
// AVOID: standard borders
export const border_color_focus = useTokenState(
  'rgba(99, 102, 241, 0.5)',
  'rgba(129, 140, 248, 0.5)',
  theme,
);

// ═══════════════════════════════════════════════
// SPACING
// ═══════════════════════════════════════════════

// — Space: inner padding (xs)
// USE: tight inner padding
export const space_padding_xs = useTokenState('4px', '4px', theme);

// — Space: inner padding (sm)
// USE: small padding in compact elements
export const space_padding_sm = useTokenState('8px', '8px', theme);

// — Space: inner padding (md)
// USE: standard card/section padding
export const space_padding_md = useTokenState('16px', '16px', theme);

// — Space: inner padding (lg)
// USE: larger section padding
export const space_padding_lg = useTokenState('24px', '24px', theme);

// — Space: inner padding (xl)
// USE: hero area, major sections
export const space_padding_xl = useTokenState('32px', '32px', theme);

// — Space: inner padding (2xl)
// USE: page-level horizontal padding
export const space_padding_2xl = useTokenState('48px', '48px', theme);

// — Space: gap (sm)
// USE: compact flex/grid spacing
export const space_gap_sm = useTokenState('8px', '8px', theme);

// — Space: gap (md)
// USE: standard flex/grid spacing
export const space_gap_md = useTokenState('12px', '12px', theme);

// — Space: gap (lg)
// USE: section-level spacing
export const space_gap_lg = useTokenState('16px', '16px', theme);

// ═══════════════════════════════════════════════
// RADII
// ═══════════════════════════════════════════════

// — Radius: small
// USE: checkboxes, small buttons
export const radius_sm = useTokenState('6px', '6px', theme);

// — Radius: medium
// USE: inputs, todo items, cards
export const radius_md = useTokenState('12px', '12px', theme);

// — Radius: large
// USE: main container, modals
export const radius_lg = useTokenState('20px', '20px', theme);

// — Radius: full / pill
// USE: round buttons, badges, filter pills
export const radius_full = useTokenState('9999px', '9999px', theme);

// ═══════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════

// — Shadow: card
// USE: elevated card container
// AVOID: flat items
export const shadow_card = useTokenState(
  '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
  '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
  theme,
);

// — Shadow: item hover
// USE: hovered todo item
export const shadow_item_hover = useTokenState(
  '0 4px 12px rgba(0, 0, 0, 0.06)',
  '0 4px 12px rgba(0, 0, 0, 0.2)',
  theme,
);

// — Shadow: accent glow
// USE: accent-colored glow on focus/hover
export const shadow_accent_glow = useTokenState(
  '0 0 20px rgba(99, 102, 241, 0.15)',
  '0 0 20px rgba(129, 140, 248, 0.15)',
  theme,
);

// — Shadow: button
// USE: action buttons
export const shadow_button = useTokenState(
  '0 2px 8px rgba(99, 102, 241, 0.25)',
  '0 2px 8px rgba(129, 140, 248, 0.25)',
  theme,
);

// ═══════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════

// — Type: heading size
export const type_size_heading = useTokenState('28px', '28px', theme);

// — Type: body size
export const type_size_body = useTokenState('15px', '15px', theme);

// — Type: small size
export const type_size_small = useTokenState('13px', '13px', theme);

// — Type: tiny size
export const type_size_tiny = useTokenState('11px', '11px', theme);

// — Type: weight normal
export const type_weight_normal = useTokenState('400', '400', theme);

// — Type: weight medium
export const type_weight_medium = useTokenState('500', '500', theme);

// — Type: weight semibold
export const type_weight_semibold = useTokenState('600', '600', theme);

// — Type: weight bold
export const type_weight_bold = useTokenState('700', '700', theme);

// ═══════════════════════════════════════════════
// TRANSITIONS
// ═══════════════════════════════════════════════

// — Transition: fast (hover effects)
export const transition_fast = useTokenState('all 0.15s ease', 'all 0.15s ease', theme);

// — Transition: medium (state changes)
export const transition_medium = useTokenState('all 0.3s ease', 'all 0.3s ease', theme);

// — Transition: theme change
export const transition_theme = useTokenState(
  'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
  'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
  theme,
);

// ═══════════════════════════════════════════════
// BACKDROP
// ═══════════════════════════════════════════════

// — Backdrop: glassmorphism blur
// USE: cards with glass effect
export const backdrop_blur = useTokenState('blur(20px)', 'blur(20px)', theme);
