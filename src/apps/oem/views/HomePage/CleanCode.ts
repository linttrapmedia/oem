import { DIV, STRING } from '@oem';
import { Snippet } from '../../components/Snippet';
import { done, input, todo, TodoExample } from '../../components/TodoExample';
import { HSLA, PAGE_WIDTH, THEME } from '../../config';

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
    .append(

        // Input field
        INPUT
        .style('color', THEME.white.get)
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
      done.get, // list of items to render
      done, // listen for changes
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
      todo.get, // list of items to render
      todo, // listen for changes
    );
  }
  `;

const currFile = STRING(IndexSnippet);

export function CleanCode() {
  return DIV.backgroundColor(HSLA.white, 0.05)
    .padding(100, 50)
    .column(50, 'center', 'center')
    .style('color', THEME.white.get)
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
          DIV
            .style('color', THEME.white.alpha(0.5))
            .style('maxWidth', '80%')
            .style('textAlign', 'center')
            .style('fontSize', '26px')
            .innerText(
              'No more library for this or library for that, no more layers of abstractions, endless documentation and stackoverflow threads. Just clean code, clean architecture, clean components and a set of easy-to-use modules, patterns and concepts.',
            ),
          DIV.row(0)
            .backgroundColor(HSLA.black, 0.2)
            .style('borderRadius', '10px')
            .style('minHeight', '0')
            .style('alignItems', 'stretch')
            .style('alignContent', 'stretch')
            .style('flex', '1 1 auto')
            .style('height', '500px')
            .width(100)
            .append(
              DIV.column(0, 'stretch')
                .padding(30, 0)
                .style('borderTopLeftRadius', '10px')
                .style('borderBottomLeftRadius', '10px')
                .map(
                  ([fileName, i]) =>
                    DIV.row(10)
                      .onClick(() => currFile.set(i))
                      .padding(10, 30)
                      .backgroundColor(HSLA.black, 0.2, 0, currFile.cb('eq', i))
                      .backgroundColor(HSLA.black, 0, 0, currFile.cb('neq', i))
                      .backgroundColor(HSLA.black, 0.2, 0, 'hover')
                      .style('cursor', 'pointer')
                      .append(
                        DIV.fontSize(8)
                          .backgroundColor(HSLA.secondary, 1, -15)
                          .style('color', THEME.black.get)
                          .style('borderRadius', '2px')
                          .padding(3)
                          .innerText('TS'),
                        DIV.style('color', THEME.white.alpha(0.35)).innerText(fileName),
                      ),
                  [
                    ['index.ts', IndexSnippet],
                    ['Form.ts', FormSnippet],
                    ['Lists.ts', ListsSnippet],
                  ],
                  currFile,
                ),
              DIV.padding(30)
                .style('flex', '1')
                .backgroundColor(HSLA.black, 0.2)
                .style('overflow', 'auto')
                .innerHtml(() => Snippet(currFile.val), currFile),
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
                    .style('color', THEME.white.alpha(0.25))
                    .style('color', THEME.white.get, 'hover')
                    .onClick(todo.reset)
                    .onClick(done.reset)
                    .onClick(input.reset)
                    .innerText('Reset'),
                ),
            ),
        ),
    );
}
