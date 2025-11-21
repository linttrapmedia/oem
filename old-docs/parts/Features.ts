import { html } from '../config';

export const Features = () =>
  html.div(
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'borderRadius', '5px'],
    ['style', 'display', 'grid'],
    ['style', 'display', 'flex'],
    ['style', 'flexWrap', 'wrap'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'gap', '5px'],
    ['style', 'justifyContent', 'center'],
    ['style', 'width', '100%'],
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
      html.div(
        ['style', 'alignItems', 'center'],
        ['style', 'backgroundColor', 'black'],
        ['style', 'boxSizing', 'border-box'],
        ['style', 'borderRadius', '20px'],
        ['style', 'display', 'flex'],
        ['style', 'fontSize', '13px'],
        ['style', 'gap', '10px'],
        ['style', 'justifyContent', 'center'],
        ['style', 'border', 'none'],
        ['style', 'border', '1px solid rgba(255,255,255,0.3)'],
        ['style', 'padding', '10px 15px'],
        ['style', 'color', 'white'],
      )(html.span(['style', 'fontSize', '11px'])(icon), html.span(['style', 'fontWeight', 'bold'])(feature)),
    ),
  );
