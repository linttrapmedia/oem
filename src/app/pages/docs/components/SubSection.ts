import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';
import { link } from 'src/app/components/Navigation/Links';

const html = Template.Html({
  style: Trait.Style,
  attr: Trait.Attr,
});

type SubSectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: Types.HtmlChild;
  sourceLink?: {
    text: string;
    href: string;
  };
};

export const SubSection = ({ description, title, subtitle, content, sourceLink }: SubSectionProps) =>
  html('div')(
    html('section', ['style', 'margin', '10px 0px'], ['style', 'padding', '10px'])(
      box(['justify', 'flex-start'])(
        title &&
          html(
            'div',
            ['style', 'fontSize', '20px'],
            ['style', 'color', Theme.Color('black')],
            ['style', 'fontWeight', 'bold'],
          )(title),
        sourceLink &&
          html(
            'div',
            ['style', 'padding', '10px'],
            ['style', 'whiteSpace', 'nowrap'],
            ['style', 'textTransform', 'uppercase'],
            ['style', 'letterSpacing', '3px'],
          )(link('text')(sourceLink.text, sourceLink.href, 'blank')),
      ),
      subtitle &&
        html(
          'div',
          ['style', 'padding', '10px 0px 0px'],
          ['style', 'color', Theme.Color('black', 0, 0.5)],
          ['style', 'fontSize', '18px'],
        )(subtitle),

      html('div', ['style', 'width', '100%'], ['style', 'margin', '10px 0px 20px'])(),
      description &&
        html(
          'div',
          ['style', 'margin', '10px 0px'],
          ['style', 'color', Theme.Color('black', 0, 0.6)],
          ['style', 'fontSize', '16px'],
        )(description),
      content ? content : null,
    ),
  );
