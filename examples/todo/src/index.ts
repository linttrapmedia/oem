import { TodoView } from './components';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')!;
  root.appendChild(TodoView);
});
