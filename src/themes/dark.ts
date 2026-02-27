import { DesignTokens } from '@/themes/tokens';

export const darkTheme: DesignTokens = {
  // ============================================================================
  // LAYER 1: SEMANTIC (sem_)
  // ============================================================================

  // --- Semantic Colors: Backgrounds ---
  sem_color_bkg_pri: '#0a0a0a',
  sem_color_bkg_sec: '#171717',
  sem_color_bkg_ter: '#262626',
  sem_color_bkg_inv: '#ffffff',
  sem_color_bkg_overlay: 'rgba(0, 0, 0, 0.8)',
  sem_color_bkg_elevated: '#171717',
  sem_color_bkg_sunken: '#000000',

  // --- Semantic Colors: Text ---
  sem_color_txt_pri: '#fafafa',
  sem_color_txt_sec: '#d4d4d4',
  sem_color_txt_ter: '#737373',
  sem_color_txt_inv: '#0a0a0a',
  sem_color_txt_dis: '#525252',
  sem_color_txt_placeholder: '#525252',
  sem_color_txt_lnk: '#60a5fa',
  sem_color_txt_lnk_hov: '#93c5fd',

  // --- Semantic Colors: Borders ---
  sem_color_bdr_default: '#262626',
  sem_color_bdr_str: '#404040',
  sem_color_bdr_sub: '#171717',
  sem_color_bdr_inv: '#e5e5e5',
  sem_color_bdr_dis: '#262626',
  sem_color_bdr_foc: '#3b82f6',

  // --- Semantic Colors: States ---
  sem_color_state_err: '#ef4444',
  sem_color_state_err_bkg: 'rgba(239, 68, 68, 0.1)',
  sem_color_state_err_bdr: '#991b1b',
  sem_color_state_err_txt: '#f87171',

  sem_color_state_suc: '#22c55e',
  sem_color_state_suc_bkg: 'rgba(34, 197, 94, 0.1)',
  sem_color_state_suc_bdr: '#166534',
  sem_color_state_suc_txt: '#4ade80',

  sem_color_state_wrn: '#eab308',
  sem_color_state_wrn_bkg: 'rgba(234, 179, 8, 0.1)',
  sem_color_state_wrn_bdr: '#854d0e',
  sem_color_state_wrn_txt: '#facc15',

  sem_color_state_inf: '#3b82f6',
  sem_color_state_inf_bkg: 'rgba(59, 130, 246, 0.1)',
  sem_color_state_inf_bdr: '#1e40af',
  sem_color_state_inf_txt: '#60a5fa',

  // --- Semantic Colors: Interactive ---
  sem_color_interactive_pri: '#2563eb',
  sem_color_interactive_pri_hov: '#3b82f6',
  sem_color_interactive_pri_act: '#1d4ed8',
  sem_color_interactive_pri_dis: '#262626',

  sem_color_interactive_sec: '#262626',
  sem_color_interactive_sec_hov: '#404040',
  sem_color_interactive_sec_act: '#171717',

  sem_color_interactive_accent: '#9333ea',
  sem_color_interactive_accent_hov: '#a855f7',
  sem_color_interactive_accent_act: '#7e22ce',

  // --- Semantic Spacing ---
  sem_spc_inline_xs: '0.25rem',
  sem_spc_inline_sm: '0.5rem',
  sem_spc_inline_md: '0.75rem',
  sem_spc_inline_lg: '1rem',
  sem_spc_inline_xl: '1.5rem',

  sem_spc_stack_xs: '0.5rem',
  sem_spc_stack_sm: '0.75rem',
  sem_spc_stack_md: '1rem',
  sem_spc_stack_lg: '1.5rem',
  sem_spc_stack_xl: '2rem',
  sem_spc_stack_2xl: '3rem',

  sem_spc_inset_xs: '0.5rem',
  sem_spc_inset_sm: '0.75rem',
  sem_spc_inset_md: '1rem',
  sem_spc_inset_lg: '1.5rem',
  sem_spc_inset_xl: '2rem',

  // --- Semantic Typography ---
  sem_typo_display_lrg_siz: '4.5rem',
  sem_typo_display_lrg_wgt: 700,
  sem_typo_display_lrg_lnh: 1.25,
  sem_typo_display_lrg_lsp: '-0.05em',

  sem_typo_display_med_siz: '3.75rem',
  sem_typo_display_med_wgt: 700,
  sem_typo_display_med_lnh: 1.25,

  sem_typo_display_sml_siz: '3rem',
  sem_typo_display_sml_wgt: 700,
  sem_typo_display_sml_lnh: 1.25,

  sem_typo_heading_xl_siz: '2.25rem',
  sem_typo_heading_xl_wgt: 700,
  sem_typo_heading_xl_lnh: 1.375,

  sem_typo_heading_lg_siz: '1.875rem',
  sem_typo_heading_lg_wgt: 700,
  sem_typo_heading_lg_lnh: 1.375,

  sem_typo_heading_md_siz: '1.5rem',
  sem_typo_heading_md_wgt: 600,
  sem_typo_heading_md_lnh: 1.375,

  sem_typo_heading_sm_siz: '1.25rem',
  sem_typo_heading_sm_wgt: 600,
  sem_typo_heading_sm_lnh: 1.5,

  sem_typo_body_lg_siz: '1.125rem',
  sem_typo_body_lg_wgt: 400,
  sem_typo_body_lg_lnh: 1.625,

  sem_typo_body_md_siz: '1rem',
  sem_typo_body_md_wgt: 400,
  sem_typo_body_md_lnh: 1.5,

  sem_typo_body_sm_siz: '0.875rem',
  sem_typo_body_sm_wgt: 400,
  sem_typo_body_sm_lnh: 1.5,

  sem_typo_caption_siz: '0.75rem',
  sem_typo_caption_wgt: 400,
  sem_typo_caption_lnh: 1.5,

  sem_typo_overline_siz: '0.625rem',
  sem_typo_overline_wgt: 600,
  sem_typo_overline_lnh: 1.5,
  sem_typo_overline_lsp: '0.1em',

  sem_typo_code_siz: '0.875rem',
  sem_typo_code_wgt: 400,
  sem_typo_code_family: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // --- Semantic Radius ---
  sem_rad_none: '0',
  sem_rad_sm: '0.25rem',
  sem_rad_md: '0.375rem',
  sem_rad_lg: '0.5rem',
  sem_rad_xl: '0.75rem',
  sem_rad_full: '9999px',

  // --- Semantic Shadows ---
  sem_shd_none: 'none',
  sem_shd_sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
  sem_shd_md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  sem_shd_lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  sem_shd_xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  sem_shd_2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  sem_shd_inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',

  // --- Semantic Motion ---
  sem_motion_dur_instant: '0ms',
  sem_motion_dur_fast: '100ms',
  sem_motion_dur_normal: '200ms',
  sem_motion_dur_slow: '300ms',

  sem_motion_eas_std: 'cubic-bezier(0.4, 0, 0.2, 1)',
  sem_motion_eas_accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  sem_motion_eas_decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  sem_motion_eas_bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

  // --- Semantic Effects ---
  sem_effect_foc_ring_wdt: '2px',
  sem_effect_foc_ring_color: '#3b82f6',
  sem_effect_foc_ring_off: '2px',
  sem_effect_foc_ring_style: 'solid',

  sem_effect_dis_opac: 0.4,
  sem_effect_hov_opac: 0.9,

  // ============================================================================
  // LAYER 2: COMPONENT (cmp_)
  // ============================================================================

  // --- Button Base ---
  cmp_btn_hgt_sm: '32px',
  cmp_btn_hgt_md: '40px',
  cmp_btn_hgt_lg: '48px',

  cmp_btn_pad_x_sm: '{sem_spc_inset_sm}',
  cmp_btn_pad_x_md: '{sem_spc_inset_md}',
  cmp_btn_pad_x_lg: '{sem_spc_inset_lg}',

  cmp_btn_fnt_siz_sm: '{sem_typo_body_sm_siz}',
  cmp_btn_fnt_siz_md: '{sem_typo_body_md_siz}',
  cmp_btn_fnt_siz_lg: '{sem_typo_body_lg_siz}',

  cmp_btn_fnt_wgt: 500,
  cmp_btn_bdr_wdt: '1px',
  cmp_btn_bdr_rad: '{sem_rad_md}',
  cmp_btn_gap: '{sem_spc_inline_sm}',

  cmp_btn_trn_dur: '{sem_motion_dur_fast}',
  cmp_btn_trn_eas: '{sem_motion_eas_std}',

  // --- Button: Primary Variant ---
  cmp_btn_pri_bkg: '{sem_color_interactive_pri}',
  cmp_btn_pri_bkg_hov: '{sem_color_interactive_pri_hov}',
  cmp_btn_pri_bkg_act: '{sem_color_interactive_pri_act}',
  cmp_btn_pri_bkg_dis: '{sem_color_interactive_pri_dis}',
  cmp_btn_pri_txt_color: '#ffffff',
  cmp_btn_pri_txt_color_dis: '{sem_color_txt_dis}',
  cmp_btn_pri_bdr_color: 'transparent',
  cmp_btn_pri_shd: '{sem_shd_sm}',
  cmp_btn_pri_shd_hov: '{sem_shd_md}',

  // --- Button: Secondary Variant ---
  cmp_btn_sec_bkg: '{sem_color_interactive_sec}',
  cmp_btn_sec_bkg_hov: '{sem_color_interactive_sec_hov}',
  cmp_btn_sec_bkg_act: '{sem_color_interactive_sec_act}',
  cmp_btn_sec_bkg_dis: '{sem_color_interactive_pri_dis}',
  cmp_btn_sec_txt_color: '{sem_color_txt_pri}',
  cmp_btn_sec_txt_color_dis: '{sem_color_txt_dis}',
  cmp_btn_sec_bdr_color: '{sem_color_bdr_default}',
  cmp_btn_sec_bdr_color_hov: '{sem_color_bdr_str}',

  // --- Button: Ghost Variant ---
  cmp_btn_gho_bkg: 'transparent',
  cmp_btn_gho_bkg_hov: '{sem_color_bkg_ter}',
  cmp_btn_gho_bkg_act: '{sem_color_bkg_sec}',
  cmp_btn_gho_txt_color: '{sem_color_txt_pri}',
  cmp_btn_gho_txt_color_hov: '{sem_color_txt_pri}',

  // --- Button: Danger Variant ---
  cmp_btn_dng_bkg: '{sem_color_state_err}',
  cmp_btn_dng_bkg_hov: '#f87171',
  cmp_btn_dng_bkg_act: '#dc2626',
  cmp_btn_dng_txt_color: '#ffffff',
  cmp_btn_dng_bdr_color: 'transparent',

  // --- Input Base ---
  cmp_inp_hgt_sm: '32px',
  cmp_inp_hgt_md: '40px',
  cmp_inp_hgt_lg: '48px',

  cmp_inp_pad_x_sm: '{sem_spc_inset_sm}',
  cmp_inp_pad_x_md: '{sem_spc_inset_md}',
  cmp_inp_pad_x_lg: '{sem_spc_inset_lg}',

  cmp_inp_fnt_siz_sm: '{sem_typo_body_sm_siz}',
  cmp_inp_fnt_siz_md: '{sem_typo_body_md_siz}',
  cmp_inp_fnt_siz_lg: '{sem_typo_body_lg_siz}',

  cmp_inp_bdr_wdt: '1px',
  cmp_inp_bdr_rad: '{sem_rad_md}',
  cmp_inp_bdr_color: '{sem_color_bdr_default}',
  cmp_inp_bdr_color_hov: '{sem_color_bdr_str}',
  cmp_inp_bdr_color_foc: '{sem_color_bdr_foc}',
  cmp_inp_bdr_color_err: '{sem_color_state_err}',

  cmp_inp_bkg: '{sem_color_bkg_ter}',
  cmp_inp_bkg_dis: '{sem_color_bkg_sec}',
  cmp_inp_txt_color: '{sem_color_txt_pri}',
  cmp_inp_txt_color_dis: '{sem_color_txt_dis}',
  cmp_inp_placeholder_color: '{sem_color_txt_placeholder}',

  cmp_inp_trn_dur: '{sem_motion_dur_fast}',

  // --- Checkbox/Radio ---
  cmp_chk_siz_sm: '16px',
  cmp_chk_siz_md: '20px',
  cmp_chk_siz_lg: '24px',

  cmp_chk_bdr_wdt: '2px',
  cmp_chk_bdr_rad: '{sem_rad_sm}',
  cmp_chk_bdr_color: '{sem_color_bdr_str}',
  cmp_chk_bdr_color_chk: '{sem_color_interactive_pri}',
  cmp_chk_bkg: '{sem_color_bkg_ter}',
  cmp_chk_bkg_chk: '{sem_color_interactive_pri}',
  cmp_chk_checkmark_color: '#ffffff',

  cmp_rad_bdr_rad: '{sem_rad_full}',

  // --- Switch ---
  cmp_swt_wdt_sm: '36px',
  cmp_swt_wdt_md: '44px',
  cmp_swt_wdt_lg: '52px',

  cmp_swt_hgt_sm: '20px',
  cmp_swt_hgt_md: '24px',
  cmp_swt_hgt_lg: '28px',

  cmp_swt_thumb_siz_sm: '16px',
  cmp_swt_thumb_siz_md: '20px',
  cmp_swt_thumb_siz_lg: '24px',

  cmp_swt_bkg: '{sem_color_bkg_ter}',
  cmp_swt_bkg_chk: '{sem_color_interactive_pri}',
  cmp_swt_thumb_color: '#ffffff',
  cmp_swt_bdr_rad: '{sem_rad_full}',
  cmp_swt_trn_dur: '{sem_motion_dur_normal}',

  // --- Badge ---
  cmp_bdg_pad_x_sm: '{sem_spc_inline_sm}',
  cmp_bdg_pad_x_md: '{sem_spc_inline_md}',
  cmp_bdg_pad_y_sm: '{sem_spc_inline_xs}',
  cmp_bdg_pad_y_md: '{sem_spc_inline_sm}',

  cmp_bdg_fnt_siz_sm: '{sem_typo_caption_siz}',
  cmp_bdg_fnt_siz_md: '{sem_typo_body_sm_siz}',
  cmp_bdg_fnt_wgt: 500,
  cmp_bdg_bdr_rad: '{sem_rad_sm}',
  cmp_bdg_bdr_wdt: '1px',

  // --- Avatar ---
  cmp_avt_siz_xs: '24px',
  cmp_avt_siz_sm: '32px',
  cmp_avt_siz_md: '40px',
  cmp_avt_siz_lg: '48px',
  cmp_avt_siz_xl: '64px',
  cmp_avt_siz_2xl: '96px',

  cmp_avt_bdr_rad: '{sem_rad_full}',
  cmp_avt_bdr_wdt: '2px',
  cmp_avt_bdr_color: '{sem_color_bdr_default}',
  cmp_avt_bkg: '{sem_color_bkg_ter}',
  cmp_avt_txt_color: '{sem_color_txt_pri}',

  // --- Icon ---
  cmp_ico_siz_xs: '12px',
  cmp_ico_siz_sm: '16px',
  cmp_ico_siz_md: '20px',
  cmp_ico_siz_lg: '24px',
  cmp_ico_siz_xl: '32px',
  cmp_ico_siz_2xl: '48px',

  cmp_ico_color_default: '{sem_color_txt_pri}',
  cmp_ico_color_muted: '{sem_color_txt_sec}',
  cmp_ico_color_pri: '{sem_color_interactive_pri}',
  cmp_ico_color_suc: '{sem_color_state_suc}',
  cmp_ico_color_wrn: '{sem_color_state_wrn}',
  cmp_ico_color_err: '{sem_color_state_err}',

  // --- Link ---
  cmp_lnk_color: '{sem_color_txt_lnk}',
  cmp_lnk_color_hov: '{sem_color_txt_lnk_hov}',
  cmp_lnk_color_vis: '#c084fc',
  cmp_lnk_txt_decoration: 'none',
  cmp_lnk_txt_decoration_hov: 'underline',
  cmp_lnk_fnt_wgt: 400,

  // --- Divider ---
  cmp_div_wdt: '1px',
  cmp_div_color: '{sem_color_bdr_default}',
  cmp_div_color_str: '{sem_color_bdr_str}',
  cmp_div_spc: '{sem_spc_stack_md}',

  // --- Spinner ---
  cmp_spn_siz_sm: '16px',
  cmp_spn_siz_md: '24px',
  cmp_spn_siz_lg: '32px',
  cmp_spn_color: '{sem_color_interactive_pri}',
  cmp_spn_track_color: '{sem_color_bkg_ter}',
  cmp_spn_bdr_wdt: '2px',
  cmp_spn_dur: '800ms',

  // --- Card ---
  cmp_cdl_bkg: '{sem_color_bkg_sec}',
  cmp_cdl_bdr_color: '{sem_color_bdr_default}',
  cmp_cdl_bdr_wdt: '1px',
  cmp_cdl_bdr_rad: '{sem_rad_lg}',
  cmp_cdl_pad: '{sem_spc_inset_lg}',
  cmp_cdl_shd: '{sem_shd_sm}',
  cmp_cdl_shd_hov: '{sem_shd_md}',
  cmp_cdl_header_pad: '{sem_spc_inset_lg}',
  cmp_cdl_body_pad: '{sem_spc_inset_lg}',
  cmp_cdl_footer_pad: '{sem_spc_inset_lg}',
  cmp_cdl_gap: '{sem_spc_stack_md}',

  // --- Modal ---
  cmp_mod_bkg: '{sem_color_bkg_elevated}',
  cmp_mod_bdr_rad: '{sem_rad_xl}',
  cmp_mod_shd: '{sem_shd_2xl}',
  cmp_mod_max_wdt_sm: '400px',
  cmp_mod_max_wdt_md: '560px',
  cmp_mod_max_wdt_lg: '720px',
  cmp_mod_max_wdt_xl: '960px',

  cmp_mod_overlay_bkg: '{sem_color_bkg_overlay}',
  cmp_mod_overlay_opac: 0.8,
  cmp_mod_overlay_blur: '4px',

  cmp_mod_header_pad: '{sem_spc_inset_lg}',
  cmp_mod_body_pad: '{sem_spc_inset_lg}',
  cmp_mod_footer_pad: '{sem_spc_inset_lg}',
  cmp_mod_gap: '{sem_spc_stack_md}',

  cmp_mod_close_siz: '{cmp_ico_siz_md}',
  cmp_mod_close_color: '{sem_color_txt_sec}',
  cmp_mod_close_color_hov: '{sem_color_txt_pri}',

  cmp_mod_enter_dur: '{sem_motion_dur_normal}',
  cmp_mod_exit_dur: '{sem_motion_dur_fast}',
  cmp_mod_enter_eas: '{sem_motion_eas_decelerate}',
  cmp_mod_exit_eas: '{sem_motion_eas_accelerate}',

  // --- Dropdown ---
  cmp_drp_bkg: '{sem_color_bkg_elevated}',
  cmp_drp_bdr_color: '{sem_color_bdr_default}',
  cmp_drp_bdr_wdt: '1px',
  cmp_drp_bdr_rad: '{sem_rad_md}',
  cmp_drp_shd: '{sem_shd_lg}',
  cmp_drp_pad: '{sem_spc_inset_sm}',
  cmp_drp_max_hgt: '320px',

  cmp_drp_item_pad_x: '{sem_spc_inset_sm}',
  cmp_drp_item_pad_y: '{sem_spc_inset_xs}',
  cmp_drp_item_bkg_hov: '{sem_color_bkg_ter}',
  cmp_drp_item_bkg_act: '{sem_color_interactive_pri}',
  cmp_drp_item_txt_color: '{sem_color_txt_pri}',
  cmp_drp_item_txt_color_act: '#ffffff',
  cmp_drp_item_bdr_rad: '{sem_rad_sm}',

  cmp_drp_divider_color: '{sem_color_bdr_default}',
  cmp_drp_divider_mar: '{sem_spc_stack_xs}',

  // --- Tooltip ---
  cmp_tip_bkg: '#262626',
  cmp_tip_txt_color: '#fafafa',
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

  // --- Popover ---
  cmp_pop_bkg: '{sem_color_bkg_elevated}',
  cmp_pop_bdr_color: '{sem_color_bdr_default}',
  cmp_pop_bdr_wdt: '1px',
  cmp_pop_bdr_rad: '{sem_rad_md}',
  cmp_pop_shd: '{sem_shd_lg}',
  cmp_pop_pad: '{sem_spc_inset_md}',
  cmp_pop_max_wdt: '360px',
  cmp_pop_arrow_siz: '12px',
  cmp_pop_off: '8px',

  // --- Toast/Notification ---
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

  // --- Navigation ---
  cmp_nav_bkg: '{sem_color_bkg_sec}',
  cmp_nav_bdr_color: '{sem_color_bdr_default}',
  cmp_nav_bdr_wdt: '1px',
  cmp_nav_hgt: '64px',
  cmp_nav_pad_x: '{sem_spc_inset_lg}',
  cmp_nav_shd: '{sem_shd_sm}',

  cmp_nav_item_pad_x: '{sem_spc_inset_md}',
  cmp_nav_item_pad_y: '{sem_spc_inset_sm}',
  cmp_nav_item_gap: '{sem_spc_inline_md}',
  cmp_nav_item_txt_color: '{sem_color_txt_sec}',
  cmp_nav_item_txt_color_hov: '{sem_color_txt_pri}',
  cmp_nav_item_txt_color_act: '{sem_color_interactive_pri}',
  cmp_nav_item_bkg_hov: '{sem_color_bkg_ter}',
  cmp_nav_item_bkg_act: 'transparent',
  cmp_nav_item_bdr_rad: '{sem_rad_md}',
  cmp_nav_item_fnt_wgt: 500,
  cmp_nav_item_fnt_wgt_act: 600,

  cmp_nav_indicator_hgt: '2px',
  cmp_nav_indicator_color: '{sem_color_interactive_pri}',

  // --- Sidebar ---
  cmp_sidebar_wdt: '260px',
  cmp_sidebar_wdt_collapsed: '64px',
  cmp_sidebar_bkg: '{sem_color_bkg_sec}',
  cmp_sidebar_bdr_color: '{sem_color_bdr_default}',
  cmp_sidebar_bdr_wdt: '1px',
  cmp_sidebar_pad: '{sem_spc_inset_md}',

  cmp_sidebar_item_pad_x: '{sem_spc_inset_md}',
  cmp_sidebar_item_pad_y: '{sem_spc_inset_sm}',
  cmp_sidebar_item_gap: '{sem_spc_inline_md}',
  cmp_sidebar_item_txt_color: '{sem_color_txt_sec}',
  cmp_sidebar_item_txt_color_hov: '{sem_color_txt_pri}',
  cmp_sidebar_item_txt_color_act: '{sem_color_txt_pri}',
  cmp_sidebar_item_bkg_hov: '{sem_color_bkg_ter}',
  cmp_sidebar_item_bkg_act: '{sem_color_interactive_pri}',
  cmp_sidebar_item_bdr_rad: '{sem_rad_md}',
  cmp_sidebar_item_ico_siz: '{cmp_ico_siz_md}',

  cmp_sidebar_trn_dur: '{sem_motion_dur_normal}',

  // --- Table ---
  cmp_tbl_bkg: '{sem_color_bkg_sec}',
  cmp_tbl_bdr_color: '{sem_color_bdr_default}',
  cmp_tbl_bdr_wdt: '1px',
  cmp_tbl_bdr_rad: '{sem_rad_md}',

  cmp_tbl_header_bkg: '{sem_color_bkg_ter}',
  cmp_tbl_header_txt_color: '{sem_color_txt_pri}',
  cmp_tbl_header_fnt_wgt: 600,
  cmp_tbl_header_pad_x: '{sem_spc_inset_md}',
  cmp_tbl_header_pad_y: '{sem_spc_inset_sm}',
  cmp_tbl_header_bdr_color: '{sem_color_bdr_default}',

  cmp_tbl_cell_pad_x: '{sem_spc_inset_md}',
  cmp_tbl_cell_pad_y: '{sem_spc_inset_sm}',
  cmp_tbl_cell_bdr_color: '{sem_color_bdr_sub}',

  cmp_tbl_row_bkg_hov: '{sem_color_bkg_ter}',
  cmp_tbl_row_bkg_sel: 'rgba(59, 130, 246, 0.1)',
  cmp_tbl_row_bkg_striped: '{sem_color_bkg_sec}',

  // --- Tabs ---
  cmp_tab_bdr_color: '{sem_color_bdr_default}',
  cmp_tab_bdr_wdt: '1px',
  cmp_tab_gap: '{sem_spc_inline_lg}',

  cmp_tab_item_pad_x: '{sem_spc_inset_md}',
  cmp_tab_item_pad_y: '{sem_spc_inset_sm}',
  cmp_tab_item_txt_color: '{sem_color_txt_sec}',
  cmp_tab_item_txt_color_hov: '{sem_color_txt_pri}',
  cmp_tab_item_txt_color_act: '{sem_color_interactive_pri}',
  cmp_tab_item_bkg_hov: '{sem_color_bkg_ter}',
  cmp_tab_item_bkg_act: 'transparent',
  cmp_tab_item_bdr_rad: '{sem_rad_sm}',
  cmp_tab_item_fnt_wgt: 500,
  cmp_tab_item_fnt_wgt_act: 600,

  cmp_tab_indicator_hgt: '2px',
  cmp_tab_indicator_color: '{sem_color_interactive_pri}',
  cmp_tab_indicator_trn_dur: '{sem_motion_dur_normal}',

  cmp_tab_panel_pad: '{sem_spc_inset_lg}',

  // --- Accordion ---
  cmp_acc_bdr_color: '{sem_color_bdr_default}',
  cmp_acc_bdr_wdt: '1px',
  cmp_acc_bdr_rad: '{sem_rad_md}',

  cmp_acc_item_pad_x: '{sem_spc_inset_md}',
  cmp_acc_item_pad_y: '{sem_spc_inset_sm}',
  cmp_acc_item_bkg: 'transparent',
  cmp_acc_item_bkg_hov: '{sem_color_bkg_ter}',
  cmp_acc_item_bkg_act: '{sem_color_bkg_sec}',

  cmp_acc_trigger_fnt_wgt: 600,
  cmp_acc_trigger_txt_color: '{sem_color_txt_pri}',
  cmp_acc_trigger_ico_siz: '{cmp_ico_siz_sm}',
  cmp_acc_trigger_ico_trn_dur: '{sem_motion_dur_fast}',

  cmp_acc_content_pad_x: '{sem_spc_inset_md}',
  cmp_acc_content_pad_y: '{sem_spc_inset_md}',
  cmp_acc_content_ani_dur: '{sem_motion_dur_normal}',

  // --- Breadcrumb ---
  cmp_brd_gap: '{sem_spc_inline_sm}',
  cmp_brd_fnt_siz: '{sem_typo_body_sm_siz}',
  cmp_brd_txt_color: '{sem_color_txt_sec}',
  cmp_brd_txt_color_current: '{sem_color_txt_pri}',
  cmp_brd_lnk_color: '{sem_color_txt_lnk}',
  cmp_brd_lnk_color_hov: '{sem_color_txt_lnk_hov}',
  cmp_brd_separator_color: '{sem_color_txt_ter}',
  cmp_brd_separator_siz: '{cmp_ico_siz_sm}',

  // --- Pagination ---
  cmp_pgn_gap: '{sem_spc_inline_sm}',
  cmp_pgn_item_siz: '40px',
  cmp_pgn_item_bdr_rad: '{sem_rad_md}',
  cmp_pgn_item_bkg: 'transparent',
  cmp_pgn_item_bkg_hov: '{sem_color_bkg_ter}',
  cmp_pgn_item_bkg_act: '{sem_color_interactive_pri}',
  cmp_pgn_item_txt_color: '{sem_color_txt_pri}',
  cmp_pgn_item_txt_color_act: '#ffffff',
  cmp_pgn_item_bdr_color: '{sem_color_bdr_default}',
  cmp_pgn_item_bdr_color_act: 'transparent',

  // --- Progress Bar ---
  cmp_prg_hgt_sm: '4px',
  cmp_prg_hgt_md: '8px',
  cmp_prg_hgt_lg: '12px',
  cmp_prg_bkg: '{sem_color_bkg_ter}',
  cmp_prg_fill_bkg: '{sem_color_interactive_pri}',
  cmp_prg_bdr_rad: '{sem_rad_full}',
  cmp_prg_trn_dur: '{sem_motion_dur_normal}',

  // --- Slider ---
  cmp_sldr_track_hgt: '4px',
  cmp_sldr_track_bkg: '{sem_color_bkg_ter}',
  cmp_sldr_track_bkg_filled: '{sem_color_interactive_pri}',
  cmp_sldr_track_bdr_rad: '{sem_rad_full}',

  cmp_sldr_thumb_siz: '20px',
  cmp_sldr_thumb_bkg: '#ffffff',
  cmp_sldr_thumb_bdr_color: '{sem_color_interactive_pri}',
  cmp_sldr_thumb_bdr_wdt: '2px',
  cmp_sldr_thumb_shd: '{sem_shd_sm}',
  cmp_sldr_thumb_shd_hov: '{sem_shd_md}',
  cmp_sldr_thumb_shd_act: '{sem_shd_lg}',

  // --- Alert ---
  cmp_alt_pad: '{sem_spc_inset_md}',
  cmp_alt_bdr_rad: '{sem_rad_md}',
  cmp_alt_bdr_wdt: '1px',
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

  // --- Select ---
  cmp_sel_trigger_hgt_sm: '{cmp_inp_hgt_sm}',
  cmp_sel_trigger_hgt_md: '{cmp_inp_hgt_md}',
  cmp_sel_trigger_hgt_lg: '{cmp_inp_hgt_lg}',
  cmp_sel_trigger_pad_x: '{cmp_inp_pad_x_md}',
  cmp_sel_trigger_bkg: '{cmp_inp_bkg}',
  cmp_sel_trigger_bdr_color: '{cmp_inp_bdr_color}',
  cmp_sel_trigger_bdr_wdt: '{cmp_inp_bdr_wdt}',
  cmp_sel_trigger_bdr_rad: '{cmp_inp_bdr_rad}',
  cmp_sel_trigger_ico_siz: '{cmp_ico_siz_sm}',
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
};
