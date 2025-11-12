import { $fsm } from './fsm';
import state from './state';
import { tmpl } from './template';

const TodoItem = () =>
  state.todos
    .val()
    .map((todo) =>
      tmpl.li(['style', 'display', 'flex'], ['style', 'gap', '10px'], ['style', 'alignItems', 'center'])(
        tmpl.span(
          ['style', 'textDecoration', 'line-through', todo.completed],
          ['style', 'textDecoration', 'none', !todo.completed],
        )(todo.title),
        tmpl.button(['event', 'click', $fsm({ type: 'TOGGLE', todo })])('Toggle'),
        tmpl.button(['event', 'click', $fsm({ type: 'DELETE', todo })])('Delete'),
      ),
    );

export default tmpl.div(
  ['style', 'borderColor', 'black'],
  ['style', 'borderWidth', '2px'],
  ['style', 'borderStyle', 'solid'],
  ['style', 'padding', '20px'],
)(
  tmpl.h2(['style', 'margin', 0])('Todo Example'),
  tmpl.form(['event', 'submit', (e) => e!.preventDefault()])(
    tmpl.input(
      ['attr', 'id', 'new-todo'],
      ['attr', 'type', 'text'],
      ['attr', 'placeholder', 'New todo...'],
      ['attr', 'autofocus', 'true'],
      ['attr', 'data-jeromy', state.newTodo.$val],
      ['event', 'input', (e) => state.newTodo.set((e!.target as HTMLInputElement).value)],
      ['value', state.newTodo.val, 1, state.newTodo],
      ['focus', state.newTodo.$test(''), state.newTodo],
    )(),
    tmpl.button(['event', 'click', $fsm({ type: 'ADD' })])('Add'),
  ),
  tmpl.ul(['style', 'listStyleType', 'none'], ['style', 'padding', 0], ['html', TodoItem, 1, state.todos])(),
);
