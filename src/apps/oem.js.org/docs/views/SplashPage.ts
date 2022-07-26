import { Template } from '@core/framework/Template';
import { KeyFrames } from '@core/utils/keyframes';
import { color, font, ROUTES, tags } from '../../config';
const { a, div, img } = tags;
const Button = (href: string) =>
  a(
    ['attr', 'href', href],
    ['style', 'fontSize', '12px'],
    ['style', 'fontWeight', 'bold'],
    ['style', 'padding', '15px'],
    ['style', 'width', '150px'],
    ['style', 'color', color('black', 0.8)],
    ['style', 'cursor', 'pointer'],
    ['style', 'margin', '0 5px'],
    ['style', 'textDecoration', 'none'],
    ['style', 'borderRadius', '5px'],
    ['style', 'letterSpacing', '2px'],
    ['style', 'textTransform', 'uppercase'],
    ['style', 'border', `3px solid ${color('black', 0.2)}`],
    ['style_on_hover', 'border', `3px solid ${color('black')}`, `3px solid ${color('black', 0.2)}`],
    ['style', 'display', 'block'],
  );

const Title = div(
  ['style', 'letterSpacing', '2px'],
  ['style', 'fontSize', '120px'],
  ['style', 'textAlign', 'center'],
  ['style', 'textIndent', '18px'],
  ['style', 'lineHeight', '0.9'],
  ['style', 'color', color('black')],
  ['style', 'fontFamily', font('Splash')],
);

const superscript = div(
  ['style', 'letterSpacing', '0px'],
  ['style', 'fontSize', '10px'],
  ['style', 'textAlign', 'center'],
  ['style', 'textIndent', '0px'],
  ['style', 'lineHeight', '0.9'],
  ['style', 'padding', '3px 5px'],
  ['style', 'marginLeft', '5px'],
  ['style', 'borderRadius', '3px'],
  ['style', 'color', color('white')],
  ['style', 'float', 'right'],
  ['style', 'verticalAlign', 'super'],
  ['style', 'backgroundColor', color('black')],
  ['style', 'fontFamily', font('Monospace')],
  ['style', 'textTransform', 'uppercase'],
);

const Tagline = div(
  ['style', 'letterSpacing', '2px'],
  ['style', 'textTransform', 'uppercase'],
  ['style', 'letterSpacing', '2px'],
  ['style', 'fontWeight', 'bold'],
  ['style', 'textAlign', 'center'],
  ['style', 'lineHeight', '1.1'],
  ['style', 'color', color('white')],
  ['style', 'backgroundColor', color('black')],
  ['style', 'padding', '30px'],
  ['style', 'transform', 'skew(-10deg)'],
  ['style', 'borderRadius', '5px'],
  ['style_on_resize', 'fontSize', ({ width }) => (width > 800 ? '32px' : '18px')],
);

const Description = div(
  ['style', 'color', color('black', 0.7)],
  ['style', 'fontSize', '18px'],
  ['style', 'margin', '0px 20px 10px 20px'],
  ['style', 'textAlign', 'center'],
  ['style', 'lineHeight', 1.5],
);

const imageLink = (href: string) => a(['attr', 'href', href], ['attr', 'target', '_blank']);

const Copyright = div(
  ['style', 'color', color('black', 0.3)],
  ['style', 'fontSize', '12px'],
  ['style', 'cursor', 'pointer'],
  ['style', 'margin', '0px 10px 10px'],
  ['style', 'textAlign', 'center'],
  ['style', 'textTransform', 'uppercase'],
  ['style', 'letterSpacing', '2px'],
);

const animate = KeyFrames({
  bg: [
    [0, 'background-color', color('black', 0.25)],
    [10, 'background-color', color('blue', 0.25)],
    [20, 'background-color', color('brown', 0.25)],
    [30, 'background-color', color('green', 0.25)],
    [40, 'background-color', color('orange', 0.25)],
    [50, 'background-color', color('purple', 0.25)],
    [60, 'background-color', color('red', 0.25)],
    [70, 'background-color', color('white', 0.25)],
    [80, 'background-color', color('yellow', 0.25)],
    [90, 'background-color', color('purple', 0.25)],
    [100, 'background-color', color('black', 0.25)],
  ],
});

const Wrapper = div(
  ['style', 'animationName', animate('bg')],
  ['style', 'animationDuration', `10s`],
  ['style', 'animationIterationCount', 'infinite'],
  ['style', 'animationTimingFunction', 'linear'],
  ['style', 'width', '100%'],
  ['style', 'padding', '50px 0'],
  ['style', 'minHeight', '100vh'],
  ['style', 'display', 'flex'],
  ['style', 'justifyContent', 'center'],
  ['style', 'alignItems', 'center'],
  ['style', 'backgroundColor', color('white')],
  ['style', 'fontFamily', font('Space Grotesk')],
);

export function SplashPage() {
  return Wrapper(
    div(['style', 'maxWidth', '500px'], ['flex', 'column', 20, 'center', 'center'])(
      Title(`oem`, superscript('beta')),
      Tagline(`"dependencies": {}`),
      Description(
        Template.Markdown(
          `OEM is a dependency-free UI/UX framework. It uses a isomorphic syntax to write declarative html, styling and behavior. The result is clean and expressive code that is easy to read.`,
        ),
      ),
      div(['flex', 'row', 10])(Button(ROUTES.QUICKSTART)('Docs'), Button(ROUTES.DESIGN_SYSTEM)('Design')),
      div(['flex', 'row', 5, 'center', 'center'])(
        imageLink('http://linttrap.media')(
          img(['attr', 'src', '/assets/gfx/lint-trap-logo.svg'], ['attr', 'width', 65])(),
        ),
        imageLink('http://github.com/linttrapmedia/oem')(
          img(['attr', 'src', '/assets/gfx/github.svg'], ['attr', 'width', 40])(),
        ),
      ),
      Copyright(`OEM js ~ the dependency-free u framework.\ncopryright © 2022 linttrapmedia.`),
    ),
  );
}
