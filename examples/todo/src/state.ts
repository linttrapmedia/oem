import { State } from '../../../src';
import { TodoType } from './types';

const todoItemHovered = State<TodoType | undefined>(undefined);

const todoList = State<TodoType[]>(
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
const todoNew = State<string>('');

export const state = {
  todoItemHovered,
  todoList,
  todoNew,
};
