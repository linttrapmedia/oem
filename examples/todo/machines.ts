// machines.ts
import { addCounter, deletingId, editingId, editText, filter, inputText, todos } from './states';
import { theme } from './theme';
import type { Action } from './types';

export function dispatch(action: Action): void {
  switch (action.type) {
    case 'ADD_TODO': {
      const text = action.payload.text.trim();
      if (!text) return;
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      todos.reduce((prev) => [{ id, text, completed: false, createdAt: Date.now() }, ...prev]);
      inputText.set('');
      addCounter.reduce((n) => n + 1);
      break;
    }
    case 'TOGGLE_TODO': {
      todos.reduce((prev) =>
        prev.map((t) => (t.id === action.payload.id ? { ...t, completed: !t.completed } : t)),
      );
      break;
    }
    case 'DELETE_TODO': {
      // Trigger exit animation, then remove after delay
      deletingId.set(action.payload.id);
      setTimeout(() => {
        todos.reduce((prev) => prev.filter((t) => t.id !== action.payload.id));
        deletingId.set(null);
      }, 300);
      break;
    }
    case 'SET_FILTER': {
      filter.set(action.payload.filter);
      break;
    }
    case 'CLEAR_COMPLETED': {
      todos.reduce((prev) => prev.filter((t) => !t.completed));
      break;
    }
    case 'SET_INPUT': {
      inputText.set(action.payload.text);
      break;
    }
    case 'START_EDIT': {
      const todo = todos.val().find((t) => t.id === action.payload.id);
      if (todo) {
        editingId.set(action.payload.id);
        editText.set(todo.text);
      }
      break;
    }
    case 'SAVE_EDIT': {
      const newText = action.payload.text.trim();
      if (newText) {
        todos.reduce((prev) =>
          prev.map((t) => (t.id === action.payload.id ? { ...t, text: newText } : t)),
        );
      }
      editingId.set(null);
      editText.set('');
      break;
    }
    case 'CANCEL_EDIT': {
      editingId.set(null);
      editText.set('');
      break;
    }
    case 'TOGGLE_THEME': {
      theme.reduce((t: 'light' | 'dark') => (t === 'dark' ? 'light' : 'dark'));
      break;
    }
  }
}

export const $dispatch = (action: Action) => () => dispatch(action);
