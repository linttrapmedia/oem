import type { AppAction, FilterType } from './types';

export const addTodo = (): AppAction => ({ type: 'ADD_TODO' });

export const toggleTodo = (id: string): AppAction => ({ type: 'TOGGLE_TODO', id });

export const deleteTodo = (id: string): AppAction => ({ type: 'DELETE_TODO', id });

export const clearCompleted = (): AppAction => ({ type: 'CLEAR_COMPLETED' });

export const setFilter = (filter: FilterType): AppAction => ({ type: 'SET_FILTER', filter });

export const setInput = (text: string): AppAction => ({ type: 'SET_INPUT', text });
