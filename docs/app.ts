import { tag, trait } from 'docs/config';
import { Docs } from 'docs/docs';

function App() {
  return tag.div(
    trait.attr('data-app', 'OEM Documentation'),
    trait.style('padding', '2rem'),
    trait.html(
      tag.div(
        trait.attr('data-part', 'AppContent'),
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.html(Docs),
      ),
    ),
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;
  root.appendChild(App());
});
