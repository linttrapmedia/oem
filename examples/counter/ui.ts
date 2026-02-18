// --- UI Rendering ---

import { createEventProp, createProp, defineElement } from '@/core/element';
import { StateType } from '@/registry';
import { tag, trait } from './templates';
import { theme } from './theme';
import { Action, AppState, Filter, Todo } from './types';

const button = defineElement({
  markup: () => {
    const el = document.createElement('button');
    el.className = 'btn';
    return el;
  },
  props: {
    enabled: createProp<boolean>((el, val, applies) => {
      if (applies) {
        el.toggleAttribute('disabled', !val);
      } else {
        el.setAttribute('disabled', '');
      }
    }),
    label: createProp<string>((el, text, applies) => {
      if (applies) {
        el.textContent = text;
      }
    }),
    click: createEventProp<MouseEvent>((el, fn) => {
      el.addEventListener('click', fn as EventListener);
      return () => el.removeEventListener('click', fn as EventListener);
    }),
  },
});

// --- Helpers ---

const filteredTodos = (state: AppState): Todo[] => {
  switch (state.filter) {
    case 'active':
      return state.todos.filter((t) => !t.done);
    case 'completed':
      return state.todos.filter((t) => t.done);
    default:
      return state.todos;
  }
};

// --- Components ---

function renderTodoItem(todo: Todo, dispatch: (a: Action) => void) {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('padding', theme.padding),
    trait.style('borderBottom', `1px solid ${theme.border}`),
    trait.style('gap', theme.gap),

    // Checkbox
    tag.input(
      trait.attr('type', 'checkbox'),
      trait.attr('checked', todo.done ? 'checked' : undefined),
      trait.style('cursor', 'pointer'),
      trait.style('width', '18px'),
      trait.style('height', '18px'),
      trait.style('accentColor', theme.primary),
      trait.event('change', () => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })),
    ),

    // Text
    tag.span(
      trait.text(todo.text),
      trait.style('flex', '1'),
      trait.style('fontSize', theme.fontSizeBase),
      trait.style('color', todo.done ? theme.textDone : theme.text),
      trait.style('textDecoration', todo.done ? 'line-through' : 'none'),
      trait.style('cursor', 'pointer'),
      trait.event('click', () => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })),
    ),

    // Delete button
    tag.button(
      trait.text('×'),
      trait.style('background', 'none'),
      trait.style('border', 'none'),
      trait.style('color', theme.textMuted),
      trait.style('fontSize', '18px'),
      trait.style('cursor', 'pointer'),
      trait.style('padding', '0 4px'),
      trait.event('click', () => dispatch({ type: 'REMOVE_TODO', payload: todo.id })),
    ),
  );
}

function renderFilterButton(
  label: string,
  filter: Filter,
  appState: StateType<AppState>,
  dispatch: (a: Action) => void,
) {
  return tag.button(
    trait.text(label),
    trait.style('background', 'none'),
    trait.style('border', 'none'),
    trait.style('cursor', 'pointer'),
    trait.style('fontSize', theme.fontSizeSmall),
    trait.style('padding', theme.paddingSmall),
    trait.style('borderRadius', theme.radius),
    trait.style(
      'color',
      () => (appState.val().filter === filter ? theme.primary : theme.textMuted),
      appState,
    ),
    trait.style(
      'fontWeight',
      () => (appState.val().filter === filter ? 'bold' : 'normal'),
      appState,
    ),
    trait.event('click', () => dispatch({ type: 'SET_FILTER', payload: filter })),
  );
}

// --- Main App UI ---

export function renderApp(appState: StateType<AppState>, dispatch: (a: Action) => void) {
  return tag.div(
    trait.style('maxWidth', '480px'),
    trait.style('margin', '40px auto'),
    trait.style('fontFamily', theme.fontFamily),
    trait.style('background', theme.surface),
    trait.style('borderRadius', theme.radius),
    trait.style('border', `1px solid ${theme.border}`),
    trait.style('overflow', 'hidden'),

    // Header
    tag.div(
      trait.style('padding', '20px 16px 12px'),
      trait.style('borderBottom', `1px solid ${theme.border}`),
      tag.h1(
        trait.text('Todos'),
        trait.style('margin', '0 0 12px'),
        trait.style('fontSize', theme.fontSizeLarge),
        trait.style('color', theme.text),
        trait.style('fontWeight', '600'),
      ),
      // Input
      tag.input(
        trait.attr('type', 'text'),
        trait.attr('placeholder', 'What needs to be done?'),
        trait.style('width', '100%'),
        trait.style('padding', theme.padding),
        trait.style('fontSize', theme.fontSizeBase),
        trait.style('background', theme.bg),
        trait.style('border', `1px solid ${theme.border}`),
        trait.style('borderRadius', theme.radius),
        trait.style('color', theme.text),
        trait.style('outline', 'none'),
        trait.style('boxSizing', 'border-box'),
        trait.submitOnEnter((text) => dispatch({ type: 'ADD_TODO', payload: text })),
      ),
    ),

    // Todo list
    tag.div(
      trait.children(
        () => filteredTodos(appState.val()).map((todo) => renderTodoItem(todo, dispatch)),
        appState,
      ),
    ),

    // Footer
    tag.div(
      trait.style('display', 'flex'),
      trait.style('justifyContent', 'space-between'),
      trait.style('alignItems', 'center'),
      trait.style('padding', theme.padding),
      trait.style('borderTop', `1px solid ${theme.border}`),
      trait.style('fontSize', theme.fontSizeSmall),

      // Count
      tag.span(
        trait.text(() => {
          const n = appState.val().todos.filter((t) => !t.done).length;
          return `${n} item${n !== 1 ? 's' : ''} left`;
        }, appState),
        trait.style('color', theme.textMuted),
      ),

      // Filter buttons
      tag.div(
        renderFilterButton('All', 'all', appState, dispatch),
        renderFilterButton('Active', 'active', appState, dispatch),
        renderFilterButton('Done', 'completed', appState, dispatch),
      ),

      button.tag(
        button.label('Clear completed'),
        button.click(() => dispatch({ type: 'CLEAR_COMPLETED' })),
        button.enabled(false),
        trait.style('background', 'green'),
      ),

      // Clear completed
      tag.button(
        trait.text('Clear done'),
        trait.style('background', 'none'),
        trait.style('border', 'none'),
        trait.style('color', theme.textMuted),
        trait.style('cursor', 'pointer'),
        trait.style('fontSize', theme.fontSizeSmall),
        trait.event('click', () => dispatch({ type: 'CLEAR_COMPLETED' })),
      ),
    ),
  );
}
