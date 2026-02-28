// states.ts
import { State, useMediaQueryState } from '../src/registry';
import type { PrimitiveTab, Section } from './types';

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
