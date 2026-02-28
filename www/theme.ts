// theme.ts
import { useThemeState, useTokenState } from '../src/registry';

// Single source of truth for current theme
export const theme = useThemeState('dark');

// ═══════════════════════════════════════════════
// SURFACES
// ═══════════════════════════════════════════════

// — Surface: primary background
// USE: main page background, body
// AVOID: cards, panels
export const surface_bg_primary = useTokenState('#f0f0f0', '#111113', theme);

// — Surface: secondary background (elevated panels)
// USE: cards, panels, main containers
// AVOID: full-page backgrounds
export const surface_bg_secondary = useTokenState('#fafafa', '#1a1a1c', theme);

// — Surface: tertiary background (hover, nested sections)
// USE: hover rows, nested sections, code blocks
// AVOID: primary content areas
export const surface_bg_tertiary = useTokenState('#ececec', '#222224', theme);

// — Surface: code block background
// USE: code examples, pre blocks
// AVOID: regular content
export const surface_bg_code = useTokenState('#1e1e20', '#0d0d0f', theme);

// — Surface: nav background
// USE: navigation header, sticky bar
// AVOID: content sections
export const surface_bg_nav = useTokenState('rgba(240,240,240,0.92)', 'rgba(17,17,19,0.92)', theme);

// — Surface: card glow overlay
// USE: feature card backgrounds with glow
// AVOID: standard sections
export const surface_bg_card = useTokenState(
  'rgba(120,120,130,0.04)',
  'rgba(120,120,130,0.06)',
  theme,
);

// ═══════════════════════════════════════════════
// ACCENTS (muted grays)
// ═══════════════════════════════════════════════

// — Accent: muted pink-gray (primary CTA)
// USE: primary buttons, hero emphasis, links
// AVOID: body text, muted elements
export const accent_neon_pink = useTokenState('#8a7580', '#a08a92', theme);

// — Accent: muted cyan-gray (secondary accent)
// USE: secondary highlights, code keywords, borders
// AVOID: primary CTAs
export const accent_neon_cyan = useTokenState('#6a7d80', '#8a9a9c', theme);

// — Accent: muted purple-gray (tertiary accent)
// USE: gradient stops, glow effects, feature icons
// AVOID: readable text
export const accent_neon_purple = useTokenState('#6a6078', '#9088a0', theme);

// — Accent: muted blue-gray (links, interactive)
// USE: links, active nav items
// AVOID: non-interactive elements
export const accent_electric_blue = useTokenState('#5a6070', '#706880', theme);

// — Accent: muted warm gray (warning / attention)
// USE: badges, callouts
// AVOID: primary actions
export const accent_warm_orange = useTokenState('#8a7a6e', '#a09080', theme);

// ═══════════════════════════════════════════════
// TEXT
// ═══════════════════════════════════════════════

// — Text: primary foreground
// USE: body copy, headings
// AVOID: muted or placeholder text
export const text_fg_primary = useTokenState('#1a1a1e', '#d8d8dc', theme);

// — Text: secondary foreground
// USE: labels, descriptions, secondary info
// AVOID: headings
export const text_fg_secondary = useTokenState('#4a4a50', '#8a8a8e', theme);

// — Text: muted foreground
// USE: placeholders, disabled text, metadata
// AVOID: readable body text
export const text_fg_muted = useTokenState('#909094', '#505054', theme);

// — Text: code / mono foreground
// USE: inline code, code blocks
// AVOID: body text
export const text_fg_code = useTokenState('#8a7580', '#a08a92', theme);

// — Text: hero gradient (display text)
// USE: hero title gradient
// AVOID: body copy
export const text_gradient_hero = useTokenState('black', 'white', theme);

// — Text: section heading gradient
// USE: section titles
// AVOID: body text
export const text_gradient_heading = useTokenState('transparent', 'transparent', theme);

// ═══════════════════════════════════════════════
// BORDERS
// ═══════════════════════════════════════════════

