import { html } from '../config';

export const Section = ({ content, title, subtitle }: { title: string; subtitle?: string; content?: HTMLElement }) =>
  html.div(
    ['attr', 'data-part', 'Section'],
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'minWidth', 0],
  )(
    html.h2(
      ['style', 'fontSize', '32px'],
      ['style', 'textAlign', 'center'],
      ['style', 'padding', 0],
      ['style', 'margin', 0],
    )(title),
    subtitle &&
      html.div(
        ['style', 'fontSize', '16px'],
        ['style', 'opacity', 0.5],
        ['style', 'textAlign', 'center'],
        ['style', 'padding', '10px 20px 20px 20px'],
      )(subtitle),
    html.div(
      ['attr', 'data-part', 'SectionContent'],
      ['style', 'flexDirection', 'column'],
      ['style', 'alignItems', 'center'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'flex'],
      ['style', 'fontFamily', 'Space Grotesk'],
      ['style', 'justifyContent', 'center'],
      ['style', 'width', '100%'],
      ['style', 'display', 'flex'],
      ['style', 'minWidth', 0],
    )(content),
  );
