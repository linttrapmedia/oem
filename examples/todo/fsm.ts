import state from './state';
import { ActionTypes, TodoType } from './types';

export const fsm = (action: ActionTypes) => {
  switch (state.machine.val()) {
    case 'READY':
      switch (action.type) {
        case 'ADD':
          const todo: TodoType = {
            title: state.newTodo.val(),
            completed: false,
          };
          state.todos.reduce((curr) => [...curr, todo]);
          state.newTodo.set('');
          break;
        case 'DELETE':
          state.todos.reduce((curr) => curr.filter((t) => t.title !== action.todo.title));
          break;
        case 'TOGGLE':
          state.todos.reduce((curr) =>
            curr.map((t) => (t.title === action.todo.title ? { ...t, completed: !t.completed } : t)),
          );
          break;
      }
      break;
    case 'ERROR':
      // Handle ERROR state actions
      break;
  }
};

export const $fsm = (action: ActionTypes) => () => fsm(action);
