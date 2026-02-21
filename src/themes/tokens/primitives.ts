/**
 * LAYER 1: PRIMITIVES (pmt_)
 * Raw measurable values - no references allowed
 */

export type PrimitiveTokens = {
  // --- Color Palette ---
  pmt_color_black: string | number;
  pmt_color_white: string | number;

  // Grays
  pmt_color_gray_50: string | number;
  pmt_color_gray_100: string | number;
  pmt_color_gray_200: string | number;
  pmt_color_gray_300: string | number;
  pmt_color_gray_400: string | number;
  pmt_color_gray_500: string | number;
  pmt_color_gray_600: string | number;
  pmt_color_gray_700: string | number;
  pmt_color_gray_800: string | number;
  pmt_color_gray_900: string | number;
  pmt_color_gray_950: string | number;

  // Blues (Primary)
  pmt_color_blue_50: string | number;
  pmt_color_blue_100: string | number;
  pmt_color_blue_200: string | number;
  pmt_color_blue_300: string | number;
  pmt_color_blue_400: string | number;
  pmt_color_blue_500: string | number;
  pmt_color_blue_600: string | number;
  pmt_color_blue_700: string | number;
  pmt_color_blue_800: string | number;
  pmt_color_blue_900: string | number;
  pmt_color_blue_950: string | number;

  // Greens (Success)
  pmt_color_green_50: string | number;
  pmt_color_green_100: string | number;
  pmt_color_green_200: string | number;
  pmt_color_green_300: string | number;
  pmt_color_green_400: string | number;
  pmt_color_green_500: string | number;
  pmt_color_green_600: string | number;
  pmt_color_green_700: string | number;
  pmt_color_green_800: string | number;
  pmt_color_green_900: string | number;

  // Reds (Error/Danger)
  pmt_color_red_50: string | number;
  pmt_color_red_100: string | number;
  pmt_color_red_200: string | number;
  pmt_color_red_300: string | number;
  pmt_color_red_400: string | number;
  pmt_color_red_500: string | number;
  pmt_color_red_600: string | number;
  pmt_color_red_700: string | number;
  pmt_color_red_800: string | number;
  pmt_color_red_900: string | number;

  // Yellows (Warning)
  pmt_color_yellow_50: string | number;
  pmt_color_yellow_100: string | number;
  pmt_color_yellow_200: string | number;
  pmt_color_yellow_300: string | number;
  pmt_color_yellow_400: string | number;
  pmt_color_yellow_500: string | number;
  pmt_color_yellow_600: string | number;
  pmt_color_yellow_700: string | number;
  pmt_color_yellow_800: string | number;
  pmt_color_yellow_900: string | number;

  // Purples (Accent)
  pmt_color_purple_50: string | number;
  pmt_color_purple_100: string | number;
  pmt_color_purple_200: string | number;
  pmt_color_purple_300: string | number;
  pmt_color_purple_400: string | number;
  pmt_color_purple_500: string | number;
  pmt_color_purple_600: string | number;
  pmt_color_purple_700: string | number;
  pmt_color_purple_800: string | number;
  pmt_color_purple_900: string | number;

  // --- Spacing Scale ---
  pmt_spc_0: string | number;
  pmt_spc_1: string | number; // 0.25rem / 4px
  pmt_spc_2: string | number; // 0.5rem / 8px
  pmt_spc_3: string | number; // 0.75rem / 12px
  pmt_spc_4: string | number; // 1rem / 16px
  pmt_spc_5: string | number; // 1.25rem / 20px
  pmt_spc_6: string | number; // 1.5rem / 24px
  pmt_spc_8: string | number; // 2rem / 32px
  pmt_spc_10: string | number; // 2.5rem / 40px
  pmt_spc_12: string | number; // 3rem / 48px
  pmt_spc_16: string | number; // 4rem / 64px
  pmt_spc_20: string | number; // 5rem / 80px
  pmt_spc_24: string | number; // 6rem / 96px
  pmt_spc_32: string | number; // 8rem / 128px

  // --- Typography ---
  pmt_fnt_family_sans: string | number;
  pmt_fnt_family_serif: string | number;
  pmt_fnt_family_mono: string | number;

  pmt_fnt_siz_10: string | number; // 0.625rem
  pmt_fnt_siz_12: string | number; // 0.75rem
  pmt_fnt_siz_14: string | number; // 0.875rem
  pmt_fnt_siz_16: string | number; // 1rem
  pmt_fnt_siz_18: string | number; // 1.125rem
  pmt_fnt_siz_20: string | number; // 1.25rem
  pmt_fnt_siz_24: string | number; // 1.5rem
  pmt_fnt_siz_30: string | number; // 1.875rem
  pmt_fnt_siz_36: string | number; // 2.25rem
  pmt_fnt_siz_48: string | number; // 3rem
  pmt_fnt_siz_60: string | number; // 3.75rem
  pmt_fnt_siz_72: string | number; // 4.5rem

  pmt_fnt_wgt_thin: string | number; // 100
  pmt_fnt_wgt_extralight: string | number; // 200
  pmt_fnt_wgt_light: string | number; // 300
  pmt_fnt_wgt_regular: string | number; // 400
  pmt_fnt_wgt_medium: string | number; // 500
  pmt_fnt_wgt_semibold: string | number; // 600
  pmt_fnt_wgt_bold: string | number; // 700
  pmt_fnt_wgt_extrabold: string | number; // 800
  pmt_fnt_wgt_black: string | number; // 900

  pmt_lnh_tight: string | number; // 1.25
  pmt_lnh_snug: string | number; // 1.375
  pmt_lnh_normal: string | number; // 1.5
  pmt_lnh_relaxed: string | number; // 1.625
  pmt_lnh_loose: string | number; // 2

  pmt_lsp_tighter: string | number; // -0.05em
  pmt_lsp_tight: string | number; // -0.025em
  pmt_lsp_normal: string | number; // 0
  pmt_lsp_wide: string | number; // 0.025em
  pmt_lsp_wider: string | number; // 0.05em
  pmt_lsp_widest: string | number; // 0.1em

  // --- Border Radius ---
  pmt_rad_0: string | number;
  pmt_rad_2: string | number;
  pmt_rad_4: string | number;
  pmt_rad_6: string | number;
  pmt_rad_8: string | number;
  pmt_rad_12: string | number;
  pmt_rad_16: string | number;
  pmt_rad_20: string | number;
  pmt_rad_24: string | number;
  pmt_rad_full: string | number;

  // --- Border Width ---
  pmt_bdr_wdt_0: string | number;
  pmt_bdr_wdt_1: string | number;
  pmt_bdr_wdt_2: string | number;
  pmt_bdr_wdt_4: string | number;
  pmt_bdr_wdt_8: string | number;

  // --- Opacity ---
  pmt_opac_0: string | number;
  pmt_opac_5: string | number;
  pmt_opac_10: string | number;
  pmt_opac_20: string | number;
  pmt_opac_30: string | number;
  pmt_opac_40: string | number;
  pmt_opac_50: string | number;
  pmt_opac_60: string | number;
  pmt_opac_70: string | number;
  pmt_opac_80: string | number;
  pmt_opac_90: string | number;
  pmt_opac_95: string | number;
  pmt_opac_100: string | number;

  // --- Timing/Duration ---
  pmt_dur_instant: string | number; // 0ms
  pmt_dur_fast: string | number; // 100ms
  pmt_dur_normal: string | number; // 200ms
  pmt_dur_moderate: string | number; // 300ms
  pmt_dur_slow: string | number; // 500ms
  pmt_dur_slower: string | number; // 700ms
  pmt_dur_slowest: string | number; // 1000ms

  // --- Easing Functions ---
  pmt_eas_linear: string | number;
  pmt_eas_in: string | number;
  pmt_eas_out: string | number;
  pmt_eas_in_out: string | number;
  pmt_eas_in_back: string | number;
  pmt_eas_out_back: string | number;
  pmt_eas_in_out_back: string | number;

  // --- Z-Index ---
  pmt_zix_0: string | number;
  pmt_zix_10: string | number;
  pmt_zix_20: string | number;
  pmt_zix_30: string | number;
  pmt_zix_40: string | number;
  pmt_zix_50: string | number;
  pmt_zix_mod: string | number; // modal: 1000
  pmt_zix_pop: string | number; // popover: 1100
  pmt_zix_tip: string | number; // tooltip: 1200
  pmt_zix_tst: string | number; // toast: 1300
};
