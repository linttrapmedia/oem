import { svg } from '../config';

export const Svg = () =>
  html.div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '50px'],
    ['style', 'justifyContent', 'center'],
  )(
    html.div(
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'column'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'gap', '20px'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(
      html.div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])('Works With SVG Too'),
      html.div(
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
      )(
        `Working with SVG is just as easy as working with HTML. Just use the SVG function instead of the HTML function.`,
      ),
      html.div(['style', 'fontSize', '21px'], ['style', 'textAlign', 'center'])('Example'),
      svg.svg(
        ['attr', 'height', '50'],
        ['attr', 'width', '200'],
        ['event', 'click', () => alert('You clicked me!')],
        ['style', 'backgroundColor', 'black'],
        ['style', 'borderRadius', '5px'],
        ['style', 'cursor', 'pointer'],
        ['style', 'fill', 'white'],
        ['style', 'transition', 'all 0.3s, fill 0.3s'],
        ['style:mouseout', 'backgroundColor', 'black'],
        ['style:mouseover', 'backgroundColor', 'red'],
      )(svg.text(['attr', 'x', 100], ['attr', 'y', 30], ['style', 'textAnchor', 'middle'])('Click Me')),
      html.div(['style', 'fontSize', '21px'], ['style', 'textAlign', 'center'])('Source'),

      html.div(['prism'])(`svg(
    ['attr', 'height', '50'],
    ['attr', 'width', '200'],
    ['click', () => alert('You clicked me!')],
    ['style', 'backgroundColor', 'black'],
    ['style', 'borderRadius', '5px'],
    ['style', 'cursor', 'pointer'],
    ['style', 'fill', 'white'],
    ['style', 'transition', 'all 0.3s, fill 0.3s'],
    ['style:mouseout', 'backgroundColor', 'black'],
    ['style:mouseover', 'backgroundColor', 'red'],
)(text(
    ['attr', 'x', 100], 
    ['attr', 'y', 30], 
    ['style', 'textAnchor', 'middle'])('Click Me'))`),
    ),
  );
