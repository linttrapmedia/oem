// states.ts
import { State, useMediaQueryState } from '../src/registry';
import type { Section } from './types';

// Current active section
export const activeSection = State<Section>('hero');

// Mobile nav open/close
export const navOpen = State(false);

// Responsive breakpoints (mobile-first)
export const isTablet = useMediaQueryState({ minWidth: 768, maxWidth: 1023 });
export const isDesktop = useMediaQueryState({ minWidth: 1024 });

// Track scroll for header effects
export const scrolled = State(false);

// Code example expansion state
export const expandedExample = State<number | null>(null);
