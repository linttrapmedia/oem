import { html, menuState } from './config';
import { Introduction } from './pages/Introduction';
import { State } from './pages/State';
import { Templating } from './pages/Templating';
import { Traits } from './pages/Traits';
import { Menu } from './parts/Menu';

function App() {
  return html.div(
    ['style', 'display', 'grid'],
    ['style', 'gridTemplateRows', 'max-content 1fr'],
    ['style', 'gridTemplateColumns', '1fr'],
    ['style:tablet', 'gridTemplateRows', 'auto'],
    ['style:tablet', 'gridTemplateColumns', 'max-content 1fr'],
    ['style', 'height', '100vh'],
    ['style', 'overflow', 'hidden'],
    ['style', 'justifyContent', 'start'],
  )(
    html.div(['style', 'backgroundColor', 'black'], ['style', 'padding', '10px'])(Menu()),
    html.div(
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'gap', '50px'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'padding', '20px 20px 100px'],
      ['style', 'margin', 'auto'],
      ['style', 'flexGrow', '1'],
      ['style', 'height', '100%'],
      ['style', 'overflowY', 'auto'],
      ['style', 'width', '100%'],
      ['html:menu', Introduction, menuState.cb('eq', 'introduction')],
      ['html:menu', Templating, menuState.cb('eq', 'templates')],
      ['html:menu', Traits, menuState.cb('eq', 'traits')],
      ['html:menu', State, menuState.cb('eq', 'state')],
    )(),
    // Header(),
    // Features(),
    // Install(),
    // HowItWorks(),
    // Example(),
    // Templating(),
    // State(),
    // Justification(),
    // Traits(),
    // CustomTrait(),
    // Adopt(),
    // Svg(),
    // FAQ(),
    // Footer(),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return null;
  root.appendChild(App());
});
