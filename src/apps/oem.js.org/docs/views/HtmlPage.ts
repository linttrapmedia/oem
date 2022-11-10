import { Template } from '@core/framework/Template';
import { FONTS } from '@core/framework/Theme';
import { color, ROUTES, tags } from '../../config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';

const { div } = tags;

export function HtmlPage() {
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
        title: 'Rendering',
        subtitle: `Create a template instance, use the returned html tag functions to render dom elements`,
        description: `By default a template can only output html tags (no attributes, styles, behaviors, etc.)`,
        content: Snippet(
          `const { div, span, ul, li } = Template.Html();
div(); // <div></div>
span('Some text'); // <span>Some text</span>
ul(li('one'), li('two')); // <ul><li>one</li><li>two</li></ul>
`,
          'typescript',
        ),
      }),

      Section({
        title: 'Styling and Behavior',
        subtitle: `"Traits" are a way to add styling and behavior to your html. They can be applied multiple times and give the distinct declarative sytnax that keeps the code clean as it scales. Example:`,
        content: Snippet(
          `const { div } = Template.Html();
div(
  ['attr','id', 'example'],
  ['style', 'color', 'green'],
  ['style', 'fontSize', '18px'],
  ['style', 'fontWeight', 'bold'],
  ['on_click', () => console.log('clicked')],
)('Hello World'); 

// <div id="example" style="color:green; font-size: 18px; font-weight: bold; ">Hello World</div>`,
        ),
      }),

      Section({
        title: 'Customization & Extensibility',
        subtitle: `With custom traits OEM is infinitly extensible and customizable. Writing a custom trait is easy. Example:`,
        content: Template.Fragment(
          Snippet(
            `// first argument is the element, the rest of the arguments are whatever you want
  const CustomTrait = (el: HTMLElement, prop: string, val: string) => {
  // do something cool with the element!!!
  el.dataset[prop] = val;
}

const { div } = Template.Html({
  flex = Trait.Flex,
  my_custom_trait = CustomTrait;
});

div(
  ['flex', 'row', 20],
  ['my_custom_trait','id','1'] 
)('Sup!');

// <div data-id="1" style="display:flex;">Sup!<div>`,
          ),
        ),
      }),

      Section({
        title: 'Trait Library',
        subtitle: 'Here are all the traits that are included in the core framework.',
        description:
          'The syntax and structure of traits have been carefully crafted to keep a balance between readability, composability, troubleshooting, intellisense features and the power of declarative code.',
        content: div(['grid', 'auto auto auto', 'auto', 10])(
          ...[
            ['Attr', 'attr', 'Adds an attribute to a dom element.'],
            ['Event', 'event', 'Binds a callback to a dom event.'],
            ['Flex', 'flex', 'Add flexbox styles on one line'],
            ['Focus', 'focus', 'Listens for focus events on a dom element.'],
            ['Grid', 'grid', 'Add grid styles on one line'],
            ['InnerHtml', 'inner_html', 'Replaces html content of a dom element.'],
            ['InnerText', 'inner_text', 'Replaces text content of a dom element.'],
            ['OnChange', 'on_change', 'Listens for change events on a dom element.'],
            ['OnColorInput', 'on_color_input', 'Listens for change events on a HTMLSelectElement.'],
            ['OnClick', 'on_click', 'Listens for click events on a dom element.'],
            ['OnCreate', 'on_create', 'Listens for create events on a dom element.'],
            ['OnLoad', 'on_load', 'Listens for load events on a dom element.'],
            ['OnMouseOut', 'on_mouse_out', 'Listens for mouseout events on a dom element.'],
            ['OnMouseOver', 'on_mouse_over', 'Listens for mouseover events on a dom element.'],
            ['OnResize', 'on_resize', 'Listens for resize events on a dom element.'],
            ['OnSubmit', 'on_submit', 'Listens for submit events on a dom element.'],
            ['OnTextInput', 'on_text_input', 'Listens for textinput events on a HTMLInputElement element.'],
            ['OnTextContentInput', 'on_text_content_input', 'Listens for textinput events on a dom element.'],
            ['OnWinResize', 'on_win_resize', 'Listens for winresize events on a dom element.'],
            ['PrintStyle', 'print_style', 'Adds a style to a dom element in print mode'],
            ['State', '---', 'Maps a trait to a state value.'],
            ['Style', 'style', 'Adds a style to a dom element.'],
            ['StyleOnHover', 'style_on_hover', 'Changes styles on a dom element on hover'],
            ['StyleOnResize', 'style_on_resize', 'Changes styles on a dom element on element resize'],
            ['StyleOnWinResize', 'style_on_win_resize', 'Changes styles on a dom element on window resize'],
            ['Styles', 'styles', 'Adds a list of styles to a dom element.'],
            ['Value', 'value', 'Listens for value events on a dom element.'],
          ].map(([trait, mapping, desc]) =>
            Template.Fragment(
              div()(trait),
              div(
                ['style', 'fontFamily', FONTS.Monospace],
                ['style', 'color', color('green')],
                ['style', 'opacity', '0.5'],
              )(mapping),
              div()(desc),
            ),
          ),
        ),
      }),
    ),
  });
}
