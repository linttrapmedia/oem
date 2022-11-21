import { Template } from '@core/framework/Template';
import { ROUTES, tags } from '../../config';
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
        title: 'HTML',
        subtitle: `To render html, you create a template. The template instance returns one function per html tag name which you use to render it's element`,
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
        title: 'Traits',
        subtitle: `The html tag functions allow you to map "Traits" which provide you with the mechanism to add functionality to your html. Each trait is applied one at a time as an array of the trait's parameters. This creates a composable cascading syntax that remains easy to read as things scale. Example:`,
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
        title: 'Customization',
        subtitle: `It's easy to create your own traits, just write a function with an HTMLElement as it's first argument and map it to your template engine. This opens the door for any kind behavior you can think of and becomes a very intuitive and powerful abstraction for controlling state and mixin features. Example:`,
        content: Template.Fragment(
          Snippet(
            `const Suffixer = (el: HTMLElement, suffix: string) => { 
  el.innerText = el.innerText + suffix; 
}
const { div } = Template.Html({ suffix = Suffixer; });
div(['suffix','World!'])('Hello'); // <div>Hello World!<div>`,
          ),
        ),
      }),

      Section({
        title: 'Trait Library',
        subtitle: 'Every template instance includes the following traits by default.',
        description:
          'The syntax and structure of traits have been carefully crafted to keep a balance between readability, composability, troubleshooting, intellisense features and the power of declarative code.',
        content: div(['flex', 'column', 30])(
          ...[
            [
              'Attr',
              '["attr", prop: string, val: string | number | undefined, condition?: Condition]',
              'Adds an attribute to a dom element.',
            ],
            [
              'Event',
              '["event", event: Event, func: Callback, condition?: Condition]',
              'Binds a callback to a dom event.',
            ],
            [
              'Flex',
              "[\"flex\", flexDirection: 'row' | 'column', gap: number, justifyContent?: 'center' | 'start' |'end', alignItems?: 'center' | 'start' | 'end', condition?: Condition],",
              'Add flexbox styles on one line',
            ],
            ['Focus', '["focus", condition?: Condition]', 'Listens for focus events on a dom element.'],
            [
              'Grid',
              "[\"grid\", columns: CSSStyleDeclaration['gridTemplateColumns'] = 'auto', rows: CSSStyleDeclaration['gridTemplateRows'] = 'auto', gap: number = 0, condition?: Condition,]",
              'Add grid styles on one line',
            ],
            [
              'InnerHtml',
              '["inner_html", html: () => HTMLElement | HTMLElement[] | DocumentFragment, condition?: Condition]',
              'Replaces html content of a dom element.',
            ],
            [
              'InnerText',
              '["inner_text", text: () => string | number, condition?: Condition]',
              'Replaces text content of a dom element.',
            ],
            ['OnChange', '["on_change", cb: (e: MouseEvent) => void]', 'Listens for change events on a dom element.'],
            [
              'OnColorInput',
              '["on_color_input", cb: (val: string) => void]',
              'Listens for change events on a HTMLSelectElement.',
            ],
            [
              'OnClick',
              '["on_click", cb: (e: MouseEvent) => void, condition?: Condition]',
              'Listens for click events on a dom element.',
            ],
            ['OnCreate', '["on_create", cb: (el: HTMLElement) => void]', 'Listens for create events on a dom element.'],
            ['OnLoad', '["on_load", cb: (el: HTMLElement) => void]', 'Listens for load events on a dom element.'],
            [
              'OnMouseOut',
              '["on_mouse_out", cb: (e: MouseEvent) => void]',
              'Listens for mouseout events on a dom element.',
            ],
            [
              'OnMouseOver',
              '["on_mouse_over", cb: (e: MouseEvent) => void]',
              'Listens for mouseover events on a dom element.',
            ],
            [
              'OnResize',
              '["on_resize", cb: ({ width, height }: { width: number; height: number }]',
              'Listens for resize events on a dom element.',
            ],
            ['OnSubmit', '["on_submit", cb: () => void]', 'Listens for submit events on a dom element.'],
            [
              'OnTextInput',
              '["on_text_input", cb: (val: string) => void]',
              'Listens for textinput events on a HTMLInputElement element.',
            ],
            [
              'OnTextContentInput',
              '["on_text_content_input", cb: (val: string) => void]',
              'Listens for textinput events on a dom element.',
            ],
            [
              'OnWinResize',
              '["on_win_resize", cb: ({ width, height }: { width: number; height: number }) => void]',
              'Listens for winresize events on a dom element.',
            ],
            [
              'PrintStyle',
              '["print_style",  prop: keyof CSSStyleDeclaration, val: string | number | (() => string | number), condition?: Condition,]',
              'Adds a style to a dom element in print mode',
            ],
            ['State', 'See State section for details', 'A trait that maps traits to state values.'],
            [
              'Style',
              '["style", prop: keyof CSSStyleDeclaration, val: undefined | string | number | ((el: HTMLElement) => string | number), condition?: Condition]',
              'Adds a style to a dom element.',
            ],
            [
              'StyleOnHover',
              '["style_on_hover", prop: keyof CSSStyleDeclaration, val: undefined | string | number | ((el: HTMLElement) => string | number), resetVal?: string | number, condition?: Condition]',
              'Changes styles on a dom element on hover',
            ],
            [
              'StyleOnResize',
              '["style_on_resize", prop: keyof CSSStyleDeclaration, cb: ({ width, height }: { width: number; height: number }) => string]',
              'Changes styles on a dom element on element resize',
            ],
            [
              'StyleOnWinResize',
              '["style_on_win_resize", prop: keyof CSSStyleDeclaration, cb: ({ width, height }: { width: number; height: number }) => string]',
              'Changes styles on a dom element on window resize',
            ],
            [
              'Styles',
              '["styles", styles: [prop: keyof CSSStyleDeclaration, val: string | number][], condition?: Condition]',
              'Adds a list of styles to a dom element.',
            ],
            ['Value', '["value", value: string | (() => string]', 'Listens for value events on a dom element.'],
          ].map(([trait, example, desc]) =>
            div(['flex', 'column', 10])(
              div(['style', 'fontWeight', 'bold'])(trait),
              div()(desc),
              Snippet(example, 'typescript', true),
            ),
          ),
        ),
      }),
    ),
  });
}
