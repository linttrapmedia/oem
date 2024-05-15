import { State } from '../../../src';

// the todo type
export type TodoType = {
  title: string;
  completed: boolean;
};

// the todo list state
export const todoState = State<TodoType[]>(
  [
    { title: 'Learn React', completed: true },
    { title: 'Learn TypeScript', completed: false },
    { title: 'Learn Node.js', completed: false },
  ],
  {
    key: 'todoState',
    storage: sessionStorage,
  },
);

// the new todo state
export const newTodo = State<string>('');
