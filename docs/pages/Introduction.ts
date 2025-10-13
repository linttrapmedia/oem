import { html } from '../config';
import { Box } from '../parts/Box';
import { Features } from '../parts/Features';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';

export const Introduction = () =>
  Page(
    Section({
      title: 'Introduction',
      subtitle: `OEM is a flyweight UI library for building sophisticated web applications using a unique, isomorphic syntax that scales with your project.`,
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
      title: 'Learn (~10min)',
      subtitle: `You can learn the core concepts of OEM in about 10 minutes. Follow along with the examples to get a feel for how OEM works.`,
      content: FooterNav({
        next: { title: 'Templates', menuState: 'templates' },
      }),
    }),
  );
