// ui.ts
import {
  addTodo,
  cancelEdit,
  clearCompleted,
  deleteTodo,
  saveEdit,
  setFilter,
  setInput,
  startEdit,
  toggleTheme,
  toggleTodo,
} from './actions';
import {
  ANIM_DURATION_FAST,
  ANIM_DURATION_MEDIUM,
  ANIM_DURATION_SLOW,
  EMPTY_MESSAGES,
  FILTERS,
  FONT_PRIMARY,
  PLACEHOLDER_TEXT,
} from './constants';
import { CheckIcon, EditIcon, MoonIcon, PlusIcon, SparkleIcon, SunIcon, TrashIcon } from './icons';
import { $dispatch, dispatch } from './machines';
import { addCounter, deletingId, editingId, editText, filter, inputText, todos } from './states';
import { tag, trait } from './templates';
import {
  accent_danger,
  accent_gradient_end,
  accent_gradient_start,
  accent_primary,
  accent_success,
  accent_success_glow,
  backdrop_blur,
  border_color_focus,
  border_color_input,
  border_color_primary,
  radius_full,
  radius_lg,
  radius_md,
  radius_sm,
  shadow_button,
  shadow_card,
  shadow_item_hover,
  space_gap_lg,
  space_gap_md,
  space_gap_sm,
  space_padding_lg,
  space_padding_md,
  space_padding_xl,
  surface_bg_card,
  surface_bg_completed,
  surface_bg_input,
  surface_bg_item,
  surface_bg_item_hover,
  text_fg_completed,
  text_fg_muted,
  text_fg_on_accent,
  text_fg_primary,
  text_fg_secondary,
  theme,
  transition_fast,
  transition_medium,
  transition_theme,
  type_size_body,
  type_size_heading,
  type_size_small,
  type_size_tiny,
  type_weight_bold,
  type_weight_medium,
} from './theme';
import type { TodoItem } from './types';

// ═══════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════

function header() {
  return tag.header(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'space-between'),
    trait.style('padding', `${space_padding_lg.val()} ${space_padding_xl.val()}`),
    trait.style('marginBottom', space_padding_lg.$val),
    // Entrance animation
    trait.animate(
      [
        { opacity: '0', transform: 'translateY(-20px)' },
        { opacity: '1', transform: 'translateY(0)' },
      ],
      { duration: ANIM_DURATION_SLOW, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
    ),

    // Title
    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', '12px'),

      tag.h1(
        trait.text('todos'),
        trait.style('margin', '0'),
        trait.style('fontSize', type_size_heading.$val),
        trait.style('fontWeight', type_weight_bold.$val),
        trait.style('letterSpacing', '-0.02em'),
        trait.style(
          'background',
          () =>
            `linear-gradient(135deg, ${accent_gradient_start.val()}, ${accent_gradient_end.val()})`,
          accent_gradient_start,
          accent_gradient_end,
        ),
        trait.style('webkitBackgroundClip', 'text'),
        trait.style('webkitTextFillColor', 'transparent'),
        trait.style('backgroundClip', 'text'),
        // Subtle breathing animation on the title
        trait.animate(
          [{ filter: 'brightness(1)' }, { filter: 'brightness(1.2)' }, { filter: 'brightness(1)' }],
          { duration: 3000, iterations: Infinity, easing: 'ease-in-out' },
        ),
      ),
    ),

    // Theme toggle
    tag.button(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('width', '40px'),
      trait.style('height', '40px'),
      trait.style('borderRadius', radius_full.$val),
      trait.style('border', '1px solid'),
      trait.style('borderColor', border_color_primary.$val),
      trait.style('backgroundColor', surface_bg_item.$val),
      trait.style('cursor', 'pointer'),
      trait.style('color', text_fg_secondary.$val),
      trait.style('transition', transition_medium.$val),
      trait.style('backdropFilter', backdrop_blur.$val),
      trait.styleOnEvent('mouseenter', 'transform', 'rotate(30deg) scale(1.1)'),
      trait.styleOnEvent('mouseleave', 'transform', 'rotate(0deg) scale(1)'),
      trait.styleOnEvent('mouseenter', 'borderColor', accent_primary.$val),
      trait.styleOnEvent('mouseleave', 'borderColor', border_color_primary.$val),
      trait.event('click', $dispatch(toggleTheme())),
      trait.aria('aria-label', 'Toggle theme'),
      trait.innerHTML(() => (theme.val() === 'dark' ? SunIcon() : MoonIcon()), theme),
    ),
  );
}

