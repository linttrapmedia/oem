import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { text } from 'src/app/components/Typography/Text';
import { FooterNav } from '../../components/FooterNav';
import { Section } from '../../components/Section';
import { Snippet } from '../../components/Snippet';

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

export const Overview = () =>
  html('div')(
    Section({
      title: 'Overview',
      subtitle: `How to read these docs`,
      content: text('paragraph')(
        `OEM is a UI framework that has been written with **code-adoption** in mind. There are only a handful of lines of true *framework* code which is drop dead simple. The rest of the code is just a bunch of take-it-or-leave-it non-coupled components we wrote for you.`,
      ),
    }),
    Section({
      title: 'Setup',
      subtitle: 'Clone, Install, Start',
      content: Snippet(`git clone https://github.com/linttrapmedia/oem.git\nnpm i\nnpm start`, 50, 'bash'),
    }),
    Section({
      title: 'Core Features',
      subtitle: `Batteries-included is an understatement`,
      content: html('ul', ['style', 'listStyle', 'none'], ['style', 'margin', '0'], ['style', 'padding', '0'])(
        listItem('Design System'),
        listItem('Templating Engine'),
        listItem('State Management'),
        listItem('Routing'),
        listItem('Utility Library'),
        listItem('Testing Suite'),
        listItem('Security Scanning'),
      ),
    }),
    Section({
      title: 'Other Features',
      subtitle: `All the little things that count`,
      content: html('ul', ['style', 'listStyle', 'none'], ['style', 'margin', '0'], ['style', 'padding', '0'])(
        listItem('There are no dependencies'),
        listItem('Components have no coupling'),
        listItem('Clean code/architecture'),
        listItem('Self documenting (these docs!)'),
        listItem('Declarative behavior (through "Traits", more on this in a minute)'),
        listItem('Includes modules for logging, theming, user tracking'),
        listItem('Implements scalable patterns'),
      ),
    }),
    FooterNav({ prev: null, next: 'concepts', nextText: 'Concepts' }),
  );
