import { HSLA } from '@apps/oem/config';
import { BUTTON, DIV, INPUT } from '@oem';

export function Form(input: OEM.STRING, todo: OEM.ARRAY<string>) {
  return DIV.row(10)
    .width(100)
    .append(
      INPUT.attr('value', input.get())
        .style('background', 'transparent')
        .style('border', `1px solid ${HSLA.white}`)
        .style('borderRadius', '5px')
        .style('width', '100%')
        .style('flex', '1')
        .color(HSLA.white)
        .padding(10)
        .onInput(input.set)
        .render(),
      BUTTON.style('border', `1px solid ${HSLA.white}`)
        .style('borderRadius', '5px')
        .style('cursor', 'pointer')
        .padding(10)
        .onClick(todo.push, input.get)
        .onClick(input.reset)
        .innerText('Add'),
    );
}
