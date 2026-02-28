// actions.ts
import type { Action, Filter } from './types';

export const addTodo = (text: string): Action => ({
  type: 'ADD_TODO',
  payload: { text },
});

export const toggleTodo = (id: string): Action => ({
  type: 'TOGGLE_TODO',
  payload: { id },
});

export const deleteTodo = (id: string): Action => ({
  type: 'DELETE_TODO',
  payload: { id },
});

export const setFilter = (filter: Filter): Action => ({
  type: 'SET_FILTER',
  payload: { filter },
});

export const clearCompleted = (): Action => ({
  type: 'CLEAR_COMPLETED',
});

export const setInput = (text: string): Action => ({
  type: 'SET_INPUT',
  payload: { text },
});

export const startEdit = (id: string): Action => ({
  type: 'START_EDIT',
  payload: { id },
});

export const saveEdit = (id: string, text: string): Action => ({
  type: 'SAVE_EDIT',
  payload: { id, text },
});

export const cancelEdit = (): Action => ({
  type: 'CANCEL_EDIT',
});

export const toggleTheme = (): Action => ({
  type: 'TOGGLE_THEME',
});
