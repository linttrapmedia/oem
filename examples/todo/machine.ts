import { State } from '@/core/state';
import type { StateType } from '@/core/state';
import type { AppAction, AppState, TodoItem } from './types';

const initialState: AppState = {
  todos: [],
  filter: 'all',
  inputText: '',
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TODO': {
      const text = state.inputText.trim();
      if (!text) return state;
      const newTodo: TodoItem = {
        id: crypto.randomUUID(),
        text,
        completed: false,
      };
      return { ...state, todos: [...state.todos, newTodo], inputText: '' };
    }
    case 'TOGGLE_TODO': {
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      };
    }
    case 'DELETE_TODO': {
      return { ...state, todos: state.todos.filter((t) => t.id !== action.id) };
    }
    case 'CLEAR_COMPLETED': {
      return { ...state, todos: state.todos.filter((t) => !t.completed) };
    }
    case 'SET_FILTER': {
      return { ...state, filter: action.filter };
    }
    case 'SET_INPUT': {
      return { ...state, inputText: action.text };
    }
    default:
      return state;
  }
}

export const machine = State(initialState, {
  dispatch: (state: StateType<AppState>, action: AppAction) => {
    state.reduce((prev) => reducer(prev, action));
  },
});

export const filteredTodos = () => {
  const { todos, filter } = machine.val();
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};

export const activeCount = () => machine.val().todos.filter((t) => !t.completed).length;

export const hasCompleted = () => machine.val().todos.some((t) => t.completed);
