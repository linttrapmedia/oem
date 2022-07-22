import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Grid } from 'src/app/components/Layout/Grids';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';
import { SubSection } from '../../components/SubSection';

const html = Template.Html({
  style: Trait.Style,
  onclick: Trait.OnClick,
});

export const Traits = () =>
  html('div')(
    Section({
      title: 'Trait.[Trait]',
      subtitle: `Traits are "plugins" mapped onto the template engine in order to add features and behaviors to dom elements.`,
      description: `A *Trait* is callback function that takes in the element that was created by the template engine as its first argument. Here's the source code to the \`Attr\` trait. It allows you to add any html attribute to an element. *Note: Typings removed for clarity*`,
      content: html('div')(
        SubSection({
          title: 'An Example Using The `Attr` Trait',
          content: Snippet(
            `const Attr = (
  
      // the element to attach the trait to
      el: HTMLElement,
  
      // name of the attribute
      prop: string,
  
      // value of the attribute
      val: string | number,
  
      // condition to check if the trait should be applied
      cond: () => boolean = () => true
    ) =>
    
    // apply/remove the trait
    cond() ? el.setAttribute(prop, String(val)) : el.removeAttribute(prop)
  `,
          ),
        }),
        SubSection({
          title: 'Usage',
          subtitle:
            'Map the `Attr` trait and assign `attr` as the parameter you want to use in your template function.',
          content: Snippet(`import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait'; 
const html = Template.Html({  attr: Trait.Attr });
const hello = html('div', ['attr','id','hello'])('Hello World')`),
        }),
        SubSection({
          title: 'Output',
          subtitle: "The resulting dom element will have an id of 'hello'",
          content: Snippet(`<div id="hello">Hello World</div>`),
        }),
      ),
    }),
    Section({
      title: 'Traits',
      subtitle:
        'There are many different traits that ship with the framework. See the `./src/core/Trait.ts` module for source code',
      description:
        'The syntax and structure of traits have been carefully crafted to keep a balance between readability, composability, troubleshooting, intellisense features and the power of declarative code.',
      content: Grid.Auto({
        columns: [
          [1, 0],
          [2, 640],
        ],
        styles: [['rowGap', '10px']],
      })(
        ...[
          ['Attr', 'Adds an attribute to a dom element.'],
          ['Atom', 'Calls a trait function when an atom changes'],
          ['InnerHtml', 'Replaces html content of a dom element.'],
          ['InnerText', 'Replaces text content of a dom element.'],
          ['Focus', 'Listens for focus events on a dom element.'],
          ['OnCreate', 'Listens for create events on a dom element.'],
          ['OnChange', 'Listens for change events on a dom element.'],
          ['OnClick', 'Listens for click events on a dom element.'],
          ['OnMouseOver', 'Listens for mouseover events on a dom element.'],
          ['OnMouseOut', 'Listens for mouseout events on a dom element.'],
          ['OnLoad', 'Listens for load events on a dom element.'],
          ['OnResize', 'Listens for resize events on a dom element.'],
          ['OnSubmit', 'Listens for submit events on a dom element.'],
          ['OnTextInput', 'Listens for textinput events on a dom element.'],
          ['OnWinResize', 'Listens for winresize events on a dom element.'],
          ['PrintStyle', 'Adds a style to a dom element in print mode'],
          ['Style', 'Adds a style to a dom element.'],
          ['Styles', 'Adds a list of styles to a dom element.'],
          ['StyleOnHover', 'Changes styles on a dom element on hover'],
          ['StyleOnResize', 'Changes styles on a dom element on element resize'],
          ['StyleOnWinResize', 'Changes styles on a dom element on window resize'],
          ['Value', 'Listens for value events on a dom element.'],
        ].map(
          ([k, v, e]) =>
            Template.Fragment(
              html('div', ['style', 'fontSize', '18px'])(`\`${k}\``),
              html('div', ['style', 'fontSize', '14px'])(v),
            ),
          // SubSection({
          //   title: `\`${k}\``,
          //   subtitle: `${v}`,
          // }),
        ),
      ),
    }),
    FooterNav({
      prev: 'templating',
      prevText: 'Template Engine',
      next: 'stateManagement',
      nextText: 'State Management',
    }),
  );
