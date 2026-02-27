import { addTodo, clearCompleted, deleteTodo, setFilter, setInput, toggleTodo } from './actions';
import { activeCount, filteredTodos, hasCompleted, machine } from './machine';
import { tag, trait } from './templates';
import { theme } from './theme';
import type { FilterType, TodoItem } from './types';

// ─── Todo Item Row ───────────────────────────────────────────────────────────

function TodoRow(todo: TodoItem) {
  return tag.li(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', theme.$sem_spc_inline_md),
    trait.style('padding', theme.$sem_spc_inset_sm),
    trait.style('borderBottom', () => `${theme.cmp_div_wdt()} solid ${theme.cmp_div_color()}`),
    trait.styleOnEvent('mouseenter', 'backgroundColor', theme.$sem_color_bkg_ter),
    trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),

    // Checkbox
    tag.input(
      trait.attr('type', 'checkbox'),
      trait.attr('checked', todo.completed ? 'true' : undefined),
      trait.style('width', theme.$cmp_chk_siz_md),
      trait.style('height', theme.$cmp_chk_siz_md),
      trait.style('accentColor', theme.$sem_color_interactive_pri),
      trait.style('cursor', 'pointer'),
      trait.style('flexShrink', '0'),
      trait.event('change', () => machine.dispatch(toggleTodo(todo.id))),
    ),

    // Text
    tag.span(
      trait.style('flex', '1'),
      trait.style('fontSize', theme.$sem_typo_body_md_siz),
      trait.style('lineHeight', () => String(theme.sem_typo_body_md_lnh())),
      trait.style('color', todo.completed ? theme.$sem_color_txt_ter : theme.$sem_color_txt_pri),
      trait.style('textDecoration', todo.completed ? 'line-through' : 'none'),
      trait.text(todo.text),
    ),

    // Delete button
    tag.button(
      trait.style('background', 'none'),
      trait.style('border', 'none'),
      trait.style('cursor', 'pointer'),
      trait.style('padding', theme.$sem_spc_inset_xs),
      trait.style('color', theme.$sem_color_txt_ter),
      trait.style('fontSize', theme.$sem_typo_body_md_siz),
      trait.style('lineHeight', '1'),
      trait.style('borderRadius', theme.$sem_rad_sm),
      trait.styleOnEvent('mouseenter', 'color', theme.$sem_color_state_err),
      trait.styleOnEvent('mouseleave', 'color', theme.$sem_color_txt_ter),
      trait.event('click', () => machine.dispatch(deleteTodo(todo.id))),
      trait.text('x'),
    ),
  );
}

// ─── Filter Button ───────────────────────────────────────────────────────────

function FilterButton(label: string, filter: FilterType) {
  return tag.button(
    trait.style('background', 'none'),
    trait.style(
      'border',
      () => {
        const isActive = machine.val().filter === filter;
        return isActive
          ? `${theme.cmp_btn_bdr_wdt()} solid ${theme.sem_color_interactive_pri()}`
          : `${theme.cmp_btn_bdr_wdt()} solid transparent`;
      },
      machine,
    ),
    trait.style(
      'color',
      () =>
        machine.val().filter === filter
          ? theme.sem_color_interactive_pri()
          : theme.sem_color_txt_sec(),
      machine,
    ),
    trait.style('cursor', 'pointer'),
    trait.style('padding', () => `${theme.sem_spc_inset_xs()} ${theme.sem_spc_inset_sm()}`),
    trait.style('borderRadius', theme.$cmp_btn_bdr_rad),
    trait.style('fontSize', theme.$cmp_btn_fnt_siz_sm),
    trait.style('fontWeight', () => String(theme.cmp_btn_fnt_wgt())),
    trait.styleOnEvent('mouseenter', 'backgroundColor', theme.$sem_color_bkg_ter),
    trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),
    trait.event('click', () => machine.dispatch(setFilter(filter))),
    trait.text(label),
  );
}

// ─── App Shell ───────────────────────────────────────────────────────────────

