import { a, div } from '../config';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: HTMLElement | string) =>
  div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(txt);

export const Traits = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
  )(
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])(`It's All About "Traits"`),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `Traits are small testable functions that are responsible for attaching behaviors to html elements. OEM comes with a handful of traits out of the box, but you can easily write your own.`,
      ),
      div(
        ['style', 'borderRadius', '5px'],
        ['style', 'boxSizing', 'border-box'],
        ['style', 'display', 'grid'],
        ['style', 'gridTemplateColumns', '1fr 1fr'],
        ['style', 'width', '100%'],
      )(
        Header('Trait'),
        Header('Description'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Style.ts'],
            ['attr', 'target', '_blank'],
          )('useAttribute'),
        ),
        Cell('Apply attributes'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/ClassName.ts'],
            ['attr', 'target', '_blank'],
          )('useClassName'),
        ),
        Cell('Apply class names'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Event.ts'],
            ['attr', 'target', '_blank'],
          )('useEvent'),
        ),
        Cell('Attach event listener'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/InnerHTML.ts'],
            ['attr', 'target', '_blank'],
          )('useInnerHTML'),
        ),
        Cell('Attach event listener'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Text.ts'],
            ['attr', 'target', '_blank'],
          )('useText'),
        ),
        Cell('Apply inner text'),
        Cell(
          a(
            ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Style.ts'],
            ['attr', 'target', '_blank'],
          )('useStyle'),
        ),
        Cell('Apply styles'),
      ),
    ),
  );
