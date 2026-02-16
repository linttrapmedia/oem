// --- Todo App Types ---

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type Filter = 'all' | 'active' | 'completed';

// Action types
export type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: Filter };

// Machine states
export type AppState = {
  todos: Todo[];
  nextId: number;
  filter: Filter;
};
