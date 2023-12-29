import { span } from 'docs/config';

export const Code = (txt: string) =>
  span(
    ['style', 'fontFamily', 'monospace'],
    ['style', 'fontWeight', 'bold'],
    ['style', 'opacity', 1],
    ['style', 'backgroundColor', 'rgba(0,0,0,0.2)'],
  )(txt);
