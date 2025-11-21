import { State, Storage } from '@/oem';

export type TodoType = {
  title: string;
  completed: boolean;
};

export const storage = Storage({
  data: {
    machine: {
      key: 'todo-machine',
      state: State<'LOADING' | 'READY' | 'ERROR'>('LOADING'),
      storage: 'memory',
    },
    newTodo: {
      key: 'todo-newTodo',
      state: State(''),
      storage: 'localStorage',
    },
    todos: {
      key: 'todo-todos',
      state: State<TodoType[]>([
        {
          title: 'Learn OEM',
          completed: false,
        },
      ]),
      storage: 'localStorage',
    },
  },
  sync: {
    fetchTodos: async () => {
      storage.data.todos.set([
        { title: 'Learn OEM', completed: false },
        { title: 'Build a todo app', completed: false },
      ]);
    },
  },
});
