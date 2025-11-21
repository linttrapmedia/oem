import { storage, tag } from 'docs/config';
import { Docs } from 'docs/docs';
import { trait } from 'old-docs/config';

const { isMobile, isTablet } = storage.data;

function App() {
  return tag.div(
    trait.attr('data-app', 'OEM Documentation'),
    trait.style('display', 'grid'),
    trait.style('padding', '2rem'),
    trait.style('gridTemplateRows', 'max-content 1fr', isMobile.val, isMobile),
    trait.style('gridTemplateColumns', '1fr', isMobile.val, isMobile),
    trait.style('gridTemplateRows', 'auto', isTablet.val, isTablet),
    trait.style('gridTemplateColumns', '1fr', isTablet.val, isTablet),
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

// Scroll to top when page changes
function scrollAppContentToTop() {
  document.querySelector("[data-part='AppContent']")?.scrollTo({ top: 0 });
}
