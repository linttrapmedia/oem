import { COMP } from './oem';

export const Todo = COMP(() => {
  // state
  const todo = STRING('');
  const todos = ARRAY<string>(['todo1', 'todo2', 'todo3']);
  const dones = ARRAY<string>(['done']);

  return DIV.column(10).append(
    H1.innerText('Todo'),
    DIV.row(10).append(
      INPUT.onInput(todo.set).value(todo.get),
      BUTTON.onClick(todos.push, todo.get).onClick(todo.reset).innerText('Add'),
    ),
    DIV.column(10).map(DIV.onClick(alert, 1).innerText, todos.get),
    DIV.column(10).map(DIV.onClick(alert, 1).innerText, dones.get),
  );
});
