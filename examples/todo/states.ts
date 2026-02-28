// states.ts
import { State, useMediaQueryState } from '../../src/registry';
import { STORAGE_KEY } from './constants';
import type { Filter, Todo } from './types';

// Load persisted todos from localStorage
const saved = localStorage.getItem(STORAGE_KEY);
const initial: Todo[] = saved ? JSON.parse(saved) : [];

// Core application state
export const todos = State<Todo[]>(initial);
export const filter = State<Filter>('all');
export const newTodoText = State('');
export const editingId = State<string | null>(null);
export const editingText = State('');

// Responsive breakpoints
export const isTablet = useMediaQueryState({ minWidth: 768, maxWidth: 1023 });
export const isDesktop = useMediaQueryState({ minWidth: 1024 });

// Persist todos to localStorage on every change
todos.sub((value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});