// ═══════════════════════════════════════════════
// INPUT AREA
// ═══════════════════════════════════════════════

function inputArea() {
  return tag.form(
    trait.style('display', 'flex'),
    trait.style('gap', space_gap_sm.$val),
    trait.style('marginBottom', space_padding_lg.$val),
    trait.style('padding', `0 ${space_padding_xl.val()}`),
    trait.event('submit', (e: any) => {
      e.preventDefault();
      dispatch(addTodo(inputText.val()));
    }),
    // Slide in from left
    trait.animate(
      [
        { opacity: '0', transform: 'translateX(-30px)' },
        { opacity: '1', transform: 'translateX(0)' },
      ],
      {
        duration: ANIM_DURATION_SLOW,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
        delay: 100,
      },
    ),

    // Input field
    tag.input(
      trait.attr('type', 'text'),
      trait.attr('placeholder', PLACEHOLDER_TEXT),
      trait.style('flex', '1'),
      trait.style('padding', '14px 20px'),
      trait.style('borderRadius', radius_md.$val),
      trait.style('border', '2px solid'),
      trait.style('borderColor', border_color_input.$val),
      trait.style('backgroundColor', surface_bg_input.$val),
      trait.style('color', text_fg_primary.$val),
      trait.style('fontSize', type_size_body.$val),
      trait.style('fontFamily', FONT_PRIMARY),
      trait.style('outline', 'none'),
      trait.style('transition', transition_medium.$val),
      trait.style('backdropFilter', backdrop_blur.$val),
      // Focus effects
      trait.styleOnEvent('focus', 'borderColor', accent_primary.$val),
      trait.styleOnEvent('blur', 'borderColor', border_color_input.$val),
      trait.styleOnEvent('focus', 'boxShadow', () => `0 0 0 4px ${border_color_focus.val()}`),
      trait.styleOnEvent('blur', 'boxShadow', 'none'),
      // Two-way binding
      trait.inputValue(inputText.$val),
      trait.inputEvent('input', (val: string) => dispatch(setInput(val))),
    ),

    // Add button
    tag.button(
      trait.attr('type', 'submit'),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('width', '50px'),
      trait.style('height', '50px'),
      trait.style('borderRadius', radius_md.$val),
      trait.style('border', 'none'),
      trait.style(
        'background',
        () =>
          `linear-gradient(135deg, ${accent_gradient_start.val()}, ${accent_gradient_end.val()})`,
        accent_gradient_start,
        accent_gradient_end,
      ),
      trait.style('color', text_fg_on_accent.$val),
      trait.style('cursor', 'pointer'),
      trait.style('transition', transition_medium.$val),
      trait.style('boxShadow', shadow_button.$val),
      trait.style('flexShrink', '0'),
      trait.styleOnEvent('mouseenter', 'transform', 'scale(1.08)'),
      trait.styleOnEvent('mouseleave', 'transform', 'scale(1)'),
      trait.styleOnEvent('mousedown', 'transform', 'scale(0.95)'),
      trait.styleOnEvent('mouseup', 'transform', 'scale(1.08)'),
      trait.aria('aria-label', 'Add todo'),
      PlusIcon({ color: 'white' }),
    ),
  );
}

// ═══════════════════════════════════════════════
// FILTER BAR
// ═══════════════════════════════════════════════