export function App() {
  return tag.div(
    // Page background
    trait.style('minHeight', '100vh'),
    trait.style('backgroundColor', theme.$sem_color_bkg_pri),
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('alignItems', 'center'),
    trait.style('paddingTop', theme.$sem_spc_stack_2xl),
    trait.style('paddingInline', theme.$sem_spc_inset_md),
    trait.style('fontFamily', 'system-ui, sans-serif'),

    // Header
    tag.h1(
      trait.style('fontSize', theme.$sem_typo_heading_xl_siz),
      trait.style('fontWeight', () => String(theme.sem_typo_heading_xl_wgt())),
      trait.style('lineHeight', () => String(theme.sem_typo_heading_xl_lnh())),
      trait.style('color', theme.$sem_color_txt_pri),
      trait.style('marginBottom', theme.$sem_spc_stack_lg),
      trait.style('letterSpacing', '-0.02em'),
      trait.text('todos'),
    ),

    // Card
    tag.div(
      trait.style('width', '100%'),
      trait.style('maxWidth', '480px'),
      trait.style('backgroundColor', theme.$cmp_cdl_bkg),
      trait.style('borderRadius', theme.$cmp_cdl_bdr_rad),
      trait.style('boxShadow', theme.$cmp_cdl_shd),
      trait.style('overflow', 'hidden'),

      // Input row
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', theme.$sem_spc_inline_sm),
        trait.style('padding', theme.$cmp_cdl_header_pad),
        trait.style('borderBottom', () => `${theme.cmp_div_wdt()} solid ${theme.cmp_div_color()}`),

        // Input
        tag.input(
          trait.attr('type', 'text'),
          trait.attr('placeholder', 'What needs to be done?'),
          trait.style('flex', '1'),
          trait.style('height', theme.$cmp_inp_hgt_md),
          trait.style('paddingInline', theme.$cmp_inp_pad_x_md),
          trait.style('backgroundColor', theme.$cmp_inp_bkg),
          trait.style('color', theme.$cmp_inp_txt_color),
          trait.style(
            'border',
            () => `${theme.cmp_inp_bdr_wdt()} solid ${theme.cmp_inp_bdr_color()}`,
          ),
          trait.style('borderRadius', theme.$cmp_inp_bdr_rad),
          trait.style('fontSize', theme.$cmp_inp_fnt_siz_md),
          trait.style('outline', 'none'),
          trait.style('boxSizing', 'border-box'),
          trait.styleOnEvent('focus', 'borderColor', theme.$cmp_inp_bdr_color_foc),
          trait.styleOnEvent('blur', 'borderColor', theme.$cmp_inp_bdr_color),
          trait.inputValue(() => machine.val().inputText, machine),
          trait.inputEvent('input', (val) => machine.dispatch(setInput(val))),
          trait.event('keydown', (e) => {
            if ((e as KeyboardEvent).key === 'Enter') machine.dispatch(addTodo());
          }),
        ),

        // Add button
        tag.button(
          trait.style('height', theme.$cmp_btn_hgt_md),
          trait.style('paddingInline', theme.$cmp_btn_pad_x_md),
          trait.style('backgroundColor', theme.$cmp_btn_pri_bkg),
          trait.style('color', theme.$cmp_btn_pri_txt_color),
          trait.style(
            'border',
            () => `${theme.cmp_btn_bdr_wdt()} solid ${theme.cmp_btn_pri_bdr_color()}`,
          ),
          trait.style('borderRadius', theme.$cmp_btn_bdr_rad),
          trait.style('fontSize', theme.$cmp_btn_fnt_siz_md),
          trait.style('fontWeight', () => String(theme.cmp_btn_fnt_wgt())),
          trait.style('cursor', 'pointer'),
          trait.style('flexShrink', '0'),
          trait.style(
            'transition',
            () => `background-color ${theme.cmp_btn_trn_dur()} ${theme.cmp_btn_trn_eas()}`,
          ),
          trait.styleOnEvent('mouseenter', 'backgroundColor', theme.$cmp_btn_pri_bkg_hov),
          trait.styleOnEvent('mouseleave', 'backgroundColor', theme.$cmp_btn_pri_bkg),
          trait.event('click', () => machine.dispatch(addTodo())),
          trait.text('Add'),
        ),
      ),

      // Todo list
      tag.ul(
        trait.style('listStyle', 'none'),
        trait.style('margin', '0'),
        trait.style('padding', '0'),
        trait.html(() => {
          const todos = filteredTodos();
          if (todos.length === 0) {
            return tag.li(
              trait.style('padding', theme.$cmp_cdl_body_pad),
              trait.style('textAlign', 'center'),
              trait.style('color', theme.$sem_color_txt_ter),
              trait.style('fontSize', theme.$sem_typo_body_sm_siz),
              trait.text('No tasks here.'),
            );
          }
          return todos.map(TodoRow);
        }, machine),
      ),

      // Footer
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('justifyContent', 'space-between'),
        trait.style('padding', () => `${theme.sem_spc_inset_xs()} ${theme.sem_spc_inset_md()}`),
        trait.style('borderTop', () => `${theme.cmp_div_wdt()} solid ${theme.cmp_div_color()}`),

        // Count
        tag.span(
          trait.style('fontSize', theme.$sem_typo_body_sm_siz),
          trait.style('color', theme.$sem_color_txt_sec),
          trait.text(() => {
            const count = activeCount();
            return `${count} item${count !== 1 ? 's' : ''} left`;
          }, machine),
        ),

        // Filter buttons
        tag.div(
          trait.style('display', 'flex'),
          trait.style('gap', theme.$sem_spc_inline_xs),
          FilterButton('All', 'all'),
          FilterButton('Active', 'active'),
          FilterButton('Completed', 'completed'),
        ),

        // Clear completed button
        tag.button(
          trait.style('background', 'none'),
          trait.style('border', 'none'),
          trait.style('cursor', 'pointer'),
          trait.style('padding', () => `${theme.sem_spc_inset_xs()} ${theme.sem_spc_inset_sm()}`),
          trait.style('borderRadius', theme.$cmp_btn_bdr_rad),
          trait.style('fontSize', theme.$sem_typo_body_sm_siz),
          trait.style('color', theme.$sem_color_txt_sec),
          trait.style('opacity', () => (hasCompleted() ? '1' : '0'), machine),
          trait.style('pointerEvents', () => (hasCompleted() ? 'auto' : 'none'), machine),
          trait.styleOnEvent('mouseenter', 'color', theme.$sem_color_txt_pri),
          trait.styleOnEvent('mouseleave', 'color', theme.$sem_color_txt_sec),
          trait.event('click', () => machine.dispatch(clearCompleted())),
          trait.text('Clear completed'),
        ),
      ),
    ),

    // Theme toggle
    tag.div(
      trait.style('marginTop', theme.$sem_spc_stack_md),

      tag.button(
        trait.style('background', 'none'),
        trait.style(
          'border',
          () => `${theme.cmp_btn_bdr_wdt()} solid ${theme.sem_color_bdr_default()}`,
        ),
        trait.style('borderRadius', theme.$cmp_btn_bdr_rad),
        trait.style('cursor', 'pointer'),
        trait.style('padding', () => `${theme.sem_spc_inset_xs()} ${theme.sem_spc_inset_md()}`),
        trait.style('fontSize', theme.$sem_typo_body_sm_siz),
        trait.style('color', theme.$sem_color_txt_sec),
        trait.styleOnEvent('mouseenter', 'backgroundColor', theme.$sem_color_bkg_sec),
        trait.styleOnEvent('mouseleave', 'backgroundColor', 'transparent'),
        trait.event('click', () => {
          theme.setTheme(theme.getTheme() === 'dark' ? 'light' : 'dark');
        }),
        trait.text(() => `Theme: ${theme.getTheme()}`, theme),
      ),
    ),
  );
}
