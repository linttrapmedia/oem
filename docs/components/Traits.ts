import { div } from '../config';

const Header = (txt: string) => div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: string) =>
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
      div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Standard Traits'),
      div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `Traits are functions that are responsible for attaching a single behavior and/or trait to an html element. The following is a list of all the standard traits that come with OEM by default.`,
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
        Cell('useAttribute'),
        Cell('Apply attributes'),
        Cell('useClassName'),
        Cell('Apply class names'),
        Cell('useEvent'),
        Cell('Attach event listener'),
        Cell('useText'),
        Cell('Apply inner text'),
        Cell('useStyle'),
        Cell('Apply styles'),
      ),
    ),
  );
