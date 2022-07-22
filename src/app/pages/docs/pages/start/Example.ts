import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';
import { TodoExample } from '../../components/TodoExample';

export const Example = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')(
    Section({
      title: `Example Todo`,
      subtitle: `Type in a todo and press enter to add it to the list`,
      content: TodoExample(),
      sourceLink: {
        text: 'source',
        href: 'https://github.com/linttrapmedia/oem/blob/main/src/app/docs/elements/TodoExample.ts',
      },
    }),
    Section({
      title: `Source Code`,
      subtitle: `This is just the raw code, there's no "framework", no dependencies, no virtual dom, no css, etc.`,
      description: `**Note: This example does not include the use of the Design System** and is still only around ~85 LOC. Try writing this same functionality in [another ui "library"](https://todomvc.com/) and you'll see.`,
      content: Snippet(
        `import { Theme } from '@core/framework/Style';
import { Template } from '@core/framework/Template';
import { State } from '@core/framework/State';

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
          ['style', 'borderBottom', \`1px dotted \${Theme.Color('black', 0, 0.2)}\`, () => index !== todos.get().length - 1],
        )(i.item),
      );

  const TodoList = html(
    'ul',
    ['innerhtml_on_todos_update', TodoItems],
    ['style', 'fontSize', '12px'],
    ['style', 'listStyle', 'none'],
    ['style', 'padding', '10px'],
    ['style', 'border', \`1px solid \${Theme.Color('black', 0, 0.25)}\`],
  );

  const Form = html('form', ['on_submit', addNewTodoItem]);

  // HTML

  return Form(InputField(), AddButton(), TodoList(...TodoItems()));
};
      `,
        700,
        'typescript',
      ),
    }),
    Section({
      content: box()(
        html(
          'a',
          ['attr', 'href', '/docs/?p=templating'],
          ['style', 'textDecoration', 'none'],
          ['style', 'color', Theme.Color('white')],
          ['style', 'backgroundColor', Theme.Color('black')],
          ['style', 'padding', '20px'],
          ['style', 'margin', '20px'],
          ['style', 'borderRadius', '10px'],
        )('Learn The Framework 👉'),
      ),
    }),
    FooterNav({ prev: 'concepts', prevText: 'Concepts', next: 'templating', nextText: 'Master The Framework' }),
  );
};
