import state from './state';
import { ActionTypes, TodoType } from './types';

export function fsm(...[action, payload]: ActionTypes) {
  switch (state.machine.val()) {
    case 'READY':
      switch (action) {
        case 'ADD':
          const todo: TodoType = {
            title: state.newTodo.val(),
            completed: false,
          };
          state.todos.reduce((curr) => [...curr, todo]);
          state.newTodo.set('');
          break;
        case 'DELETE':
          state.todos.reduce((curr) => curr.filter((t) => t.title !== payload.title));
          break;
        case 'TOGGLE':
          state.todos.reduce((curr) =>
            curr.map((t) => (t.title === payload.title ? { ...t, completed: !t.completed } : t)),
          );
          break;
      }
      break;
    case 'ERROR':
      // Handle ERROR state actions
      break;
  }
}

export const $fsm =
  (...args: ActionTypes) =>
  () =>
    fsm(...args);
