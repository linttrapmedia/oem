// states.ts
import { State, useMediaQueryState } from '../src/registry';
import type { PrimitiveTab, Section, WizardTab } from './types';

// Current active section
export const activeSection = State<Section>('hero');

// Mobile nav open/close
export const navOpen = State(false);

// Responsive breakpoints (mobile-first)
export const isTablet = useMediaQueryState({ minWidth: 768, maxWidth: 1023 });
export const isDesktop = useMediaQueryState({ minWidth: 1024 });

// Track scroll for header effects
export const scrolled = State(false);

// Primitives section tab state
export const primitiveTab = State<PrimitiveTab>('element');

// Accordion: which examples are expanded (independent toggle)
export const expandedExamples = State<Set<number>>(new Set());

// Toast notification
export const toastVisible = State(false);
export const toastMessage = State('');

// Dialog overlay
export const dialogOpen = State(false);

// ═══════════════════════════════════════════════
// PROMPT WIZARD STATE
// ═══════════════════════════════════════════════

export type BddScenario = {
  given: string;
  when: string;
  then: string;
};

export type BddFeature = {
  name: string;
  scenarios: BddScenario[];
};

// Wizard tab navigation
export const wizardTab = State<WizardTab>('basics');

// Wizard form fields
export const wizardAppName = State('');
export const wizardAppDescription = State('');
export const wizardAesthetic = State('modern');
export const wizardColorScheme = State('dark');
export const wizardLayout = State('single-page');
export const wizardFeatures = State<BddFeature[]>([]);
export const wizardExtraInstructions = State('');
export const wizardPromptOverride = State('');

// BDD editor transient form state
export const wizardNewFeatureName = State('');
export const wizardActiveFeature = State(0);
export const wizardNewGiven = State('');
export const wizardNewWhen = State('');
export const wizardNewThen = State('');
