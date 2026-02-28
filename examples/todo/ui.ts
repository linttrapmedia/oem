// ui.ts
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  setFilter,
  toggleAll,
  toggleTodo,
  updateTodo,
} from './actions';
import { FILTER_OPTIONS, KEYBOARD } from './constants';
import { $dispatch, dispatch } from './machines';
import { editingId, editingText, filter, isDesktop, newTodoText, todos } from './states';
import { tag, trait } from './templates';
import {
  action_bg_primary,
  action_fg_danger,
  action_fg_danger_hover,
  border_color_accent,
  border_color_primary,
  border_color_secondary,
  checkbox_bg_checked,
  checkbox_border_default,
  nav_bg_active,
  nav_bg_default,
  nav_bg_hover,
  nav_fg_active,
  nav_fg_default,
  radius_size_full,
  radius_size_lg,
  radius_size_md,
  radius_size_sm,
  shadow_box_lg,
  shadow_box_sm,
  space_gap_md,
  space_gap_sm,
  space_padding_2xl,
  space_padding_lg,
  space_padding_md,
  space_padding_sm,
  space_padding_xl,
  space_padding_xs,
  surface_bg_input,
  surface_bg_primary,
  surface_bg_secondary,
  surface_bg_tertiary,
  text_fg_accent,
  text_fg_muted,
  text_fg_primary,
  text_fg_secondary,
  theme,
  transition_fast,
  transition_medium,
  type_size_base,
  type_size_md,
  type_size_sm,
  type_size_xl,
  type_size_xs,
  type_weight_light,
  type_weight_medium,
  type_weight_regular,
} from './theme';
import type { Filter, Todo } from './types';

// --- Helper: get filtered todos ---
function filteredTodos(): Todo[] {
  const all = todos.val();
  const f = filter.val();
  if (f === 'active') return all.filter((t) => !t.completed);
  if (f === 'completed') return all.filter((t) => t.completed);
  return all;
}

// --- Helper: active count text ---
function activeCountText(): string {
  const count = todos.val().filter((t) => !t.completed).length;
  return `${count} item${count !== 1 ? 's' : ''} left`;
}

// --- Custom checkbox ---
function Checkbox(todo: Todo) {
  return tag.div(
    trait.style('width', '22px'),
    trait.style('height', '22px'),
    trait.style('borderRadius', radius_size_full.$val),
    trait.style(
      'border',
      () => `2px solid ${checkbox_border_default.val()}`,
      checkbox_border_default,
    ),
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('cursor', 'pointer'),
    trait.style('flexShrink', '0'),
    trait.style('transition', transition_fast.$val),

    // Checked state
    trait.style(
      'backgroundColor',
      checkbox_bg_checked.$val,
      todos.$test((t) => t.find((i) => i.id === todo.id)?.completed ?? false),
    ),
    trait.style(
      'backgroundColor',
      'transparent',
      todos.$test((t) => !t.find((i) => i.id === todo.id)?.completed),
    ),
    trait.style(
      'borderColor',
      checkbox_bg_checked.$val,
      todos.$test((t) => t.find((i) => i.id === todo.id)?.completed ?? false),
    ),
    trait.style(
      'borderColor',
      checkbox_border_default.$val,
      todos.$test((t) => !t.find((i) => i.id === todo.id)?.completed),
    ),

    // Checkmark SVG
    tag.svg(
      trait.attr('width', '12'),
      trait.attr('height', '12'),
      trait.attr('viewBox', '0 0 12 12'),
      trait.attr('fill', 'none'),
      trait.style(
        'opacity',
        '1',
        todos.$test((t) => t.find((i) => i.id === todo.id)?.completed ?? false),
      ),
      trait.style(
        'opacity',
        '0',
        todos.$test((t) => !t.find((i) => i.id === todo.id)?.completed),
      ),
      tag.path(
        trait.attr('d', 'M2 6l3 3 5-5'),
        trait.attr('stroke', 'white'),
        trait.attr('stroke-width', '2'),
        trait.attr('stroke-linecap', 'round'),
        trait.attr('stroke-linejoin', 'round'),
      ),
    ),

    trait.event('click', () => dispatch(toggleTodo(todo.id))),
  );
}

