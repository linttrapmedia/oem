import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { SPA } from '@core/modules/SPA';
import { Theme } from '@core/modules/Theme';
import { box } from 'src/app/components/Layout/Box';

const html = Template.Html({
  style: Trait.Style,
  style_on_hover: Trait.StyleOnHover,
  style_on_resize: Trait.StyleOnWinResize,
  styles: Trait.Styles,
  attr: Trait.Attr,
});

const button = (href: string) =>
  html(
    'a',
    ['attr', 'href', href],
    ['style', 'fontSize', '12px'],
    ['style', 'fontWeight', 'bold'],
    ['style', 'padding', '15px 20px'],
    ['style', 'color', Theme.Color('black', 0, 0.8)],
    ['style', 'cursor', 'pointer'],
    ['style', 'margin', '0 5px'],
    ['style', 'textDecoration', 'none'],
    ['style', 'borderRadius', '5px'],
    ['style', 'letterSpacing', '2px'],
    ['style', 'textTransform', 'uppercase'],
    ['style', 'border', `3px solid ${Theme.Color('black', 0, 0.2)}`],
    ['style_on_hover', 'border', `3px solid ${Theme.Color('black')}`, `3px solid ${Theme.Color('black', 0, 0.2)}`],
  );

const title = html(
  'div',
  ['style', 'letterSpacing', '2px'],
  ['style', 'fontSize', '120px'],
  ['style', 'textAlign', 'center'],
  ['style', 'textIndent', '18px'],
  ['style', 'lineHeight', '0.9'],
  ['style', 'padding', '30px 0px 20px'],
  ['style', 'color', Theme.Color('black')],
  ['style', 'fontFamily', Theme.Font('Splash')],
);

const subtitle = html(
  'div',
  ['style', 'letterSpacing', '2px'],
  ['style', 'fontSize', '16px'],
  ['style', 'textTransform', 'uppercase'],
  ['style', 'textTransform', 'uppercase'],
  ['style', 'textAlign', 'center'],
  ['style', 'textIndent', '18px'],
  ['style', 'lineHeight', '1.1'],
  ['style', 'padding', '0px 20px 30px'],
  ['style', 'color', Theme.Color('black', 0, 0.5)],
);

const superscript = html(
  'div',
  ['style', 'letterSpacing', '0px'],
  ['style', 'fontSize', '10px'],
  ['style', 'textAlign', 'center'],
  ['style', 'textIndent', '0px'],
  ['style', 'lineHeight', '0.9'],
  ['style', 'padding', '3px 5px'],
  ['style', 'marginLeft', '5px'],
  ['style', 'borderRadius', '3px'],
  ['style', 'color', Theme.Color('white')],
  ['style', 'float', 'right'],
  ['style', 'verticalAlign', 'super'],
  ['style', 'backgroundColor', Theme.Color('black', 0, 0.4)],
  ['style', 'fontFamily', Theme.Font('Monospace')],
);

const tagline = html(
  'div',
  ['style', 'letterSpacing', '2px'],
  ['style', 'textTransform', 'uppercase'],
  ['style', 'letterSpacing', '2px'],
  ['style', 'fontWeight', 'bold'],
  ['style', 'textAlign', 'center'],
  ['style', 'lineHeight', '1.1'],
  ['style', 'margin', '0 20px 30px'],
  ['style', 'color', Theme.Color('white')],
  ['style', 'backgroundColor', Theme.Color('black')],
  ['style', 'padding', '30px'],
  ['style', 'transform', 'skew(-10deg)'],
  ['style', 'borderRadius', '5px'],
  ['style_on_resize', 'fontSize', ({ width }) => (width > 800 ? '32px' : '18px')],
);

const description = html(
  'div',
  ['style', 'color', Theme.Color('black', 0, 0.7)],
  ['style', 'fontSize', '18px'],
  ['style', 'margin', '0px 20px 10px 20px'],
  ['style', 'textAlign', 'center'],
  ['style', 'lineHeight', 1.5],
);

const imageLink = (href: string) =>
  html(
    'a',
    ['style', 'opacity', 0.3],
    ['style', 'marginLeft', '10px'],
    ['attr', 'href', href],
    ['attr', 'target', '_blank'],
  );

const copyright = html(
  'div',
  ['style', 'color', Theme.Color('black', 0, 0.3)],
  ['style', 'fontSize', '12px'],
  ['style', 'cursor', 'pointer'],
  ['style', 'margin', '0px 10px 10px'],
  ['style', 'textAlign', 'center'],
  ['style', 'textTransform', 'uppercase'],
  ['style', 'letterSpacing', '2px'],
);

const page = () =>
  html(
    'div',
    ['style', 'width', '100%'],
    ['style', 'padding', '0'],
    ['style', 'margin', '0'],
    ['style', 'minHeight', '100vh'],
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'center'],
    ['style', 'alignItems', 'center'],
    ['style', 'backgroundColor', Theme.Color('white')],
  )(
    html(
      'div',
      ['style', 'maxWidth', '500px'],
      ['style', 'display', 'flex'],
      ['style', 'justifyContent', 'center'],
      ['style', 'alignItems', 'center'],
      ['style', 'flexDirection', 'column'],
    )(
      title(`oem`, superscript('alpha')),
      subtitle('dependency-free web apps'),
      tagline(`"dependencies": {}`),
      description(
        `**OEM** is a dependency-free UI framework and design system. The code is simple and straight forward with virtually no coupling which makes it easy to understand and maintain.`,
      ),
      html('div', ['style', 'margin', '40px 20px'])(button('/docs/?p=overview')('Docs'), button('/design')('Design')),
      box(['direction', 'row'])(
        imageLink('http://linttrap.media')(
          html('img', ['attr', 'src', '/assets/gfx/lint-trap-logo.svg'], ['attr', 'width', 65])(),
        ),
        imageLink('http://github.com/linttrapmedia/oem')(
          html('img', ['attr', 'src', '/assets/gfx/github.svg'], ['attr', 'width', 40])(),
        ),
      ),
      copyright(`OEM js ~ the dependency-free u framework.\ncopryright © 2022 linttrapmedia.`),
    ),
  );

SPA(page());
