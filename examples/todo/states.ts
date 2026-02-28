// states.ts
import { State } from '../../src/registry';
import type { Filter, TodoItem } from './types';

// The list of all todo items
export const todos = State<TodoItem[]>([]);

// Current filter selection
export const filter = State<Filter>('all');

// Current text in the input field
export const inputText = State('');

// ID of the todo currently being edited (null = not editing)
export const editingId = State<string | null>(null);

// Text being edited
export const editText = State('');

// Counter that bumps on each add (used to trigger stagger animations)
export const addCounter = State(0);

// Counter for delete animations — holds the id being deleted
export const deletingId = State<string | null>(null);
