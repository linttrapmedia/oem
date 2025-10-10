import { a, div } from '../config';
import { Box } from '../parts/Box';
import { FooterNav } from '../parts/FooterNav';
import { Page } from '../parts/Page';
import { Section } from '../parts/Section';
import { Features } from './Features';

export const Introduction = () =>
  Page(
    Section({
      title: 'Introduction',
      subtitle: `OEM is a flyweight UI library for building sophisticated web applications using a unique, isomorphic syntax that scales with your project.`,
      content: Box(
        'column',
        20,
        div(
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
        div(['prism'])(`npm i @linttrap/oem`),
        div(
          ['style', 'opacity', 0.35],
          ['style', 'fontSize', '14px'],
          ['style', 'textAlign', 'center'],
        )(
          'Or download with unpkg at ',
          a(
            ['attr', 'href', 'https://unpkg.com/@linttrap/oem@latest/dist/oem.min.js'],
            ['attr', 'target', '_blank'],
          )('unpkg'),
        ),
      ),
    }),
    Section({
      title: 'Get Started',
      subtitle: `Learn about OEM's templating engine and how to create your own templates.`,
      content: FooterNav({
        next: { title: 'Templates', menuState: 'templates' },
      }),
    }),
  );
