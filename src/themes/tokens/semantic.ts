/**
 * LAYER 1: SEMANTIC (sem_)
 * Purpose-based design values — colors, spacing, typography, radius, shadows,
 * motion, and effects. These hold the direct CSS values that give meaning to
 * the design system.
 *
 * Token selection cascade: cmp_ → sem_ → inline style
 */

export type SemanticTokens = {
  // --- Semantic Colors: Backgrounds ---
  sem_color_bkg_pri: string | number;
  sem_color_bkg_sec: string | number;
  sem_color_bkg_ter: string | number;
  sem_color_bkg_inv: string | number;
  sem_color_bkg_overlay: string | number;
  sem_color_bkg_elevated: string | number;
  sem_color_bkg_sunken: string | number;

  // --- Semantic Colors: Text ---
  sem_color_txt_pri: string | number;
  sem_color_txt_sec: string | number;
  sem_color_txt_ter: string | number;
  sem_color_txt_inv: string | number;
  sem_color_txt_dis: string | number;
  sem_color_txt_placeholder: string | number;
  sem_color_txt_lnk: string | number;
  sem_color_txt_lnk_hov: string | number;

  // --- Semantic Colors: Borders ---
  sem_color_bdr_default: string | number;
  sem_color_bdr_str: string | number;
  sem_color_bdr_sub: string | number;
  sem_color_bdr_inv: string | number;
  sem_color_bdr_dis: string | number;
  sem_color_bdr_foc: string | number;

  // --- Semantic Colors: States ---
  sem_color_state_err: string | number;
  sem_color_state_err_bkg: string | number;
  sem_color_state_err_bdr: string | number;
  sem_color_state_err_txt: string | number;

  sem_color_state_suc: string | number;
  sem_color_state_suc_bkg: string | number;
  sem_color_state_suc_bdr: string | number;
  sem_color_state_suc_txt: string | number;

  sem_color_state_wrn: string | number;
  sem_color_state_wrn_bkg: string | number;
  sem_color_state_wrn_bdr: string | number;
  sem_color_state_wrn_txt: string | number;

  sem_color_state_inf: string | number;
  sem_color_state_inf_bkg: string | number;
  sem_color_state_inf_bdr: string | number;
  sem_color_state_inf_txt: string | number;

  // --- Semantic Colors: Interactive ---
  sem_color_interactive_pri: string | number;
  sem_color_interactive_pri_hov: string | number;
  sem_color_interactive_pri_act: string | number;
  sem_color_interactive_pri_dis: string | number;

  sem_color_interactive_sec: string | number;
  sem_color_interactive_sec_hov: string | number;
  sem_color_interactive_sec_act: string | number;

  sem_color_interactive_accent: string | number;
  sem_color_interactive_accent_hov: string | number;
  sem_color_interactive_accent_act: string | number;

  // --- Semantic Spacing ---
  sem_spc_inline_xs: string | number;
  sem_spc_inline_sm: string | number;
  sem_spc_inline_md: string | number;
  sem_spc_inline_lg: string | number;
  sem_spc_inline_xl: string | number;

  sem_spc_stack_xs: string | number;
  sem_spc_stack_sm: string | number;
  sem_spc_stack_md: string | number;
  sem_spc_stack_lg: string | number;
  sem_spc_stack_xl: string | number;
  sem_spc_stack_2xl: string | number;

  sem_spc_inset_xs: string | number;
  sem_spc_inset_sm: string | number;
  sem_spc_inset_md: string | number;
  sem_spc_inset_lg: string | number;
  sem_spc_inset_xl: string | number;

  // --- Semantic Typography ---
  sem_typo_display_lrg_siz: string | number;
  sem_typo_display_lrg_wgt: string | number;
  sem_typo_display_lrg_lnh: string | number;
  sem_typo_display_lrg_lsp: string | number;

  sem_typo_display_med_siz: string | number;
  sem_typo_display_med_wgt: string | number;
  sem_typo_display_med_lnh: string | number;

  sem_typo_display_sml_siz: string | number;
  sem_typo_display_sml_wgt: string | number;
  sem_typo_display_sml_lnh: string | number;

  sem_typo_heading_xl_siz: string | number;
  sem_typo_heading_xl_wgt: string | number;
  sem_typo_heading_xl_lnh: string | number;

  sem_typo_heading_lg_siz: string | number;
  sem_typo_heading_lg_wgt: string | number;
  sem_typo_heading_lg_lnh: string | number;

  sem_typo_heading_md_siz: string | number;
  sem_typo_heading_md_wgt: string | number;
  sem_typo_heading_md_lnh: string | number;

  sem_typo_heading_sm_siz: string | number;
  sem_typo_heading_sm_wgt: string | number;
  sem_typo_heading_sm_lnh: string | number;

  sem_typo_body_lg_siz: string | number;
  sem_typo_body_lg_wgt: string | number;
  sem_typo_body_lg_lnh: string | number;

  sem_typo_body_md_siz: string | number;
  sem_typo_body_md_wgt: string | number;
  sem_typo_body_md_lnh: string | number;

  sem_typo_body_sm_siz: string | number;
  sem_typo_body_sm_wgt: string | number;
  sem_typo_body_sm_lnh: string | number;

  sem_typo_caption_siz: string | number;
  sem_typo_caption_wgt: string | number;
  sem_typo_caption_lnh: string | number;

  sem_typo_overline_siz: string | number;
  sem_typo_overline_wgt: string | number;
  sem_typo_overline_lnh: string | number;
  sem_typo_overline_lsp: string | number;

  sem_typo_code_siz: string | number;
  sem_typo_code_wgt: string | number;
  sem_typo_code_family: string | number;

  // --- Semantic Radius ---
  sem_rad_none: string | number;
  sem_rad_sm: string | number;
  sem_rad_md: string | number;
  sem_rad_lg: string | number;
  sem_rad_xl: string | number;
  sem_rad_full: string | number;

  // --- Semantic Shadows ---
  sem_shd_none: string | number;
  sem_shd_sm: string | number;
  sem_shd_md: string | number;
  sem_shd_lg: string | number;
  sem_shd_xl: string | number;
  sem_shd_2xl: string | number;
  sem_shd_inner: string | number;

  // --- Semantic Motion ---
  sem_motion_dur_instant: string | number;
  sem_motion_dur_fast: string | number;
  sem_motion_dur_normal: string | number;
  sem_motion_dur_slow: string | number;

  sem_motion_eas_std: string | number;
  sem_motion_eas_accelerate: string | number;
  sem_motion_eas_decelerate: string | number;
  sem_motion_eas_bounce: string | number;

  // --- Semantic Effects ---
  sem_effect_foc_ring_wdt: string | number;
  sem_effect_foc_ring_color: string | number;
  sem_effect_foc_ring_off: string | number;
  sem_effect_foc_ring_style: string | number;

  sem_effect_dis_opac: string | number;
  sem_effect_hov_opac: string | number;
};
