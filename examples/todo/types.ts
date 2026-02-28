// types.ts

export type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type Filter = 'all' | 'active' | 'completed';

export type Action =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: { filter: Filter } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_INPUT'; payload: { text: string } }
  | { type: 'START_EDIT'; payload: { id: string } }
  | { type: 'SAVE_EDIT'; payload: { id: string; text: string } }
  | { type: 'CANCEL_EDIT' }
  | { type: 'TOGGLE_THEME' };
