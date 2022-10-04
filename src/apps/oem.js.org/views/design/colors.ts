import { color, font } from '@apps/oem.js.org/context';
import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { COLORS, Theme } from '@core/framework/Theme';
import { Trait } from '@core/framework/Trait';
import { Snippet } from '../common/Snippet';
const currSwatch = State.Atom(null);

const { div } = Template.Html({
  flex: Trait.Flex,
  on_mouse_over: Trait.OnMouseOver,
  on_mouse_out: Trait.OnMouseOut,
  style: Trait.Style,
  style_on_change: Trait.Atom(currSwatch, Trait.Style),
  style_on_winsize: Trait.StyleOnWinResize,
});

type COLORS = Exclude<keyof typeof COLORS, 'transparent'>;
const ColorList = Object.keys(COLORS).filter((c) => c !== 'transparent') as COLORS[];

const Swatch = (colorValue: string, colorArgs: string, i: number) =>
  // Wrapper
  div(
    ['on_mouse_out', () => currSwatch.set(null)],
    ['on_mouse_over', () => currSwatch.set(i)],
    ['style_on_change', 'backgroundColor', color('black', 0.2), () => currSwatch.get() !== i],
    ['style_on_change', 'backgroundColor', colorValue, () => currSwatch.get() === i],
    ['style_on_change', 'backgroundColor', colorValue, () => currSwatch.get() === null],
    ['style', 'backgroundColor', colorValue],
    ['style', 'border', `1px solid ${color('black', 0.2)}`],
    ['style', 'borderRadius', '3px'],
    ['style', 'cursor', 'pointer'],
    ['style', 'height', '100px'],
    ['style', 'position', 'relative'],
    ['style', 'transition', 'all 0.5s'],
    ['style', 'transitionDelay', 'all 0.25s'],
    ['style', 'width', '100%'],
  )(
    // Title
    div(
      ['style', 'backgroundColor', color('black', 0.3)],
      ['style', 'bottom', '0'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'color', color('white')],
      ['style', 'display', 'inline-flex'],
      ['style', 'fontSize', '11px'],
      ['style', 'lineHeight', '2'],
      ['style', 'padding', '3px 10px'],
      ['style', 'position', 'absolute'],
      ['style', 'width', '100%'],
      ['style', 'fontFamily', font('Monospace')],
    )(`color(${colorArgs})`),
  );

const calcGridColumns = ({ width }: { width: number }) => `repeat(${width >= 700 ? '3' : '1'}, minmax(0, 1fr))`;

const Header = div(['style', 'fontSize', '20px']);
const Description = div(['style', 'fontSize', '16px']);
const Section = div(['flex', 'column', 20], ['style', 'width', '100%']);

export const Colors = div(['flex', 'column', 40])(
  Section(
    Header('Palette'),
    Description(Template.Markdown('The main color palette is accessible through the `Theme().color` function.')),
    Snippet(`const { color } = Theme();`),
    div(
      ['style', 'display', 'grid'],
      ['style', 'gridTemplateColumns', 'repeat(3, minmax(0, 1fr))'],
      ['style', 'gap', '20px'],
      ['style', 'width', '100%'],
      ['style_on_winsize', 'gridTemplateColumns', calcGridColumns],
    )(...ColorList.map((c, i) => Swatch(color(c), `'${c}'`, i))),
  ),
  Section(
    Header('Override & Customize'),
    Description(`Need to break away from the main theme's color definition?`),
    Snippet(
      `const { color } = Theme({ 
  colors: { 
    // overriding red
    red: [0, 98, 44], 
    // overriding blue
    blue: [235, 100, 50], 
    // adding a custom color 
    whatevs: [313, 100, 50],
    // rest of the colors stay the same
    // ...
  }
});`,
    ),
    div(
      ['style', 'display', 'grid'],
      ['style', 'gridTemplateColumns', 'repeat(3, minmax(0, 1fr))'],
      ['style', 'gap', '20px'],
      ['style', 'width', '100%'],
      ['style_on_winsize', 'gridTemplateColumns', calcGridColumns],
    )(
      ...['red', 'blue', 'whatevs'].map((c, i) =>
        Swatch(
          Theme({
            colors: { red: [0, 98, 44], blue: [235, 100, 50], whatevs: [313, 100, 50] },
          }).color(c as any),
          `'${c}'`,
          i,
        ),
      ),
    ),
  ),
  Section(
    Header('Adust Colors'),
    Description(
      Template.Markdown(
        'Being able to add opacity or tweak a color in context goes a long to keep color definitions under control without limiting design expression. The `color` function also accepts opacity and lightness parameters.',
      ),
    ),
    Snippet(`color('blue',0.5); // at 50% opacity
color('blue',1,-10); // darkened by 10%
color('blue',0.5, 0.5); // together`),
    div(
      ['style', 'display', 'grid'],
      ['style', 'gridTemplateColumns', 'repeat(3, minmax(0, 1fr))'],
      ['style', 'gap', '20px'],
      ['style', 'width', '100%'],
      ['style_on_winsize', 'gridTemplateColumns', calcGridColumns],
    )(
      ...[
        ['blue', 0.5, 0],
        ['blue', 1, -10],
        ['blue', 0.5, -10],
      ].map((c, i) => {
        const [colorName, opacity, adjust] = c as [COLORS, number, number];
        return Swatch(color('blue', opacity, adjust), `'${colorName}',${opacity},${adjust}`, i);
      }),
    ),
  ),
);