// --- Todo Item ---
function TodoItem(todo: Todo) {
  return tag.li(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_md.$val),
    trait.style(
      'padding',
      () => `${space_padding_md.val()} ${space_padding_lg.val()}`,
      space_padding_md,
      space_padding_lg,
    ),
    trait.style(
      'borderBottom',
      () => `1px solid ${border_color_secondary.val()}`,
      border_color_secondary,
    ),
    trait.style('transition', transition_fast.$val),
    trait.style('position', 'relative'),
    trait.styleOnEvent('mouseenter', 'backgroundColor', () => surface_bg_tertiary.val()),
    trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),

    // Checkbox
    Checkbox(todo),

    // Text display (visible when NOT editing this todo)
    tag.span(
      trait.text(() => todo.text),
      trait.style('flex', '1'),
      trait.style('fontSize', type_size_base.$val),
      trait.style('color', text_fg_primary.$val),
      trait.style('cursor', 'pointer'),
      trait.style('wordBreak', 'break-word'),
      trait.style('lineHeight', '1.6'),
      trait.style('transition', transition_fast.$val),
      trait.style('letterSpacing', '0.01em'),

      // Completed styles
      trait.style(
        'textDecoration',
        'line-through',
        todos.$test((t) => t.find((i) => i.id === todo.id)?.completed ?? false),
      ),
      trait.style(
        'textDecoration',
        'none',
        todos.$test((t) => !t.find((i) => i.id === todo.id)?.completed),
      ),
      trait.style(
        'color',
        text_fg_muted.$val,
        todos.$test((t) => t.find((i) => i.id === todo.id)?.completed ?? false),
      ),
      trait.style(
        'color',
        text_fg_primary.$val,
        todos.$test((t) => !t.find((i) => i.id === todo.id)?.completed),
      ),

      // Hide when editing
      trait.style(
        'display',
        'inline',
        editingId.$test((id) => id !== todo.id),
      ),
      trait.style('display', 'none', editingId.$test(todo.id)),

      // Double-click to edit
      trait.event('dblclick', () => {
        editingId.set(todo.id);
        editingText.set(todo.text);
      }),
    ),

    // Edit input
    tag.input(
      trait.style('flex', '1'),
      trait.style('fontSize', type_size_base.$val),
      trait.style(
        'padding',
        () => `${space_padding_sm.val()} ${space_padding_md.val()}`,
        space_padding_sm,
        space_padding_md,
      ),
      trait.style('border', () => `2px solid ${border_color_accent.val()}`, border_color_accent),
      trait.style('borderRadius', radius_size_sm.$val),
      trait.style('outline', 'none'),
      trait.style('backgroundColor', surface_bg_input.$val),
      trait.style('color', text_fg_primary.$val),
      trait.style(
        'boxShadow',
        () => `0 0 0 3px ${border_color_accent.val()}22`,
        border_color_accent,
      ),
      trait.style('lineHeight', '1.6'),

      // Show only when editing this item
      trait.style('display', 'block', editingId.$test(todo.id)),
      trait.style(
        'display',
        'none',
        editingId.$test((id) => id !== todo.id),
      ),

      trait.inputValue(() => editingText.val(), editingText),
      trait.inputEvent('input', (val: string) => editingText.set(val)),
      trait.focus([editingId.$test(todo.id)], [editingId]),

      trait.event('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key === KEYBOARD.ENTER) dispatch(updateTodo(todo.id, editingText.val()));
        if (ke.key === KEYBOARD.ESCAPE) {
          editingId.set(null);
          editingText.set('');
        }
      }),
      trait.event('blur', () => {
        if (editingId.val() === todo.id) dispatch(updateTodo(todo.id, editingText.val()));
      }),
    ),

    // Delete button
    tag.button(
      trait.style('background', 'none'),
      trait.style('border', 'none'),
      trait.style('cursor', 'pointer'),
      trait.style('padding', space_padding_xs.$val),
      trait.style('lineHeight', '1'),
      trait.style('opacity', '0'),
      trait.style('transition', transition_fast.$val),
      trait.style('color', action_fg_danger.$val),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('flexShrink', '0'),
      trait.styleOnEvent('mouseenter', 'color', () => action_fg_danger_hover.val()),
      trait.styleOnEvent('mouseleave', 'color', () => action_fg_danger.val()),

      // SVG × icon
      tag.svg(
        trait.attr('width', '16'),
        trait.attr('height', '16'),
        trait.attr('viewBox', '0 0 16 16'),
        trait.attr('fill', 'none'),
        tag.path(
          trait.attr('d', 'M4 4l8 8M12 4l-8 8'),
          trait.attr('stroke', 'currentColor'),
          trait.attr('stroke-width', '2'),
          trait.attr('stroke-linecap', 'round'),
        ),
      ),

      trait.event('click', () => dispatch(deleteTodo(todo.id))),
    ),

    // Show delete on row hover via parent hover CSS trick (inline JS approach)
    trait.event('mouseenter', (e) => {
      const btn = (e?.currentTarget as HTMLElement)?.querySelector(
        'button:last-child',
      ) as HTMLElement;
      if (btn) btn.style.opacity = '1';
    }),
    trait.event('mouseleave', (e) => {
      const btn = (e?.currentTarget as HTMLElement)?.querySelector(
        'button:last-child',
      ) as HTMLElement;
      if (btn) btn.style.opacity = '0';
    }),
  );
}

