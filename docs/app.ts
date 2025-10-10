import { div, menuState } from './config';
import { Introduction } from './pages/Introduction';
import { Menu } from './pages/Menu';
import { Templating } from './pages/Templating';
import { Traits } from './pages/Traits';

function App() {
  return div(
    ['style', 'display', 'grid'],
    ['style', 'gridTemplateRows', 'max-content 1fr'],
    ['style', 'gridTemplateColumns', '1fr'],
    ['style:tablet', 'gridTemplateRows', 'auto'],
    ['style:tablet', 'gridTemplateColumns', 'max-content 1fr'],
    ['style', 'height', '100vh'],
    ['style', 'overflow', 'hidden'],
    ['style', 'justifyContent', 'start'],
  )(
    div(['style', 'backgroundColor', 'black'], ['style', 'padding', '10px'])(Menu()),
    div(
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
      ['html:menu', Introduction, menuState.eq('introduction')],
      ['html:menu', Templating, menuState.eq('templates')],
      ['html:menu', Traits, menuState.eq('traits')],
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
