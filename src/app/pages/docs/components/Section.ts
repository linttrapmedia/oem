import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';
import { link } from 'src/app/components/Navigation/Links';

const html = Template.Html({
  style: Trait.Style,
  attr: Trait.Attr,
});

type SectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: Types.HtmlChild;
  sourceLink?: {
    text: string;
    href: string;
  };
};

export const Section = ({ description, title, subtitle, content, sourceLink }: SectionProps) =>
  html('div')(
    html('section', ['style', 'margin', '20px 0px'], ['style', 'padding', '10px'])(
      box(['justify', 'space-between'])(
        title &&
          html(
            'a',
            ['attr', 'href', `#${title}`],
            ['attr', 'id', title],
            ['style', 'fontSize', '28px'],
            ['style', 'color', Theme.Color('black')],
            ['style', 'fontWeight', 'bold'],
            ['style', 'textDecoration', 'none'],
          )(title),
        sourceLink &&
          html(
            'div',
            ['style', 'padding', '10px'],
            ['style', 'whiteSpace', 'nowrap'],
            ['style', 'textTransform', 'uppercase'],
            ['style', 'letterSpacing', '1px'],
            ['style', 'fontSize', '11px'],
          )(link('text')(sourceLink.text, sourceLink.href, 'blank')),
      ),
      subtitle &&
        html(
          'div',
          ['style', 'padding', '10px 0px 0px'],
          ['style', 'color', Theme.Color('black', 0, 0.5)],
          ['style', 'fontSize', '20px'],
        )(subtitle),

      html(
        'div',
        ['style', 'borderBottom', `1px solid ${Theme.Color('black', 0, 0.1)}`],
        ['style', 'width', '100%'],
        ['style', 'margin', '10px 0px 20px'],
      )(),
      description &&
        html(
          'div',
          ['style', 'margin', '0px 0px 30px'],
          ['style', 'padding', '20px'],
          ['style', 'color', Theme.Color('black', 0, 0.6)],
          ['style', 'fontSize', '16px'],
          ['style', 'backgroundColor', Theme.Color('black', 0, 0.04)],
          ['style', 'position', 'relative'],
        )(description),
      content ? content : null,
    ),
  );
