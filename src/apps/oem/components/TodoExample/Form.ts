import { HSLA } from '@apps/oem/config';
import { hsla } from '@apps/oem/util';

export function Form(input: OEM.STRING, todo: OEM.ARRAY<string>) {
  return DIV.row(10)
    .width('100%')
    .append(
      INPUT.style('background', 'transparent')
        .style('border', `1px solid ${hsla(HSLA.white, 0.2)}`)
        .style('borderRadius', '5px')
        .style('width', '100%')
        .style('flex', '1')
        .color(HSLA.white)
        .padding(10)
        .onInput(input.set)
        .value(input.get),
      BUTTON.style('border', `1px solid ${hsla(HSLA.white, 0.2)}`)
        .style('borderRadius', '5px')
        .style('cursor', 'pointer')
        .padding(10)
        .onClick(todo.push, input.get)
        .onClick(input.reset)
        .innerText('Add'),
    );
}
