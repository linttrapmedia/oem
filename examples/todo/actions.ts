// --- Action Creators ---

import { Action, Filter } from './types';

export const addTodo = (text: string): Action => ({ type: 'ADD_TODO', payload: text });
export const toggleTodo = (id: number): Action => ({ type: 'TOGGLE_TODO', payload: id });
export const removeTodo = (id: number): Action => ({ type: 'REMOVE_TODO', payload: id });
export const toggleAll = (): Action => ({ type: 'TOGGLE_ALL' });
export const clearCompleted = (): Action => ({ type: 'CLEAR_COMPLETED' });
export const setFilter = (filter: Filter): Action => ({ type: 'SET_FILTER', payload: filter });
export const editTodo = (id: number, text: string): Action => ({
  type: 'EDIT_TODO',
  payload: { id, text },
});
