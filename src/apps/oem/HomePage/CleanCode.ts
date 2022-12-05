import { Snippet } from '../components/Snippet';
import { done, input, todo, TodoExample } from '../components/TodoExample';
import { HSLA, PAGE_WIDTH } from '../config';
import { hsla } from '../util';

const IndexSnippet = `const input = STRING('');
const todo = ARRAY<string>(['Call mom', 'Buy milk']);
const done = ARRAY<string>(['Learn OEM']);

function TodoExample() {
  return FORM.onSubmit()
    .column(10)
    .append(
      Form(input, todo),
      TodoList(input, todo, done),
      DoneList(input, todo, done),
    );
}
`;

const FormSnippet = `function Form(input: OEM.STRING, todo: OEM.ARRAY<string>) {
  
    // Wrapper
  return DIV.row(10)
    .width('100%')
    .append(

        // Input field
        INPUT
        .color(HSLA.white)
        .padding(10)
        .onInput(input.set)
        .style('background', 'transparent')
        .style('border', \`1px solid \${hsla(HSLA.white, 0.2)}\`)
        .style('borderRadius', '5px')
        .style('width', '100%')
        .style('flex', '1')
        .value(input.get),
        
        // Add button
        BUTTON
        .padding(10)
        .onClick(todo.push, input.get)
        .onClick(input.reset)
        .style('border', \`1px solid \${hsla(HSLA.white, 0.2)}\`)
        .style('borderRadius', '5px')
        .style('cursor', 'pointer')
        .innerText('Add'),
        
    );
}
`;
const ListsSnippet = `function DoneList(
    input: OEM.STRING,
    todo: OEM.ARRAY<string>,
    done: OEM.ARRAY<string>,
  ) {
    return DIV.column(10).map(
      (item) =>
        DIV
        .onClick((item) => done.filter((i) => i !== item), item)
        .onClick((item) => todo.push(item), item)
        .style('cursor', 'pointer')
        .style('textDecoration', 'line-through')
        .style('opacity', '0.3')
        .innerText(item),
      done.get,
      done,
    );
  }
  
  export function TodoList(
    input: OEM.STRING,
    todo: OEM.ARRAY<string>,
    done: OEM.ARRAY<string>,
  ) {
    return DIV.column(10).map(
      (item) =>
        DIV
        .onClick((item) => todo.filter((i) => i !== item), item)
        .onClick((item) => done.push(item), item)
        .style('cursor', 'pointer')
        .innerText(item),
      todo.get,
      todo,
    );
  }
  `;
const currentSnippet = STRING(IndexSnippet);

export function CleanCode() {
  return DIV.backgroundColor(HSLA.white, 0.05)
    .padding(100, 0)
    .column(50, 'center', 'center')
    .color(HSLA.white)
    .style('width', '100%')
    .append(
      DIV.column(50, 'center', 'center')
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(
          DIV.style('maxWidth', '80%')
            .style('fontSize', '64px')
            .style('fontWeight', 'bold')
            .style('textAlign', 'center')
            .innerText('Clean Code'),
          DIV.color(HSLA.white, 0.5)
            .style('maxWidth', '80%')
            .style('textAlign', 'center')
            .style('fontSize', '26px')
            .innerText(
              'No more library for this or library for that, no more layers of abstractions, endless documentation and stackoverflow threads. Just clean code, clean architecture and clean components well documented with simple usage patterns and concepts.',
            ),
          DIV.row(0)
            .backgroundColor(HSLA.black, 0.2)
            .width('100%')
            .style('borderRadius', '10px')
            .style('minHeight', '0')
            .style('alignItems', 'stretch')
            .style('alignContent', 'stretch')
            .style('flex', '1 1 auto')
            .style('height', '500px')
            .append(
              DIV.column(0)
                .padding(30, 0)
                .style('borderTopLeftRadius', '10px')
                .style('borderBottomLeftRadius', '10px')
                .map(
                  ([fileName, snippet]) =>
                    DIV.row(10, 'center')
                      .onClick(() => currentSnippet.set(snippet))
                      .style('cursor', 'pointer')
                      .padding(10, 30)
                      .style(
                        'backgroundColor',
                        currentSnippet.val === snippet
                          ? hsla(HSLA.black, 0.2)
                          : 'transparent',
                      )
                      .styleOnHover('backgroundColor', hsla(HSLA.white, 0.05))
                      .width('100%')
                      .append(
                        DIV.style('fontSize', '8px')
                          .backgroundColor(HSLA.secondary, 1, -15)
                          .color(HSLA.black)
                          .style('borderRadius', '2px')
                          .padding(3)
                          .innerText('TS'),
                        DIV.color(HSLA.white, 0.35).innerText(fileName),
                      ),
                  [
                    ['index.ts', IndexSnippet],
                    ['Form.ts', FormSnippet],
                    ['Lists.ts', ListsSnippet],
                  ],
                  currentSnippet,
                ),
              DIV.padding(30)
                .style('flex', '1')
                .backgroundColor(HSLA.black, 0.2)
                .style('overflow', 'auto')
                .innerHtml(() => Snippet(currentSnippet.val), currentSnippet),
              DIV.padding(30)
                .style('flex', '1fr')
                .style('overflow', 'auto')
                .style('position', 'relative')
                .append(
                  TodoExample(),
                  DIV.style('position', 'absolute')
                    .style('bottom', '20px')
                    .style('right', '20px')
                    .style('cursor', 'pointer')
                    .color(HSLA.white, 0.25)
                    .styleOnHover('color', hsla(HSLA.white))
                    .onClick(todo.reset)
                    .onClick(done.reset)
                    .onClick(input.reset)
                    .innerText('Reset'),
                ),
            ),
        ),
    );
}
