/**
 * LAYER 4: ELEMENT (elm_)
 * Atomic UI parts - may reference semantic/primitives/expression
 */

export type ElementTokens = {
  // --- Button Element Base ---
  elm_btn_hgt_sm: string | number;
  elm_btn_hgt_md: string | number;
  elm_btn_hgt_lg: string | number;

  elm_btn_pad_x_sm: string | number;
  elm_btn_pad_x_md: string | number;
  elm_btn_pad_x_lg: string | number;

  elm_btn_fnt_siz_sm: string | number;
  elm_btn_fnt_siz_md: string | number;
  elm_btn_fnt_siz_lg: string | number;

  elm_btn_fnt_wgt: string | number;
  elm_btn_bdr_wdt: string | number;
  elm_btn_bdr_rad: string | number;
  elm_btn_gap: string | number;

  elm_btn_trn_dur: string | number;
  elm_btn_trn_eas: string | number;

  // --- Input Element Base ---
  elm_inp_hgt_sm: string | number;
  elm_inp_hgt_md: string | number;
  elm_inp_hgt_lg: string | number;

  elm_inp_pad_x_sm: string | number;
  elm_inp_pad_x_md: string | number;
  elm_inp_pad_x_lg: string | number;

  elm_inp_fnt_siz_sm: string | number;
  elm_inp_fnt_siz_md: string | number;
  elm_inp_fnt_siz_lg: string | number;

  elm_inp_bdr_wdt: string | number;
  elm_inp_bdr_rad: string | number;
  elm_inp_bdr_color: string | number;
  elm_inp_bdr_color_hov: string | number;
  elm_inp_bdr_color_foc: string | number;
  elm_inp_bdr_color_err: string | number;

  elm_inp_bkg: string | number;
  elm_inp_bkg_dis: string | number;
  elm_inp_txt_color: string | number;
  elm_inp_txt_color_dis: string | number;
  elm_inp_placeholder_color: string | number;

  elm_inp_trn_dur: string | number;

  // --- Checkbox/Radio Element ---
  elm_chk_siz_sm: string | number;
  elm_chk_siz_md: string | number;
  elm_chk_siz_lg: string | number;

  elm_chk_bdr_wdt: string | number;
  elm_chk_bdr_rad: string | number;
  elm_chk_bdr_color: string | number;
  elm_chk_bdr_color_chk: string | number;
  elm_chk_bkg: string | number;
  elm_chk_bkg_chk: string | number;
  elm_chk_checkmark_color: string | number;

  elm_rad_bdr_rad: string | number;

  // --- Switch Element ---
  elm_swt_wdt_sm: string | number;
  elm_swt_wdt_md: string | number;
  elm_swt_wdt_lg: string | number;

  elm_swt_hgt_sm: string | number;
  elm_swt_hgt_md: string | number;
  elm_swt_hgt_lg: string | number;

  elm_swt_thumb_siz_sm: string | number;
  elm_swt_thumb_siz_md: string | number;
  elm_swt_thumb_siz_lg: string | number;

  elm_swt_bkg: string | number;
  elm_swt_bkg_chk: string | number;
  elm_swt_thumb_color: string | number;
  elm_swt_bdr_rad: string | number;
  elm_swt_trn_dur: string | number;

  // --- Badge Element ---
  elm_bdg_pad_x_sm: string | number;
  elm_bdg_pad_x_md: string | number;
  elm_bdg_pad_y_sm: string | number;
  elm_bdg_pad_y_md: string | number;

  elm_bdg_fnt_siz_sm: string | number;
  elm_bdg_fnt_siz_md: string | number;
  elm_bdg_fnt_wgt: string | number;
  elm_bdg_bdr_rad: string | number;
  elm_bdg_bdr_wdt: string | number;

  // --- Avatar Element ---
  elm_avt_siz_xs: string | number;
  elm_avt_siz_sm: string | number;
  elm_avt_siz_md: string | number;
  elm_avt_siz_lg: string | number;
  elm_avt_siz_xl: string | number;
  elm_avt_siz_2xl: string | number;

  elm_avt_bdr_rad: string | number;
  elm_avt_bdr_wdt: string | number;
  elm_avt_bdr_color: string | number;
  elm_avt_bkg: string | number;
  elm_avt_txt_color: string | number;

  // --- Icon Element ---
  elm_ico_siz_xs: string | number;
  elm_ico_siz_sm: string | number;
  elm_ico_siz_md: string | number;
  elm_ico_siz_lg: string | number;
  elm_ico_siz_xl: string | number;
  elm_ico_siz_2xl: string | number;

  elm_ico_color_default: string | number;
  elm_ico_color_muted: string | number;
  elm_ico_color_pri: string | number;
  elm_ico_color_suc: string | number;
  elm_ico_color_wrn: string | number;
  elm_ico_color_err: string | number;

  // --- Link Element ---
  elm_lnk_color: string | number;
  elm_lnk_color_hov: string | number;
  elm_lnk_color_vis: string | number;
  elm_lnk_txt_decoration: string | number;
  elm_lnk_txt_decoration_hov: string | number;
  elm_lnk_fnt_wgt: string | number;

  // --- Divider Element ---
  elm_div_wdt: string | number;
  elm_div_color: string | number;
  elm_div_color_str: string | number;
  elm_div_spc: string | number;

  // --- Spinner Element ---
  elm_spn_siz_sm: string | number;
  elm_spn_siz_md: string | number;
  elm_spn_siz_lg: string | number;
  elm_spn_color: string | number;
  elm_spn_track_color: string | number;
  elm_spn_bdr_wdt: string | number;
  elm_spn_dur: string | number;
};
