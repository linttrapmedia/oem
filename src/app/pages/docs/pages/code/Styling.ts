import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';
import { SubSection } from '../../components/SubSection';

export const Styling = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
    style_on_hover: Trait.StyleOnHover,
    style_on_resize: Trait.StyleOnWinResize,
    style_on_print: Trait.PrintStyle,
  });

  return html('div')(
    Section({
      title: `Styling`,
      subtitle: "There's a trait for that",
      description:
        'All features and behaviors in OEM are handled by "Traits", this includes things normally accomplished with CSS.',
    }),
    Section({
      title: 'Style',
      subtitle: 'Basic inline styling',
      content: Template.Fragment(
        SubSection({
          title: 'Example:',
          content: Snippet(`const html = Template.Html({  style: Trait.Style });
const hello = html('div', ['style','fontWeight','bold'])('Hello World')`),
        }),
        SubSection({
          title: 'Result:',
          content: html('div', ['style', 'fontWeight', 'bold'])('Hello World'),
        }),
        SubSection({
          title: 'Conditional Rendering:',
          subtitle:
            "`Trait.Style` also takes an optional boolean function as it's last argument which can be used for conditional rendering.",
          content: Snippet(`const html = Template.Html({  style: Trait.Style });
const hello = html('div', 
  ['style','fontWeight','bold', isActive], // render if isActive is true
  ['style','fontWeight','normal', !isActive] // render if isActive is false
)('Hello World')`),
        }),
      ),
    }),
    Section({
      title: 'Styles',
      subtitle: 'Apply an array of inline styles',
      content: Template.Fragment(
        SubSection({
          title: 'Example:',
          content: Snippet(`const html = Template.Html({  styles: Trait.Styles });
const styleList = Style.List(['fontWeight','bold']);
const hello = html('div', ['styles', styleList])('Hello World')`),
        }),
        SubSection({
          title: 'Result:',
          content: html('div', ['style', 'fontWeight', 'bold'], ['style', 'textTransform', 'uppercase'])('Hello World'),
        }),
        SubSection({
          title: 'Conditional Rendering:',
          subtitle:
            "`Trait.Styles` also takes an optional boolean function as it's last argument which can be used for conditional rendering.",
          content: Snippet(`const html = Template.Html({  styles: Trait.Styles });
const onStyle = Style.List(['color','green']);
const offStyle = Style.List(['color','red'],);
const hello = html('div', 
  ['styles', onStyle, isOn], // render if isOn is true
  ['styles', offStyle, !isOn] // render if isOn is false
)('Hello World')`),
        }),
      ),
    }),
    Section({
      title: 'StyleOnHover',
      subtitle: 'Styling on hover',
      content: Template.Fragment(
        SubSection({
          title: 'Example:',
          content: Snippet(`const html = Template.Html({  style_on_hover: Trait.StyleOnHover });
const hello = html('div', ['style_on_hover','color','red'])('Hello World')`),
        }),
        SubSection({
          title: 'Result:',
          content: html(
            'div',
            ['style', 'color', 'grey'],
            ['style', 'cursor', 'pointer'],
            ['style_on_hover', 'color', 'red'],
          )('Hover Over Me'),
        }),
      ),
    }),
    Section({
      title: 'StyleOnWinResize',
      subtitle: 'Apply style on window resize',
      content: Template.Fragment(
        SubSection({
          title: 'Example:',
          content: Snippet(`const html = Template.Html({  style_on_resize: Trait.StyleOnWinResize });
const hello = html('div', 
  ['style_on_resize','fontSize', ({width}) => width < 800 ? '12px' : '24px']
)('Hello World')`),
        }),
        SubSection({
          title: 'Result:',
          content: html('div', ['style_on_resize', 'fontSize', ({ width }) => (width < 800 ? '12px' : '24px')])(
            'Hello World',
          ),
        }),
      ),
    }),
    Section({
      title: 'PrintStyle',
      subtitle: 'Apply style on print',
      content: Template.Fragment(
        SubSection({
          title: 'Example:',
          content: Snippet(`const html = Template.Html({ style_on_print: Trait.PrintStyle });
const hello = html('div', 
  ['style', 'fontSize', '24px'],
  ['style_on_print', 'fontSize', '60px']
)('Hello World')`),
        }),
        SubSection({
          title: 'Result:',
          content: html('div', ['style', 'fontSize', '24px'], ['style_on_print', 'fontSize', '60px'])('Hello World'),
        }),
      ),
    }),
    Section({
      title: `Theming`,
      subtitle: 'The theming module provides a home for colors, fonts, design "tokens", etc. See `./src/lib/Theme.ts`',
      content: Template.Fragment(
        SubSection({
          title: `Theme.Color`,
          subtitle: 'Pick a color',
          description:
            "The `Color` function allows you to select a color (defined in HSL) and optionally control it's lightness and opacity. This gives you a ton of variety with very little code",
          content: Template.Fragment(
            SubSection({
              title: 'Usage',
              content: Snippet(`Theme.Color('black'); // => hsla(326deg,2%,13%,1)
Theme.Color('black',10);  // lighten by 10% => hsla(326deg,2%,23%,1)
Theme.Color('black',0,0.9); // reduce opacity by 10% => hsla(326deg,2%,23%,0.9)`),
            }),
          ),
        }),
        SubSection({
          title: `Theme.Font`,
          subtitle: 'Pick a font',
          description: 'The `Font` function allows you return the font name',
          content: Template.Fragment(
            SubSection({
              title: 'Usage',
              content: Snippet(`Theme.Font('Space Grotesk');// => Space Grotesk, Arial, sans-serif`),
            }),
          ),
        }),
        SubSection({
          title: `Theme.Set`,
          subtitle:
            'Sure, go ahead and add one. In fact, add any and all style governing and help functions to this file. Remember, OEM is DIY "framework", starting off as more of an architectural pattern to keep you from painting yourself in a corner more than anything else. ',
        }),
      ),
    }),
    FooterNav({
      prev: 'stateManagement',
      prevText: 'State Management',
      next: 'designSystem',
      nextText: 'Design System',
    }),
  );
};
