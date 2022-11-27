import { container } from './oem';

const num = NUMBER(1);

export const Counter = container(
  DIV.column(10).innerHtml(
    H1.innerText('Counter'),
    DIV.row(10).innerHtml(
      BUTTON.onClick(num.dec, 2).innerText('–'),
      DIV.innerText(num.get),
      BUTTON.onClick(num.inc, 1).innerText('+'),
    ),
  ),
);