// --- Filter Button ---
function FilterButton(f: Filter) {
  const label = f.charAt(0).toUpperCase() + f.slice(1);
  return tag.button(
    trait.text(label),
    trait.style('border', 'none'),
    trait.style('cursor', 'pointer'),
    trait.style('fontSize', type_size_sm.$val),
    trait.style('fontWeight', type_weight_medium.$val),
    trait.style('padding', () => `6px ${space_padding_md.val()}`, space_padding_md),
    trait.style('borderRadius', radius_size_full.$val),
    trait.style('transition', transition_fast.$val),
    trait.style('letterSpacing', '0.02em'),

    // Active filter styles
    trait.style('backgroundColor', nav_bg_active.$val, filter.$test(f)),
    trait.style('color', nav_fg_active.$val, filter.$test(f)),
    trait.style('boxShadow', shadow_box_sm.$val, filter.$test(f)),

    // Inactive filter styles
    trait.style(
      'backgroundColor',
      nav_bg_default.$val,
      filter.$test((v) => v !== f),
    ),
    trait.style(
      'color',
      nav_fg_default.$val,
      filter.$test((v) => v !== f),
    ),
    trait.style(
      'boxShadow',
      'none',
      filter.$test((v) => v !== f),
    ),

    trait.styleOnEvent('mouseenter', 'backgroundColor', () =>
      filter.val() === f ? nav_bg_active.val() : nav_bg_hover.val(),
    ),
    trait.styleOnEvent('mouseleave', 'backgroundColor', () =>
      filter.val() === f ? nav_bg_active.val() : nav_bg_default.val(),
    ),

    trait.event('click', $dispatch(setFilter(f))),
  );
}

// --- Theme Toggle Button ---
function ThemeToggle() {
  return tag.button(
    trait.style('background', 'none'),
    trait.style('border', 'none'),
    trait.style('cursor', 'pointer'),
    trait.style('padding', space_padding_sm.$val),
    trait.style('borderRadius', radius_size_full.$val),
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('transition', transition_fast.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('width', '36px'),
    trait.style('height', '36px'),
    trait.styleOnEvent('mouseenter', 'backgroundColor', () => surface_bg_tertiary.val()),
    trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),

    // Sun icon (shown in dark mode)
    tag.svg(
      trait.attr('width', '20'),
      trait.attr('height', '20'),
      trait.attr('viewBox', '0 0 24 24'),
      trait.attr('fill', 'none'),
      trait.style('display', 'none', theme.$test('light')),
      trait.style('display', 'block', theme.$test('dark')),
      tag.circle(
        trait.attr('cx', '12'),
        trait.attr('cy', '12'),
        trait.attr('r', '5'),
        trait.attr('stroke', 'currentColor'),
        trait.attr('stroke-width', '2'),
      ),
      tag.path(
        trait.attr(
          'd',
          'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
        ),
        trait.attr('stroke', 'currentColor'),
        trait.attr('stroke-width', '2'),
        trait.attr('stroke-linecap', 'round'),
      ),
    ),

    // Moon icon (shown in light mode)
    tag.svg(
      trait.attr('width', '20'),
      trait.attr('height', '20'),
      trait.attr('viewBox', '0 0 24 24'),
      trait.attr('fill', 'none'),
      trait.style('display', 'block', theme.$test('light')),
      trait.style('display', 'none', theme.$test('dark')),
      tag.path(
        trait.attr('d', 'M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z'),
        trait.attr('stroke', 'currentColor'),
        trait.attr('stroke-width', '2'),
        trait.attr('stroke-linecap', 'round'),
        trait.attr('stroke-linejoin', 'round'),
      ),
    ),

    trait.event('click', () => {
      theme.set(theme.val() === 'light' ? 'dark' : 'light');
    }),
  );
}

