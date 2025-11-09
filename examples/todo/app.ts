import view from './view';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('todo-app')!;
  root.appendChild(view);
});
