import { render } from './lib';

const num = NUMBER.set(1);

render(
  DIV.row(10).innerHtml(
    BUTTON.onClick(num.dec, 2).innerText('–'),
    DIV.innerText(num.get),
    BUTTON.onClick(num.inc, 1).innerText('+'),
  ),
);
