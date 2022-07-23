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

const Swatch = (color: keyof typeof Theme.Colors, i: number) =>
  // Wrapper
  html(
    'div',
    ['style', 'borderRadius', '3px'],
    ['style', 'border', `1px solid ${Theme.Color('white', -70)}`],
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'center'],
    ['style', 'alignItems', 'center'],
    ['style', 'backgroundColor', Theme.Color(color)],
    ['style', 'position', 'relative'],
    ['style', 'height', '100px'],
    ['style', 'cursor', 'pointer'],
    ['style', 'transition', 'all 0.5s'],
    ['style', 'transitionDelay', 'all 0.25s'],
    ['style_on_change', 'backgroundColor', Theme.Color('white', 0, 0.2), () => currSwatch.get() !== i],
    ['style_on_change', 'backgroundColor', Theme.Color(color), () => currSwatch.get() === i],
    ['style_on_change', 'backgroundColor', Theme.Color(color), () => currSwatch.get() === null],
    ['on_mouse_over', () => currSwatch.set(i)],
    ['on_mouse_out', () => currSwatch.set(null)],
  )(
    // Title
    html(
      'div',
      ['style', 'backgroundColor', Theme.Color('black', -2)],
      ['style', 'color', Theme.Color('white')],
      ['style', 'textTransform', 'uppercase'],
      ['style', 'fontSize', '8px'],
      ['style', 'display', 'inline-flex'],
      ['style', 'letterSpacing', '2px'],
      ['style', 'lineHeight', '2'],
      ['style', 'position', 'absolute'],
      ['style', 'bottom', '0'],
      ['style', 'width', '100%'],
      ['style', 'padding', '3px 10px'],
      ['style', 'boxSizing', 'border-box'],
    )(color),
  );

export const Colors = () =>
  html('div', ['style', 'padding', '30px'])(
    html('div', ['style', 'color', Theme.Color('white')], ['style', 'fontSize', '24px'])('Colors'),
    html('div', ['style', 'marginTop', '30px'])(
      Grid.Auto({
        columns: [
          [2, 0],
          [4, 720],
          [6, 1000],
        ],
        styles: [['gridGap', '30px']],
      })(...Object.keys(Theme.Colors).map(Swatch)),
    ),
  );
