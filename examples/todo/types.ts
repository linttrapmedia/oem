// --- Todo App Types ---

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type Filter = 'all' | 'active' | 'completed';

export type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'EDIT_TODO'; payload: { id: number; text: string } };

export type AppState = {
  todos: Todo[];
  nextId: number;
  filter: Filter;
};
