import { div } from '../config';

export const Para = (text: string) =>
  div(
    ['style', 'fontSize', '16px'],
    ['style', 'opacity', 0.5],
    ['style', 'textAlign', 'center'],
    ['style', 'padding', '10px 20px 20px 20px'],
  )(text);
