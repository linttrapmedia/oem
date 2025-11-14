import { $fsm } from './fsm';
import state from './state';
import { tag, trait } from './template';
import { TodoType } from './types';

export default tag.div(
  trait.style('borderColor', 'black'),
  trait.style('borderWidth', '2px'),
  trait.style('borderStyle', 'solid'),
  trait.style('padding', '20px'),
  trait.style('boxSizing', 'border-box'),
  trait.html([
    tag.h2(trait.style('margin', '0'), 'Todo Example'),
    tag.form(
      trait.event('submit', (e) => e!.preventDefault()),
      trait.html([
        tag.input(
          trait.attr('id', 'new-todo'),
          trait.attr('type', 'text'),
          trait.attr('placeholder', 'New todo...'),
          trait.attr('autofocus', 'true'),
          trait.focus(state.newTodo.$test('')),
          trait.event('input', (e) => state.newTodo.set((e!.target as HTMLInputElement).value)),
          trait.value(state.newTodo.val, state.newTodo),
        ),
        tag.button(trait.event('click', $fsm('ADD')), 'Add'),
      ]),
    ),
    tag.ul(
      trait.style('listStyleType', 'none'),
      trait.style('padding', '0'),
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', '10px'),
      trait.style('maxWidth', '400px'),
      trait.html(
        state.todos.proto.$map((todo: TodoType) =>
          tag.li(
            trait.style('display', 'grid'),
            trait.style('gridTemplateColumns', 'auto min-content min-content'),
            trait.style('gap', '10px'),
            trait.style('alignItems', 'center'),
            trait.style('textDecoration', 'none', !todo.completed),
            trait.html([
              tag.span(trait.style('textDecoration', 'line-through', todo.completed), todo.title),
              tag.button(trait.event('click', $fsm('TOGGLE', todo)), 'Toggle'),
              tag.button(trait.event('click', $fsm('DELETE', todo)), 'Delete'),
            ]),
          ),
        ),
      ),
    ),
  ]),
);
