import { html } from '../template';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export const TodoView = html.html.div(
  ['style:mobile', 'alignItems', 'center'],
  ['style:mobile', 'display', 'flex'],
  ['style:mobile', 'flexDirection', 'column'],
  ['style:mobile', 'fontSize', '16px'],
  ['style:mobile', 'height', '100vh'],
  ['style:mobile', 'justifyContent', 'flex-start'],
  ['style:mobile', 'fontFamily', 'Arial, sans-serif'],
  ['style:mobile', 'color', 'gray'],
  ['style:mobile', 'gap', '20px'],
  ['style:mobile', 'boxSizing', 'border-box'],
  ['style:mobile', 'padding', '20px'],
)(TodoForm, TodoList);
