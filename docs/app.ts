import { html, menuState } from './config';
import { Docs } from './pages/Docs';
import { Factory } from './pages/Factory';
import { Introduction } from './pages/Introduction';
import { Patterns } from './pages/Patterns';
import { State } from './pages/State';
import { Templating } from './pages/Templating';
import { Traits } from './pages/Traits';
import { Menu } from './parts/Menu';

function App() {
  return html.div(
    ['attr', 'data-part', 'App'],
    ['style', 'display', 'grid'],
    ['style', 'gridTemplateRows', 'max-content 1fr'],
    ['style', 'gridTemplateColumns', '1fr'],
    ['style:tablet', 'gridTemplateRows', 'auto'],
    ['style:tablet', 'gridTemplateColumns', 'max-content 1fr'],
    ['style', 'height', '100vh'],
    ['style', 'justifyContent', 'start'],
    ['style', 'width', '100vw'],
    ['style', 'overflow', 'hidden'],
    ['style', 'minWidth', 0],
  )(
    html.div(['style', 'backgroundColor', 'black'], ['style', 'padding', '10px'])(Menu()),
    html.div(
      ['attr', 'data-part', 'AppContent'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'gap', '50px'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'padding', '20px 20px 100px'],
      ['style', 'margin', 'auto'],
      ['style', 'height', '100%'],
      ['style', 'overflowY', 'auto'],
      ['style', 'overflowX', 'hidden'],
      ['style', 'maxWidth', '100%'],
      ['style', 'minWidth', 0],
      ['html:menu', Introduction, menuState.$test(/introduction/)],
      ['html:menu', Docs, menuState.$test(/docs/)],
      ['html:menu', Templating, menuState.$test(/templates/)],
      ['html:menu', Traits, menuState.$test(/traits/)],
      ['html:menu', State, menuState.$test(/state/)],
      ['html:menu', Patterns, menuState.$test(/patterns/)],
      ['html:menu', Factory, menuState.$test(/factory/)],
    )(),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return null;
  root.appendChild(App());
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const val = menuState.$val();
  if (key === 'ArrowRight' || key === 'ArrowLeft') {
    switch (val) {
      case 'introduction':
        menuState.set(key === 'ArrowRight' ? 'docs' : 'factory');
        break;
      case 'docs':
        menuState.set(key === 'ArrowRight' ? 'templates' : 'introduction');
        break;
      case 'templates':
        menuState.set(key === 'ArrowRight' ? 'traits' : 'docs');
        break;
      case 'traits':
        menuState.set(key === 'ArrowRight' ? 'state' : 'templates');
        break;
      case 'state':
        menuState.set(key === 'ArrowRight' ? 'patterns' : 'traits');
        break;
      case 'patterns':
        menuState.set(key === 'ArrowRight' ? 'factory' : 'state');
        break;
      case 'factory':
        menuState.set(key === 'ArrowRight' ? 'introduction' : 'patterns');
        break;
    }
  }
});