// — Border: primary (subtle dividers)
// USE: card borders, section dividers
// AVOID: emphasis borders
export const border_color_primary = useTokenState(
  'rgba(120,120,130,0.12)',
  'rgba(120,120,130,0.18)',
  theme,
);

// — Border: accent glow
// USE: focused elements, active cards
// AVOID: standard dividers
export const border_color_accent = useTokenState(
  'rgba(138,117,128,0.25)',
  'rgba(160,138,146,0.25)',
  theme,
);

// — Border: cyan glow
// USE: code blocks, active nav
// AVOID: standard dividers
export const border_color_cyan = useTokenState(
  'rgba(106,125,128,0.25)',
  'rgba(138,154,156,0.18)',
  theme,
);

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

// — Nav: active link color
// USE: active navigation item
// AVOID: inactive items
export const nav_fg_active = useTokenState('#8a7580', '#a08a92', theme);

// — Nav: default link color
// USE: inactive nav items
// AVOID: active items
export const nav_fg_default = useTokenState('#4a4a50', '#8a8a8e', theme);

// — Nav: hover link color
// USE: hovered nav items
// AVOID: default/active items
export const nav_fg_hover = useTokenState('#6a6078', '#9088a0', theme);

// ═══════════════════════════════════════════════
// SPACING (8pt grid)
// ═══════════════════════════════════════════════

// — Space: extra small (4px)
export const space_padding_xs = useTokenState('4px', '4px', theme);

// — Space: small (8px)
export const space_padding_sm = useTokenState('8px', '8px', theme);

// — Space: medium (16px)
export const space_padding_md = useTokenState('16px', '16px', theme);

// — Space: large (24px)
export const space_padding_lg = useTokenState('24px', '24px', theme);

// — Space: extra large (32px)
export const space_padding_xl = useTokenState('32px', '32px', theme);

// — Space: 2xl (48px)
export const space_padding_2xl = useTokenState('48px', '48px', theme);

// — Space: 3xl (64px)
export const space_padding_3xl = useTokenState('64px', '64px', theme);

// — Space: 4xl (96px)
export const space_padding_4xl = useTokenState('96px', '96px', theme);

// — Space: small gap (8px)
export const space_gap_sm = useTokenState('8px', '8px', theme);

// — Space: medium gap (16px)
export const space_gap_md = useTokenState('16px', '16px', theme);

// — Space: large gap (24px)
export const space_gap_lg = useTokenState('24px', '24px', theme);

// — Space: xl gap (32px)
export const space_gap_xl = useTokenState('32px', '32px', theme);

// — Space: 2xl gap (48px)
export const space_gap_2xl = useTokenState('48px', '48px', theme);

// ═══════════════════════════════════════════════
// RADII
// ═══════════════════════════════════════════════

// — Radius: small (6px)
export const radius_size_sm = useTokenState('6px', '6px', theme);

// — Radius: medium (12px)
export const radius_size_md = useTokenState('12px', '12px', theme);

// — Radius: large (16px)
export const radius_size_lg = useTokenState('16px', '16px', theme);

// — Radius: xl (24px)
export const radius_size_xl = useTokenState('24px', '24px', theme);

// — Radius: full (pill)
export const radius_size_full = useTokenState('9999px', '9999px', theme);

// ═══════════════════════════════════════════════
// SHADOWS (muted)
// ═══════════════════════════════════════════════

// — Shadow: subtle lift
// USE: cards, buttons
export const shadow_box_sm = useTokenState(
  '0 2px 8px rgba(0,0,0,0.06)',
  '0 2px 8px rgba(0,0,0,0.3)',
  theme,
);

// — Shadow: medium elevation
// USE: floating panels, dropdowns
export const shadow_box_md = useTokenState(
  '0 4px 16px rgba(0,0,0,0.08)',
  '0 4px 16px rgba(0,0,0,0.4)',
  theme,
);

// — Shadow: muted pink glow
// USE: primary CTA buttons, hero emphasis
export const shadow_glow_pink = useTokenState(
  '0 0 20px rgba(138,117,128,0.08)',
  '0 0 30px rgba(160,138,146,0.12)',
  theme,
);

