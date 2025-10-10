import { div } from '../config';

export const Header = ({ title, subtitle }: { title: string; subtitle?: string }) =>
  div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'alignItems', 'center'],
    ['style', 'justifyContent', 'center'],
  )(
    div(
      ['style', 'lineHeight', 1.25],
      ['style', 'margin', '0px 20px 0px 20px'],
      ['style', 'borderRadius', '10px'],
      ['style', 'textAlign', 'center'],
      ['style', 'fontWeight', '300'],
      ['style:tablet', 'fontSize', '32px'],
      ['style:tablet', 'marginTop', '0px'],
      ['style:tablet', 'marginBottom', '0px'],
    )(title),
    subtitle &&
      div(
        ['style', 'lineHeight', 1.25],
        ['style', 'margin', '0px 20px 0px 20px'],
        ['style', 'borderRadius', '10px'],
        ['style', 'textAlign', 'center'],
        ['style', 'fontWeight', '300'],
        ['style:tablet', 'marginTop', '0px'],
        ['style:tablet', 'marginBottom', '0px'],
        ['style:tablet', 'fontSize', '21px'],
      )(subtitle),
  );
