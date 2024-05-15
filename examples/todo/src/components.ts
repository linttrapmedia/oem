import { html } from './template';

export const TodoView = html.div(
  ['style:mobile', 'alignItems', 'center'],
  ['style:mobile', 'display', 'flex'],
  ['style:mobile', 'flexDirection', 'column'],
  ['style:mobile', 'fontSize', '16px'],
  ['style:mobile', 'height', '100vh'],
  ['style:mobile', 'justifyContent', 'flex-start'],
  ['style:mobile', 'fontFamily', 'Arial, sans-serif'],
  ['style:mobile', 'color', 'gray'],
  ['style:mobile', 'gap', '20px'],
  ['style:mobile', 'boxSizing', 'border-box'],
  ['style:mobile', 'padding', '20px'],
)(
  html.form(
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
    ['todo:form:onsubmit'],
  )(
    html.input(
      ['attr', 'placeholder', 'New Todo'],
      ['style:mobile', 'border', '1px solid lightgray'],
      ['style:mobile', 'padding', '10px'],
      ['style:mobile', 'borderRadius', '3px'],
      ['style:mobile', 'flex', '1'],
      ['todo:input:oninput'],
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
  ),
  html.div(
    ['style:mobile', 'border', '1px solid lightgray'],
    ['style:mobile', 'borderRadius', '5px'],
    ['style:mobile', 'boxSizing', 'border-box'],
    ['style:mobile', 'padding', '20px'],
    ['style:mobile', 'maxWidth', '400px'],
    ['style:mobile', 'width', '100%'],
    [
      'todo:innerHTML',
      (todos) =>
        todos
          .sort((a, b) => a.title.localeCompare(b.title))
          .sort((a, b) => Number(a.completed) - Number(b.completed))
          .map((todo) =>
            html.div(
              ['style:mobile', 'cursor', 'pointer'],
              ['style:mobile', 'display', 'flex'],
              ['style:mobile', 'alignItems', 'center'],
              ['style:mobile', 'gap', '10px'],
              ['todo:item:onclick', todo],
            )(
              html.span(['text', '⬜️', () => !todo.completed], ['text', '✅', () => todo.completed])(),
              html.span(
                ['style:mobile', 'textDecoration', 'line-through', () => todo.completed],
                ['style:mobile', 'textDecoration', 'none', () => !todo.completed],
              )(todo.title),
            ),
          ),
    ],
  )(),
);
