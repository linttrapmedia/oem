import { html } from '../config';

export const Box = (dir: 'row' | 'column', gap: number, ...children: HTMLElement[]) =>
  html.div(
    ['attr', 'data-part', 'Box'],
    ['style', 'flexDirection', dir],
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'grid'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'gap', `${gap}px`],
    ['style', 'minWidth', 0],
    ['style', 'overflow', 'hidden'],
    ['style', 'width', '100%'],
    ['style', 'alignItems', 'stretch'],
  )(...children);
