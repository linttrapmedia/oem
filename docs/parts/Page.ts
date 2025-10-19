import { html } from '../config';

export const Page = (...content: HTMLElement[]) =>
  html.div(
    ['attr', 'data-part', 'Page'],
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'justifyContent', 'center'],
    ['style', 'gap', '30px'],
    ['style', 'maxWidth', '1000px'],
    ['style', 'minWidth', 0],
  )(...content);

Page.Header = (title: string, subtitle?: string) =>
  html.div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'justifyContent', 'center'],
    ['style', 'textAlign', 'center'],
    ['style', 'gap', '10px'],
  )(
    html.h1(
      ['style', 'fontSize', '48px'],
      ['style', 'margin', '0'],
      ['style', 'padding', '0'],
      ['style', 'fontWeight', 'bold'],
    )(title),
    subtitle
      ? html.h2(
          ['style', 'fontSize', '18px'],
          ['style', 'margin', '0'],
          ['style', 'padding', '0'],
          ['style', 'fontWeight', 'normal'],
          ['style', 'opacity', 0.7],
        )(subtitle)
      : null,
  );
