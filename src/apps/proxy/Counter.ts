import { COMPONENT } from './oem';

export const Counter = COMPONENT(() => {
  const num = NUMBER(1);
  return DIV.row(10).append(
    H1.innerText('Counter'),
    BUTTON.onClick(num.dec, 2).innerText('–'),
    DIV.innerText(num.get, num),
    BUTTON.onClick(num.inc, 1).innerText('+'),
  );
});
