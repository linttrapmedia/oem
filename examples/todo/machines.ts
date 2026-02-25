// --- State Machine ---

import { Action, AppState } from './types';

const initialState: AppState = {
  todos: [],
  nextId: 1,
  filter: 'all',
};

export function todoMachine(state: AppState = initialState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TODO': {
      const text = action.payload.trim();
      if (!text) return state;
      return {
        ...state,
        todos: [...state.todos, { id: state.nextId, text, done: false }],
        nextId: state.nextId + 1,
      };
    }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.payload ? { ...t, done: !t.done } : t)),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case 'TOGGLE_ALL': {
      const allDone = state.todos.every((t) => t.done);
      return {
        ...state,
        todos: state.todos.map((t) => ({ ...t, done: !allDone })),
      };
    }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((t) => !t.done),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'EDIT_TODO': {
      const { id, text } = action.payload;
      const trimmed = text.trim();
      if (!trimmed) {
        return { ...state, todos: state.todos.filter((t) => t.id !== id) };
      }
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t)),
      };
    }
    default:
      return state;
  }
}
