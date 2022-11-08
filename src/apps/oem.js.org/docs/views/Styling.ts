import { ROUTES, tags } from '../../config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';
const { div } = tags;

export function StylingView() {
  return Documentation({
    prev: ['Html', ROUTES.HTML],
    next: ['State', ROUTES.STATE_MANAGEMENT],
    content: div(['flex', 'column', 40])(
      Section({
        title: `Styling`,
        subtitle: `The \`Styles\` Trait has unique status among the other traits due to it's role as the main mechanism for adding styles to the dom. There are actually a "family" of \`Style\` Traits that support a number of rendering and styling scenarios making it significantly more powerful and expressive than CSS or inline styles alone.`,
        description:
          'All features and behaviors in OEM are handled by "Traits", this includes things normally accomplished with CSS.',
      }),
      Section({
        title: 'Conditional Styling:',
        subtitle:
          "`Trait.Style` takes an optional boolean function or value as it's last argument which can be used for conditional rendering.",
        content: Snippet(`const html = Template.Html({  style: Trait.Style });
const hello = div(
  ['style','fontWeight','bold', isActive], // render if isActive is true
  ['style','fontWeight','normal', !isActive] // render if isActive is false
)('Hello World')`),
      }),
      Section({
        title: 'Sharing Styles',
        subtitle:
          '`Trait.Styles` allows you to apply an array of styles which helps when sharing or propagating styles between components.',
        content: div(['flex', 'column', 40])(
          Snippet(`const html = Template.Html({  styles: Trait.Styles });
const headerStyles = [['fontWeight','bold'],['textDecoration','underline']];
const headerOne = h1(['styles', headerStyles])('Main Header');
const headerTwo = h2(['styles', headerStyles])('Sub Header');`),
        ),
      }),
      Section({
        title: 'On Hover',
        subtitle: '`Trait.StyleOnHover` allows you declare styling inline, eliminating the need for CSS selectors',
        content: Snippet(`const html = Template.Html({  style_on_hover: Trait.StyleOnHover });
const hello = div(['style_on_hover','color','red'])('Hello World')`),
      }),
      Section({
        title: 'Responsive Styles',
        subtitle:
          '`Trait.StyleOnWinResize` Allows you to define styles inline, eliminating the need for media queries.',
        content: div(['flex', 'column', 40])(
          Snippet(`const html = Template.Html({  style_on_resize: Trait.StyleOnWinResize });
const getFontSize = ({width}) => width < 800 ? '12px' : '24px';
const hello = div(['style_on_resize','fontSize', getFontSize])('Hello Responsively Styled Text`),
          div(['style_on_resize', 'fontSize', ({ width }) => (width < 800 ? '12px' : '24px')])(
            'Hello Responsively Styled Text',
          ),
        ),
      }),
      Section({
        title: 'Print Styles',
        subtitle: 'Apply a style on print!',
        content: div(['flex', 'column', 40])(
          Snippet(`const html = Template.Html({ style_on_print: Trait.PrintStyle });
const hello = div(
  ['style', 'fontSize', '24px'],
  ['style_on_print', 'fontSize', '60px']
)('Hello Print Styled Text')`),
          div(['style', 'fontSize', '24px'], ['style_on_print', 'fontSize', '60px'])('Hello Print Styled Text'),
        ),
      }),
      Section({
        title: `Theming`,
        subtitle:
          'The theming engine works similarly to the templating engine. Create an instance and use the returned functions to control color and fonts.',
        content: Snippet(`const { color, font } = Theme();

// output a solid black = HSLA(0, 0%, 0%, 1)
color('black');

// output a black at 50% opacity = HSLA(0, 0%, 0%, 0.5)
color('black', 0.5);

// output a solid black lightened by 5% = HSL(0, 0%, 5%, 1)
color('black', 1, 5);

// Color override
const { color, font } = Theme({ black:[326, 2, 13] });
color('black'); // outputs HSLA(326, 2%, 13%, 1)

// output the Primary font = 'Space Grotesk, Arial, sans-serif'
font('Primary')
`),
      }),
    ),
  });
}
