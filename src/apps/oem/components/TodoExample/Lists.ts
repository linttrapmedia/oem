import { DIV } from '@oem';

export function DoneList(input: OEM.STRING, todo: OEM.ARRAY<string>, done: OEM.ARRAY<string>) {
  return DIV.column(10).map(
    (item) =>
      DIV.style('cursor', 'pointer')
        .style('textDecoration', 'line-through')
        .style('opacity', '0.3')
        .onClick((item) => done.filter((i) => i !== item), item)
        .onClick((item) => todo.push(item), item)
        .innerText(item),
    done.get,
    done,
  );
}

export function TodoList(input: OEM.STRING, todo: OEM.ARRAY<string>, done: OEM.ARRAY<string>) {
  return DIV.column(10).map(
    (item) =>
      DIV.style('cursor', 'pointer')
        .onClick((item) => todo.filter((i) => i !== item), item)
        .onClick((item) => done.push(item), item)
        .innerText(item),
    todo.get,
    todo,
  );
}
