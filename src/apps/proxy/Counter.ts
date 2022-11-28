import { COMP } from './oem';

export const Counter = COMP(() => {
  const num = NUMBER(1);
  return DIV.row(10).append(
    BUTTON.onClick(num.dec, 2).innerText('–'),
    DIV.innerText(num.get, num),
    BUTTON.onClick(num.inc, 1).innerText('+'),
  );
});
