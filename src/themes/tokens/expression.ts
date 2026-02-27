/**
 * LAYER 2: EXPRESSION (exp_)
 * Global personality controls — may reference primitives only.
 *
 * @internal These tokens are system-wide personality knobs consumed by the
 * Semantic layer. They must NEVER be referenced in UI code, trait.style()
 * calls, or any generated output. Their effects cascade automatically
 * through the semantic → element → component chain.
 */

export type ExpressionTokens = {
  // --- Motion Energy (affects all animations) ---
  exp_motion_energy_low: string | number; // Calmer, slower (1.5x duration)
  exp_motion_energy_med: string | number; // Balanced (1x duration)
  exp_motion_energy_high: string | number; // Snappier, faster (0.7x duration)
  exp_motion_energy_act: string | number; // Current setting reference

  // --- Density (affects spacing) ---
  exp_density_compact: string | number; // 0.75x spacing
  exp_density_comfortable: string | number; // 1x spacing
  exp_density_spacious: string | number; // 1.25x spacing
  exp_density_act: string | number; // Current setting reference

  // --- Roundness (affects all border radius) ---
  exp_roundness_sharp: string | number; // Minimal radius
  exp_roundness_moderate: string | number; // Balanced radius
  exp_roundness_soft: string | number; // Generous radius
  exp_roundness_act: string | number; // Current setting reference

  // --- Elevation Style (affects shadow intensity) ---
  exp_elevation_flat: string | number; // Minimal shadows
  exp_elevation_raised: string | number; // Medium shadows
  exp_elevation_floating: string | number; // Pronounced shadows
  exp_elevation_act: string | number; // Current setting reference

  // --- Contrast Preference ---
  exp_contrast_low: string | number; // Subtle differences
  exp_contrast_med: string | number; // Balanced
  exp_contrast_high: string | number; // Strong differences
  exp_contrast_act: string | number; // Current setting reference
};
