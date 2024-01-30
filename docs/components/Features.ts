import { div, span } from '..//config';

export const Features = () =>
  div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'borderRadius', '5px'],
    ['style', 'display', 'grid'],
    ['style', 'display', 'flex'],
    ['style', 'flexWrap', 'wrap'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'gap', '10px'],
    ['style', 'justifyContent', 'center'],
    ['style', 'padding', '20px'],
    ['style', 'width', '100%'],
    ['style', 'backgroundColor', 'black'],
  )(
    ...[
      ['💫', 'Reactive DOM'],
      ['💅', 'Responsive Styles'],
      ['📼', 'State Management'],
      ['🕊️', 'No Dependencies'],
      ['🪶', 'Flyweight Size'],
      ['🧱', 'Isomorphic Syntax'],
      ['🧩', 'Typescript'],
      ['🤖', 'AI-Friendly'],
      ['🔒', 'Secure'],
      ['🧪', '100% Test Coverage'],
      ['💩', 'No Virtual DOM'],
    ].map(([icon, feature]) =>
      div(
        ['style', 'alignItems', 'center'],
        ['style', 'backgroundColor', 'transparent'],
        ['style', 'boxSizing', 'border-box'],
        ['style', 'borderRadius', '20px'],
        ['style', 'cursor', 'pointer'],
        ['style', 'display', 'flex'],
        ['style', 'fontSize', '13px'],
        ['style', 'gap', '10px'],
        ['style', 'justifyContent', 'center'],
        ['style:mouseover', 'backgroundColor', 'white'],
        ['style:mouseover', 'color', 'black'],
        ['style:mouseout', 'backgroundColor', 'transparent'],
        ['style:mouseout', 'color', 'white'],
        ['style', 'border', 'none'],
        ['style', 'padding', '0'],
        ['style:tablet', 'border', '1px solid rgba(255,255,255,0.3)'],
        ['style:tablet', 'padding', '5px 10px'],
        ['style', 'color', 'white'],
      )(span(['style', 'fontSize', '11px'])(icon), span(['style', 'fontWeight', 'bold'])(feature)),
    ),
  );
