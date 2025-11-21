import { html } from '../config';

export const Para = (text: string) =>
  html.div(
    ['style', 'fontSize', '16px'],
    ['style', 'opacity', 0.5],
    ['style', 'textAlign', 'center'],
    ['style', 'padding', '10px 20px 20px 20px'],
  )(text);

export const InlineCode = (text: string) =>
  html.code(
    ['style', 'backgroundColor', 'rgba(0,0,0,0.1)'],
    ['style', 'borderRadius', '3px'],
    ['style', 'fontFamily', 'monospace'],
    ['style', 'fontSize', '14px'],
    ['style', 'padding', '2px 5px'],
    ['style', 'margin', '0 2px'],
  )(text);

export const Note = (...children: any[]) =>
  html.small(
    ['style', 'display', 'block'],
    ['style', 'fontSize', '13px'],
    ['style', 'opacity', 0.5],
    ['style', 'textAlign', 'center'],
    ['style', 'padding', '20px'],
    ['style', 'marginBottom', '20px'],
    ['style', 'backgroundColor', 'rgba(0,0,0,0.1)'],
  )(...children);
