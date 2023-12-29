import { Example } from './components/CounterExample';
import { CustomTrait } from './components/CustomTrait';
import { FAQ } from './components/FAQ';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HowItWorks } from './components/HowItWorks';
import { Install } from './components/Install';
import { Traits } from './components/Traits';
import { div } from './config';

function App() {
  return div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'padding', '20px 20px 100px'],
    ['style', 'margin', 'auto'],
    ['style', 'maxWidth', '1024px'],
  )(Header(), Features(), Install(), Example(), HowItWorks(), Traits(), CustomTrait(), FAQ(), Footer());
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return null;
  root.appendChild(App());
});