function filterBar() {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'space-between'),
    trait.style('padding', `0 ${space_padding_xl.val()}`),
    trait.style('marginBottom', space_gap_lg.$val),
    // Slide in from right
    trait.animate(
      [
        { opacity: '0', transform: 'translateX(30px)' },
        { opacity: '1', transform: 'translateX(0)' },
      ],
      {
        duration: ANIM_DURATION_SLOW,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
        delay: 200,
      },
    ),

    // Filter pills
    tag.div(
      trait.style('display', 'flex'),
      trait.style('gap', '6px'),
      trait.style('padding', '4px'),
      trait.style('borderRadius', radius_full.$val),
      trait.style('backgroundColor', surface_bg_item.$val),
      trait.style('backdropFilter', backdrop_blur.$val),

      ...FILTERS.map((f) =>
        tag.button(
          trait.text(f.label),
          trait.style('padding', '6px 16px'),
          trait.style('borderRadius', radius_full.$val),
          trait.style('border', 'none'),
          trait.style('fontSize', type_size_small.$val),
          trait.style('fontWeight', type_weight_medium.$val),
          trait.style('fontFamily', FONT_PRIMARY),
          trait.style('cursor', 'pointer'),
          trait.style('transition', transition_medium.$val),
          // Active state
          trait.style(
            'background',
            () =>
              `linear-gradient(135deg, ${accent_gradient_start.val()}, ${accent_gradient_end.val()})`,
            filter.$test(f.id),
            filter,
            accent_gradient_start,
            accent_gradient_end,
          ),
          trait.style('color', text_fg_on_accent.$val, filter.$test(f.id), filter),
          trait.style('boxShadow', shadow_button.$val, filter.$test(f.id), filter),
          // Inactive state
          trait.style('background', 'transparent', filter.$test(f.id, false), filter),
          trait.style('color', text_fg_secondary.$val, filter.$test(f.id, false), filter),
          trait.style('boxShadow', 'none', filter.$test(f.id, false), filter),
          // Hover on inactive
          trait.styleOnEvent('mouseenter', 'backgroundColor', () =>
            filter.val() !== f.id ? surface_bg_item_hover.val() : '',
          ),
          trait.styleOnEvent('mouseleave', 'backgroundColor', () =>
            filter.val() !== f.id ? 'transparent' : '',
          ),
          trait.event('click', () => dispatch(setFilter(f.id))),
          // Scale animation on press
          trait.styleOnEvent('mousedown', 'transform', 'scale(0.95)'),
          trait.styleOnEvent('mouseup', 'transform', 'scale(1)'),
        ),
      ),
    ),

    // Count badge
    tag.span(
      trait.text(() => {
        const active = todos.val().filter((t) => !t.completed).length;
        return `${active} left`;
      }, todos),
      trait.style('fontSize', type_size_small.$val),
      trait.style('color', text_fg_muted.$val),
      trait.style('fontWeight', type_weight_medium.$val),
      trait.style('transition', transition_medium.$val),
    ),
  );
}

// ═══════════════════════════════════════════════
// CHECKBOX
// ═══════════════════════════════════════════════

