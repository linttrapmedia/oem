// types.ts

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  editedAt?: number;
};

export type Filter = 'all' | 'active' | 'completed';

export type Action =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; text: string } }
  | { type: 'SET_FILTER'; payload: { filter: Filter } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'TOGGLE_ALL' };
