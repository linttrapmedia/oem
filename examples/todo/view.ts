import { $fsm } from './fsm';
import state from './state';
import { tmpl } from './template';
import { TodoType } from './types';

export default tmpl.div()(
  tmpl.h2()('Todo Example'),
  tmpl.form(['event', 'submit', (e) => e!.preventDefault()])(
    tmpl.input(
      ['attr', 'id', 'new-todo'],
      ['attr', 'type', 'text'],
      ['attr', 'placeholder', 'New todo...'],
      ['event', 'input', (e) => state.newTodo.set((e!.target as HTMLInputElement).value)],
      ['value', state.newTodo.val, 1, state.newTodo],
      ['focus', state.newTodo.$test(''), state.newTodo],
    )(),
    tmpl.button(['event', 'click', $fsm({ type: 'ADD' })])('Add'),
  ),
  tmpl.ul(
    ['style', 'listStyleType', 'none'],
    ['style', 'padding', 0],
    [
      'map',
      state.todos.val,
      (todo: TodoType, i: number) =>
        tmpl.li(
          ['attr', 'key', i],
          ['style', 'display', 'flex'],
          ['style', 'gap', '10px'],
          ['style', 'alignItems', 'center'],
        )(
          tmpl.span(
            ['style', 'textDecoration', 'line-through', todo.completed],
            ['style', 'textDecoration', 'none', !todo.completed],
          )(todo.title),
          tmpl.button(['event', 'click', $fsm({ type: 'TOGGLE', todo })])('Toggle'),
          tmpl.button(['event', 'click', $fsm({ type: 'DELETE', todo })])('Delete'),
        ),
      1,
      state.todos,
    ],
  )(),
);
