import components from './components';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')!;
  root.appendChild(components.TodoView);
});
