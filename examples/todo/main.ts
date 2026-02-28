// main.ts
import { FONT_PRIMARY } from './constants';
import { tag, trait } from './templates';
import { surface_bg_primary, text_fg_primary, transition_theme } from './theme';
import { app } from './ui';

// Inject hover CSS for action buttons (can't do :hover opacity with inline styles alone)
const styleEl = document.createElement('style');
styleEl.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::placeholder { opacity: 0.5; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.3); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(128,128,128,0.5); }
  div:hover > .todo-actions { opacity: 1 !important; }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
`;
document.head.appendChild(styleEl);

// Mount the app
tag.$(document.body)(
  trait.style('margin', '0'),
  trait.style('padding', '0'),
  trait.style('fontFamily', FONT_PRIMARY),
  trait.style('backgroundColor', surface_bg_primary.$val),
  trait.style('color', text_fg_primary.$val),
  trait.style('minHeight', '100vh'),
  trait.style('transition', transition_theme.$val),
  trait.style('overflowX', 'hidden'),
  app,
);
