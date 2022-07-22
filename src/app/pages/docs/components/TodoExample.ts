import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

type TodoItem = { item: string; completed: boolean };

export const TodoExample = () => {
  // Params

  const new_todo = State.Atom<TodoItem>(null);
  const todos = State.Atom<TodoItem[]>([{ item: 'Learn OEM', completed: false }]);

  // Template

  const html = Template.Html({
    attr_on_newtodo_update: Trait.Atom(new_todo, Trait.Attr),
    attr: Trait.Attr,
    focus_on_todos_update: Trait.Atom(new_todo, Trait.Focus),
    innerhtml_on_todos_update: Trait.Atom(todos, Trait.InnerHtml),
    on_click: Trait.OnClick,
    on_text_input: Trait.OnTextInput,
    on_submit: Trait.OnSubmit,
    style: Trait.Style,
    value_on_newtodo_update: Trait.Atom(new_todo, Trait.Value),
  });

  // Handlers

  const toggleCompleted = (item: TodoItem) =>
    todos.set(todos.get().map((i) => (i.item === item.item ? { ...i, completed: !i.completed } : i)));
  const addNewTodoItem = () => (todos.set([...todos.get(), new_todo.get()]), new_todo.set(null));

  // Elements

  const InputField = html(
    'input',
    ['attr', 'type', 'text'],
    ['attr', 'placeholder', 'Enter Something'],
    ['focus_on_todos_update', () => new_todo.get() === null],
    ['on_text_input', (item: string) => new_todo.set({ item, completed: false })],
    ['value_on_newtodo_update', () => (new_todo.get() === null ? '' : new_todo.get().item)],
  );

  const AddButton = html(
    'input',
    ['attr', 'type', 'button'],
    ['attr', 'value', 'add'],
    ['attr', 'disabled', 'false', () => new_todo.get() === null],
    ['attr_on_newtodo_update', 'disabled', 'true', () => new_todo.get() === null || new_todo.get().item === ''],
    ['on_click', addNewTodoItem],
    ['style', 'cursor', 'pointer'],
    ['style', 'marginLeft', '10px'],
  );

  const TodoItems = () =>
    todos
      .get()
      .sort((a: TodoItem, b: TodoItem) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1))
      .map((i: TodoItem, index: number) =>
        html(
          'li',
          ['on_click', () => toggleCompleted(i)],
          ['style', 'cursor', 'pointer'],
          ['style', 'textDecoration', 'line-through', () => i.completed],
          ['style', 'textDecoration', 'normal', () => !i.completed],
          ['style', 'opacity', 0.35, () => i.completed],
          ['style', 'opacity', 1, () => !i.completed],
          ['style', 'padding', '5px'],
          ['style', 'borderBottom', `1px solid ${Theme.Color('black', 0, 0.1)}`],
        )(i.item),
      );

  const TodoList = html(
    'ul',
    ['innerhtml_on_todos_update', TodoItems],
    ['style', 'listStyle', 'none'],
    ['style', 'padding', '10px'],
  );

  const Form = html('form', ['on_submit', addNewTodoItem]);

  // HTML

  return Form(InputField(), AddButton(), TodoList(...TodoItems()));
};
