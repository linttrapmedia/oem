import { container } from './oem';

const todo = STRING('');
const todos = ARRAY<string>(['todo1', 'todo2', 'todo3']);
const dones = ARRAY<string>(['done']);

todo.sub(console.log);

const List = COMP(
  () =>
    DIV.column(10).innerHtml(
      ...todos.val.map((item) => DIV.innerText(item)),
      ...dones.val.map((item) => DIV.innerText(item)),
    ),
  todos,
  dones,
);

const Input = DIV.row(10).innerHtml(
  INPUT.onInput(todo.set).render(),
  BUTTON.onClick(todos.push, todo.get).onClick(todo.reset).innerText('Add'),
);

export const Todo = container(DIV.column(10).innerHtml(H1.innerText('Todo'), Input, List));
