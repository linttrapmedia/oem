import { Template } from '@core/framework/Template';
import { ROUTES, tags } from '../../context';
import { Documentation } from '../common/Documentation';
import { Section } from '../common/Section';
import { Snippet } from '../common/Snippet';
import { TodoExample } from '../common/TodoExample';
const { div } = tags;

export function ConceptsView() {
  return Documentation({
    prev: ['Overview', ROUTES.OVERVIEW],
    next: ['Html', ROUTES.HTML],
    content: div(['flex', 'column', 40])(
      Section({
        title: 'Concepts',
        subtitle: `The core concept of OEM is that you can create your own HTML and give it superpowers`,
        content: Template.Markdown(
          `When compared to other UI libraries, OEM takes a fundamentally different approach for generating html, managing state and creating components. There is no central dom or templating engine. Instead there is a factory function (called \`Template\`) that is used to *declare your own HTML* in scope. While declaring a template, you add behaviors called *Traits*. A trait is a function you map onto a template instance in order to *add* behaviors such as reactivity and styling. This turns out to be a powerful abstraction because it can produce formulaic code that remains easy to read, change, test, extend at scale.`,
        ),
      }),
      Section({
        title: 'Rendering Html',
        subtitle: `Create an template instance, use the returned tag functions to render dom elements`,
        description: `By default a template can only output html tags (no attributes, styles, behaviors, etc.)`,
        content: Snippet(`const { div } = Template.Html();\ndiv('Hello World')`, 'typescript'),
      }),
      Section({
        title: 'Adding Styling & Behavior',
        subtitle: `You then add behaviors to the template by mapping "traits". In this example we add styling to the templating engine.`,
        description: `Here we map the \`Trait.Style\` trait which will enable inline css.`,
        content: Snippet(
          `const { div } = Template.Html({  style: Trait.Style });
div(['style', 'fontWeight', 'bold'])('Hello World')`,
        ),
      }),
      Section({
        title: 'Managing State',
        subtitle: `Lastly, we control State with "Atoms", which are simple but powerful event buses.`,
        description: `Atoms are miniature event buses. We can use the Atom trait to map it to our template and listen for changes, reacting just like you would in a virtual dom.`,
        content: Snippet(`const text = State.Atom('Hi');
text.sub(console.log);  // subscribe to text changes`),
      }),
      Section({
        title: `All Together`,
        subtitle: `Here's a basic Todo list which implements: adding a new todo, marking a todo as done/not-done, sorting and styling in ~50 LOC.`,
        content: TodoExample(),
      }),
      Section({
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
    on_todos_change: Trait.State(todos, Trait.InnerHtml),
    on_dones_change: Trait.State(dones, Trait.InnerHtml),
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
