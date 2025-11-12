import { State } from '@/oem';
import { TodoType } from './types';

const newTodo = State('', {
  key: 'new-todo',
  storage: localStorage,
});

const todos = State<TodoType[]>(
  [
    {
      title: 'Learn OEM',
      completed: false,
    },
  ],
  {
    key: 'todos',
    storage: localStorage,
  },
);

const machine = State<'READY' | 'ERROR'>('READY');

export default { machine, todos, newTodo };
