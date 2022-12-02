export const CounterExample = COMPONENT(() => {
  const count = NUMBER(1);
  return DIV.column(10).append(
    DIV.row(10).append(
      BUTTON.onClick(count.dec, 2).innerText('–'),
      DIV.innerText(count.get, count),
      BUTTON.onClick(count.inc, 1).innerText('+'),
    ),
  );
});
