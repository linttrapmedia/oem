export type FilterType = 'all' | 'active' | 'completed';

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type AppState = {
  todos: TodoItem[];
  filter: FilterType;
  inputText: string;
};

export type AppAction =
  | { type: 'ADD_TODO' }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; filter: FilterType }
  | { type: 'SET_INPUT'; text: string };