// --- Empty State ---
function EmptyState() {
  return tag.div(
    trait.style('textAlign', 'center'),
    trait.style('padding', space_padding_2xl.$val),
    trait.style('color', text_fg_muted.$val),

    // Empty icon
    tag.svg(
      trait.attr('width', '48'),
      trait.attr('height', '48'),
      trait.attr('viewBox', '0 0 24 24'),
      trait.attr('fill', 'none'),
      trait.style('margin', '0 auto 16px'),
      trait.style('opacity', '0.4'),
      tag.path(
        trait.attr(
          'd',
          'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2',
        ),
        trait.attr('stroke', 'currentColor'),
        trait.attr('stroke-width', '1.5'),
        trait.attr('stroke-linecap', 'round'),
      ),
      tag.rect(
        trait.attr('x', '9'),
        trait.attr('y', '3'),
        trait.attr('width', '6'),
        trait.attr('height', '4'),
        trait.attr('rx', '1'),
        trait.attr('stroke', 'currentColor'),
        trait.attr('stroke-width', '1.5'),
      ),
    ),

    tag.p(
      trait.text(() => {
        const f = filter.val();
        if (f === 'active') return 'All caught up!';
        if (f === 'completed') return 'Nothing completed yet';
        return 'What do you need to do?';
      }, filter),
      trait.style('fontSize', type_size_base.$val),
      trait.style('margin', '0 0 4px'),
      trait.style('fontWeight', type_weight_medium.$val),
      trait.style('color', text_fg_secondary.$val),
    ),
    tag.p(
      trait.text(() => {
        const f = filter.val();
        if (f === 'active') return 'No active tasks remaining.';
        if (f === 'completed') return 'Complete a task to see it here.';
        return 'Add a task above to get started.';
      }, filter),
      trait.style('fontSize', type_size_sm.$val),
      trait.style('margin', '0'),
      trait.style('color', text_fg_muted.$val),
    ),
  );
}

