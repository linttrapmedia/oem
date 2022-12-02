import { ROUTES, tags } from '../../config';
import { Documentation } from './common/Documentation';
import { Section } from './common/Section';
import { Snippet } from './common/Snippet';
const { div } = tags;

export function StylingPage() {
  return Documentation({
    prev: ['State', ROUTES.STATE_MANAGEMENT],
    next: ['Design', ROUTES.DESIGN_SYSTEM],
    content: div(['flex', 'column', 40])(
      Section({
        title: `Styling`,
        subtitle: `The \`Styles\` Trait has unique status among the other traits due to it's role as the main mechanism for adding styles to the dom. There are actually a "family" of \`Style\` Traits that support a number of rendering and styling scenarios making it significantly more powerful and expressive than CSS or inline styles alone.`,
        description:
          'All features and behaviors in OEM are handled by "Traits", this includes things normally accomplished with CSS.',
      }),
      Section({
        title: 'Basic Styling:',
        subtitle: 'Styles are inline css props and values. Example:',
        content: Snippet(`const { div } = Template.Html();
const hello = div(['style','fontWeight','bold'])('Hello World')`),
      }),
      Section({ content: div(['style', 'fontWeight', 'bold'])('Hello World') }),
      Section({
        title: 'Conditional Styling:',
        subtitle:
          "`Trait.Style` takes an optional boolean function or value as it's last argument which can be used for conditional rendering. Note there two entries for `fontWeight`, both of which are evaluated. This is the beauty of OEM's syntax which keeps things nice and clean as your code scales.",
        content: Snippet(`const { div } = Template.Html();
const hello = div(
  ['style','fontWeight','bold', isActive], // render if isActive is true
  ['style','fontWeight','normal', !isActive] // render if isActive is false
)('Hello World')`),
      }),

      Section({
        title: 'Sharing Styles',
        subtitle: 'Common styles can be shared with the `Trait.Styles` trait.',
        content: div(['flex', 'column', 40])(
          Snippet(`const { h1, h2 } = Template.Html();
const headerStyles = [['fontWeight','bold'],['textDecoration','underline']];
const headerOne = h1(['styles', headerStyles])('Main Header');
const headerTwo = h2(['styles', headerStyles])('Sub Header');`),
        ),
      }),
      Section({
        title: 'On Hover',
        subtitle: '`Trait.StyleOnHover` allows you declare styling inline, eliminating the need for CSS selectors',
        content: Snippet(`const { div } = Template.Html();
const hello = div(['style_on_hover','color','red'])('Hello World')`),
      }),
      Section({ content: div(['style_on_hover', 'color', 'red'])('Hello World') }),
      Section({
        title: 'Responsive Styles',
        subtitle:
          '`Trait.StyleOnWinResize` Allows you to define styles inline, eliminating the need for media queries.',
        content: div(['flex', 'column', 40])(
          Snippet(`const { div } = Template.Html();
const getFontSize = ({width}) => width < 800 ? '12px' : '24px';
const hello = div(['style_on_resize','fontSize', getFontSize])('Resize the window!')`),
          div(['style_on_resize', 'fontSize', ({ width }) => (width < 800 ? '12px' : '24px')])('Resize the window!'),
        ),
      }),
      Section({ content: div(['style_on_hover', 'color', 'red'])('Hello World') }),

      Section({
        title: 'Print Styles',
        subtitle: 'Apply a print-only style!',
        content: div(['flex', 'column', 40])(
          Snippet(`const { div } = Template.Html();
const hello = div(
  ['style', 'fontSize', '16px'],
  ['style_on_print', 'fontSize', '60px']
)('I\'m only 16px, but 60px when printed!')`),
        ),
      }),
      Section({
        content: div(
          ['style', 'fontSize', '16px'],
          ['style_on_print', 'fontSize', '60px'],
        )("I'm only 16px, but 60px when printed!"),
      }),
      Section({
        title: `Theming`,
        subtitle:
          'The theming engine works similarly to the templating engine. Create an instance and use the returned functions to control colors and fonts.',
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
