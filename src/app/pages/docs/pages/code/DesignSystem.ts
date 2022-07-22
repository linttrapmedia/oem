import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { SubSection } from '../../components/SubSection';

const html = Template.Html({
  style: Trait.Style,
  onclick: Trait.OnClick,
});

const listItem = (text: string) =>
  html(
    'li',
    ['style', 'fontSize', '18px'],
    ['style', 'color', Theme.Color('black', 0, 0.8)],
    ['style', 'lineHeight', '1.5'],
  )('✔', html('span', ['style', 'display', 'inline-block'], ['style', 'marginLeft', '10px'])(text));

export const DesignSystem = () => {
  const html = Template.Html({
    attr: Trait.Attr,
    style: Trait.Style,
  });
  return html('div')(
    Section({
      title: `Design System`,
      subtitle: 'A full-fledged design system and component library',
      description: `OEM ships with a full featured design system and component library it therefore has it's own separate set of docs. Here are a few important things to point out about the design system:`,
      content: Template.Fragment(
        SubSection({
          title: 'Features',
          content: html('ul', ['style', 'listStyle', 'none'], ['style', 'margin', '0'], ['style', 'padding', '0'])(
            listItem('Designer Friendly'),
            listItem('Based on OEM core files'),
            listItem('No coupling between components'),
            listItem('Helps facilitate product development'),
            listItem('Provides adaptor pattern for when dependencies are necessary'),
          ),
        }),
        box()(
          html(
            'a',
            ['attr', 'href', '/design-system'],
            ['style', 'textDecoration', 'none'],
            ['style', 'color', Theme.Color('white')],
            ['style', 'backgroundColor', Theme.Color('black')],
            ['style', 'padding', '20px'],
            ['style', 'margin', '20px'],
            ['style', 'borderRadius', '10px'],
          )('View The Design System 👉'),
        ),
      ),
    }),
    FooterNav({
      prev: 'styling',
      prevText: 'Styling',
      next: 'workflow',
      nextText: 'Workflow',
    }),
  );
};
