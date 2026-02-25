// ─── Actions ─────────────────────────────────────────────────────────────────

import { editingId, editText, filter, inputText, todos } from './state';
import type { Filter, Todo } from './types';

export function addTodo() {
  const text = inputText.val().trim();
  if (!text) return;
  const todo: Todo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: Date.now(),
  };
  todos.reduce((prev) => [...prev, todo]);
  inputText.set('');
}

export function toggleTodo(id: string) {
  todos.reduce((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
}

export function removeTodo(id: string) {
  todos.reduce((prev) => prev.filter((t) => t.id !== id));
}

export function startEdit(id: string, text: string) {
  editingId.set(id);
  editText.set(text);
}

export function saveEdit() {
  const id = editingId.val();
  const text = editText.val().trim();
  if (id && text) {
    todos.reduce((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text, editedAt: Date.now() } : t)),
    );
  }
  editingId.set(null);
  editText.set('');
}

export function cancelEdit() {
  editingId.set(null);
  editText.set('');
}

export function setFilter(f: Filter) {
  filter.set(f);
}

export function clearCompleted() {
  todos.reduce((prev) => prev.filter((t) => !t.completed));
}

export function toggleAll() {
  const allDone = todos.val().every((t) => t.completed);
  todos.reduce((prev) => prev.map((t) => ({ ...t, completed: !allDone })));
}
