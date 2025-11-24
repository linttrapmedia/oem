import { State, Template } from '@/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useEventTrait } from '@/traits/Event';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useInputEvent } from '@/traits/InputEvent';
import { useInputValueTrait } from '@/traits/InputValue';
import { useStyleTrait } from '@/traits/Style';

const [tag, trait] = Template({
  event: useEventTrait,
  attr: useAttributeTrait,
  value: useInputValueTrait,
  input: useInputEvent,
  html: useInnerHTMLTrait,
  style: useStyleTrait,
});

type TodoType = {
  task: string;
  completed: boolean;
};

const todos = State<TodoType[]>([{ task: 'Learn OEM', completed: false }]);
const newTodo = State('');

const handlers = {
  addTodo: () => {
    if (newTodo.val().trim() === '') return;
    todos.set([...todos.val(), { task: newTodo.val().trim(), completed: false }]);
    newTodo.set('');
  },
  toggleTodo: (todo: TodoType) => {
    todos.set(
      todos.val().map((t) => (t.task === todo.task ? { ...t, completed: !t.completed } : t)),
    );
  },
  deleteTodo: (todo: TodoType) => {
    todos.set(todos.val().filter((t) => t.task !== todo.task));
  },
};

const view = tag.div(
  tag.form(
    trait.event('submit', (e) => e!.preventDefault()),
    tag.input(
      trait.attr('type', 'text'),
      trait.input('input', newTodo.set),
      trait.value(newTodo.val, newTodo),
    ),
    tag.button(trait.event('click', handlers.addTodo), 'Add'),
  ),
  tag.ul(
    trait.html(
      todos.$call('map', (todo: TodoType) =>
        tag.li(
          tag.span(
            trait.style('textDecoration', 'line-through', todo.completed),
            trait.style('textDecoration', 'none', !todo.completed),
            todo.task,
          ),
          tag.button(trait.event('click', handlers.toggleTodo.bind(null, todo)), 'Toggle'),
          tag.button(trait.event('click', handlers.deleteTodo.bind(null, todo)), 'Delete'),
        ),
      ),
    ),
  ),
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('single-file-todo-app')!;
  root.appendChild(view);
});