// — Shadow: muted cyan glow
// USE: code blocks, secondary elements
export const shadow_glow_cyan = useTokenState(
  '0 0 20px rgba(106,125,128,0.06)',
  '0 0 30px rgba(138,154,156,0.08)',
  theme,
);

// — Shadow: muted purple glow
// USE: feature cards, highlighted sections
export const shadow_glow_purple = useTokenState(
  '0 0 20px rgba(106,96,120,0.06)',
  '0 0 30px rgba(144,136,160,0.08)',
  theme,
);

// — Shadow: large card glow
// USE: hero container, major feature cards
export const shadow_glow_lg = useTokenState(
  '0 8px 32px rgba(106,96,120,0.05), 0 0 1px rgba(0,0,0,0.05)',
  '0 8px 32px rgba(120,120,130,0.08), 0 0 60px rgba(160,138,146,0.03)',
  theme,
);

// ═══════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════

// — Type: xs (10px)
export const type_size_xs = useTokenState('10px', '10px', theme);

// — Type: sm (12px)
export const type_size_sm = useTokenState('12px', '12px', theme);

// — Type: base (13px)
export const type_size_base = useTokenState('13px', '13px', theme);

// — Type: md (14px)
export const type_size_md = useTokenState('14px', '14px', theme);

// — Type: lg (16px)
export const type_size_lg = useTokenState('16px', '16px', theme);

// — Type: xl (20px)
export const type_size_xl = useTokenState('20px', '20px', theme);

// — Type: 2xl (24px)
export const type_size_2xl = useTokenState('24px', '24px', theme);

// — Type: 3xl (30px)
export const type_size_3xl = useTokenState('30px', '30px', theme);

// — Type: bold (700)
export const type_weight_bold = useTokenState('700', '700', theme);

// — Type: semibold (600)
export const type_weight_semibold = useTokenState('600', '600', theme);

// — Type: medium (500)
export const type_weight_medium = useTokenState('500', '500', theme);

// — Type: regular (400)
export const type_weight_regular = useTokenState('400', '400', theme);

// — Type: light (300)
export const type_weight_light = useTokenState('300', '300', theme);

// — Type: thin (200)
export const type_weight_thin = useTokenState('200', '200', theme);

// ═══════════════════════════════════════════════
// TRANSITIONS
// ═══════════════════════════════════════════════

// — Transition: fast (150ms)
export const transition_fast = useTokenState('all 0.15s ease', 'all 0.15s ease', theme);

// — Transition: medium (300ms)
export const transition_medium = useTokenState('all 0.3s ease', 'all 0.3s ease', theme);

// — Transition: slow (500ms)
export const transition_slow = useTokenState('all 0.5s ease', 'all 0.5s ease', theme);

// — Transition: color only (300ms)
export const transition_color = useTokenState('color 0.3s ease', 'color 0.3s ease', theme);

// ═══════════════════════════════════════════════
// GRADIENTS (muted)
// ═══════════════════════════════════════════════

// — Gradient: hero section background
// USE: hero section
export const gradient_hero = useTokenState(
  'radial-gradient(ellipse at 50% 0%, rgba(106,96,120,0.04) 0%, transparent 70%)',
  'radial-gradient(ellipse at 50% 0%, rgba(120,120,130,0.08) 0%, transparent 70%)',
  theme,
);

// — Gradient: horizon line
// USE: decorative horizon effect
export const gradient_horizon = useTokenState(
  'linear-gradient(0deg, rgba(138,117,128,0.04) 0%, transparent 40%)',
  'linear-gradient(0deg, rgba(160,138,146,0.06) 0%, transparent 40%)',
  theme,
);

// — Gradient: card shine
// USE: subtle card overlay effect
export const gradient_card = useTokenState(
  'linear-gradient(135deg, rgba(106,96,120,0.02) 0%, rgba(138,117,128,0.02) 100%)',
  'linear-gradient(135deg, rgba(120,120,130,0.03) 0%, rgba(160,138,146,0.02) 100%)',
  theme,
);
