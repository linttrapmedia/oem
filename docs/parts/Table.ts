import { html } from '../config';

export const Table = {
  Grid: (...content: HTMLElement[]) =>
    html.div(
      ['style', 'borderRadius', '5px'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'grid'],
      ['style', 'gridTemplateColumns', '1fr 1fr'],
      ['style', 'width', '100%'],
    )(...content),
  Header: (txt: string) => html.div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt),
  Cell: (txt: HTMLElement | string) =>
    html.div(
      ['style', 'padding', '10px'],
      ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
      ['style', 'fontSize', '13px'],
      ['style:tablet', 'fontSize', '16px'],
    )(txt),
};
