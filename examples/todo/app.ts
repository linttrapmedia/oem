import { Template } from '@/oem';
import { useInputEventTrait } from '@/registry';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';
import { useFocusTrait } from '@/traits/Focus';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useInputValueTrait } from '@/traits/InputValue';
import { useStyleTrait } from '@/traits/Style';
import { storage, TodoType } from 'examples/todo/storage';
import { $fsm, fsm } from './state';

const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
  attr: useAttributeTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
  input: useInputEventTrait,
  html: useInnerHTMLTrait,
});

const view = tag.div(
  trait.style('borderColor', 'black'),
  trait.style('borderWidth', '2px'),
  trait.style('borderStyle', 'solid'),
  trait.style('padding', '20px'),
  tag.form(
    trait.event('submit', (e) => e!.preventDefault()),
    tag.input(
      trait.attr('id', 'new-todo'),
      trait.attr('type', 'text'),
      trait.attr('placeholder', 'New todo...'),
      trait.attr('autofocus', 'true'),
      trait.focus(storage.data.newTodo.$test('')),
      trait.input('input', storage.data.newTodo.set),
      trait.value(storage.data.newTodo.val, storage.data.newTodo),
    ),
    tag.button(trait.event('click', $fsm('ADD')), 'Add'),
  ),
  tag.ul(
    trait.style('listStyleType', 'none'),
    trait.style('padding', '0'),
    trait.html(
      storage.data.todos.$call('map', (todo: TodoType) =>
        tag.li(
          trait.style('display', 'grid'),
          trait.style('gridTemplateColumns', 'auto min-content min-content'),
          tag.span(trait.style('textDecoration', 'line-through', todo.completed), todo.title),
          tag.button(trait.event('click', $fsm('TOGGLE', todo)), 'Toggle'),
          tag.button(trait.event('click', $fsm('DELETE', todo)), 'Delete'),
        ),
      ),
    ),
  ),
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('todo-app')!;
  root.appendChild(view);
  fsm('INIT');
});
