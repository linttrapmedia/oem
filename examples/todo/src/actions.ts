import { state } from './state';
import { TodoType } from './types';

const todo_add = () => {
  if (state.todoNew.$val() === '') return;
  const updateState = state.todoList.$val();
  updateState.push({ title: state.todoNew.$val(), completed: false });
  state.todoList.set(updateState);
  state.todoNew.set('');
};

const todo_delete = (todo: TodoType) => {
  const deleteState = state.todoList.$val();
  const index = deleteState.findIndex((t) => t.title === todo.title);
  deleteState.splice(index, 1);
  state.todoList.set(deleteState);
};

const todo_input = (inputValue: string) => {
  state.todoNew.set(inputValue);
};

const todo_toggle = (todo: TodoType) => {
  const toggleState = state.todoList.$val();
  const index = toggleState.findIndex((t) => t.title === todo.title);
  toggleState[index].completed = !toggleState[index].completed;
  state.todoList.set(toggleState);
};

export { todo_add, todo_delete, todo_input, todo_toggle };
