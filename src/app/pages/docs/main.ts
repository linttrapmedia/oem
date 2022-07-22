import { Theme } from '@core/modules/Theme';
import { Shell } from 'src/app/components/Layout/Shells';
import { ROUTES } from '../config';
import { Menu } from './components/Menu';
import { PAGES } from './config';

window.addEventListener('DOMContentLoaded', async () => {
  // global styling
  const globalStyles = `html,body { 
    height:100%; 
    width:100%; 
    padding:0;
    margin:0;
    font-family:${Theme.Font('Space Grotesk')};
    display:flex;
    justify-content:center;
    overflow-x:hidden; 
  }`;
  const style = document.createElement('style');
  style.innerHTML = globalStyles;
  document.head.appendChild(style);

  // handle page routing
  const page = new URLSearchParams(window.location.search).get('p') as keyof typeof PAGES;
  document.body.appendChild(
    Shell.Documentation({
      menu: Menu,
      content: (PAGES[page] ?? PAGES.overview)(),
      selectors: [
        ['Docs', ROUTES.DOCS],
        ['Design', ROUTES.DESIGN_SYSTEM],
      ],
    }),
  );

  // handle anchor link
  const hash = window.location.hash ?? null;
  if (hash.length) {
    const element = document.querySelector(hash);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
