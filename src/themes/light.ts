import { DesignTokens } from '@/themes/tokens';

export const lightTheme: DesignTokens = {
  // ============================================================================
  // LAYER 1: PRIMITIVES (pmt_)
  // ============================================================================

  // --- Color Palette ---
  pmt_color_black: '#000000',
  pmt_color_white: '#ffffff',

  // Grays
  pmt_color_gray_50: '#fafafa',
  pmt_color_gray_100: '#f5f5f5',
  pmt_color_gray_200: '#e5e5e5',
  pmt_color_gray_300: '#d4d4d4',
  pmt_color_gray_400: '#a3a3a3',
  pmt_color_gray_500: '#737373',
  pmt_color_gray_600: '#525252',
  pmt_color_gray_700: '#404040',
  pmt_color_gray_800: '#262626',
  pmt_color_gray_900: '#171717',
  pmt_color_gray_950: '#0a0a0a',

  // Blues (Primary)
  pmt_color_blue_50: '#eff6ff',
  pmt_color_blue_100: '#dbeafe',
  pmt_color_blue_200: '#bfdbfe',
  pmt_color_blue_300: '#93c5fd',
  pmt_color_blue_400: '#60a5fa',
  pmt_color_blue_500: '#3b82f6',
  pmt_color_blue_600: '#2563eb',
  pmt_color_blue_700: '#1d4ed8',
  pmt_color_blue_800: '#1e40af',
  pmt_color_blue_900: '#1e3a8a',
  pmt_color_blue_950: '#172554',

  // Greens (Success)
  pmt_color_green_50: '#f0fdf4',
  pmt_color_green_100: '#dcfce7',
  pmt_color_green_200: '#bbf7d0',
  pmt_color_green_300: '#86efac',
  pmt_color_green_400: '#4ade80',
  pmt_color_green_500: '#22c55e',
  pmt_color_green_600: '#16a34a',
  pmt_color_green_700: '#15803d',
  pmt_color_green_800: '#166534',
  pmt_color_green_900: '#14532d',

  // Reds (Error/Danger)
  pmt_color_red_50: '#fef2f2',
  pmt_color_red_100: '#fee2e2',
  pmt_color_red_200: '#fecaca',
  pmt_color_red_300: '#fca5a5',
  pmt_color_red_400: '#f87171',
  pmt_color_red_500: '#ef4444',
  pmt_color_red_600: '#dc2626',
  pmt_color_red_700: '#b91c1c',
  pmt_color_red_800: '#991b1b',
  pmt_color_red_900: '#7f1d1d',

  // Yellows (Warning)
  pmt_color_yellow_50: '#fefce8',
  pmt_color_yellow_100: '#fef9c3',
  pmt_color_yellow_200: '#fef08a',
  pmt_color_yellow_300: '#fde047',
  pmt_color_yellow_400: '#facc15',
  pmt_color_yellow_500: '#eab308',
  pmt_color_yellow_600: '#ca8a04',
  pmt_color_yellow_700: '#a16207',
  pmt_color_yellow_800: '#854d0e',
  pmt_color_yellow_900: '#713f12',

  // Purples (Accent)
  pmt_color_purple_50: '#faf5ff',
  pmt_color_purple_100: '#f3e8ff',
  pmt_color_purple_200: '#e9d5ff',
  pmt_color_purple_300: '#d8b4fe',
  pmt_color_purple_400: '#c084fc',
  pmt_color_purple_500: '#a855f7',
  pmt_color_purple_600: '#9333ea',
  pmt_color_purple_700: '#7e22ce',
  pmt_color_purple_800: '#6b21a8',
  pmt_color_purple_900: '#581c87',

  // --- Spacing Scale ---
  pmt_spc_0: '0',
  pmt_spc_1: '0.25rem',
  pmt_spc_2: '0.5rem',
  pmt_spc_3: '0.75rem',
  pmt_spc_4: '1rem',
  pmt_spc_5: '1.25rem',
  pmt_spc_6: '1.5rem',
  pmt_spc_8: '2rem',
  pmt_spc_10: '2.5rem',
  pmt_spc_12: '3rem',
  pmt_spc_16: '4rem',
  pmt_spc_20: '5rem',
  pmt_spc_24: '6rem',
  pmt_spc_32: '8rem',

  // --- Typography ---
  pmt_fnt_family_sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  pmt_fnt_family_serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
  pmt_fnt_family_mono: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  pmt_fnt_siz_10: '0.625rem',
  pmt_fnt_siz_12: '0.75rem',
  pmt_fnt_siz_14: '0.875rem',
  pmt_fnt_siz_16: '1rem',
  pmt_fnt_siz_18: '1.125rem',
  pmt_fnt_siz_20: '1.25rem',
  pmt_fnt_siz_24: '1.5rem',
  pmt_fnt_siz_30: '1.875rem',
  pmt_fnt_siz_36: '2.25rem',
  pmt_fnt_siz_48: '3rem',
  pmt_fnt_siz_60: '3.75rem',
  pmt_fnt_siz_72: '4.5rem',

  pmt_fnt_wgt_thin: 100,
  pmt_fnt_wgt_extralight: 200,
  pmt_fnt_wgt_light: 300,
  pmt_fnt_wgt_regular: 400,
  pmt_fnt_wgt_medium: 500,
  pmt_fnt_wgt_semibold: 600,
  pmt_fnt_wgt_bold: 700,
  pmt_fnt_wgt_extrabold: 800,
  pmt_fnt_wgt_black: 900,

  pmt_lnh_tight: 1.25,
  pmt_lnh_snug: 1.375,
  pmt_lnh_normal: 1.5,
  pmt_lnh_relaxed: 1.625,
  pmt_lnh_loose: 2,

  pmt_lsp_tighter: '-0.05em',
  pmt_lsp_tight: '-0.025em',
  pmt_lsp_normal: '0',
  pmt_lsp_wide: '0.025em',
  pmt_lsp_wider: '0.05em',
  pmt_lsp_widest: '0.1em',

  // --- Border Radius ---
  pmt_rad_0: '0',
  pmt_rad_2: '0.125rem',
  pmt_rad_4: '0.25rem',
  pmt_rad_6: '0.375rem',
  pmt_rad_8: '0.5rem',
  pmt_rad_12: '0.75rem',
  pmt_rad_16: '1rem',
  pmt_rad_20: '1.25rem',
  pmt_rad_24: '1.5rem',
  pmt_rad_full: '9999px',

  // --- Border Width ---
  pmt_bdr_wdt_0: '0',
  pmt_bdr_wdt_1: '1px',
  pmt_bdr_wdt_2: '2px',
  pmt_bdr_wdt_4: '4px',
  pmt_bdr_wdt_8: '8px',

  // --- Opacity ---
  pmt_opac_0: 0,
  pmt_opac_5: 0.05,
  pmt_opac_10: 0.1,
  pmt_opac_20: 0.2,
  pmt_opac_30: 0.3,
  pmt_opac_40: 0.4,
  pmt_opac_50: 0.5,
  pmt_opac_60: 0.6,
  pmt_opac_70: 0.7,
  pmt_opac_80: 0.8,
  pmt_opac_90: 0.9,
  pmt_opac_95: 0.95,
  pmt_opac_100: 1,

  // --- Timing/Duration ---
  pmt_dur_instant: '0ms',
  pmt_dur_fast: '100ms',
  pmt_dur_normal: '200ms',
  pmt_dur_moderate: '300ms',
  pmt_dur_slow: '500ms',
  pmt_dur_slower: '700ms',
  pmt_dur_slowest: '1000ms',

  // --- Easing Functions ---
  pmt_eas_linear: 'linear',
  pmt_eas_in: 'cubic-bezier(0.4, 0, 1, 1)',
  pmt_eas_out: 'cubic-bezier(0, 0, 0.2, 1)',
  pmt_eas_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)',
  pmt_eas_in_back: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  pmt_eas_out_back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  pmt_eas_in_out_back: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // --- Z-Index ---
  pmt_zix_0: 0,
  pmt_zix_10: 10,
  pmt_zix_20: 20,
  pmt_zix_30: 30,
  pmt_zix_40: 40,
  pmt_zix_50: 50,
  pmt_zix_mod: 1000,
  pmt_zix_pop: 1100,
  pmt_zix_tip: 1200,
  pmt_zix_tst: 1300,

  // ============================================================================
  // LAYER 2: EXPRESSION (exp_)
  // ============================================================================

  // --- Motion Energy ---
  exp_motion_energy_low: '{pmt_dur_slow}',
  exp_motion_energy_med: '{pmt_dur_normal}',
  exp_motion_energy_high: '{pmt_dur_fast}',
  exp_motion_energy_act: '{exp_motion_energy_med}',

  // --- Density ---
  exp_density_compact: 0.75,
  exp_density_comfortable: 1,
  exp_density_spacious: 1.25,
  exp_density_act: '{exp_density_comfortable}',

  // --- Roundness ---
  exp_roundness_sharp: '{pmt_rad_2}',
  exp_roundness_moderate: '{pmt_rad_6}',
  exp_roundness_soft: '{pmt_rad_12}',
  exp_roundness_act: '{exp_roundness_moderate}',

  // --- Elevation Style ---
  exp_elevation_flat: 0,
  exp_elevation_raised: 0.5,
  exp_elevation_floating: 1,
  exp_elevation_act: '{exp_elevation_raised}',

  // --- Contrast Preference ---
  exp_contrast_low: 0.7,
  exp_contrast_med: 1,
  exp_contrast_high: 1.3,
  exp_contrast_act: '{exp_contrast_med}',

  // ============================================================================
  // LAYER 3: SEMANTIC (sem_)
  // ============================================================================

  // --- Semantic Colors: Backgrounds ---
  sem_color_bkg_pri: '{pmt_color_white}',
  sem_color_bkg_sec: '{pmt_color_gray_50}',
  sem_color_bkg_ter: '{pmt_color_gray_100}',
  sem_color_bkg_inv: '{pmt_color_gray_950}',
  sem_color_bkg_overlay: 'rgba(0, 0, 0, 0.5)',
  sem_color_bkg_elevated: '{pmt_color_white}',
  sem_color_bkg_sunken: '{pmt_color_gray_200}',

  // --- Semantic Colors: Text ---
  sem_color_txt_pri: '{pmt_color_gray_900}',
  sem_color_txt_sec: '{pmt_color_gray_600}',
  sem_color_txt_ter: '{pmt_color_gray_500}',
  sem_color_txt_inv: '{pmt_color_white}',
  sem_color_txt_dis: '{pmt_color_gray_400}',
  sem_color_txt_placeholder: '{pmt_color_gray_400}',
  sem_color_txt_lnk: '{pmt_color_blue_600}',
  sem_color_txt_lnk_hov: '{pmt_color_blue_700}',

  // --- Semantic Colors: Borders ---
  sem_color_bdr_default: '{pmt_color_gray_200}',
  sem_color_bdr_str: '{pmt_color_gray_300}',
  sem_color_bdr_sub: '{pmt_color_gray_100}',
  sem_color_bdr_inv: '{pmt_color_gray_800}',
  sem_color_bdr_dis: '{pmt_color_gray_200}',
  sem_color_bdr_foc: '{pmt_color_blue_500}',

  // --- Semantic Colors: States ---
  sem_color_state_err: '{pmt_color_red_600}',
  sem_color_state_err_bkg: '{pmt_color_red_50}',
  sem_color_state_err_bdr: '{pmt_color_red_200}',
  sem_color_state_err_txt: '{pmt_color_red_700}',

  sem_color_state_suc: '{pmt_color_green_600}',
  sem_color_state_suc_bkg: '{pmt_color_green_50}',
  sem_color_state_suc_bdr: '{pmt_color_green_200}',
  sem_color_state_suc_txt: '{pmt_color_green_700}',

  sem_color_state_wrn: '{pmt_color_yellow_600}',
  sem_color_state_wrn_bkg: '{pmt_color_yellow_50}',
  sem_color_state_wrn_bdr: '{pmt_color_yellow_200}',
  sem_color_state_wrn_txt: '{pmt_color_yellow_800}',

  sem_color_state_inf: '{pmt_color_blue_600}',
  sem_color_state_inf_bkg: '{pmt_color_blue_50}',
  sem_color_state_inf_bdr: '{pmt_color_blue_200}',
  sem_color_state_inf_txt: '{pmt_color_blue_700}',

  // --- Semantic Colors: Interactive ---
  sem_color_interactive_pri: '{pmt_color_blue_600}',
  sem_color_interactive_pri_hov: '{pmt_color_blue_700}',
  sem_color_interactive_pri_act: '{pmt_color_blue_800}',
  sem_color_interactive_pri_dis: '{pmt_color_gray_200}',

  sem_color_interactive_sec: '{pmt_color_gray_100}',
  sem_color_interactive_sec_hov: '{pmt_color_gray_200}',
  sem_color_interactive_sec_act: '{pmt_color_gray_300}',

  sem_color_interactive_accent: '{pmt_color_purple_600}',
  sem_color_interactive_accent_hov: '{pmt_color_purple_700}',
  sem_color_interactive_accent_act: '{pmt_color_purple_800}',

  // --- Semantic Spacing ---
  sem_spc_inline_xs: '{pmt_spc_1}',
  sem_spc_inline_sm: '{pmt_spc_2}',
  sem_spc_inline_md: '{pmt_spc_3}',
  sem_spc_inline_lg: '{pmt_spc_4}',
  sem_spc_inline_xl: '{pmt_spc_6}',

  sem_spc_stack_xs: '{pmt_spc_2}',
  sem_spc_stack_sm: '{pmt_spc_3}',
  sem_spc_stack_md: '{pmt_spc_4}',
  sem_spc_stack_lg: '{pmt_spc_6}',
  sem_spc_stack_xl: '{pmt_spc_8}',
  sem_spc_stack_2xl: '{pmt_spc_12}',

  sem_spc_inset_xs: '{pmt_spc_2}',
  sem_spc_inset_sm: '{pmt_spc_3}',
  sem_spc_inset_md: '{pmt_spc_4}',
  sem_spc_inset_lg: '{pmt_spc_6}',
  sem_spc_inset_xl: '{pmt_spc_8}',

  // --- Semantic Typography ---
  sem_typo_display_lrg_siz: '{pmt_fnt_siz_72}',
  sem_typo_display_lrg_wgt: '{pmt_fnt_wgt_bold}',
  sem_typo_display_lrg_lnh: '{pmt_lnh_tight}',
  sem_typo_display_lrg_lsp: '{pmt_lsp_tighter}',

  sem_typo_display_med_siz: '{pmt_fnt_siz_60}',
  sem_typo_display_med_wgt: '{pmt_fnt_wgt_bold}',
  sem_typo_display_med_lnh: '{pmt_lnh_tight}',

  sem_typo_display_sml_siz: '{pmt_fnt_siz_48}',
  sem_typo_display_sml_wgt: '{pmt_fnt_wgt_bold}',
  sem_typo_display_sml_lnh: '{pmt_lnh_tight}',

  sem_typo_heading_xl_siz: '{pmt_fnt_siz_36}',
  sem_typo_heading_xl_wgt: '{pmt_fnt_wgt_bold}',
  sem_typo_heading_xl_lnh: '{pmt_lnh_snug}',

  sem_typo_heading_lg_siz: '{pmt_fnt_siz_30}',
  sem_typo_heading_lg_wgt: '{pmt_fnt_wgt_bold}',
  sem_typo_heading_lg_lnh: '{pmt_lnh_snug}',

  sem_typo_heading_md_siz: '{pmt_fnt_siz_24}',
  sem_typo_heading_md_wgt: '{pmt_fnt_wgt_semibold}',
  sem_typo_heading_md_lnh: '{pmt_lnh_snug}',

  sem_typo_heading_sm_siz: '{pmt_fnt_siz_20}',
  sem_typo_heading_sm_wgt: '{pmt_fnt_wgt_semibold}',
  sem_typo_heading_sm_lnh: '{pmt_lnh_normal}',

  sem_typo_body_lg_siz: '{pmt_fnt_siz_18}',
  sem_typo_body_lg_wgt: '{pmt_fnt_wgt_regular}',
  sem_typo_body_lg_lnh: '{pmt_lnh_relaxed}',

  sem_typo_body_md_siz: '{pmt_fnt_siz_16}',
  sem_typo_body_md_wgt: '{pmt_fnt_wgt_regular}',
  sem_typo_body_md_lnh: '{pmt_lnh_normal}',

  sem_typo_body_sm_siz: '{pmt_fnt_siz_14}',
  sem_typo_body_sm_wgt: '{pmt_fnt_wgt_regular}',
  sem_typo_body_sm_lnh: '{pmt_lnh_normal}',

  sem_typo_caption_siz: '{pmt_fnt_siz_12}',
  sem_typo_caption_wgt: '{pmt_fnt_wgt_regular}',
  sem_typo_caption_lnh: '{pmt_lnh_normal}',

  sem_typo_overline_siz: '{pmt_fnt_siz_10}',
  sem_typo_overline_wgt: '{pmt_fnt_wgt_semibold}',
  sem_typo_overline_lnh: '{pmt_lnh_normal}',
  sem_typo_overline_lsp: '{pmt_lsp_widest}',

  sem_typo_code_siz: '{pmt_fnt_siz_14}',
  sem_typo_code_wgt: '{pmt_fnt_wgt_regular}',
  sem_typo_code_family: '{pmt_fnt_family_mono}',

  // --- Semantic Radius ---
  sem_rad_none: '{pmt_rad_0}',
  sem_rad_sm: '{pmt_rad_4}',
  sem_rad_md: '{pmt_rad_6}',
  sem_rad_lg: '{pmt_rad_8}',
  sem_rad_xl: '{pmt_rad_12}',
  sem_rad_full: '{pmt_rad_full}',

  // --- Semantic Shadows ---
  sem_shd_none: 'none',
  sem_shd_sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sem_shd_md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  sem_shd_lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  sem_shd_xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  sem_shd_2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  sem_shd_inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

  // --- Semantic Motion ---
  sem_motion_dur_instant: '{pmt_dur_instant}',
  sem_motion_dur_fast: '{pmt_dur_fast}',
  sem_motion_dur_normal: '{pmt_dur_normal}',
  sem_motion_dur_slow: '{pmt_dur_moderate}',

  sem_motion_eas_std: '{pmt_eas_in_out}',
  sem_motion_eas_accelerate: '{pmt_eas_in}',
  sem_motion_eas_decelerate: '{pmt_eas_out}',
  sem_motion_eas_bounce: '{pmt_eas_out_back}',

  // --- Semantic Effects ---
  sem_effect_foc_ring_wdt: '{pmt_bdr_wdt_2}',
  sem_effect_foc_ring_color: '{pmt_color_blue_500}',
  sem_effect_foc_ring_off: '2px',
  sem_effect_foc_ring_style: 'solid',

  sem_effect_dis_opac: '{pmt_opac_40}',
  sem_effect_hov_opac: '{pmt_opac_90}',

  // ============================================================================
  // LAYER 4: ELEMENT (elm_)
  // ============================================================================

  // --- Button Element Base ---
  elm_btn_hgt_sm: '32px',
  elm_btn_hgt_md: '40px',
  elm_btn_hgt_lg: '48px',

  elm_btn_pad_x_sm: '{sem_spc_inset_sm}',
  elm_btn_pad_x_md: '{sem_spc_inset_md}',
  elm_btn_pad_x_lg: '{sem_spc_inset_lg}',

  elm_btn_fnt_siz_sm: '{sem_typo_body_sm_siz}',
  elm_btn_fnt_siz_md: '{sem_typo_body_md_siz}',
  elm_btn_fnt_siz_lg: '{sem_typo_body_lg_siz}',

  elm_btn_fnt_wgt: '{pmt_fnt_wgt_medium}',
  elm_btn_bdr_wdt: '{pmt_bdr_wdt_1}',
  elm_btn_bdr_rad: '{sem_rad_md}',
  elm_btn_gap: '{sem_spc_inline_sm}',

  elm_btn_trn_dur: '{sem_motion_dur_fast}',
  elm_btn_trn_eas: '{sem_motion_eas_std}',

  // --- Input Element Base ---
  elm_inp_hgt_sm: '32px',
  elm_inp_hgt_md: '40px',
  elm_inp_hgt_lg: '48px',

  elm_inp_pad_x_sm: '{sem_spc_inset_sm}',
  elm_inp_pad_x_md: '{sem_spc_inset_md}',
  elm_inp_pad_x_lg: '{sem_spc_inset_lg}',

  elm_inp_fnt_siz_sm: '{sem_typo_body_sm_siz}',
  elm_inp_fnt_siz_md: '{sem_typo_body_md_siz}',
  elm_inp_fnt_siz_lg: '{sem_typo_body_lg_siz}',

  elm_inp_bdr_wdt: '{pmt_bdr_wdt_1}',
  elm_inp_bdr_rad: '{sem_rad_md}',
  elm_inp_bdr_color: '{sem_color_bdr_default}',
  elm_inp_bdr_color_hov: '{sem_color_bdr_str}',
  elm_inp_bdr_color_foc: '{sem_color_bdr_foc}',
  elm_inp_bdr_color_err: '{sem_color_state_err}',

  elm_inp_bkg: '{pmt_color_white}',
  elm_inp_bkg_dis: '{sem_color_bkg_sec}',
  elm_inp_txt_color: '{sem_color_txt_pri}',
  elm_inp_txt_color_dis: '{sem_color_txt_dis}',
  elm_inp_placeholder_color: '{sem_color_txt_placeholder}',

  elm_inp_trn_dur: '{sem_motion_dur_fast}',

  // --- Checkbox/Radio Element ---
  elm_chk_siz_sm: '16px',
  elm_chk_siz_md: '20px',
  elm_chk_siz_lg: '24px',

  elm_chk_bdr_wdt: '{pmt_bdr_wdt_2}',
  elm_chk_bdr_rad: '{sem_rad_sm}',
  elm_chk_bdr_color: '{sem_color_bdr_str}',
  elm_chk_bdr_color_chk: '{sem_color_interactive_pri}',
  elm_chk_bkg: '{pmt_color_white}',
  elm_chk_bkg_chk: '{sem_color_interactive_pri}',
  elm_chk_checkmark_color: '{pmt_color_white}',

  elm_rad_bdr_rad: '{sem_rad_full}',

  // --- Switch Element ---
  elm_swt_wdt_sm: '36px',
  elm_swt_wdt_md: '44px',
  elm_swt_wdt_lg: '52px',

  elm_swt_hgt_sm: '20px',
  elm_swt_hgt_md: '24px',
  elm_swt_hgt_lg: '28px',

  elm_swt_thumb_siz_sm: '16px',
  elm_swt_thumb_siz_md: '20px',
  elm_swt_thumb_siz_lg: '24px',

  elm_swt_bkg: '{sem_color_bkg_ter}',
  elm_swt_bkg_chk: '{sem_color_interactive_pri}',
  elm_swt_thumb_color: '{pmt_color_white}',
  elm_swt_bdr_rad: '{sem_rad_full}',
  elm_swt_trn_dur: '{sem_motion_dur_normal}',

  // --- Badge Element ---
  elm_bdg_pad_x_sm: '{sem_spc_inline_sm}',
  elm_bdg_pad_x_md: '{sem_spc_inline_md}',
  elm_bdg_pad_y_sm: '{sem_spc_inline_xs}',
  elm_bdg_pad_y_md: '{sem_spc_inline_sm}',

  elm_bdg_fnt_siz_sm: '{sem_typo_caption_siz}',
  elm_bdg_fnt_siz_md: '{sem_typo_body_sm_siz}',
  elm_bdg_fnt_wgt: '{pmt_fnt_wgt_medium}',
  elm_bdg_bdr_rad: '{sem_rad_sm}',
  elm_bdg_bdr_wdt: '{pmt_bdr_wdt_1}',

  // --- Avatar Element ---
  elm_avt_siz_xs: '24px',
  elm_avt_siz_sm: '32px',
  elm_avt_siz_md: '40px',
  elm_avt_siz_lg: '48px',
  elm_avt_siz_xl: '64px',
  elm_avt_siz_2xl: '96px',

  elm_avt_bdr_rad: '{sem_rad_full}',
  elm_avt_bdr_wdt: '{pmt_bdr_wdt_2}',
  elm_avt_bdr_color: '{sem_color_bdr_default}',
  elm_avt_bkg: '{sem_color_bkg_ter}',
  elm_avt_txt_color: '{sem_color_txt_pri}',

  // --- Icon Element ---
  elm_ico_siz_xs: '12px',
  elm_ico_siz_sm: '16px',
  elm_ico_siz_md: '20px',
  elm_ico_siz_lg: '24px',
  elm_ico_siz_xl: '32px',
  elm_ico_siz_2xl: '48px',

  elm_ico_color_default: '{sem_color_txt_pri}',
  elm_ico_color_muted: '{sem_color_txt_sec}',
  elm_ico_color_pri: '{sem_color_interactive_pri}',
  elm_ico_color_suc: '{sem_color_state_suc}',
  elm_ico_color_wrn: '{sem_color_state_wrn}',
  elm_ico_color_err: '{sem_color_state_err}',

  // --- Link Element ---
  elm_lnk_color: '{sem_color_txt_lnk}',
  elm_lnk_color_hov: '{sem_color_txt_lnk_hov}',
  elm_lnk_color_vis: '{pmt_color_purple_700}',
  elm_lnk_txt_decoration: 'none',
  elm_lnk_txt_decoration_hov: 'underline',
  elm_lnk_fnt_wgt: '{pmt_fnt_wgt_regular}',

  // --- Divider Element ---
  elm_div_wdt: '{pmt_bdr_wdt_1}',
  elm_div_color: '{sem_color_bdr_default}',
  elm_div_color_str: '{sem_color_bdr_str}',
  elm_div_spc: '{sem_spc_stack_md}',

  // --- Spinner Element ---
  elm_spn_siz_sm: '16px',
  elm_spn_siz_md: '24px',
  elm_spn_siz_lg: '32px',
  elm_spn_color: '{sem_color_interactive_pri}',
  elm_spn_track_color: '{sem_color_bkg_ter}',
  elm_spn_bdr_wdt: '{pmt_bdr_wdt_2}',
  elm_spn_dur: '800ms',

  // ============================================================================
  // LAYER 5: COMPONENT (cmp_)
  // ============================================================================

  // --- Button Component: Primary Variant ---
  cmp_btn_pri_bkg: '{sem_color_interactive_pri}',
  cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}',
  cmp_btn_pri_bkg_act: '{sem_color_interactive_pri_act}',
  cmp_btn_pri_bkg_dis: '{sem_color_interactive_pri_dis}',
  cmp_btn_pri_txt_color: '{pmt_color_white}',
  cmp_btn_pri_txt_color_dis: '{sem_color_txt_dis}',
  cmp_btn_pri_bdr_color: 'transparent',
  cmp_btn_pri_shd: '{sem_shd_sm}',
  cmp_btn_pri_shd_hov: '{sem_shd_md}',

  // --- Button Component: Secondary Variant ---
  cmp_btn_sec_bkg: '{pmt_color_white}',
  cmp_btn_sec_bkg_hov: '{sem_color_bkg_sec}',
  cmp_btn_sec_bkg_act: '{sem_color_bkg_ter}',
  cmp_btn_sec_bkg_dis: '{sem_color_interactive_pri_dis}',
  cmp_btn_sec_txt_color: '{sem_color_txt_pri}',
  cmp_btn_sec_txt_color_dis: '{sem_color_txt_dis}',
  cmp_btn_sec_bdr_color: '{sem_color_bdr_default}',
  cmp_btn_sec_bdr_color_hov: '{sem_color_bdr_str}',

  // --- Button Component: Ghost Variant ---
  cmp_btn_gho_bkg: 'transparent',
  cmp_btn_gho_bkg_hov: '{sem_color_bkg_sec}',
  cmp_btn_gho_bkg_act: '{sem_color_bkg_ter}',
  cmp_btn_gho_txt_color: '{sem_color_txt_pri}',
  cmp_btn_gho_txt_color_hov: '{sem_color_txt_pri}',

  // --- Button Component: Danger Variant ---
  cmp_btn_dng_bkg: '{sem_color_state_err}',
  cmp_btn_dng_bkg_hov: '{pmt_color_red_700}',
  cmp_btn_dng_bkg_act: '{pmt_color_red_800}',
  cmp_btn_dng_txt_color: '{pmt_color_white}',
  cmp_btn_dng_bdr_color: 'transparent',

  // --- Card Component ---
  cmp_cdl_bkg: '{pmt_color_white}',
  cmp_cdl_bdr_color: '{sem_color_bdr_default}',
  cmp_cdl_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_cdl_bdr_rad: '{sem_rad_lg}',
  cmp_cdl_pad: '{sem_spc_inset_lg}',
  cmp_cdl_shd: '{sem_shd_sm}',
  cmp_cdl_shd_hov: '{sem_shd_md}',
  cmp_cdl_header_pad: '{sem_spc_inset_lg}',
  cmp_cdl_body_pad: '{sem_spc_inset_lg}',
  cmp_cdl_footer_pad: '{sem_spc_inset_lg}',
  cmp_cdl_gap: '{sem_spc_stack_md}',

  // --- Modal Component ---
  cmp_mod_bkg: '{sem_color_bkg_elevated}',
  cmp_mod_bdr_rad: '{sem_rad_xl}',
  cmp_mod_shd: '{sem_shd_2xl}',
  cmp_mod_max_wdt_sm: '400px',
  cmp_mod_max_wdt_md: '560px',
  cmp_mod_max_wdt_lg: '720px',
  cmp_mod_max_wdt_xl: '960px',

  cmp_mod_overlay_bkg: '{sem_color_bkg_overlay}',
  cmp_mod_overlay_opac: '{pmt_opac_50}',
  cmp_mod_overlay_blur: '4px',

  cmp_mod_header_pad: '{sem_spc_inset_lg}',
  cmp_mod_body_pad: '{sem_spc_inset_lg}',
  cmp_mod_footer_pad: '{sem_spc_inset_lg}',
  cmp_mod_gap: '{sem_spc_stack_md}',

  cmp_mod_close_siz: '{elm_ico_siz_md}',
  cmp_mod_close_color: '{sem_color_txt_sec}',
  cmp_mod_close_color_hov: '{sem_color_txt_pri}',

  cmp_mod_enter_dur: '{sem_motion_dur_normal}',
  cmp_mod_exit_dur: '{sem_motion_dur_fast}',
  cmp_mod_enter_eas: '{sem_motion_eas_decelerate}',
  cmp_mod_exit_eas: '{sem_motion_eas_accelerate}',

  // --- Dropdown Component ---
  cmp_drp_bkg: '{sem_color_bkg_elevated}',
  cmp_drp_bdr_color: '{sem_color_bdr_default}',
  cmp_drp_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_drp_bdr_rad: '{sem_rad_md}',
  cmp_drp_shd: '{sem_shd_lg}',
  cmp_drp_pad: '{sem_spc_inset_sm}',
  cmp_drp_max_hgt: '320px',

  cmp_drp_item_pad_x: '{sem_spc_inset_sm}',
  cmp_drp_item_pad_y: '{sem_spc_inset_xs}',
  cmp_drp_item_bkg_hov: '{sem_color_bkg_sec}',
  cmp_drp_item_bkg_act: '{sem_color_interactive_pri}',
  cmp_drp_item_txt_color: '{sem_color_txt_pri}',
  cmp_drp_item_txt_color_act: '{pmt_color_white}',
  cmp_drp_item_bdr_rad: '{sem_rad_sm}',

  cmp_drp_divider_color: '{sem_color_bdr_default}',
  cmp_drp_divider_mar: '{sem_spc_stack_xs}',

  // --- Tooltip Component ---
  cmp_tip_bkg: '{pmt_color_gray_900}',
  cmp_tip_txt_color: '{pmt_color_white}',
  cmp_tip_pad_x: '{sem_spc_inset_sm}',
  cmp_tip_pad_y: '{sem_spc_inset_xs}',
  cmp_tip_fnt_siz: '{sem_typo_caption_siz}',
  cmp_tip_bdr_rad: '{sem_rad_sm}',
  cmp_tip_shd: '{sem_shd_md}',
  cmp_tip_max_wdt: '240px',
  cmp_tip_arrow_siz: '8px',
  cmp_tip_off: '8px',
  cmp_tip_enter_dur: '{sem_motion_dur_fast}',
  cmp_tip_exit_dur: '{sem_motion_dur_fast}',

  // --- Popover Component ---
  cmp_pop_bkg: '{sem_color_bkg_elevated}',
  cmp_pop_bdr_color: '{sem_color_bdr_default}',
  cmp_pop_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_pop_bdr_rad: '{sem_rad_md}',
  cmp_pop_shd: '{sem_shd_lg}',
  cmp_pop_pad: '{sem_spc_inset_md}',
  cmp_pop_max_wdt: '360px',
  cmp_pop_arrow_siz: '12px',
  cmp_pop_off: '8px',

  // --- Toast/Notification Component ---
  cmp_tst_bkg: '{sem_color_bkg_elevated}',
  cmp_tst_bdr_rad: '{sem_rad_md}',
  cmp_tst_shd: '{sem_shd_lg}',
  cmp_tst_pad: '{sem_spc_inset_md}',
  cmp_tst_max_wdt: '420px',
  cmp_tst_gap: '{sem_spc_inline_md}',

  cmp_tst_suc_bkg: '{sem_color_state_suc_bkg}',
  cmp_tst_suc_bdr_color: '{sem_color_state_suc_bdr}',
  cmp_tst_suc_ico_color: '{sem_color_state_suc}',

  cmp_tst_err_bkg: '{sem_color_state_err_bkg}',
  cmp_tst_err_bdr_color: '{sem_color_state_err_bdr}',
  cmp_tst_err_ico_color: '{sem_color_state_err}',

  cmp_tst_wrn_bkg: '{sem_color_state_wrn_bkg}',
  cmp_tst_wrn_bdr_color: '{sem_color_state_wrn_bdr}',
  cmp_tst_wrn_ico_color: '{sem_color_state_wrn}',

  cmp_tst_inf_bkg: '{sem_color_state_inf_bkg}',
  cmp_tst_inf_bdr_color: '{sem_color_state_inf_bdr}',
  cmp_tst_inf_ico_color: '{sem_color_state_inf}',

  cmp_tst_enter_dur: '{sem_motion_dur_normal}',
  cmp_tst_exit_dur: '{sem_motion_dur_normal}',

  // --- Navigation Component ---
  cmp_nav_bkg: '{pmt_color_white}',
  cmp_nav_bdr_color: '{sem_color_bdr_default}',
  cmp_nav_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_nav_hgt: '64px',
  cmp_nav_pad_x: '{sem_spc_inset_lg}',
  cmp_nav_shd: '{sem_shd_sm}',

  cmp_nav_item_pad_x: '{sem_spc_inset_md}',
  cmp_nav_item_pad_y: '{sem_spc_inset_sm}',
  cmp_nav_item_gap: '{sem_spc_inline_md}',
  cmp_nav_item_txt_color: '{sem_color_txt_sec}',
  cmp_nav_item_txt_color_hov: '{sem_color_txt_pri}',
  cmp_nav_item_txt_color_act: '{sem_color_interactive_pri}',
  cmp_nav_item_bkg_hov: '{sem_color_bkg_sec}',
  cmp_nav_item_bkg_act: 'transparent',
  cmp_nav_item_bdr_rad: '{sem_rad_md}',
  cmp_nav_item_fnt_wgt: '{pmt_fnt_wgt_medium}',
  cmp_nav_item_fnt_wgt_act: '{pmt_fnt_wgt_semibold}',

  cmp_nav_indicator_hgt: '2px',
  cmp_nav_indicator_color: '{sem_color_interactive_pri}',

  // --- Sidebar Component ---
  cmp_sidebar_wdt: '260px',
  cmp_sidebar_wdt_collapsed: '64px',
  cmp_sidebar_bkg: '{pmt_color_white}',
  cmp_sidebar_bdr_color: '{sem_color_bdr_default}',
  cmp_sidebar_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_sidebar_pad: '{sem_spc_inset_md}',

  cmp_sidebar_item_pad_x: '{sem_spc_inset_md}',
  cmp_sidebar_item_pad_y: '{sem_spc_inset_sm}',
  cmp_sidebar_item_gap: '{sem_spc_inline_md}',
  cmp_sidebar_item_txt_color: '{sem_color_txt_sec}',
  cmp_sidebar_item_txt_color_hov: '{sem_color_txt_pri}',
  cmp_sidebar_item_txt_color_act: '{sem_color_txt_pri}',
  cmp_sidebar_item_bkg_hov: '{sem_color_bkg_sec}',
  cmp_sidebar_item_bkg_act: '{sem_color_interactive_pri}',
  cmp_sidebar_item_bdr_rad: '{sem_rad_md}',
  cmp_sidebar_item_ico_siz: '{elm_ico_siz_md}',

  cmp_sidebar_trn_dur: '{sem_motion_dur_normal}',

  // --- Table Component ---
  cmp_tbl_bkg: '{pmt_color_white}',
  cmp_tbl_bdr_color: '{sem_color_bdr_default}',
  cmp_tbl_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_tbl_bdr_rad: '{sem_rad_md}',

  cmp_tbl_header_bkg: '{sem_color_bkg_sec}',
  cmp_tbl_header_txt_color: '{sem_color_txt_pri}',
  cmp_tbl_header_fnt_wgt: '{pmt_fnt_wgt_semibold}',
  cmp_tbl_header_pad_x: '{sem_spc_inset_md}',
  cmp_tbl_header_pad_y: '{sem_spc_inset_sm}',
  cmp_tbl_header_bdr_color: '{sem_color_bdr_default}',

  cmp_tbl_cell_pad_x: '{sem_spc_inset_md}',
  cmp_tbl_cell_pad_y: '{sem_spc_inset_sm}',
  cmp_tbl_cell_bdr_color: '{sem_color_bdr_sub}',

  cmp_tbl_row_bkg_hov: '{sem_color_bkg_sec}',
  cmp_tbl_row_bkg_sel: '{pmt_color_blue_50}',
  cmp_tbl_row_bkg_striped: '{sem_color_bkg_sec}',

  // --- Tabs Component ---
  cmp_tab_bdr_color: '{sem_color_bdr_default}',
  cmp_tab_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_tab_gap: '{sem_spc_inline_lg}',

  cmp_tab_item_pad_x: '{sem_spc_inset_md}',
  cmp_tab_item_pad_y: '{sem_spc_inset_sm}',
  cmp_tab_item_txt_color: '{sem_color_txt_sec}',
  cmp_tab_item_txt_color_hov: '{sem_color_txt_pri}',
  cmp_tab_item_txt_color_act: '{sem_color_interactive_pri}',
  cmp_tab_item_bkg_hov: '{sem_color_bkg_sec}',
  cmp_tab_item_bkg_act: 'transparent',
  cmp_tab_item_bdr_rad: '{sem_rad_sm}',
  cmp_tab_item_fnt_wgt: '{pmt_fnt_wgt_medium}',
  cmp_tab_item_fnt_wgt_act: '{pmt_fnt_wgt_semibold}',

  cmp_tab_indicator_hgt: '2px',
  cmp_tab_indicator_color: '{sem_color_interactive_pri}',
  cmp_tab_indicator_trn_dur: '{sem_motion_dur_normal}',

  cmp_tab_panel_pad: '{sem_spc_inset_lg}',

  // --- Accordion Component ---
  cmp_acc_bdr_color: '{sem_color_bdr_default}',
  cmp_acc_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_acc_bdr_rad: '{sem_rad_md}',

  cmp_acc_item_pad_x: '{sem_spc_inset_md}',
  cmp_acc_item_pad_y: '{sem_spc_inset_sm}',
  cmp_acc_item_bkg: 'transparent',
  cmp_acc_item_bkg_hov: '{sem_color_bkg_sec}',
  cmp_acc_item_bkg_act: '{sem_color_bkg_ter}',

  cmp_acc_trigger_fnt_wgt: '{pmt_fnt_wgt_semibold}',
  cmp_acc_trigger_txt_color: '{sem_color_txt_pri}',
  cmp_acc_trigger_ico_siz: '{elm_ico_siz_sm}',
  cmp_acc_trigger_ico_trn_dur: '{sem_motion_dur_fast}',

  cmp_acc_content_pad_x: '{sem_spc_inset_md}',
  cmp_acc_content_pad_y: '{sem_spc_inset_md}',
  cmp_acc_content_ani_dur: '{sem_motion_dur_normal}',

  // --- Breadcrumb Component ---
  cmp_brd_gap: '{sem_spc_inline_sm}',
  cmp_brd_fnt_siz: '{sem_typo_body_sm_siz}',
  cmp_brd_txt_color: '{sem_color_txt_sec}',
  cmp_brd_txt_color_current: '{sem_color_txt_pri}',
  cmp_brd_lnk_color: '{sem_color_txt_lnk}',
  cmp_brd_lnk_color_hov: '{sem_color_txt_lnk_hov}',
  cmp_brd_separator_color: '{sem_color_txt_ter}',
  cmp_brd_separator_siz: '{elm_ico_siz_sm}',

  // --- Pagination Component ---
  cmp_pgn_gap: '{sem_spc_inline_sm}',
  cmp_pgn_item_siz: '40px',
  cmp_pgn_item_bdr_rad: '{sem_rad_md}',
  cmp_pgn_item_bkg: 'transparent',
  cmp_pgn_item_bkg_hov: '{sem_color_bkg_sec}',
  cmp_pgn_item_bkg_act: '{sem_color_interactive_pri}',
  cmp_pgn_item_txt_color: '{sem_color_txt_pri}',
  cmp_pgn_item_txt_color_act: '{pmt_color_white}',
  cmp_pgn_item_bdr_color: '{sem_color_bdr_default}',
  cmp_pgn_item_bdr_color_act: 'transparent',

  // --- Progress Bar Component ---
  cmp_prg_hgt_sm: '4px',
  cmp_prg_hgt_md: '8px',
  cmp_prg_hgt_lg: '12px',
  cmp_prg_bkg: '{sem_color_bkg_ter}',
  cmp_prg_fill_bkg: '{sem_color_interactive_pri}',
  cmp_prg_bdr_rad: '{sem_rad_full}',
  cmp_prg_trn_dur: '{sem_motion_dur_normal}',

  // --- Slider Component ---
  cmp_sldr_track_hgt: '4px',
  cmp_sldr_track_bkg: '{sem_color_bkg_ter}',
  cmp_sldr_track_bkg_filled: '{sem_color_interactive_pri}',
  cmp_sldr_track_bdr_rad: '{sem_rad_full}',

  cmp_sldr_thumb_siz: '20px',
  cmp_sldr_thumb_bkg: '{pmt_color_white}',
  cmp_sldr_thumb_bdr_color: '{sem_color_interactive_pri}',
  cmp_sldr_thumb_bdr_wdt: '{pmt_bdr_wdt_2}',
  cmp_sldr_thumb_shd: '{sem_shd_sm}',
  cmp_sldr_thumb_shd_hov: '{sem_shd_md}',
  cmp_sldr_thumb_shd_act: '{sem_shd_lg}',

  // --- Alert Component ---
  cmp_alt_pad: '{sem_spc_inset_md}',
  cmp_alt_bdr_rad: '{sem_rad_md}',
  cmp_alt_bdr_wdt: '{pmt_bdr_wdt_1}',
  cmp_alt_gap: '{sem_spc_inline_md}',

  cmp_alt_inf_bkg: '{sem_color_state_inf_bkg}',
  cmp_alt_inf_bdr_color: '{sem_color_state_inf_bdr}',
  cmp_alt_inf_txt_color: '{sem_color_state_inf_txt}',
  cmp_alt_inf_ico_color: '{sem_color_state_inf}',

  cmp_alt_suc_bkg: '{sem_color_state_suc_bkg}',
  cmp_alt_suc_bdr_color: '{sem_color_state_suc_bdr}',
  cmp_alt_suc_txt_color: '{sem_color_state_suc_txt}',
  cmp_alt_suc_ico_color: '{sem_color_state_suc}',

  cmp_alt_wrn_bkg: '{sem_color_state_wrn_bkg}',
  cmp_alt_wrn_bdr_color: '{sem_color_state_wrn_bdr}',
  cmp_alt_wrn_txt_color: '{sem_color_state_wrn_txt}',
  cmp_alt_wrn_ico_color: '{sem_color_state_wrn}',

  cmp_alt_err_bkg: '{sem_color_state_err_bkg}',
  cmp_alt_err_bdr_color: '{sem_color_state_err_bdr}',
  cmp_alt_err_txt_color: '{sem_color_state_err_txt}',
  cmp_alt_err_ico_color: '{sem_color_state_err}',

  // --- Select Component ---
  cmp_sel_trigger_hgt_sm: '{elm_inp_hgt_sm}',
  cmp_sel_trigger_hgt_md: '{elm_inp_hgt_md}',
  cmp_sel_trigger_hgt_lg: '{elm_inp_hgt_lg}',
  cmp_sel_trigger_pad_x: '{elm_inp_pad_x_md}',
  cmp_sel_trigger_bkg: '{elm_inp_bkg}',
  cmp_sel_trigger_bdr_color: '{elm_inp_bdr_color}',
  cmp_sel_trigger_bdr_wdt: '{elm_inp_bdr_wdt}',
  cmp_sel_trigger_bdr_rad: '{elm_inp_bdr_rad}',
  cmp_sel_trigger_ico_siz: '{elm_ico_siz_sm}',
  cmp_sel_trigger_ico_color: '{sem_color_txt_sec}',

  cmp_sel_menu_bkg: '{cmp_drp_bkg}',
  cmp_sel_menu_bdr_color: '{cmp_drp_bdr_color}',
  cmp_sel_menu_bdr_wdt: '{cmp_drp_bdr_wdt}',
  cmp_sel_menu_bdr_rad: '{cmp_drp_bdr_rad}',
  cmp_sel_menu_shd: '{cmp_drp_shd}',
  cmp_sel_menu_max_hgt: '{cmp_drp_max_hgt}',

  cmp_sel_option_pad_x: '{cmp_drp_item_pad_x}',
  cmp_sel_option_pad_y: '{cmp_drp_item_pad_y}',
  cmp_sel_option_bkg_hov: '{cmp_drp_item_bkg_hov}',
  cmp_sel_option_bkg_sel: '{cmp_drp_item_bkg_act}',
  cmp_sel_option_txt_color: '{cmp_drp_item_txt_color}',
  cmp_sel_option_txt_color_sel: '{cmp_drp_item_txt_color_act}',

  // ============================================================================
  // LAYER 6: FEATURE (ftr_)
  // ============================================================================

  // --- Checkout Feature ---
  ftr_checkout_cta_bkg: '{pmt_color_green_600}',
  ftr_checkout_cta_bkg_hov: '{pmt_color_green_700}',
  ftr_checkout_cta_txt_color: '{pmt_color_white}',
  ftr_checkout_prg_bar_color: '{pmt_color_green_600}',
  ftr_checkout_trust_bdg_bkg: '{pmt_color_green_50}',
  ftr_checkout_err_highlight_color: '{sem_color_state_err}',

  // --- Dashboard Feature ---
  ftr_dashboard_widget_bkg: '{cmp_cdl_bkg}',
  ftr_dashboard_widget_bdr_color: '{cmp_cdl_bdr_color}',
  ftr_dashboard_widget_shd: '{cmp_cdl_shd}',
  ftr_dashboard_chart_pri_color: '{pmt_color_blue_600}',
  ftr_dashboard_chart_sec_color: '{pmt_color_purple_600}',
  ftr_dashboard_stat_highlight_color: '{pmt_color_green_600}',

  // --- Settings Feature ---
  ftr_settings_section_bkg: '{cmp_cdl_bkg}',
  ftr_settings_section_bdr_color: '{cmp_cdl_bdr_color}',
  ftr_settings_danger_zone_bkg: '{pmt_color_red_50}',
  ftr_settings_danger_zone_bdr_color: '{pmt_color_red_200}',
  ftr_settings_save_btn_bkg: '{sem_color_interactive_pri}',

  // --- Auth Feature ---
  ftr_auth_cdl_bkg: '{cmp_cdl_bkg}',
  ftr_auth_cdl_shd: '{cmp_cdl_shd}',
  ftr_auth_cdl_max_wdt: '420px',
  ftr_auth_divider_color: '{sem_color_bdr_default}',
  ftr_auth_social_btn_bdr_color: '{sem_color_bdr_default}',
  ftr_auth_lnk_color: '{sem_color_txt_lnk}',

  // --- Onboarding Feature ---
  ftr_onboarding_prg_color: '{pmt_color_blue_600}',
  ftr_onboarding_step_act_color: '{pmt_color_blue_600}',
  ftr_onboarding_step_completed_color: '{pmt_color_green_600}',
  ftr_onboarding_highlight_bkg: '{pmt_color_blue_50}',

  // --- Profile Feature ---
  ftr_profile_header_bkg: '{sem_color_bkg_sec}',
  ftr_profile_avt_bdr_color: '{pmt_color_white}',
  ftr_profile_avt_bdr_wdt: '{pmt_bdr_wdt_4}',
  ftr_profile_bdg_verified_color: '{pmt_color_blue_600}',

  // --- Messaging Feature ---
  ftr_messaging_bubble_sent_bkg: '{pmt_color_blue_600}',
  ftr_messaging_bubble_received_bkg: '{sem_color_bkg_ter}',
  ftr_messaging_bubble_sent_txt_color: '{pmt_color_white}',
  ftr_messaging_bubble_received_txt_color: '{sem_color_txt_pri}',
  ftr_messaging_inp_bkg: '{pmt_color_white}',
  ftr_messaging_timestamp_color: '{sem_color_txt_ter}',

  // --- Search Feature ---
  ftr_search_overlay_bkg: '{sem_color_bkg_overlay}',
  ftr_search_inp_bkg: '{pmt_color_white}',
  ftr_search_result_bkg_hov: '{sem_color_bkg_sec}',
  ftr_search_highlight_color: '{pmt_color_yellow_400}',
  ftr_search_shortcut_bdg_bkg: '{sem_color_bkg_ter}',
};
