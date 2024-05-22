import { TodoType } from '../state';
import { html } from '../template';

const TodoListItem = (todo: TodoType) =>
  html.div(
    ['style:mobile', 'cursor', 'pointer'],
    ['style:mobile', 'display', 'flex'],
    ['style:mobile', 'alignItems', 'center'],
    ['style:mobile', 'gap', '10px'],
    ['style:mobile', 'justifyContent', 'space-between'],
    ['todo:item:toggle', todo],
  )(
    html.div(
      ['style:mobile', 'display', 'flex'],
      ['style:mobile', 'alignItems', 'center'],
      ['style:mobile', 'gap', '10px'],
    )(
      html.span(['text', '⬜️', () => !todo.completed], ['text', '✅', () => todo.completed])(),
      html.span(
        ['style:mobile', 'textDecoration', 'line-through', () => todo.completed],
        ['style:mobile', 'textDecoration', 'none', () => !todo.completed],
      )(todo.title),
    ),
    html.button(
      ['style:mobile', 'border', '1px solid #AAA'],
      ['style:mobile', 'backgroundColor', 'transparent'],
      ['style:mobile', 'color', '#AAA'],
      ['style:mobile', 'cursor', 'pointer'],
      ['style:mobile', 'marginBlockEnd', 'end'],
      ['style:mouseover', 'backgroundColor', '#d2d2d2'],
      ['style:mouseout', 'backgroundColor', 'transparent'],
      ['todo:item:delete', todo],
    )('x'),
  );

export const TodoList = html.div(
  ['style:mobile', 'border', '1px solid lightgray'],
  ['style:mobile', 'borderRadius', '5px'],
  ['style:mobile', 'boxSizing', 'border-box'],
  ['style:mobile', 'padding', '20px'],
  ['style:mobile', 'maxWidth', '400px'],
  ['style:mobile', 'width', '100%'],
  ['style:mobile', 'display', 'flex'],
  ['style:mobile', 'flexDirection', 'column'],
  ['style:mobile', 'gap', '10px'],
  [
    'todo:innerHTML',
    (todos) =>
      todos
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => Number(a.completed) - Number(b.completed))
        .map(TodoListItem),
  ],
)();
