// machines.ts
import { editingId, editingText, filter, todos } from './states';
import type { Action } from './types';

export function dispatch(action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      if (action.payload.text.trim()) {
        todos.reduce((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: action.payload.text.trim(),
            completed: false,
            createdAt: Date.now(),
          },
        ]);
      }
      break;

    case 'TOGGLE_TODO':
      todos.reduce((prev) =>
        prev.map((t) => (t.id === action.payload.id ? { ...t, completed: !t.completed } : t)),
      );
      break;

    case 'DELETE_TODO':
      todos.reduce((prev) => prev.filter((t) => t.id !== action.payload.id));
      break;

    case 'UPDATE_TODO':
      if (action.payload.text.trim()) {
        todos.reduce((prev) =>
          prev.map((t) =>
            t.id === action.payload.id
              ? { ...t, text: action.payload.text.trim(), editedAt: Date.now() }
              : t,
          ),
        );
      }
      editingId.set(null);
      editingText.set('');
      break;

    case 'SET_FILTER':
      filter.set(action.payload.filter);
      break;

    case 'CLEAR_COMPLETED':
      todos.reduce((prev) => prev.filter((t) => !t.completed));
      break;

    case 'TOGGLE_ALL': {
      const allCompleted = todos.val().every((t) => t.completed);
      todos.reduce((prev) => prev.map((t) => ({ ...t, completed: !allCompleted })));
      break;
    }
  }
}

export const $dispatch = (action: Action) => () => dispatch(action);
