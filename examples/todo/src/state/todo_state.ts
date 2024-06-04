import { State } from '../../../../src';

// the todo type
export type TodoType = {
  title: string;
  completed: boolean;
};

export const todoItemHovered = State<TodoType | undefined>(undefined);

// the todo list state
export const todoList = State<TodoType[]>(
  [
    { title: 'Learn React', completed: true },
    { title: 'Learn TypeScript', completed: false },
    { title: 'Learn Node.js', completed: false },
  ],
  {
    key: 'todoList',
    storage: sessionStorage,
  },
);

// the new todo state
export const todoNew = State<string>('');
