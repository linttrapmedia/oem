import { html } from '../config';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';
import { Table } from '../parts/Table';

export const Factory = () =>
  Page(
    Page.Header('Factory', 'Pre-built components,  templates and generators for rapid development'),
    Section({
      title: 'Ready-Made Traits',
      subtitle: `OEM Factory provides a set of pre-built components and templates to help you get started quickly. I'll be adding more, feel free to suggest any you'd like to see!`,
      content: Table.Grid(
        Table.Header('Trait'),
        Table.Header('Description'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/html/traits/Style.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useAttribute'),
        ),
        Table.Cell('Apply attributes'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/html/traits/ClassName.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useClassName'),
        ),
        Table.Cell('Apply class names'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/html/traits/Event.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useEvent'),
        ),
        Table.Cell('Attach event listener'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/html/traits/InnerHTML.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useInnerHTML'),
        ),
        Table.Cell('Attach event listener'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/html/traits/TextContent.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useTextContent'),
        ),
        Table.Cell('Apply inner text'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/html/traits/Style.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useStyle'),
        ),
        Table.Cell('Apply styles'),
      ),
    }),
    Section({
      title: 'Thank You',
      subtitle: `We appreciate your interest in OEM. We hope you find this project useful. Feel free to contribute or provide feedback!`,
      content: FooterNav({
        next: { title: 'Intro', menuState: 'introduction' },
        prev: { title: 'Patterns', menuState: 'patterns' },
      }),
    }),
  );
