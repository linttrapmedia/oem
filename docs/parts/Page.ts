import { div } from '../config';

export const Page = (...content: HTMLElement[]) =>
  div(
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'fontFamily', 'Space Grotesk'],
    ['style', 'justifyContent', 'center'],
    ['style', 'width', '100%'],
    ['style', 'gap', '30px'],
    ['style', 'maxWidth', '1000px'],
  )(...content);
