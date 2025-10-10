import { div } from '../config';

export const Box = (dir: 'row' | 'column', gap: number, ...children: HTMLElement[]) =>
  div(
    ['style', 'flexDirection', dir],
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'gap', `${gap}px`],
  )(...children);
