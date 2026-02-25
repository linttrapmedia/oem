// ─── UI ──────────────────────────────────────────────────────────────────────

import {
  addTodo,
  cancelEdit,
  clearCompleted,
  removeTodo,
  saveEdit,
  setFilter,
  startEdit,
  toggleAll,
  toggleTodo,
} from './actions';
import { editingId, editText, filter, inputText, todos } from './state';
import { tag, trait } from './templates';
import type { Filter, Todo } from './types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function filteredTodos(): Todo[] {
  const all = todos.val();
  const f = filter.val();
  if (f === 'active') return all.filter((t) => !t.completed);
  if (f === 'completed') return all.filter((t) => t.completed);
  return all;
}

function activeCount(): number {
  return todos.val().filter((t) => !t.completed).length;
}

function completedCount(): number {
  return todos.val().filter((t) => t.completed).length;
}

function allCompleted(): boolean {
  const all = todos.val();
  return all.length > 0 && all.every((t) => t.completed);
}

// ── Colors ───────────────────────────────────────────────────────────────────

const c = {
  bg: '#1a1a2e',
  surface: '#16213e',
  surfaceHover: '#1a2744',
  primary: '#e94560',
  primaryHover: '#ff6b81',
  text: '#eee',
  textMuted: '#8892b0',
  textDone: '#5a6380',
  border: '#2a3a5c',
  inputBg: '#0f3460',
  shadow: 'rgba(0,0,0,0.3)',
};

// ── Todo Item ────────────────────────────────────────────────────────────────

function todoItem(todo: Todo) {
  const isEditing = () => editingId.val() === todo.id;

  // ── Edit mode input ────────────────────────────────────────────────────

  const editInput = tag.input(
    trait.attr('type', 'text'),
    trait.inputVal(() => editText.val(), editText),
    trait.inputEvent('input', (val: string) => editText.set(val)),
    trait.event('keydown', (e: any) => {
      if (e.key === 'Enter') saveEdit();
      if (e.key === 'Escape') cancelEdit();
    }),
    trait.style('display', () => (isEditing() ? 'block' : 'none'), editingId),
    trait.style('flex', '1'),
    trait.style('padding', '8px 12px'),
    trait.style('border', `1px solid ${c.primary}`),
    trait.style('borderRadius', '4px'),
    trait.style('backgroundColor', c.inputBg),
    trait.style('color', c.text),
    trait.style('fontSize', '16px'),
    trait.style('outline', 'none'),
    trait.style('fontFamily', 'inherit'),
  );

  // Auto-focus edit input when this item enters edit mode
  editingId.sub(() => {
    if (isEditing()) setTimeout(() => (editInput as HTMLInputElement).focus(), 0);
  });

  // ── Display mode ──────────────────────────────────────────────────────

  const checkbox = tag.input(
    trait.attr('type', 'checkbox'),
    trait.attr('checked', () => (todo.completed ? 'true' : undefined), todos),
    trait.event('change', () => toggleTodo(todo.id)),
    trait.style('width', '20px'),
    trait.style('height', '20px'),
    trait.style('cursor', 'pointer'),
    trait.style('accentColor', c.primary),
    trait.style('flexShrink', '0'),
  );

  const label = tag.span(
    trait.text(todo.text),
    trait.event('dblclick', () => startEdit(todo.id, todo.text)),
    trait.style('flex', '1'),
    trait.style('cursor', 'pointer'),
    trait.style('fontSize', '16px'),
    trait.style('lineHeight', '1.4'),
    trait.style('textDecoration', () => (todo.completed ? 'line-through' : 'none'), todos),
    trait.style('opacity', () => (todo.completed ? '0.5' : '1'), todos),
    trait.style('color', () => (todo.completed ? c.textDone : c.text), todos),
    trait.style('transition', 'opacity 0.2s, color 0.2s'),
  );

  const deleteBtn = tag.button(
    trait.text('✕'),
    trait.event('click', () => removeTodo(todo.id)),
    trait.style('background', 'none'),
    trait.style('border', 'none'),
    trait.style('color', c.textMuted),
    trait.style('fontSize', '16px'),
    trait.style('cursor', 'pointer'),
    trait.style('padding', '4px 8px'),
    trait.style('borderRadius', '4px'),
    trait.style('opacity', '0'),
    trait.style('transition', 'opacity 0.15s, color 0.15s'),
    trait.styleOn('mouseenter', 'color', c.primary),
    trait.styleOn('mouseleave', 'color', c.textMuted),
  );

  const displayRow = tag.div(
    checkbox,
    label,
    deleteBtn,
    trait.style('display', () => (isEditing() ? 'none' : 'flex'), editingId),
    trait.style('alignItems', 'center'),
    trait.style('gap', '12px'),
  );

  return tag.li(
    displayRow,
    editInput,
    trait.style('padding', '12px 16px'),
    trait.style('borderBottom', `1px solid ${c.border}`),
    trait.style('transition', 'background-color 0.15s'),
    trait.styleOn('mouseenter', 'backgroundColor', c.surfaceHover),
    trait.styleOn('mouseleave', 'backgroundColor', 'transparent'),
    // Show delete button on hover
    trait.event('mouseenter', () => (deleteBtn.style.opacity = '1')),
    trait.event('mouseleave', () => (deleteBtn.style.opacity = '0')),
  );
}

