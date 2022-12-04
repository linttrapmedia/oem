import { Form } from './Form';
import { DoneList, TodoList } from './Lists';

export const input = STRING('');
export const todo = ARRAY<string>(['Call mom', 'Buy milk']);
export const done = ARRAY<string>(['Learn OEM']);

export function TodoExample() {
  return FORM.onSubmit()
    .column(10)
    .append(
      Form(input, todo),
      TodoList(input, todo, done),
      DoneList(input, todo, done),
    );
}
