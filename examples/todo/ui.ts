// --- UI Rendering ---

import { StateType } from '@/registry';
import { tag, trait } from './templates';
import { theme } from './theme';
import { Action, AppState, Filter, Todo } from './types';

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

const activeCount = (state: AppState): number => state.todos.filter((t) => !t.done).length;
const completedCount = (state: AppState): number => state.todos.filter((t) => t.done).length;
const allDone = (state: AppState): boolean =>
  state.todos.length > 0 && state.todos.every((t) => t.done);

// --- Components ---

function renderToggleAll(appState: StateType<AppState>, dispatch: (a: Action) => void) {
  return tag.label(
    trait.style('display', () => (appState.val().todos.length === 0 ? 'none' : 'flex'), appState),
    trait.style('alignItems', 'center'),
    trait.style('cursor', 'pointer'),
    trait.style('padding', '0 16px 0 0'),

    tag.span(
      trait.text('❯'),
      trait.style('fontSize', '22px'),
      trait.style('transform', 'rotate(90deg)'),
      trait.style('display', 'inline-block'),
      trait.style(
        'color',
        () => (allDone(appState.val()) ? theme.text : theme.textMuted),
        appState,
      ),
      trait.style('transition', 'color 0.2s'),
    ),

    trait.event('click', () => dispatch({ type: 'TOGGLE_ALL' })),
  );
}

function renderTodoItem(todo: Todo, dispatch: (a: Action) => void) {
  return tag.li(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('padding', '12px 16px'),
    trait.style('borderBottom', `1px solid ${theme.borderLight}`),
    trait.style('gap', theme.gap),
    trait.style('background', theme.surface),
    trait.style('transition', 'background 0.15s'),

    // Checkbox
    tag.span(
      trait.style('width', '28px'),
      trait.style('height', '28px'),
      trait.style('borderRadius', '50%'),
      trait.style('border', `2px solid ${todo.done ? theme.checkmark : theme.border}`),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('cursor', 'pointer'),
      trait.style('flexShrink', '0'),
      trait.style('transition', 'border-color 0.2s'),
      trait.style('background', todo.done ? theme.checkmark : 'transparent'),

      tag.span(
        trait.text(todo.done ? '✓' : ''),
        trait.style('color', '#fff'),
        trait.style('fontSize', '14px'),
        trait.style('fontWeight', 'bold'),
      ),

      trait.event('click', () => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })),
    ),

    // Text (double-click to edit)
    tag.span(
      trait.text(todo.text),
      trait.style('flex', '1'),
      trait.style('fontSize', theme.fontSizeBase),
      trait.style('color', todo.done ? theme.textDone : theme.text),
      trait.style('textDecoration', todo.done ? 'line-through' : 'none'),
      trait.style('cursor', 'text'),
      trait.style('lineHeight', '1.4'),
      trait.style('wordBreak', 'break-word'),
      trait.editOnDblClick(
        () => todo.text,
        (newText) => dispatch({ type: 'EDIT_TODO', payload: { id: todo.id, text: newText } }),
      ),
    ),

    // Delete button
    tag.button(
      trait.text('×'),
      trait.style('background', 'none'),
      trait.style('border', 'none'),
      trait.style('color', theme.textMuted),
      trait.style('fontSize', '22px'),
      trait.style('cursor', 'pointer'),
      trait.style('padding', '0 4px'),
      trait.style('lineHeight', '1'),
      trait.style('opacity', '0'),
      trait.style('transition', 'opacity 0.15s, color 0.15s'),
      trait.event('click', () => dispatch({ type: 'REMOVE_TODO', payload: todo.id })),
    ),

    // Show delete button on hover via parent
    trait.event('mouseenter', (e) => {
      if (!e) return;
      const btn = (e.currentTarget as HTMLElement).querySelector('button');
      if (btn) btn.style.opacity = '1';
    }),
    trait.event('mouseleave', (e) => {
      if (!e) return;
      const btn = (e.currentTarget as HTMLElement).querySelector('button');
      if (btn) btn.style.opacity = '0';
    }),
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
    trait.style('cursor', 'pointer'),
    trait.style('fontSize', theme.fontSizeSmall),
    trait.style('padding', '3px 8px'),
    trait.style('borderRadius', theme.radius),
    trait.style(
      'border',
      () =>
        appState.val().filter === filter ? `1px solid ${theme.border}` : '1px solid transparent',
      appState,
    ),
    trait.style(
      'color',
      () => (appState.val().filter === filter ? theme.text : theme.textMuted),
      appState,
    ),
    trait.event('click', () => dispatch({ type: 'SET_FILTER', payload: filter })),
  );
}

