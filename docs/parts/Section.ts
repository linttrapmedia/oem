import { html } from '../config';

export const Section = ({ content, title, subtitle }: { title: string; subtitle?: string; content?: HTMLElement }) =>
  html.div(
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
  )(
    html.div(['style', 'fontSize', '32px'], ['style', 'textAlign', 'center'])(title),
    subtitle &&
      html.div(
        ['style', 'fontSize', '16px'],
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
        ['style', 'padding', '10px 20px 20px 20px'],
      )(subtitle),
    html.div(
      ['style', 'flexDirection', 'column'],
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
    )(content),
  );