// --- Main App ---
export const app = tag.div(
  // Base (mobile) styles
  trait.style('maxWidth', '100%'),
  trait.style('margin', '0 auto'),
  trait.style('padding', space_padding_md.$val),
  trait.style('minHeight', '100vh'),
  trait.style('backgroundColor', surface_bg_primary.$val),
  trait.style('color', text_fg_primary.$val),
  trait.style(
    'fontFamily',
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
  ),
  trait.style('transition', transition_medium.$val),

  // Desktop overrides
  trait.style('maxWidth', '640px', isDesktop.$test(true)),
  trait.style('padding', space_padding_xl.$val, isDesktop.$test(true)),
  trait.style('minHeight', 'auto'),
  trait.style('paddingTop', '64px', isDesktop.$test(true)),

  // App container card
  tag.div(
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style('borderRadius', radius_size_lg.$val),
    trait.style('boxShadow', shadow_box_lg.$val),
    trait.style('overflow', 'hidden'),
    trait.style('border', () => `1px solid ${border_color_primary.val()}`, border_color_primary),
    trait.style('transition', transition_medium.$val),

    // Header
    tag.header(
      trait.style(
        'padding',
        () => `${space_padding_xl.val()} ${space_padding_lg.val()} ${space_padding_lg.val()}`,
        space_padding_xl,
        space_padding_lg,
      ),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'space-between'),

      tag.h1(
        trait.text('todos'),
        trait.style('margin', '0'),
        trait.style('fontSize', type_size_xl.$val),
        trait.style('fontWeight', type_weight_light.$val),
        trait.style('color', text_fg_accent.$val),
        trait.style('letterSpacing', '-1.5px'),
        trait.style('lineHeight', '1'),
      ),

      // Theme toggle
      ThemeToggle(),
    ),

    // Input area
    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('padding', () => `0 ${space_padding_lg.val()}`, space_padding_lg),
      trait.style('paddingBottom', space_padding_md.$val),
      trait.style('gap', space_gap_md.$val),

      // Toggle all button
      tag.button(
        trait.style('background', 'none'),
        trait.style('border', 'none'),
        trait.style('cursor', 'pointer'),
        trait.style('padding', space_padding_xs.$val),
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('transition', transition_fast.$val),

        // Visibility
        trait.style(
          'visibility',
          'visible',
          todos.$test((t) => t.length > 0),
        ),
        trait.style(
          'visibility',
          'hidden',
          todos.$test((t) => t.length === 0),
        ),

        tag.svg(
          trait.attr('width', '20'),
          trait.attr('height', '20'),
          trait.attr('viewBox', '0 0 24 24'),
          trait.attr('fill', 'none'),
          tag.path(
            trait.attr('d', 'M6 9l6 6 6-6'),
            trait.attr('stroke', 'currentColor'),
            trait.attr('stroke-width', '2'),
            trait.attr('stroke-linecap', 'round'),
            trait.attr('stroke-linejoin', 'round'),
          ),
        ),

        // Color state
        trait.style(
          'color',
          action_bg_primary.$val,
          todos.$test((t) => t.length > 0 && t.every((i) => i.completed)),
        ),
        trait.style(
          'color',
          text_fg_muted.$val,
          todos.$test((t) => t.length === 0 || !t.every((i) => i.completed)),
        ),

        trait.event('click', () => dispatch(toggleAll())),
      ),

      // New todo input
      tag.input(
        trait.attr('placeholder', 'What needs to be done?'),
        trait.style('flex', '1'),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('outline', 'none'),
        trait.style('fontSize', type_size_md.$val),
        trait.style('fontWeight', type_weight_regular.$val),
        trait.style(
          'padding',
          () => `${space_padding_sm.val()} ${space_padding_md.val()}`,
          space_padding_sm,
          space_padding_md,
        ),
        trait.style('backgroundColor', surface_bg_input.$val),
        trait.style('color', text_fg_primary.$val),
        trait.style('borderRadius', radius_size_md.$val),
        trait.style('transition', transition_fast.$val),
        trait.style('lineHeight', '1.5'),
        trait.inputValue(newTodoText.$val),
        trait.inputEvent('input', (val: string) => newTodoText.set(val)),
        trait.event('keydown', (e) => {
          if ((e as KeyboardEvent).key === KEYBOARD.ENTER) {
            dispatch(addTodo(newTodoText.val()));
            newTodoText.set('');
          }
        }),
      ),
    ),

    // Divider
    tag.div(
      trait.style('height', '1px'),
      trait.style('backgroundColor', border_color_secondary.$val),
      trait.style('margin', () => `0 ${space_padding_lg.val()}`, space_padding_lg),
    ),

    // Todo list
    tag.ul(
      trait.style('listStyle', 'none'),
      trait.style('margin', '0'),
      trait.style('padding', '0'),
      trait.innerHTML(
        () => {
          const items = filteredTodos();
          if (items.length === 0) return EmptyState();
          return items.map((todo) => TodoItem(todo));
        },
        todos,
        filter,
        editingId,
      ),
    ),

    // Footer
    tag.footer(
      trait.style('display', 'none'),
      trait.style(
        'display',
        'flex',
        todos.$test((t) => t.length > 0),
      ),
      trait.style('flexDirection', 'column'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_md.$val),
      trait.style(
        'padding',
        () => `${space_padding_md.val()} ${space_padding_lg.val()}`,
        space_padding_md,
        space_padding_lg,
      ),
      trait.style(
        'borderTop',
        () => `1px solid ${border_color_secondary.val()}`,
        border_color_secondary,
      ),

      // Desktop: row layout
      trait.style('flexDirection', 'row', isDesktop.$test(true)),
      trait.style('justifyContent', 'space-between', isDesktop.$test(true)),

      // Active items count
      tag.span(
        trait.text(() => activeCountText(), todos),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('color', text_fg_secondary.$val),
        trait.style('whiteSpace', 'nowrap'),
        trait.style('fontWeight', type_weight_regular.$val),
      ),

      // Filter buttons
      tag.div(
        trait.style('display', 'flex'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('flexWrap', 'wrap'),
        trait.style('justifyContent', 'center'),
        ...FILTER_OPTIONS.map((f) => FilterButton(f)),
      ),

      // Clear completed button
      tag.button(
        trait.text('Clear completed'),
        trait.style('border', 'none'),
        trait.style('background', 'none'),
        trait.style('cursor', 'pointer'),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('color', text_fg_secondary.$val),
        trait.style('padding', space_padding_xs.$val),
        trait.style('whiteSpace', 'nowrap'),
        trait.style('transition', transition_fast.$val),
        trait.style('borderRadius', radius_size_sm.$val),

        // Visibility based on completed todos
        trait.style(
          'visibility',
          'visible',
          todos.$test((t) => t.some((i) => i.completed)),
        ),
        trait.style(
          'visibility',
          'hidden',
          todos.$test((t) => !t.some((i) => i.completed)),
        ),

        trait.styleOnEvent('mouseenter', 'color', () => action_fg_danger.val()),
        trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),

        trait.event('click', () => dispatch(clearCompleted())),
      ),
    ),
  ),

  // Attribution footer
  tag.p(
    trait.text('Double-click to edit a todo'),
    trait.style('textAlign', 'center'),
    trait.style('fontSize', type_size_xs.$val),
    trait.style('color', text_fg_muted.$val),
    trait.style('marginTop', space_padding_lg.$val),
    trait.style('letterSpacing', '0.02em'),
  ),
);
