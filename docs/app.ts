import { html, isMobile, isTablet, menuState } from './config';
import { Docs } from './pages/Docs';
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
    ['style', 'gridTemplateRows', 'max-content 1fr', isMobile.val, isMobile],
    ['style', 'gridTemplateColumns', '1fr', isMobile.val, isMobile],
    ['style', 'gridTemplateRows', 'auto', isTablet.val, isTablet],
    ['style', 'gridTemplateColumns', 'max-content 1fr', isTablet.val, isTablet],
    ['style', 'height', '100vh', isTablet.val, isTablet],
    ['style', 'height', 'auto', isMobile.val, isMobile],
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
      ['style', 'height', '100%'],
      ['style', 'overflowY', 'auto'],
      ['style', 'overflowX', 'hidden'],
      ['style', 'maxWidth', '100%'],
      ['style', 'minWidth', 0],
      ['html', Introduction, menuState.$test('introduction'), menuState],
      ['html', Docs, menuState.$test('docs'), menuState],
      ['html', Templating, menuState.$test('templates'), menuState],
      ['html', Traits, menuState.$test('traits'), menuState],
      ['html', State, menuState.$test('state'), menuState],
      ['html', Patterns, menuState.$test('patterns'), menuState],
    )(),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return null;
  root.appendChild(App());
});

function scrollAppContentToTop() {
  document.querySelector("[data-part='AppContent']")?.scrollTo({ top: 0 });
}

menuState.sub(scrollAppContentToTop);

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const val = menuState.val();
  if (key !== 'ArrowRight' && key !== 'ArrowLeft') return;
  const caseMap = {
    introduction: key === 'ArrowRight' ? 'docs' : 'factory',
    docs: key === 'ArrowRight' ? 'templates' : 'introduction',
    templates: key === 'ArrowRight' ? 'traits' : 'docs',
    traits: key === 'ArrowRight' ? 'state' : 'templates',
    state: key === 'ArrowRight' ? 'patterns' : 'traits',
    patterns: key === 'ArrowRight' ? 'factory' : 'state',
    factory: key === 'ArrowRight' ? 'introduction' : 'patterns',
  };
  const newState = caseMap[val] as typeof val;
  if (!newState) return;
  menuState.set(newState);
  scrollAppContentToTop();
});