function checkbox(item: TodoItem) {
  return tag.button(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('width', '26px'),
    trait.style('height', '26px'),
    trait.style('borderRadius', radius_sm.$val),
    trait.style('border', '2px solid'),
    trait.style('cursor', 'pointer'),
    trait.style('flexShrink', '0'),
    trait.style('transition', transition_medium.$val),
    trait.style('padding', '0'),
    // Completed state
    trait.style(
      'background',
      () => `linear-gradient(135deg, ${accent_success.val()}, ${accent_gradient_end.val()})`,
      todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
      accent_success,
      accent_gradient_end,
    ),
    trait.style(
      'borderColor',
      'transparent',
      todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    trait.style(
      'boxShadow',
      () => `0 0 12px ${accent_success_glow.val()}`,
      todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
      accent_success_glow,
    ),
    // Uncompleted state
    trait.style(
      'background',
      'transparent',
      todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    trait.style(
      'borderColor',
      border_color_input.$val,
      todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    trait.style(
      'boxShadow',
      'none',
      todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    // Hover scale
    trait.styleOnEvent('mouseenter', 'transform', 'scale(1.15)'),
    trait.styleOnEvent('mouseleave', 'transform', 'scale(1)'),
    // Click handler
    trait.event('click', () => dispatch(toggleTodo(item.id))),
    trait.aria('aria-label', 'Toggle todo'),
    // Check icon (visible when completed)
    trait.innerHTML(() => {
      const isCompleted = todos.val().some((t) => t.id === item.id && t.completed);
      return isCompleted ? CheckIcon({ color: 'white', size: '14' }) : '';
    }, todos),
  );
}

// ═══════════════════════════════════════════════
// TODO ITEM
// ═══════════════════════════════════════════════

function todoItem(item: TodoItem, index: number) {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_md.$val),
    trait.style('padding', `${space_padding_md.val()} ${space_padding_lg.val()}`),
    trait.style('borderRadius', radius_md.$val),
    trait.style('backgroundColor', surface_bg_item.$val),
    trait.style('transition', transition_theme.$val),
    trait.style('position', 'relative'),
    trait.style('backdropFilter', backdrop_blur.$val),
    trait.style('border', '1px solid'),
    trait.style('borderColor', border_color_primary.$val),
    // Staggered entrance animation
    trait.animate(
      [
        { opacity: '0', transform: 'translateY(16px) scale(0.96)' },
        { opacity: '1', transform: 'translateY(0) scale(1)' },
      ],
      {
        duration: ANIM_DURATION_MEDIUM,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
        delay: index * 50,
      },
    ),
    // Exit animation when deleting
    trait.animate(
      [
        { opacity: '1', transform: 'translateX(0) scale(1)' },
        { opacity: '0', transform: 'translateX(80px) scale(0.8)' },
      ],
      {
        duration: ANIM_DURATION_MEDIUM,
        easing: 'cubic-bezier(0.55, 0, 1, 0.45)',
        fill: 'forwards',
      },
      deletingId.$test(item.id),
      deletingId,
    ),
    // Completed background
    trait.style(
      'backgroundColor',
      surface_bg_completed.$val,
      todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    // Hover effects
    trait.styleOnEvent('mouseenter', 'borderColor', () => accent_primary.val() + '30'),
    trait.styleOnEvent('mouseleave', 'borderColor', border_color_primary.$val),
    trait.styleOnEvent('mouseenter', 'boxShadow', shadow_item_hover.$val),
    trait.styleOnEvent('mouseleave', 'boxShadow', 'none'),
    trait.styleOnEvent('mouseenter', 'transform', 'translateY(-1px)'),
    trait.styleOnEvent('mouseleave', 'transform', 'translateY(0)'),

    // Checkbox
    checkbox(item),

    // Text area (either display or edit mode)
    tag.div(
      trait.style('flex', '1'),
      trait.style('minWidth', '0'),
      trait.innerHTML(
        () => {
          const isEditing = editingId.val() === item.id;
          if (isEditing) {
            return editInput(item);
          }
          return todoText(item);
        },
        editingId,
        todos,
      ),
    ),

    // Action buttons
    tag.div(
      trait.style('display', 'flex'),
      trait.style('gap', '4px'),
      trait.style('opacity', '0'),
      trait.style('transition', transition_fast.$val),
      trait.className('todo-actions'),

      // Edit button
      tag.button(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('justifyContent', 'center'),
        trait.style('width', '32px'),
        trait.style('height', '32px'),
        trait.style('borderRadius', radius_sm.$val),
        trait.style('border', 'none'),
        trait.style('backgroundColor', 'transparent'),
        trait.style('color', text_fg_muted.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'backgroundColor', surface_bg_item_hover.$val),
        trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),
        trait.styleOnEvent('mouseenter', 'color', accent_primary.$val),
        trait.styleOnEvent('mouseleave', 'color', text_fg_muted.$val),
        trait.styleOnEvent('mousedown', 'transform', 'scale(0.85)'),
        trait.styleOnEvent('mouseup', 'transform', 'scale(1)'),
        trait.event('click', () => dispatch(startEdit(item.id))),
        trait.aria('aria-label', 'Edit todo'),
        EditIcon(),
      ),

      // Delete button
      tag.button(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('justifyContent', 'center'),
        trait.style('width', '32px'),
        trait.style('height', '32px'),
        trait.style('borderRadius', radius_sm.$val),
        trait.style('border', 'none'),
        trait.style('backgroundColor', 'transparent'),
        trait.style('color', text_fg_muted.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'backgroundColor', () => accent_danger.val() + '15'),
        trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),
        trait.styleOnEvent('mouseenter', 'color', accent_danger.$val),
        trait.styleOnEvent('mouseleave', 'color', text_fg_muted.$val),
        trait.styleOnEvent('mousedown', 'transform', 'scale(0.85)'),
        trait.styleOnEvent('mouseup', 'transform', 'scale(1)'),
        trait.event('click', () => dispatch(deleteTodo(item.id))),
        trait.aria('aria-label', 'Delete todo'),
        TrashIcon(),
      ),
    ),
  );
}

function todoText(item: TodoItem) {
  return tag.span(
    trait.text(item.text),
    trait.style('fontSize', type_size_body.$val),
    trait.style('transition', transition_medium.$val),
    trait.style('display', 'block'),
    trait.style('overflow', 'hidden'),
    trait.style('textOverflow', 'ellipsis'),
    trait.style('whiteSpace', 'nowrap'),
    trait.style('cursor', 'pointer'),
    // Completed styling
    trait.style(
      'textDecoration',
      'line-through',
      todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    trait.style(
      'color',
      text_fg_completed.$val,
      todos.$test(() => todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    // Active styling
    trait.style(
      'textDecoration',
      'none',
      todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    trait.style(
      'color',
      text_fg_primary.$val,
      todos.$test(() => !todos.val().some((t) => t.id === item.id && t.completed)),
      todos,
    ),
    // Double-click to edit
    trait.event('dblclick', () => dispatch(startEdit(item.id))),
  );
}

function editInput(item: TodoItem) {
  return tag.input(
    trait.attr('type', 'text'),
    trait.style('width', '100%'),
    trait.style('padding', '4px 8px'),
    trait.style('border', '2px solid'),
    trait.style('borderColor', accent_primary.$val),
    trait.style('borderRadius', radius_sm.$val),
    trait.style('backgroundColor', surface_bg_input.$val),
    trait.style('color', text_fg_primary.$val),
    trait.style('fontSize', type_size_body.$val),
    trait.style('fontFamily', FONT_PRIMARY),
    trait.style('outline', 'none'),
    trait.style('boxSizing', 'border-box'),
    trait.style('boxShadow', () => `0 0 0 4px ${border_color_focus.val()}`),
    trait.inputValue(editText.$val),
    trait.inputEvent('input', editText.set),
    trait.event('keydown', (e: any) => {
      if (e.key === 'Enter') dispatch(saveEdit(item.id, editText.val()));
      if (e.key === 'Escape') dispatch(cancelEdit());
    }),
    trait.event('blur', () => dispatch(saveEdit(item.id, editText.val()))),
    trait.focus([], [editingId]),
    // Scale-in animation
    trait.animate(
      [
        { transform: 'scaleX(0.8)', opacity: '0' },
        { transform: 'scaleX(1)', opacity: '1' },
      ],
      { duration: ANIM_DURATION_FAST, easing: 'ease-out', fill: 'forwards' },
    ),
  );
}

// ═══════════════════════════════════════════════
// TODO LIST
// ═══════════════════════════════════════════════

function todoList() {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('gap', space_gap_sm.$val),
    trait.style('padding', `0 ${space_padding_xl.val()}`),
    trait.style('flex', '1'),
    trait.style('overflowY', 'auto'),
    trait.style('minHeight', '0'),
    trait.innerHTML(
      () => {
        const currentFilter = filter.val();
        const allTodos = todos.val();
        const filtered =
          currentFilter === 'all'
            ? allTodos
            : currentFilter === 'active'
            ? allTodos.filter((t) => !t.completed)
            : allTodos.filter((t) => t.completed);

        if (filtered.length === 0) {
          return emptyState();
        }

        return filtered.map((item, i) => todoItem(item, i));
      },
      todos,
      filter,
      addCounter,
      deletingId,
    ),
  );
}

// ═══════════════════════════════════════════════
// EMPTY STATE
// ═══════════════════════════════════════════════

function emptyState() {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('padding', '60px 20px'),
    trait.style('gap', space_gap_lg.$val),
    // Fade in
    trait.animate(
      [
        { opacity: '0', transform: 'scale(0.9)' },
        { opacity: '1', transform: 'scale(1)' },
      ],
      { duration: ANIM_DURATION_SLOW, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' },
    ),

    // Animated sparkle icon
    tag.div(
      trait.style('color', text_fg_muted.$val),
      trait.style('opacity', '0.5'),
      // Continuous floating animation
      trait.animate(
        [
          { transform: 'translateY(0) rotate(0deg)' },
          { transform: 'translateY(-8px) rotate(5deg)' },
          { transform: 'translateY(0) rotate(0deg)' },
        ],
        { duration: 3000, iterations: Infinity, easing: 'ease-in-out' },
      ),
      SparkleIcon(),
    ),

    tag.p(
      trait.text(() => EMPTY_MESSAGES[filter.val()], filter),
      trait.style('margin', '0'),
      trait.style('fontSize', type_size_body.$val),
      trait.style('color', text_fg_muted.$val),
      trait.style('textAlign', 'center'),
    ),
  );
}

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════

function footer() {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'space-between'),
    trait.style('padding', `${space_padding_md.val()} ${space_padding_xl.val()}`),
    trait.style('borderTop', '1px solid'),
    trait.style('borderColor', border_color_primary.$val),
    trait.style('marginTop', 'auto'),
    trait.style('transition', transition_theme.$val),
    // Slide up
    trait.animate(
      [
        { opacity: '0', transform: 'translateY(10px)' },
        { opacity: '1', transform: 'translateY(0)' },
      ],
      {
        duration: ANIM_DURATION_MEDIUM,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
        delay: 300,
      },
    ),

    // Completed count
    tag.span(
      trait.text(() => {
        const completed = todos.val().filter((t) => t.completed).length;
        const total = todos.val().length;
        return `${completed}/${total} completed`;
      }, todos),
      trait.style('fontSize', type_size_small.$val),
      trait.style('color', text_fg_muted.$val),
    ),

    // Clear completed button
    tag.button(
      trait.text('Clear completed'),
      trait.style('padding', '6px 14px'),
      trait.style('borderRadius', radius_full.$val),
      trait.style('border', '1px solid'),
      trait.style('borderColor', border_color_primary.$val),
      trait.style('backgroundColor', 'transparent'),
      trait.style('color', text_fg_secondary.$val),
      trait.style('fontSize', type_size_small.$val),
      trait.style('fontWeight', type_weight_medium.$val),
      trait.style('fontFamily', FONT_PRIMARY),
      trait.style('cursor', 'pointer'),
      trait.style('transition', transition_medium.$val),
      trait.styleOnEvent('mouseenter', 'borderColor', accent_danger.$val),
      trait.styleOnEvent('mouseleave', 'borderColor', border_color_primary.$val),
      trait.styleOnEvent('mouseenter', 'color', accent_danger.$val),
      trait.styleOnEvent('mouseleave', 'color', text_fg_secondary.$val),
      trait.styleOnEvent('mousedown', 'transform', 'scale(0.95)'),
      trait.styleOnEvent('mouseup', 'transform', 'scale(1)'),
      trait.event('click', $dispatch(clearCompleted())),
    ),
  );
}

// ═══════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════

export const app = tag.div(
  trait.style('maxWidth', '560px'),
  trait.style('margin', '0 auto'),
  trait.style('minHeight', '100vh'),
  trait.style('display', 'flex'),
  trait.style('flexDirection', 'column'),
  trait.style('paddingTop', space_padding_xl.$val),
  trait.style('paddingBottom', space_padding_xl.$val),

  // Animated gradient background orbs (decorative)
  tag.div(
    trait.style('position', 'fixed'),
    trait.style('top', '0'),
    trait.style('left', '0'),
    trait.style('width', '100%'),
    trait.style('height', '100%'),
    trait.style('pointerEvents', 'none'),
    trait.style('zIndex', '-1'),
    trait.style('overflow', 'hidden'),

    // Orb 1
    tag.div(
      trait.style('position', 'absolute'),
      trait.style('top', '-20%'),
      trait.style('right', '-10%'),
      trait.style('width', '500px'),
      trait.style('height', '500px'),
      trait.style('borderRadius', '50%'),
      trait.style(
        'background',
        () => `radial-gradient(circle, ${accent_gradient_start.val()}15, transparent 70%)`,
        accent_gradient_start,
      ),
      trait.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: 'translate(-30px, 20px) scale(1.05)' },
          { transform: 'translate(0, 0) scale(1)' },
        ],
        { duration: 8000, iterations: Infinity, easing: 'ease-in-out' },
      ),
    ),

    // Orb 2
    tag.div(
      trait.style('position', 'absolute'),
      trait.style('bottom', '-20%'),
      trait.style('left', '-10%'),
      trait.style('width', '400px'),
      trait.style('height', '400px'),
      trait.style('borderRadius', '50%'),
      trait.style(
        'background',
        () => `radial-gradient(circle, ${accent_gradient_end.val()}12, transparent 70%)`,
        accent_gradient_end,
      ),
      trait.animate(
        [
          { transform: 'translate(0, 0) scale(1)' },
          { transform: 'translate(20px, -30px) scale(1.08)' },
          { transform: 'translate(0, 0) scale(1)' },
        ],
        { duration: 10000, iterations: Infinity, easing: 'ease-in-out' },
      ),
    ),
  ),

  // Main card container
  tag.div(
    trait.style('backgroundColor', surface_bg_card.$val),
    trait.style('borderRadius', radius_lg.$val),
    trait.style('boxShadow', shadow_card.$val),
    trait.style('border', '1px solid'),
    trait.style('borderColor', border_color_primary.$val),
    trait.style('backdropFilter', backdrop_blur.$val),
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('minHeight', '500px'),
    trait.style('overflow', 'hidden'),
    trait.style('transition', transition_theme.$val),
    // Card entrance
    trait.animate(
      [
        { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
        { opacity: '1', transform: 'translateY(0) scale(1)' },
      ],
      {
        duration: 700,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards',
      },
    ),

    header(),
    inputArea(),
    filterBar(),
    todoList(),
    footer(),
  ),

  // Credit line
  tag.p(
    trait.text('Built with OEM'),
    trait.style('textAlign', 'center'),
    trait.style('fontSize', type_size_tiny.$val),
    trait.style('color', text_fg_muted.$val),
    trait.style('marginTop', space_padding_lg.$val),
    trait.style('opacity', '0.6'),
    trait.animate([{ opacity: '0' }, { opacity: '0.6' }], {
      duration: 1000,
      fill: 'forwards',
      delay: 800,
    }),
  ),
);
