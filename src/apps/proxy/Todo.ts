import { COMPONENT } from './oem';

export const Todo = COMPONENT(() => {
  // state
  const input = STRING('');
  const todo = ARRAY<string>(['todo1', 'todo2']);
  const done = ARRAY<string>(['todo3']);

  return DIV.column(10).append(
    H1.innerText('Todo'),
    // Form
    DIV.row(10).append(
      INPUT.onInput(input.set).value(input.get),
      BUTTON.onClick(todo.push, input.get)
        .onClick(input.reset)
        .innerText('Add'),
    ),
    // Todo List
    DIV.column(10).map(
      (item) =>
        DIV.style('cursor', 'pointer')
          .onClick((item) => todo.filter((i) => i !== item), item)
          .onClick((item) => done.push(item), item)
          .innerText(item),
      todo.get,
      todo,
    ),
    // Done List
    DIV.column(10).map(
      (item) =>
        DIV.style('cursor', 'pointer')
          .style('textDecoration', 'line-through')
          .onClick((item) => done.filter((i) => i !== item), item)
          .onClick((item) => todo.push(item), item)
          .innerText(item),
      done.get,
      done,
    ),
  );
});
