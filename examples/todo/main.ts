// ─── Main ────────────────────────────────────────────────────────────────────

import { App } from './ui';

// Reset default browser styles
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.backgroundColor = '#1a1a2e';
document.body.style.color = '#eee';
document.body.style.minHeight = '100vh';

// Mount the app
document.body.appendChild(App());
