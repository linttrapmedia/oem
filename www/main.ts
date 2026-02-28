// main.ts
import { FONT_DISPLAY } from './constants';
import { tag, trait } from './templates';
import { surface_bg_primary, text_fg_primary, transition_medium } from './theme';
import { app } from './ui';

// Mount the app
tag.$(document.body)(
  trait.style('margin', '0'),
  trait.style('padding', '0'),
  trait.style('fontFamily', FONT_DISPLAY),
  trait.style('backgroundColor', surface_bg_primary.$val),
  trait.style('color', text_fg_primary.$val),
  trait.style('minHeight', '100vh'),
  trait.style('height', 'auto'),
  trait.style('overflow', 'visible'),
  trait.style('overflowX', 'hidden'),
  trait.style('display', 'block'),
  trait.style('transition', transition_medium.$val),
  app,
);
