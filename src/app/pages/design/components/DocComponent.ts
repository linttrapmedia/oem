import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';
import { Tabs } from 'src/app/components/Layout/Tabs';

const html = Template.Html({
  style: Trait.Style,
  attr: Trait.Attr,
});

type DocComponentProps = {
  title: string;
  subtitle: string;
  usage: HTMLElement;
  props: { name: string; description: string; type: string; default?: string; optional?: boolean }[];
};

export const DocComponent = ({ title, subtitle, usage, props }: DocComponentProps) => {
  const tabs = Tabs({ title: 'Usage', selected: true, content: () => usage }, { title: 'Props', content: () => props });

  return html('div')(
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
      tabs,
    ),
  );
};
