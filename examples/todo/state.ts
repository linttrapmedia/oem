// ─── State ────────────────────────────────────────────────────────────────────

import { State } from '../../src/registry';
import type { Filter, Todo } from './types';

// ── Persistence ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'oem-todo-app';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTodos(list: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// ── State Objects ────────────────────────────────────────────────────────────

export const todos = State<Todo[]>(loadTodos());

// Persist on every change
todos.sub(saveTodos);

export const filter = State<Filter>('all');
export const inputText = State('');
export const editingId = State<string | null>(null);
export const editText = State('');
