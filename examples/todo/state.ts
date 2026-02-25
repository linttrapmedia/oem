// --- State (reactive store) ---

import { State } from '@/registry';
import { AppState } from './types';

export const appState = State<AppState>({
  todos: [],
  nextId: 1,
  filter: 'all',
});
