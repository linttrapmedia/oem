import { TodoType, newTodo, todoState } from '../state';

export type TODO_ADD_ACTION = ['TODO:ADD'];

export const todo_add = () => {
  if (newTodo.get() === '') return;
  const updateState = todoState.get();
  updateState.push({ title: newTodo.get(), completed: false });
  todoState.set(updateState);
  newTodo.set('');
};

export type TODO_DELETE_ACTION = ['TODO:DELETE', TodoType];

export const todo_delete = (todo: TodoType) => {
  const deleteState = todoState.get();
  const index = deleteState.findIndex((t) => t.title === todo.title);
  deleteState.splice(index, 1);
  todoState.set(deleteState);
};

export type TODO_INPUT_ACTION = ['TODO:INPUT', string];

export const todo_input = (inputValue: string) => {
  newTodo.set(inputValue);
};

export type TODO_TOGGLE_ACTION = ['TODO:TOGGLE', TodoType];

export const todo_toggle = (todo: TodoType) => {
  const toggleState = todoState.get();
  const index = toggleState.findIndex((t) => t.title === todo.title);
  toggleState[index].completed = !toggleState[index].completed;
  todoState.set(toggleState);
};
