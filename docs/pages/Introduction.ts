import { html } from '../config';
import { Box } from '../parts/Box';
import { Features } from '../parts/Features';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

export const Introduction = () =>
  Page(
    Page.Header('OEM', 'The flyweight UI library for the modern web'),
    Section({
      title: 'Features',
      subtitle: `OEM is a tiny layer-one utility that provides just enough structure to build powerful micro-templating engines with the following features:`,
      content: Box(
        'column',
        20,
        html.div(
          ['style', 'alignItems', 'center'],
          ['style', 'boxSizing', 'border-box'],
          ['style', 'display', 'grid'],
          ['style', 'flexWrap', 'wrap'],
          ['style', 'gap', '20px'],
          ['style', 'justifyContent', 'center'],
          ['style', 'width', '100%'],
          ['style:tablet', 'borderRight', '1px dashed black'],
          ['style', 'borderRight', 'none'],
          ['style:tablet', 'borderBottom', 'none'],
        )(Features()),
      ),
    }),
    Section({
      title: 'Install',
      subtitle: `Get started with OEM in seconds.`,
      content: Box(
        'column',
        20,
        html.div(['prism'])(`npm i @linttrap/oem`),
        html.div(
          ['style', 'opacity', 0.35],
          ['style', 'fontSize', '14px'],
          ['style', 'textAlign', 'center'],
        )(
          'Or download with unpkg at ',
          html.a(
            ['attr', 'href', 'https://unpkg.com/@linttrap/oem@latest/dist/oem.min.js'],
            ['attr', 'target', '_blank'],
          )('unpkg'),
        ),
      ),
    }),

    Section({
      title: 'Docs',
      subtitle: `Explore the full documentation to learn more about OEM's core concepts and how to build with it.`,
      content: FooterNav({
        next: { title: 'Docs', menuState: 'docs' },
      }),
    }),
  );
