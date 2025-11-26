import { State, Storage } from '@/oem';

export type TodoType = {
  title: string;
  completed: boolean;
};

export const storage = Storage({
  data: {
    machine: [State<'LOADING' | 'READY' | 'ERROR'>('LOADING'), 'memory', 'todo-machine'],
    newTodo: [State(''), 'localStorage', 'todo-newTodo'],
    todos: [
      State<TodoType[]>([
        {
          title: 'Learn OEM',
          completed: false,
        },
      ]),
      'localStorage',
      'todo-todos',
    ],
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
