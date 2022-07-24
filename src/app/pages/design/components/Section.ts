import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';

const html = Template.Html({
  style: Trait.Style,
  attr: Trait.Attr,
});

type SectionProps = {
  title?: string;
  subtitle?: string;
  content?: HTMLElement;
};

export const Section = ({ title, subtitle, content }: SectionProps) =>
  html('div')(
    html('section')(
      box(['justify', 'space-between'])(
        title &&
          html(
            'a',
            ['attr', 'href', `#${title}`],
            ['attr', 'id', title],
            ['style', 'fontSize', '32px'],
            ['style', 'color', Theme.Color('white')],
            ['style', 'textDecoration', 'none'],
          )(title),
      ),
      subtitle &&
        html(
          'div',
          ['style', 'padding', '10px 0px 0px'],
          ['style', 'color', Theme.Color('white', 0, 0.5)],
          ['style', 'fontSize', '20px'],
        )(subtitle),

      html(
        'div',
        ['style', 'borderBottom', `1px solid ${Theme.Color('white', 0, 0.1)}`],
        ['style', 'width', '100%'],
        ['style', 'margin', '10px 0px 20px'],
      )(),
      content &&
        html(
          'div',
          ['style', 'margin', '0px 0px 30px'],
          ['style', 'padding', '20px'],
          ['style', 'color', Theme.Color('white', 0, 0.6)],
          ['style', 'fontSize', '16px'],
          ['style', 'backgroundColor', Theme.Color('white', 0, 0.04)],
          ['style', 'position', 'relative'],
        )(content),
    ),
  );
