import { ROUTES, tags } from '@apps/oem.js.org/config';
import { Template } from '@core/framework/Template';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';
import { TodoExample } from './common/TodoExample';

export function ExamplesPage() {
  const { div } = tags;

  return Documentation({
    prev: ['Config', ROUTES.CONFIG],
    next: ['Contributing', ROUTES.CONTRIBUTING],
    content: Template.Fragment(
      Section({
        title: `Todo List`,
        content: div(['flex', 'column', 20])(
          TodoExample(),
          Snippet(`const TodoExample = () => {
  
  const dones = State.Array<string>([]);
  const todos = State.Array<string>(['Learn OEM']);

  const action = (type: 'ADD' | 'TODO' | 'DONE', item?: string) => () => {
    if (type === 'ADD') Input.value && todos.push(Input.value), (Input.value = '');
    if (type === 'TODO') dones.filter((i) => i !== item), todos.push(item);
    if (type === 'DONE') todos.filter((i) => i !== item), dones.push(item);
  };

  const { input, div } = Template.Html({
    on_todos_change: Trait.State(todos, Trait.InnerHtml),
    on_dones_change: Trait.State(dones, Trait.InnerHtml),
  });

  const Input = input(['attr', 'type', 'text'], ['attr', 'placeholder', 'Enter Something'])();

  const Content = () =>
    div(['flex', 'column', 20])(
      div(['flex', 'row', 20])(
        Input,
        input(['attr', 'type', 'button'], ['attr', 'value', 'add'], ['on_click', action('ADD')])(),
      ),
      div(
        ['flex', 'column', 20],
        ['style', 'cursor', 'pointer'],
        ['style', 'display', 'none', todos.get().length === 0],
      )(...todos.get().map((i) => div(['on_click', action('DONE', i)])(i))),
      div(
        ['flex', 'column', 20],
        ['style', 'textDecoration', 'line-through'],
        ['style', 'cursor', 'pointer'],
        ['style', 'display', 'none', dones.get().length === 0],
      )(...dones.get().map((i) => div(['on_click', action('TODO', i)])(i))),
    );

  return div(['on_todos_change', Content], ['on_dones_change', Content])(Content());
};`),
        ),
      }),
    ),
  });
}
