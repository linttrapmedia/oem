import { TodoView } from './components/TodoView';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')!;
  root.appendChild(TodoView);
});
