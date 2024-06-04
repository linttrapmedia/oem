import { html } from '../template';

export const TodoForm = html.form(
  ['style:mobile', 'backgroundColor', '#f2f2f2'],
  ['style:mobile', 'border', '1px solid lightgray'],
  ['style:mobile', 'borderRadius', '5px'],
  ['style:mobile', 'padding', '20px'],
  ['style:mobile', 'display', 'flex'],
  ['style:mobile', 'gap', '10px'],
  ['style:mobile', 'maxWidth', '400px'],
  ['style:mobile', 'width', '100%'],
  ['style:mobile', 'marginBlockEnd', '0'],
  ['style:mobile', 'boxSizing', 'border-box'],
  ['todo__form:onsubmit'],
)(
  html.input(
    ['attr', 'placeholder', 'New Todo'],
    ['style:mobile', 'border', '1px solid lightgray'],
    ['style:mobile', 'padding', '10px'],
    ['style:mobile', 'borderRadius', '3px'],
    ['style:mobile', 'flex', '1'],
    ['todo__form__input:oninput'],
  )(),
  html.button(
    ['attr', 'type', 'submit'],
    ['style:mobile', 'border', '1px solid lightgray'],
    ['style:mobile', 'borderRadius', '3px'],
    ['style:mobile', 'padding', '10px'],
    ['style:mobile', 'backgroundColor', 'lightgray'],
    ['style:mobile', 'fontWeight', 'bold'],
    ['style:mobile', 'cursor', 'pointer'],
  )('Submit'),
);
