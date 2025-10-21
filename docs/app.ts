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
      ['style', 'height', '100%'],
      ['style', 'overflowY', 'auto'],
      ['style', 'overflowX', 'hidden'],
      ['style', 'maxWidth', '100%'],
      ['style', 'minWidth', 0],
      ['html:menu', Introduction, menuState.$test('introduction')],
      ['html:menu', Docs, menuState.$test('docs')],
      ['html:menu', Templating, menuState.$test('templates')],
      ['html:menu', Traits, menuState.$test('traits')],
      ['html:menu', State, menuState.$test('state')],
      ['html:menu', Patterns, menuState.$test('patterns')],
      ['html:menu', Factory, menuState.$test('factory')],
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
  const val = menuState.$val();
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
