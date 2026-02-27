/**
 * LAYER 6: FEATURE (ftr_)
 * Product-level overrides — may reference any layer.
 *
 * Feature tokens are checked FIRST in the token selection cascade when
 * building feature-specific flows (checkout, dashboard, auth, etc.).
 * Use sparingly — most styling should come from cmp_ tokens.
 *
 * Token selection cascade: ftr_ → cmp_ → elm_ → sem_ → inline
 */

export type FeatureTokens = {
  // --- Checkout Feature ---
  ftr_checkout_cta_bkg: string | number;
  ftr_checkout_cta_bkg_hov: string | number;
  ftr_checkout_cta_txt_color: string | number;
  ftr_checkout_prg_bar_color: string | number;
  ftr_checkout_trust_bdg_bkg: string | number;
  ftr_checkout_err_highlight_color: string | number;

  // --- Dashboard Feature ---
  ftr_dashboard_widget_bkg: string | number;
  ftr_dashboard_widget_bdr_color: string | number;
  ftr_dashboard_widget_shd: string | number;
  ftr_dashboard_chart_pri_color: string | number;
  ftr_dashboard_chart_sec_color: string | number;
  ftr_dashboard_stat_highlight_color: string | number;

  // --- Settings Feature ---
  ftr_settings_section_bkg: string | number;
  ftr_settings_section_bdr_color: string | number;
  ftr_settings_danger_zone_bkg: string | number;
  ftr_settings_danger_zone_bdr_color: string | number;
  ftr_settings_save_btn_bkg: string | number;

  // --- Auth Feature ---
  ftr_auth_cdl_bkg: string | number;
  ftr_auth_cdl_shd: string | number;
  ftr_auth_cdl_max_wdt: string | number;
  ftr_auth_divider_color: string | number;
  ftr_auth_social_btn_bdr_color: string | number;
  ftr_auth_lnk_color: string | number;

  // --- Onboarding Feature ---
  ftr_onboarding_prg_color: string | number;
  ftr_onboarding_step_act_color: string | number;
  ftr_onboarding_step_completed_color: string | number;
  ftr_onboarding_highlight_bkg: string | number;

  // --- Profile Feature ---
  ftr_profile_header_bkg: string | number;
  ftr_profile_avt_bdr_color: string | number;
  ftr_profile_avt_bdr_wdt: string | number;
  ftr_profile_bdg_verified_color: string | number;

  // --- Messaging Feature ---
  ftr_messaging_bubble_sent_bkg: string | number;
  ftr_messaging_bubble_received_bkg: string | number;
  ftr_messaging_bubble_sent_txt_color: string | number;
  ftr_messaging_bubble_received_txt_color: string | number;
  ftr_messaging_inp_bkg: string | number;
  ftr_messaging_timestamp_color: string | number;

  // --- Search Feature ---
  ftr_search_overlay_bkg: string | number;
  ftr_search_inp_bkg: string | number;
  ftr_search_result_bkg_hov: string | number;
  ftr_search_highlight_color: string | number;
  ftr_search_shortcut_bdg_bkg: string | number;
};