// --- Main App UI ---

export function renderApp(appState: StateType<AppState>, dispatch: (a: Action) => void) {
  return tag.div(
    trait.style('maxWidth', '550px'),
    trait.style('margin', '0 auto'),
    trait.style('fontFamily', theme.fontFamily),

    // Title
    tag.h1(
      trait.text('todos'),
      trait.style('textAlign', 'center'),
      trait.style('fontSize', theme.fontSizeXL),
      trait.style('fontWeight', '200'),
      trait.style('color', 'rgba(175, 47, 47, 0.25)'),
      trait.style('margin', '30px 0 20px'),
    ),

    // Main card
    tag.div(
      trait.style('background', theme.surface),
      trait.style('borderRadius', theme.radiusLarge),
      trait.style('boxShadow', `0 2px 6px ${theme.shadow}, 0 25px 50px rgba(0,0,0,0.06)`),
      trait.style('overflow', 'hidden'),

      // Input row
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('borderBottom', `1px solid ${theme.borderLight}`),
        trait.style('padding', '0 0 0 12px'),

        renderToggleAll(appState, dispatch),

        tag.input(
          trait.attr('type', 'text'),
          trait.attr('placeholder', 'What needs to be done?'),
          trait.style('flex', '1'),
          trait.style('padding', '16px 16px 16px 4px'),
          trait.style('fontSize', '20px'),
          trait.style('border', 'none'),
          trait.style('outline', 'none'),
          trait.style('background', 'transparent'),
          trait.style('color', theme.text),
          trait.style('fontFamily', 'inherit'),
          trait.submitOnEnter((text) => dispatch({ type: 'ADD_TODO', payload: text })),
        ),
      ),

      // Todo list
      tag.ul(
        trait.style('listStyle', 'none'),
        trait.style('margin', '0'),
        trait.style('padding', '0'),
        trait.children(
          () => filteredTodos(appState.val()).map((todo) => renderTodoItem(todo, dispatch)),
          appState,
        ),
      ),

      // Footer (hidden when no todos)
      tag.div(
        trait.style(
          'display',
          () => (appState.val().todos.length === 0 ? 'none' : 'flex'),
          appState,
        ),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('padding', '10px 16px'),
        trait.style('borderTop', `1px solid ${theme.borderLight}`),
        trait.style('fontSize', theme.fontSizeSmall),
        trait.style('color', theme.textMuted),

        // Count
        tag.span(
          trait.text(() => {
            const n = activeCount(appState.val());
            return `${n} item${n !== 1 ? 's' : ''} left`;
          }, appState),
        ),

        // Filter buttons
        tag.div(
          trait.style('display', 'flex'),
          trait.style('gap', '4px'),
          renderFilterButton('All', 'all', appState, dispatch),
          renderFilterButton('Active', 'active', appState, dispatch),
          renderFilterButton('Completed', 'completed', appState, dispatch),
        ),

        // Clear completed
        tag.button(
          trait.text('Clear completed'),
          trait.style('background', 'none'),
          trait.style('border', 'none'),
          trait.style('color', theme.textMuted),
          trait.style('cursor', 'pointer'),
          trait.style('fontSize', theme.fontSizeSmall),
          trait.style('padding', '0'),
          trait.style(
            'display',
            () => (completedCount(appState.val()) > 0 ? 'block' : 'none'),
            appState,
          ),
          trait.event('click', () => dispatch({ type: 'CLEAR_COMPLETED' })),
        ),
      ),
    ),

    // Info footer
    tag.footer(
      trait.style('textAlign', 'center'),
      trait.style('marginTop', '24px'),
      trait.style('fontSize', '11px'),
      trait.style('color', theme.textMuted),
      trait.style('lineHeight', '1.6'),
      tag.p(trait.text('Double-click to edit a todo')),
      tag.p(trait.text('Built with OEM')),
    ),
  );
}
