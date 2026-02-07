import { Dashboard } from '@/components/Dashboard';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;
  root.appendChild(Dashboard());
});
