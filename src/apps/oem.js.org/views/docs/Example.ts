import { Template } from '@core/framework/Template';
import { ROUTES } from '../../context';
import { Documentation } from '../common/Documentation';
import { Section } from '../common/Section';
import { Snippet } from '../common/Snippet';
import { TodoExample } from '../common/TodoExample';

export function ExampleView() {
  return Documentation({
    prev: ['Concepts', ROUTES.CONCEPTS],
    next: ['Html', ROUTES.HTML],
    content: Template.Fragment(
      Section({
        title: `A Todo List Example`,
        subtitle: `Here's a basic Todo list which implements: adding a new todo, marking a todo as done/not-done, sorting and styling in ~50 LOC.`,
        content: TodoExample(),
      }),
      Section({
        title: 'Source',
        content: Snippet(`
const TodoExample = () => {
  
  // State
  const todos = State.Atom<string[]>(['Learn OEM'])
  const dones = State.Atom<string[]>([])

  // Actions
  const addTodo = (item: string) => todos.set([...todos.get(), item])
  const removeTodo = (item: string) => todos.set(todos.get().filter(i => i !== item))
  const addDone = (item: string) => dones.set([...dones.get(), item])
  const removeDone = (item: string) => dones.set(dones.get().filter(i => i !== item))
  const setInput = (val: string = '') => (Input.value = val)

  // State Machine
  const action = (type: 'ADD' | 'TODO' | 'DONE', item?: string) => () => {
    if (type === 'ADD') addTodo(Input.value), setInput()
    if (type === 'TODO') removeDone(item), addTodo(item)
    if (type === 'DONE') removeTodo(item), addDone(item)
  }

  // Template
  const { input, div } = Template.Html({
    attr: Trait.Attr,
    flex: Trait.Flex,
    on_click: Trait.OnClick,
    on_todos_change: Trait.Atom(todos, Trait.InnerHtml),
    on_dones_change: Trait.Atom(dones, Trait.InnerHtml),
    style: Trait.Style,
  })

  // Html
  const Input = input(
    ['attr', 'type', 'text'],
    ['attr', 'placeholder', 'Enter Something'],
  )() as HTMLInputElement

  const Content = () =>
    div(['flex', 'column', 20])(
      div(['flex', 'row', 20])(
        Input,
        input(['attr', 'type', 'button'], ['attr', 'value', 'add'], ['on_click', action('ADD')])(),
      ),
      div(
        ['flex', 'column', 20],
        ['style', 'display', 'none', todos.get().length === 0],
      )(...todos.get().map(i => div(['on_click', action('DONE', i)])(i))),
      div(
        ['flex', 'column', 20],
        ['style', 'textDecoration', 'line-through'],
        ['style', 'display', 'none', dones.get().length === 0],
      )(...dones.get().map(i => div(['on_click', action('TODO', i)])(i))),
    )

  return div(['on_todos_change', Content], ['on_dones_change', Content])(Content())
}`),
      }),
    ),
  });
}