// ── Filter Button ────────────────────────────────────────────────────────────

function filterBtn(label: string, value: Filter) {
  return tag.button(
    trait.text(label),
    trait.event('click', () => setFilter(value)),
    trait.style('padding', '6px 16px'),
    trait.style('border', 'none'),
    trait.style('borderRadius', '20px'),
    trait.style('cursor', 'pointer'),
    trait.style('fontSize', '13px'),
    trait.style('fontWeight', '600'),
    trait.style('fontFamily', 'inherit'),
    trait.style('transition', 'background-color 0.2s, color 0.2s'),
    trait.style(
      'backgroundColor',
      () => (filter.val() === value ? c.primary : 'transparent'),
      filter,
    ),
    trait.style('color', () => (filter.val() === value ? '#fff' : c.textMuted), filter),
    trait.styleOn('mouseenter', 'opacity', '0.85'),
    trait.styleOn('mouseleave', 'opacity', '1'),
  );
}

// ── App Shell ────────────────────────────────────────────────────────────────

export function App() {
  // ── Header input ─────────────────────────────────────────────────────

  const input = tag.input(
    trait.attr('type', 'text'),
    trait.attr('placeholder', 'What needs to be done?'),
    trait.inputVal(() => inputText.val(), inputText),
    trait.inputEvent('input', (val: string) => inputText.set(val)),
    trait.event('keydown', (e: any) => {
      if (e.key === 'Enter') addTodo();
    }),
    trait.style('flex', '1'),
    trait.style('padding', '14px 16px'),
    trait.style('border', `1px solid ${c.border}`),
    trait.style('borderRadius', '8px'),
    trait.style('backgroundColor', c.inputBg),
    trait.style('color', c.text),
    trait.style('fontSize', '16px'),
    trait.style('outline', 'none'),
    trait.style('fontFamily', 'inherit'),
  );

  const addBtn = tag.button(
    trait.text('Add'),
    trait.event('click', () => addTodo()),
    trait.style('padding', '14px 24px'),
    trait.style('border', 'none'),
    trait.style('borderRadius', '8px'),
    trait.style('backgroundColor', c.primary),
    trait.style('color', '#fff'),
    trait.style('fontSize', '15px'),
    trait.style('fontWeight', '700'),
    trait.style('cursor', 'pointer'),
    trait.style('fontFamily', 'inherit'),
    trait.style('transition', 'background-color 0.2s'),
    trait.styleOn('mouseenter', 'backgroundColor', c.primaryHover),
    trait.styleOn('mouseleave', 'backgroundColor', c.primary),
  );

  const inputRow = tag.div(
    input,
    addBtn,
    trait.style('display', 'flex'),
    trait.style('gap', '10px'),
    trait.style('padding', '20px'),
    trait.style('borderBottom', `1px solid ${c.border}`),
  );

  // ── Toggle All + Filters ─────────────────────────────────────────────

  const toggleAllBtn = tag.button(
    trait.text(() => (allCompleted() ? '☑' : '☐'), todos),
    trait.event('click', () => toggleAll()),
    trait.style('background', 'none'),
    trait.style('border', 'none'),
    trait.style('fontSize', '20px'),
    trait.style('cursor', 'pointer'),
    trait.style('color', () => (allCompleted() ? c.primary : c.textMuted), todos),
    trait.style('padding', '4px'),
    trait.style('transition', 'color 0.2s'),
    trait.attr('title', 'Toggle all'),
  );

  const toolbar = tag.div(
    toggleAllBtn,
    filterBtn('All', 'all'),
    filterBtn('Active', 'active'),
    filterBtn('Completed', 'completed'),
    trait.style('display', () => (todos.val().length > 0 ? 'flex' : 'none'), todos),
    trait.style('alignItems', 'center'),
    trait.style('gap', '8px'),
    trait.style('padding', '12px 20px'),
    trait.style('borderBottom', `1px solid ${c.border}`),
  );

  // ── Todo List ────────────────────────────────────────────────────────

  const emptyState = tag.div(
    trait.html(
      () => {
        const f = filter.val();
        const total = todos.val().length;
        if (total === 0) return tag.span(trait.text('No todos yet. Add one above!'));
        if (f === 'active') return tag.span(trait.text('No active todos.'));
        if (f === 'completed') return tag.span(trait.text('No completed todos.'));
        return tag.span(trait.text(''));
      },
      todos,
      filter,
    ),
    trait.style('display', () => (filteredTodos().length === 0 ? 'flex' : 'none'), todos, filter),
    trait.style('justifyContent', 'center'),
    trait.style('padding', '40px 20px'),
    trait.style('color', c.textMuted),
    trait.style('fontSize', '15px'),
    trait.style('fontStyle', 'italic'),
  );

  const list = tag.ul(
    trait.html(
      () => filteredTodos().map((todo) => todoItem(todo)),
      todos,
      filter,
      editingId,
      editText,
    ),
    trait.style('listStyle', 'none'),
    trait.style('margin', '0'),
    trait.style('padding', '0'),
  );

  // ── Footer ───────────────────────────────────────────────────────────

  const countText = tag.span(
    trait.text(() => {
      const n = activeCount();
      return `${n} item${n === 1 ? '' : 's'} left`;
    }, todos),
    trait.style('color', c.textMuted),
    trait.style('fontSize', '13px'),
  );

  const clearBtn = tag.button(
    trait.text('Clear completed'),
    trait.event('click', () => clearCompleted()),
    trait.style('display', () => (completedCount() > 0 ? 'inline-block' : 'none'), todos),
    trait.style('padding', '6px 14px'),
    trait.style('border', 'none'),
    trait.style('borderRadius', '4px'),
    trait.style('backgroundColor', 'transparent'),
    trait.style('color', c.textMuted),
    trait.style('fontSize', '13px'),
    trait.style('cursor', 'pointer'),
    trait.style('fontFamily', 'inherit'),
    trait.style('transition', 'color 0.2s'),
    trait.styleOn('mouseenter', 'color', c.primary),
    trait.styleOn('mouseleave', 'color', c.textMuted),
  );

  const footer = tag.div(
    countText,
    clearBtn,
    trait.style('display', () => (todos.val().length > 0 ? 'flex' : 'none'), todos),
    trait.style('justifyContent', 'space-between'),
    trait.style('alignItems', 'center'),
    trait.style('padding', '12px 20px'),
    trait.style('borderTop', `1px solid ${c.border}`),
  );

  // ── App Container ────────────────────────────────────────────────────

  const title = tag.h1(
    trait.text('todos'),
    trait.style('textAlign', 'center'),
    trait.style('fontSize', '64px'),
    trait.style('fontWeight', '200'),
    trait.style('color', c.primary),
    trait.style('margin', '0 0 24px'),
    trait.style('letterSpacing', '-2px'),
    trait.style('opacity', '0.6'),
  );

  const card = tag.div(
    inputRow,
    toolbar,
    emptyState,
    list,
    footer,
    trait.style('backgroundColor', c.surface),
    trait.style('borderRadius', '12px'),
    trait.style('boxShadow', `0 8px 32px ${c.shadow}`),
    trait.style('overflow', 'hidden'),
  );

  const hint = tag.p(
    trait.text('Double-click a todo to edit'),
    trait.style('textAlign', 'center'),
    trait.style('color', c.textMuted),
    trait.style('fontSize', '12px'),
    trait.style('marginTop', '16px'),
    trait.style('opacity', '0.6'),
  );

  return tag.div(
    title,
    card,
    hint,
    trait.style('maxWidth', '560px'),
    trait.style('margin', '48px auto'),
    trait.style('padding', '0 16px'),
    trait.style('fontFamily', "'Inter', system-ui, -apple-system, sans-serif"),
  );
}
