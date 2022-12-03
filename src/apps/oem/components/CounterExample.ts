export function CounterExample() {
  const count = NUMBER(100);
  return DIV.onClick(count.inc, 1)
    .style('fontSize', '24px')
    .style('cursor', 'pointer')
    .innerText(count.get, count);
}
