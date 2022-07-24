import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { Grid } from 'src/app/components/Layout/Grids';

const currSwatch = State.Atom(null);

const html = Template.Html({
  on_mouse_over: Trait.OnMouseOver,
  on_mouse_out: Trait.OnMouseOut,
  style: Trait.Style,
  style_on_change: Trait.Atom(currSwatch, Trait.Style),
});

const Font = (font: keyof typeof Theme.Fonts, i: number) =>
  // Wrapper
  html(
    'div',
    ['style', 'borderRadius', '5px'],
    ['style', 'border', `1px solid ${Theme.Color('white', -70)}`],
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'space-between'],
    ['style', 'alignItems', 'center'],
    ['style', 'cursor', 'pointer'],
    ['style', 'transition', 'all 0.5s'],
    ['style', 'transitionDelay', 'all 0.25s'],
    ['style', 'flexDirection', 'column'],
    ['style', 'backgroundColor', Theme.Color('black', 2)],
  )(
    // Example
    html(
      'div',
      ['style', 'fontFamily', Theme.Font(font)],
      ['style', 'color', Theme.Color('white')],
      ['style', 'fontSize', '36px'],
      ['style', 'lineHeight', '1'],
      ['style', 'flexGrow', 1],
      ['style', 'textTransform', 'capitalize'],
      ['style', 'display', 'flex'],
      ['style', 'justifyContent', 'center'],
      ['style', 'alignItems', 'center'],
      ['style', 'padding', '30px'],
      ['style', 'textAlign', 'center'],
    )(`${font}`),

    // Name
    html(
      'div',
      ['style', 'backgroundColor', Theme.Color('black', -2)],
      ['style', 'borderRadius', '5px'],
      ['style', 'color', Theme.Color('white')],
      ['style', 'textTransform', 'uppercase'],
      ['style', 'fontSize', '8px'],
      ['style', 'display', 'inline-flex'],
      ['style', 'letterSpacing', '2px'],
      ['style', 'lineHeight', '2'],
      ['style', 'bottom', '0'],
      ['style', 'width', '100%'],
      ['style', 'padding', '3px 10px'],
      ['style', 'boxSizing', 'border-box'],
    )(font),
  );

export const Fonts = () =>
  html('div', ['style', 'padding', '30px'])(
    html('div', ['style', 'color', Theme.Color('white')], ['style', 'fontSize', '24px'])('Fonts'),
    html('div', ['style', 'marginTop', '30px'])(
      Grid.Auto({
        columns: [
          [1, 0],
          [2, 720],
          [4, 1000],
        ],
        styles: [['gridGap', '30px']],
      })(...Object.keys(Theme.Fonts).map(Font)),
    ),
  );
