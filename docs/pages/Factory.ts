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
      subtitle: `OEM Factory provides a set of powerful pre-built traits that include configurations for responding to events, media queries and state objects with the Locality of Behavior pattern included which covers 95% of use cases out of the box.`,
      content: Table.Grid(
        Table.Header('Trait'),
        Table.Header('Description'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Style.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useAttributeTrait'),
        ),
        Table.Cell('Apply attributes'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/ClassName.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useClassNameTrait'),
        ),
        Table.Cell('Apply class names'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Event.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useEventTrait'),
        ),
        Table.Cell('Attach event listener'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/InnerHTML.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useInnerHTMLTrait'),
        ),
        Table.Cell('Attach event listener'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/TextContent.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useTextContentTrait'),
        ),
        Table.Cell('Apply inner text'),
        Table.Cell(
          html.a(
            [
              'attr',
              'href',
              'https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Style.ts',
            ],
            ['attr', 'target', '_blank'],
          )('useStyleTrait'),
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
