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

export const updateTodo = (id: string, text: string): Action => ({
  type: 'UPDATE_TODO',
  payload: { id, text },
});

export const setFilter = (filter: Filter): Action => ({
  type: 'SET_FILTER',
  payload: { filter },
});

export const clearCompleted = (): Action => ({
  type: 'CLEAR_COMPLETED',
});

export const toggleAll = (): Action => ({
  type: 'TOGGLE_ALL',
});
