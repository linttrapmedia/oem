import { render } from './lib';

const num = NUMBER.set(1);

render(
  DIV.column(10).innerHtml(
    H1.innerText('Counter'),
    BUTTON.onClick(num.inc, 1).innerText('Increment'),
    DIV.innerText(num.val),
    BUTTON.innerText('Decrement'),
  ),
);
