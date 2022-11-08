import { Template } from '@core/framework/Template';
import { ROUTES, tags } from '../../config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';

const { div } = tags;

export function HtmlView() {
  return Documentation({
    prev: ['Concepts', ROUTES.CONCEPTS],
    next: ['State', ROUTES.STATE_MANAGEMENT],
    content: div(['flex', 'column', 40])(
      Section({
        title: 'Html',
        subtitle: `The core features and behavior of the template html come from the traits you add to it. This allows you to create your own domain specific language. `,
        content: Template.Markdown(
          `The Template engine is unique in that its behaviors are not universal. By declaring its properties and behaviors in a given config you are able specify varying degrees of abstraction for anything you can think of such as custom attributes, styling, event listeners, responsive behaviors, logging, etc. It also makes it incredibly easy to share functionality and behavior between templates, components, elements, functions and more.`,
        ),
      }),

      Section({
        title: 'Traits',
        subtitle: 'You can create your own traits or use one of the many that ship with the framework.',
        description:
          'The syntax and structure of traits have been carefully crafted to keep a balance between readability, composability, troubleshooting, intellisense features and the power of declarative code.',
        content: div(['flex', 'column', 10, 'start', 'start'])(
          ...[
            ['Attr', 'Adds an attribute to a dom element.'],
            ['Event', 'Binds a callback to a dom event.'],
            ['Flex', 'Add flexbox styles on one line'],
            ['Focus', 'Listens for focus events on a dom element.'],
            ['InnerHtml', 'Replaces html content of a dom element.'],
            ['InnerText', 'Replaces text content of a dom element.'],
            ['OnChange', 'Listens for change events on a dom element.'],
            ['OnColorInput', 'Listens for change events on a HTMLSelectElement.'],
            ['OnClick', 'Listens for click events on a dom element.'],
            ['OnCreate', 'Listens for create events on a dom element.'],
            ['OnLoad', 'Listens for load events on a dom element.'],
            ['OnMouseOut', 'Listens for mouseout events on a dom element.'],
            ['OnMouseOver', 'Listens for mouseover events on a dom element.'],
            ['OnResize', 'Listens for resize events on a dom element.'],
            ['OnSubmit', 'Listens for submit events on a dom element.'],
            ['OnTextInput', 'Listens for textinput events on a HTMLInputElement element.'],
            ['OnTextContentInput', 'Listens for textinput events on a dom element.'],
            ['OnWinResize', 'Listens for winresize events on a dom element.'],
            ['PrintStyle', 'Adds a style to a dom element in print mode'],
            ['State', 'Calls a trait function when an atom changes'],
            ['Style', 'Adds a style to a dom element.'],
            ['StyleOnHover', 'Changes styles on a dom element on hover'],
            ['StyleOnResize', 'Changes styles on a dom element on element resize'],
            ['StyleOnWinResize', 'Changes styles on a dom element on window resize'],
            ['Styles', 'Adds a list of styles to a dom element.'],
            ['Value', 'Listens for value events on a dom element.'],
          ].map(([k, v]) =>
            div(['flex', 'row', 20], ['style', 'flexWrap', 'wrap'])(
              div(['style', 'fontSize', '18px'])(k),
              div(['style', 'fontSize', '14px'])(v),
            ),
          ),
        ),
      }),
      Section({
        title: 'Writing a Custom Trait',
        subtitle: `If you don't have a trait you need, write one! Writing a custom trait is easy. Here's an example:`,
        content: Template.Fragment(
          Snippet(
            `// Define a trait function that takes in the HTMLElement as it's first param
const MyCustomTrait = (
  el: HTMLElement,
  prop: string,
  val: string
) => el.dataset[prop] = val


// Map it to a template
const { div } = Template.Html({
  my_custom_trait = MyCustomTrait
})

// Use it in a template tag function (where it will be intellisensed!)
div(['my_custom_trait','id','1'])('Sup!')

...

// Output result
<div data-id="1">Sup!<div>
  `,
          ),
        ),
      }),
    ),
  });
}
