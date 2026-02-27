/**
 * LAYER 2: COMPONENT (cmp_)
 * All UI components — covers both structural properties (sizes, spacing, radii)
 * and visual/state properties (colors, shadows, transitions).
 *
 * Component tokens are the PRIMARY layer for generated UI code. When an LLM
 * needs to style any UI part — from an atomic checkbox to a full modal — it
 * should first search for matching cmp_ tokens before falling back to sem_.
 *
 * Token selection cascade: cmp_ → sem_ → inline style
 */

export type ComponentTokens = {
  // --- Button Base ---
  cmp_btn_hgt_sm: string | number;
  cmp_btn_hgt_md: string | number;
  cmp_btn_hgt_lg: string | number;

  cmp_btn_pad_x_sm: string | number;
  cmp_btn_pad_x_md: string | number;
  cmp_btn_pad_x_lg: string | number;

  cmp_btn_fnt_siz_sm: string | number;
  cmp_btn_fnt_siz_md: string | number;
  cmp_btn_fnt_siz_lg: string | number;

  cmp_btn_fnt_wgt: string | number;
  cmp_btn_bdr_wdt: string | number;
  cmp_btn_bdr_rad: string | number;
  cmp_btn_gap: string | number;

  cmp_btn_trn_dur: string | number;
  cmp_btn_trn_eas: string | number;

  // --- Button: Primary Variant ---
  cmp_btn_pri_bkg: string | number;
  cmp_btn_pri_bkg_hov: string | number;
  cmp_btn_pri_bkg_act: string | number;
  cmp_btn_pri_bkg_dis: string | number;
  cmp_btn_pri_txt_color: string | number;
  cmp_btn_pri_txt_color_dis: string | number;
  cmp_btn_pri_bdr_color: string | number;
  cmp_btn_pri_shd: string | number;
  cmp_btn_pri_shd_hov: string | number;

  // --- Button: Secondary Variant ---
  cmp_btn_sec_bkg: string | number;
  cmp_btn_sec_bkg_hov: string | number;
  cmp_btn_sec_bkg_act: string | number;
  cmp_btn_sec_bkg_dis: string | number;
  cmp_btn_sec_txt_color: string | number;
  cmp_btn_sec_txt_color_dis: string | number;
  cmp_btn_sec_bdr_color: string | number;
  cmp_btn_sec_bdr_color_hov: string | number;

  // --- Button: Ghost Variant ---
  cmp_btn_gho_bkg: string | number;
  cmp_btn_gho_bkg_hov: string | number;
  cmp_btn_gho_bkg_act: string | number;
  cmp_btn_gho_txt_color: string | number;
  cmp_btn_gho_txt_color_hov: string | number;

  // --- Button: Danger Variant ---
  cmp_btn_dng_bkg: string | number;
  cmp_btn_dng_bkg_hov: string | number;
  cmp_btn_dng_bkg_act: string | number;
  cmp_btn_dng_txt_color: string | number;
  cmp_btn_dng_bdr_color: string | number;

  // --- Input Base ---
  cmp_inp_hgt_sm: string | number;
  cmp_inp_hgt_md: string | number;
  cmp_inp_hgt_lg: string | number;

  cmp_inp_pad_x_sm: string | number;
  cmp_inp_pad_x_md: string | number;
  cmp_inp_pad_x_lg: string | number;

  cmp_inp_fnt_siz_sm: string | number;
  cmp_inp_fnt_siz_md: string | number;
  cmp_inp_fnt_siz_lg: string | number;

  cmp_inp_bdr_wdt: string | number;
  cmp_inp_bdr_rad: string | number;
  cmp_inp_bdr_color: string | number;
  cmp_inp_bdr_color_hov: string | number;
  cmp_inp_bdr_color_foc: string | number;
  cmp_inp_bdr_color_err: string | number;

  cmp_inp_bkg: string | number;
  cmp_inp_bkg_dis: string | number;
  cmp_inp_txt_color: string | number;
  cmp_inp_txt_color_dis: string | number;
  cmp_inp_placeholder_color: string | number;

  cmp_inp_trn_dur: string | number;

  // --- Checkbox/Radio ---
  cmp_chk_siz_sm: string | number;
  cmp_chk_siz_md: string | number;
  cmp_chk_siz_lg: string | number;

  cmp_chk_bdr_wdt: string | number;
  cmp_chk_bdr_rad: string | number;
  cmp_chk_bdr_color: string | number;
  cmp_chk_bdr_color_chk: string | number;
  cmp_chk_bkg: string | number;
  cmp_chk_bkg_chk: string | number;
  cmp_chk_checkmark_color: string | number;

  cmp_rad_bdr_rad: string | number;

  // --- Switch ---
  cmp_swt_wdt_sm: string | number;
  cmp_swt_wdt_md: string | number;
  cmp_swt_wdt_lg: string | number;

  cmp_swt_hgt_sm: string | number;
  cmp_swt_hgt_md: string | number;
  cmp_swt_hgt_lg: string | number;

  cmp_swt_thumb_siz_sm: string | number;
  cmp_swt_thumb_siz_md: string | number;
  cmp_swt_thumb_siz_lg: string | number;

  cmp_swt_bkg: string | number;
  cmp_swt_bkg_chk: string | number;
  cmp_swt_thumb_color: string | number;
  cmp_swt_bdr_rad: string | number;
  cmp_swt_trn_dur: string | number;

  // --- Badge ---
  cmp_bdg_pad_x_sm: string | number;
  cmp_bdg_pad_x_md: string | number;
  cmp_bdg_pad_y_sm: string | number;
  cmp_bdg_pad_y_md: string | number;

  cmp_bdg_fnt_siz_sm: string | number;
  cmp_bdg_fnt_siz_md: string | number;
  cmp_bdg_fnt_wgt: string | number;
  cmp_bdg_bdr_rad: string | number;
  cmp_bdg_bdr_wdt: string | number;

  // --- Avatar ---
  cmp_avt_siz_xs: string | number;
  cmp_avt_siz_sm: string | number;
  cmp_avt_siz_md: string | number;
  cmp_avt_siz_lg: string | number;
  cmp_avt_siz_xl: string | number;
  cmp_avt_siz_2xl: string | number;

  cmp_avt_bdr_rad: string | number;
  cmp_avt_bdr_wdt: string | number;
  cmp_avt_bdr_color: string | number;
  cmp_avt_bkg: string | number;
  cmp_avt_txt_color: string | number;

  // --- Icon ---
  cmp_ico_siz_xs: string | number;
  cmp_ico_siz_sm: string | number;
  cmp_ico_siz_md: string | number;
  cmp_ico_siz_lg: string | number;
  cmp_ico_siz_xl: string | number;
  cmp_ico_siz_2xl: string | number;

  cmp_ico_color_default: string | number;
  cmp_ico_color_muted: string | number;
  cmp_ico_color_pri: string | number;
  cmp_ico_color_suc: string | number;
  cmp_ico_color_wrn: string | number;
  cmp_ico_color_err: string | number;

  // --- Link ---
  cmp_lnk_color: string | number;
  cmp_lnk_color_hov: string | number;
  cmp_lnk_color_vis: string | number;
  cmp_lnk_txt_decoration: string | number;
  cmp_lnk_txt_decoration_hov: string | number;
  cmp_lnk_fnt_wgt: string | number;

  // --- Divider ---
  cmp_div_wdt: string | number;
  cmp_div_color: string | number;
  cmp_div_color_str: string | number;
  cmp_div_spc: string | number;

  // --- Spinner ---
  cmp_spn_siz_sm: string | number;
  cmp_spn_siz_md: string | number;
  cmp_spn_siz_lg: string | number;
  cmp_spn_color: string | number;
  cmp_spn_track_color: string | number;
  cmp_spn_bdr_wdt: string | number;
  cmp_spn_dur: string | number;

  // --- Card ---
  cmp_cdl_bkg: string | number;
  cmp_cdl_bdr_color: string | number;
  cmp_cdl_bdr_wdt: string | number;
  cmp_cdl_bdr_rad: string | number;
  cmp_cdl_pad: string | number;
  cmp_cdl_shd: string | number;
  cmp_cdl_shd_hov: string | number;
  cmp_cdl_header_pad: string | number;
  cmp_cdl_body_pad: string | number;
  cmp_cdl_footer_pad: string | number;
  cmp_cdl_gap: string | number;

  // --- Modal ---
  cmp_mod_bkg: string | number;
  cmp_mod_bdr_rad: string | number;
  cmp_mod_shd: string | number;
  cmp_mod_max_wdt_sm: string | number;
  cmp_mod_max_wdt_md: string | number;
  cmp_mod_max_wdt_lg: string | number;
  cmp_mod_max_wdt_xl: string | number;

  cmp_mod_overlay_bkg: string | number;
  cmp_mod_overlay_opac: string | number;
  cmp_mod_overlay_blur: string | number;

  cmp_mod_header_pad: string | number;
  cmp_mod_body_pad: string | number;
  cmp_mod_footer_pad: string | number;
  cmp_mod_gap: string | number;

  cmp_mod_close_siz: string | number;
  cmp_mod_close_color: string | number;
  cmp_mod_close_color_hov: string | number;

  cmp_mod_enter_dur: string | number;
  cmp_mod_exit_dur: string | number;
  cmp_mod_enter_eas: string | number;
  cmp_mod_exit_eas: string | number;

  // --- Dropdown ---
  cmp_drp_bkg: string | number;
  cmp_drp_bdr_color: string | number;
  cmp_drp_bdr_wdt: string | number;
  cmp_drp_bdr_rad: string | number;
  cmp_drp_shd: string | number;
  cmp_drp_pad: string | number;
  cmp_drp_max_hgt: string | number;

  cmp_drp_item_pad_x: string | number;
  cmp_drp_item_pad_y: string | number;
  cmp_drp_item_bkg_hov: string | number;
  cmp_drp_item_bkg_act: string | number;
  cmp_drp_item_txt_color: string | number;
  cmp_drp_item_txt_color_act: string | number;
  cmp_drp_item_bdr_rad: string | number;

  cmp_drp_divider_color: string | number;
  cmp_drp_divider_mar: string | number;

  // --- Tooltip ---
  cmp_tip_bkg: string | number;
  cmp_tip_txt_color: string | number;
  cmp_tip_pad_x: string | number;
  cmp_tip_pad_y: string | number;
  cmp_tip_fnt_siz: string | number;
  cmp_tip_bdr_rad: string | number;
  cmp_tip_shd: string | number;
  cmp_tip_max_wdt: string | number;
  cmp_tip_arrow_siz: string | number;
  cmp_tip_off: string | number;
  cmp_tip_enter_dur: string | number;
  cmp_tip_exit_dur: string | number;

  // --- Popover ---
  cmp_pop_bkg: string | number;
  cmp_pop_bdr_color: string | number;
  cmp_pop_bdr_wdt: string | number;
  cmp_pop_bdr_rad: string | number;
  cmp_pop_shd: string | number;
  cmp_pop_pad: string | number;
  cmp_pop_max_wdt: string | number;
  cmp_pop_arrow_siz: string | number;
  cmp_pop_off: string | number;

  // --- Toast/Notification ---
  cmp_tst_bkg: string | number;
  cmp_tst_bdr_rad: string | number;
  cmp_tst_shd: string | number;
  cmp_tst_pad: string | number;
  cmp_tst_max_wdt: string | number;
  cmp_tst_gap: string | number;

  cmp_tst_suc_bkg: string | number;
  cmp_tst_suc_bdr_color: string | number;
  cmp_tst_suc_ico_color: string | number;

  cmp_tst_err_bkg: string | number;
  cmp_tst_err_bdr_color: string | number;
  cmp_tst_err_ico_color: string | number;

  cmp_tst_wrn_bkg: string | number;
  cmp_tst_wrn_bdr_color: string | number;
  cmp_tst_wrn_ico_color: string | number;

  cmp_tst_inf_bkg: string | number;
  cmp_tst_inf_bdr_color: string | number;
  cmp_tst_inf_ico_color: string | number;

  cmp_tst_enter_dur: string | number;
  cmp_tst_exit_dur: string | number;

  // --- Navigation ---
  cmp_nav_bkg: string | number;
  cmp_nav_bdr_color: string | number;
  cmp_nav_bdr_wdt: string | number;
  cmp_nav_hgt: string | number;
  cmp_nav_pad_x: string | number;
  cmp_nav_shd: string | number;

  cmp_nav_item_pad_x: string | number;
  cmp_nav_item_pad_y: string | number;
  cmp_nav_item_gap: string | number;
  cmp_nav_item_txt_color: string | number;
  cmp_nav_item_txt_color_hov: string | number;
  cmp_nav_item_txt_color_act: string | number;
  cmp_nav_item_bkg_hov: string | number;
  cmp_nav_item_bkg_act: string | number;
  cmp_nav_item_bdr_rad: string | number;
  cmp_nav_item_fnt_wgt: string | number;
  cmp_nav_item_fnt_wgt_act: string | number;

  cmp_nav_indicator_hgt: string | number;
  cmp_nav_indicator_color: string | number;

  // --- Sidebar ---
  cmp_sidebar_wdt: string | number;
  cmp_sidebar_wdt_collapsed: string | number;
  cmp_sidebar_bkg: string | number;
  cmp_sidebar_bdr_color: string | number;
  cmp_sidebar_bdr_wdt: string | number;
  cmp_sidebar_pad: string | number;

  cmp_sidebar_item_pad_x: string | number;
  cmp_sidebar_item_pad_y: string | number;
  cmp_sidebar_item_gap: string | number;
  cmp_sidebar_item_txt_color: string | number;
  cmp_sidebar_item_txt_color_hov: string | number;
  cmp_sidebar_item_txt_color_act: string | number;
  cmp_sidebar_item_bkg_hov: string | number;
  cmp_sidebar_item_bkg_act: string | number;
  cmp_sidebar_item_bdr_rad: string | number;
  cmp_sidebar_item_ico_siz: string | number;

  cmp_sidebar_trn_dur: string | number;

  // --- Table ---
  cmp_tbl_bkg: string | number;
  cmp_tbl_bdr_color: string | number;
  cmp_tbl_bdr_wdt: string | number;
  cmp_tbl_bdr_rad: string | number;

  cmp_tbl_header_bkg: string | number;
  cmp_tbl_header_txt_color: string | number;
  cmp_tbl_header_fnt_wgt: string | number;
  cmp_tbl_header_pad_x: string | number;
  cmp_tbl_header_pad_y: string | number;
  cmp_tbl_header_bdr_color: string | number;

  cmp_tbl_cell_pad_x: string | number;
  cmp_tbl_cell_pad_y: string | number;
  cmp_tbl_cell_bdr_color: string | number;

  cmp_tbl_row_bkg_hov: string | number;
  cmp_tbl_row_bkg_sel: string | number;
  cmp_tbl_row_bkg_striped: string | number;

  // --- Tabs ---
  cmp_tab_bdr_color: string | number;
  cmp_tab_bdr_wdt: string | number;
  cmp_tab_gap: string | number;

  cmp_tab_item_pad_x: string | number;
  cmp_tab_item_pad_y: string | number;
  cmp_tab_item_txt_color: string | number;
  cmp_tab_item_txt_color_hov: string | number;
  cmp_tab_item_txt_color_act: string | number;
  cmp_tab_item_bkg_hov: string | number;
  cmp_tab_item_bkg_act: string | number;
  cmp_tab_item_bdr_rad: string | number;
  cmp_tab_item_fnt_wgt: string | number;
  cmp_tab_item_fnt_wgt_act: string | number;

  cmp_tab_indicator_hgt: string | number;
  cmp_tab_indicator_color: string | number;
  cmp_tab_indicator_trn_dur: string | number;

  cmp_tab_panel_pad: string | number;

  // --- Accordion ---
  cmp_acc_bdr_color: string | number;
  cmp_acc_bdr_wdt: string | number;
  cmp_acc_bdr_rad: string | number;

  cmp_acc_item_pad_x: string | number;
  cmp_acc_item_pad_y: string | number;
  cmp_acc_item_bkg: string | number;
  cmp_acc_item_bkg_hov: string | number;
  cmp_acc_item_bkg_act: string | number;

  cmp_acc_trigger_fnt_wgt: string | number;
  cmp_acc_trigger_txt_color: string | number;
  cmp_acc_trigger_ico_siz: string | number;
  cmp_acc_trigger_ico_trn_dur: string | number;

  cmp_acc_content_pad_x: string | number;
  cmp_acc_content_pad_y: string | number;
  cmp_acc_content_ani_dur: string | number;

  // --- Breadcrumb ---
  cmp_brd_gap: string | number;
  cmp_brd_fnt_siz: string | number;
  cmp_brd_txt_color: string | number;
  cmp_brd_txt_color_current: string | number;
  cmp_brd_lnk_color: string | number;
  cmp_brd_lnk_color_hov: string | number;
  cmp_brd_separator_color: string | number;
  cmp_brd_separator_siz: string | number;

  // --- Pagination ---
  cmp_pgn_gap: string | number;
  cmp_pgn_item_siz: string | number;
  cmp_pgn_item_bdr_rad: string | number;
  cmp_pgn_item_bkg: string | number;
  cmp_pgn_item_bkg_hov: string | number;
  cmp_pgn_item_bkg_act: string | number;
  cmp_pgn_item_txt_color: string | number;
  cmp_pgn_item_txt_color_act: string | number;
  cmp_pgn_item_bdr_color: string | number;
  cmp_pgn_item_bdr_color_act: string | number;

  // --- Progress Bar ---
  cmp_prg_hgt_sm: string | number;
  cmp_prg_hgt_md: string | number;
  cmp_prg_hgt_lg: string | number;
  cmp_prg_bkg: string | number;
  cmp_prg_fill_bkg: string | number;
  cmp_prg_bdr_rad: string | number;
  cmp_prg_trn_dur: string | number;

  // --- Slider ---
  cmp_sldr_track_hgt: string | number;
  cmp_sldr_track_bkg: string | number;
  cmp_sldr_track_bkg_filled: string | number;
  cmp_sldr_track_bdr_rad: string | number;

  cmp_sldr_thumb_siz: string | number;
  cmp_sldr_thumb_bkg: string | number;
  cmp_sldr_thumb_bdr_color: string | number;
  cmp_sldr_thumb_bdr_wdt: string | number;
  cmp_sldr_thumb_shd: string | number;
  cmp_sldr_thumb_shd_hov: string | number;
  cmp_sldr_thumb_shd_act: string | number;

  // --- Alert ---
  cmp_alt_pad: string | number;
  cmp_alt_bdr_rad: string | number;
  cmp_alt_bdr_wdt: string | number;
  cmp_alt_gap: string | number;

  cmp_alt_inf_bkg: string | number;
  cmp_alt_inf_bdr_color: string | number;
  cmp_alt_inf_txt_color: string | number;
  cmp_alt_inf_ico_color: string | number;

  cmp_alt_suc_bkg: string | number;
  cmp_alt_suc_bdr_color: string | number;
  cmp_alt_suc_txt_color: string | number;
  cmp_alt_suc_ico_color: string | number;

  cmp_alt_wrn_bkg: string | number;
  cmp_alt_wrn_bdr_color: string | number;
  cmp_alt_wrn_txt_color: string | number;
  cmp_alt_wrn_ico_color: string | number;

  cmp_alt_err_bkg: string | number;
  cmp_alt_err_bdr_color: string | number;
  cmp_alt_err_txt_color: string | number;
  cmp_alt_err_ico_color: string | number;

  // --- Select ---
  cmp_sel_trigger_hgt_sm: string | number;
  cmp_sel_trigger_hgt_md: string | number;
  cmp_sel_trigger_hgt_lg: string | number;
  cmp_sel_trigger_pad_x: string | number;
  cmp_sel_trigger_bkg: string | number;
  cmp_sel_trigger_bdr_color: string | number;
  cmp_sel_trigger_bdr_wdt: string | number;
  cmp_sel_trigger_bdr_rad: string | number;
  cmp_sel_trigger_ico_siz: string | number;
  cmp_sel_trigger_ico_color: string | number;

  cmp_sel_menu_bkg: string | number;
  cmp_sel_menu_bdr_color: string | number;
  cmp_sel_menu_bdr_wdt: string | number;
  cmp_sel_menu_bdr_rad: string | number;
  cmp_sel_menu_shd: string | number;
  cmp_sel_menu_max_hgt: string | number;

  cmp_sel_option_pad_x: string | number;
  cmp_sel_option_pad_y: string | number;
  cmp_sel_option_bkg_hov: string | number;
  cmp_sel_option_bkg_sel: string | number;
  cmp_sel_option_txt_color: string | number;
  cmp_sel_option_txt_color_sel: string | number;
};
