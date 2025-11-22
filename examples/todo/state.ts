import { storage, TodoType } from 'examples/todo/storage';

export type ActionTypes = ['INIT'] | ['ADD'] | ['DELETE', TodoType] | ['TOGGLE', TodoType];

export function fsm<T extends ActionTypes>(...args: T) {
  const [action, payload] = args;
  switch (storage.data.machine.val()) {
    case 'LOADING':
      storage.sync.fetchTodos();
      storage.data.machine.set('READY');
      break;
    case 'READY':
      switch (action) {
        case 'ADD':
          const todo: TodoType = {
            title: storage.data.newTodo.val(),
            completed: false,
          };
          storage.data.todos.reduce((curr) => [...curr, todo]);
          storage.data.newTodo.set('');
          break;
        case 'DELETE':
          storage.data.todos.reduce((curr: TodoType[]) =>
            curr.filter((t) => t.title !== payload.title),
          );
          break;
        case 'TOGGLE':
          storage.data.todos.reduce((curr: TodoType[]) =>
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
  <T extends ActionTypes>(...args: T) =>
  () =>
    fsm(...args);
