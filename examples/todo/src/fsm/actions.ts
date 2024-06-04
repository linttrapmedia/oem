import { TodoType, todoList, todoNew } from '../state/todo_state';

export type TODO_ADD_ACTION = ['TODO:ADD'];

export const todo_add = () => {
  if (todoNew.get() === '') return;
  const updateState = todoList.get();
  updateState.push({ title: todoNew.get(), completed: false });
  todoList.set(updateState);
  todoNew.set('');
};

export type TODO_DELETE_ACTION = ['TODO:DELETE', TodoType];

export const todo_delete = (todo: TodoType) => {
  const deleteState = todoList.get();
  const index = deleteState.findIndex((t) => t.title === todo.title);
  deleteState.splice(index, 1);
  todoList.set(deleteState);
};

export type TODO_INPUT_ACTION = ['TODO:INPUT', string];

export const todo_input = (inputValue: string) => {
  todoNew.set(inputValue);
};

export type TODO_TOGGLE_ACTION = ['TODO:TOGGLE', TodoType];

export const todo_toggle = (todo: TodoType) => {
  const toggleState = todoList.get();
  const index = toggleState.findIndex((t) => t.title === todo.title);
  toggleState[index].completed = !toggleState[index].completed;
  todoList.set(toggleState);
};
