import { TodoType, todoItemHovered } from '../state/todo_state';
import { html } from '../template';

const TodoListItem = (todo: TodoType) => {
  const isHovered = () => todoItemHovered.get()?.title === todo.title || todo.completed;
  const isNotHovered = () => todoItemHovered.get()?.title !== todo.title && !todo.completed;
  const onMouseOver = () => todoItemHovered.set(todo);
  const onMouseOut = () => todoItemHovered.set(undefined);
  const isCompleted = () => todo.completed;
  const isNotCompleted = () => !todo.completed;

  return html.div(
    ['style:mobile', 'cursor', 'pointer'],
    ['style:mobile', 'display', 'flex'],
    ['style:mobile', 'alignItems', 'center'],
    ['style:mobile', 'gap', '10px'],
    ['style:mobile', 'justifyContent', 'space-between'],
    ['todo__item:ontoggle', todo],
    ['todo__item:onmouseover', onMouseOver],
    ['todo__item:onmouseout', onMouseOut],
  )(
    html.div(
      ['style:mobile', 'display', 'flex'],
      ['style:mobile', 'alignItems', 'center'],
      ['style:mobile', 'gap', '10px'],
      ['style:mobile', 'flexDirection', 'row'],
      ['style:mobile', 'justifyContent', 'space-between'],
      ['style:mobile', 'flex', '1'],
    )(
      html.div(
        ['style:mobile', 'display', 'flex'],
        ['style:mobile', 'alignItems', 'center'],
        ['style:mobile', 'gap', '10px'],
      )(
        html.div(
          ['style:mobile', 'width', '15px'],
          ['style:mobile', 'height', '15px'],
          ['style:mobile', 'backgroundColor', 'black'],
          ['style:mobile', 'color', 'white', isCompleted],
          ['style:mobile', 'color', 'gray', isNotCompleted],
          ['style:mobile', 'padding', '5px'],
          ['todo__item:text', '✔', isHovered],
          ['todo__item:text', '', isNotHovered],
        )(),
        html.span(
          ['style:mobile', 'color', 'green', isCompleted],
          ['style:mobile', 'color', 'gray', isNotCompleted],
          ['style:mobile', 'textDecoration', 'line-through', isCompleted],
          ['style:mobile', 'textDecoration', 'none', isNotCompleted],
        )(todo.title),
      ),
      html.button(
        ['style:mobile', 'backgroundColor', 'black'],
        ['style:mobile', 'border', 'none'],
        ['style:mobile', 'color', 'white'],
        ['style:mobile', 'cursor', 'pointer'],
        ['style:mobile', 'fontSize', '14px'],
        ['style:mobile', 'marginBlockEnd', 'end'],
        ['style:mobile', 'padding', '5px 10px'],
        ['style:mouseout', 'backgroundColor', 'black'],
        ['style:mouseover', 'backgroundColor', '#999999'],
        ['todo__item:ondelete', todo],
      )('delete'),
    ),
  );
};

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
    'todo__list:html',
    (todos) =>
      todos
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => Number(a.completed) - Number(b.completed))
        .map(TodoListItem),
  ],
)();
