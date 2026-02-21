/**
 * Design Token System - Alternative 5 (3-Letter Minimum Abbreviations)
 *
 * Architecture layers (strict dependency order):
 * 1. pmt (primitives)  → raw measurable values
 * 2. exp (expression)  → global personality controls
 * 3. sem (semantic)    → UI meaning assignment
 * 4. elm (element)     → atomic UI parts
 * 5. cmp (component)   → design system components
 * 6. ftr (feature)     → product-level overrides
 *
 * Naming Rules:
 * - Flat structure only (no nesting)
 * - snake_case naming
 * - Minimum 3-letter abbreviations (except _x, _y, _sm, _md, _lg)
 * - Values: string | number
 * - References: {token_name} syntax
 * - Tokens may only reference lower layers
 *
 * Abbreviation Key:
 * - pmt=primitives, exp=expression, sem=semantic, elm=element, cmp=component, ftr=feature
 * - bkg=background, btn=button, txt=text, bdr=border, pad=padding, spc=spacing
 * - fnt=font, siz=size, wgt=weight, hgt=height, wdt=width, rad=radius
 * - hov=hover, act=active, dis=disabled, foc=focus, pri=primary, sec=secondary
 */

export * from './primitives';
export * from './expression';
export * from './semantic';
export * from './element';
export * from './component';
export * from './feature';

import type { PrimitiveTokens } from './primitives';
import type { ExpressionTokens } from './expression';
import type { SemanticTokens } from './semantic';
import type { ElementTokens } from './element';
import type { ComponentTokens } from './component';
import type { FeatureTokens } from './feature';

/**
 * Complete design token system combining all 6 layers
 */
export type DesignTokens = PrimitiveTokens &
  ExpressionTokens &
  SemanticTokens &
  ElementTokens &
  ComponentTokens &
  FeatureTokens;
