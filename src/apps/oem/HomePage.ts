import { CounterExample } from './components/CounterExample';
import { HSLA, PAGE_WIDTH } from './config';
import { hsla } from './util';

declare module Prism {
  const highlight: any;
  const languages: any;
}

const counterSnippet = Prism.highlight(
  `function Counter() {
      const count = NUMBER(100);
      return DIV
          .onClick(count.inc, 1)
          .style('fontSize', '24px')
          .style('cursor', 'pointer')
          .innerText(count.get, count);
  }`,
  Prism.languages[`typescript`],
);

const counterSnippetEl = document.createElement('div');
counterSnippetEl.style.whiteSpace = 'pre';
counterSnippetEl.style.color = 'white';
counterSnippetEl.style.lineHeight = '1.5em';
counterSnippetEl.innerHTML = counterSnippet;

const todoSnippet = Prism.highlight(
  `function TodoExample() {
    const input = STRING('');
    const todo = ARRAY<string>(['todo1', 'todo2']);
    const done = ARRAY<string>(['todo3']);
  
    return FORM.onSubmit()
      .column(10)
      .append(
        DIV.row(10).append(
          INPUT.onInput(input.set).value(input.get),
          BUTTON.onClick(todo.push, input.get)
            .onClick(input.reset)
            .innerText('Add'),
        ),
        DIV.column(10).map(
          (item) =>
            DIV.style('cursor', 'pointer')
              .onClick((item) => todo.filter((i) => i !== item), item)
              .onClick((item) => done.push(item), item)
              .innerText(item),
          todo.get,
          todo,
        ),
        DIV.column(10).map(
          (item) =>
            DIV.style('cursor', 'pointer')
              .style('textDecoration', 'line-through')
              .style('color', 'red')
              .onClick((item) => done.filter((i) => i !== item), item)
              .onClick((item) => todo.push(item), item)
              .innerText(item),
          done.get,
          done,
        ),
      );
  }
  `,
  Prism.languages[`typescript`],
);
const todoSnippetEl = document.createElement('div');
todoSnippetEl.style.whiteSpace = 'pre';
todoSnippetEl.style.color = 'white';
todoSnippetEl.style.lineHeight = '1.5em';
todoSnippetEl.innerHTML = todoSnippet;

export const HomePage = () => {
  return DIV.backgroundColor(HSLA.primary)
    .column(20, 'center', 'start')
    .style('minHeight', '100vh')
    .style('fontFamily', 'sans-serif')
    .append(
      COMMENT('Banner Section'),
      DIV.row(20, 'start', 'center')
        .padding(20)
        .backgroundColor(HSLA.secondary, 0.05)
        .style('width', '100%')
        .append(
          DIV.row(20, 'center', 'end')
            .width('100%')
            .style('maxWidth', PAGE_WIDTH + 'px')
            .append(
              A.color(HSLA.secondary, 0.5)
                .attr('href', 'http://github.com/linttrapmedia/oem')
                .style('textDecoration', 'none')
                .styleOnHover('color', hsla(HSLA.white))
                .innerText('Become a contributor 💡'),
              BUTTON.backgroundColor(HSLA.secondary, 0.15)
                .color(HSLA.secondary)
                .padding(5, 10)
                .style('border', '0')
                .style('borderRadius', '3px')
                .style('cursor', 'pointer')
                .styleOnHover('color', hsla(HSLA.white))
                .styleOnHover('backgroundColor', hsla(HSLA.white, 0.3))
                .innerText('Learn More'),
            ),
        ),

      COMMENT('Menu Section'),
      DIV.row(50, 'center', 'space-between')
        .padding(20)
        .style('maxWidth', PAGE_WIDTH + 'px')
        .style('width', '100%')
        .append(
          DIV.row(10, 'center').append(
            DIV.color(HSLA.white)
              .style('fontWeight', 'bold')
              .style('fontSize', '28px')
              .style('textTransform', 'uppercase')
              .style('fontFamily', 'Courier')
              .innerText('oem'),
            DIV.color(HSLA.secondary, 0.5)
              .style('fontWeight', 'bold')
              .style('fontSize', '10px')
              .style('textTransform', 'uppercase')
              .innerText('beta'),
          ),
          DIV.row(50).map(
            ([label, href]) =>
              A.attr('href', href)
                .color(HSLA.white, 0.85)
                .style('textDecoration', 'none')
                .style('textTransform', 'uppercase')
                .style('fontWeight', 'bold')
                .style('whiteSpace', 'nowrap')
                .styleOnHover('opacity', '0.5')
                .innerText(label),
            [
              ['Get Started', 'menulink'],
              ['Html', 'menulink'],
              ['State', 'menulink'],
              ['Styling', 'menulink'],
            ],
          ),
        ),

      COMMENT('Hero Section'),
      DIV.row(50, 'center', 'center')
        .padding(30, 50, 70)
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(
          DIV.column(40, 'start', 'start')
            .color(HSLA.white)
            .style('width', '100%')
            .append(
              DIV.style('fontSize', '48px')
                .style('fontWeight', 'bold')
                .style('lineHeight', '0.9')
                .style('textTransform', 'uppercase')
                .innerText('Build apps that will stand the test of time'),
              DIV.color(HSLA.white, 0.5)
                .style('fontSize', '20px')
                .innerText(
                  'OEM is a dependency-free UI/UX framework that allows you to write complex html, css and javascript in a single declarative syntax that’s easy on the eyes and easy on the brain.',
                ),
              DIV.row(20).append(
                BUTTON.backgroundColor(HSLA.secondary)
                  .style('border', 'none')
                  .style('width', '200px')
                  .style('height', '60px')
                  .style('fontSize', '18px')
                  .style('borderRadius', '8px')
                  .style('cursor', 'pointer')
                  .style('fontFamily', 'courier')
                  .style('textTransform', 'uppercase')
                  .style('letterSpacing', '1px')
                  .style('fontWeight', 'bold')
                  .styleOnHover('backgroundColor', hsla(HSLA.secondary, 0.7))
                  .innerText('Docs'),
                BUTTON.backgroundColor(HSLA.black, 0.2)
                  .color(HSLA.secondary)
                  .style('border', 'none')
                  .style('width', '200px')
                  .style('height', '60px')
                  .style('fontSize', '18px')
                  .style('borderRadius', '8px')
                  .style('fontFamily', 'courier')
                  .style('cursor', 'pointer')
                  .style('textTransform', 'uppercase')
                  .style('letterSpacing', '1px')
                  .style('fontWeight', 'bold')
                  .styleOnHover('backgroundColor', hsla(HSLA.black, 0.3))
                  .innerText('Design'),
              ),
            ),
          COMMENT('Example'),
          DIV.column(20).append(
            DIV.backgroundColor(HSLA.black, 0.2)
              .padding(40)
              .style('borderRadius', '10px')
              .append(counterSnippetEl),
            DIV.row(20, 'center', 'space-between')
              .style('borderRadius', '10px')
              .append(
                DIV.style('borderRadius', '10px')
                  .backgroundColor(HSLA.accent, 0.05)
                  .color(HSLA.white, 0.25)
                  .padding(20)
                  .append(CounterExample()),
                DIV.row(10, 'center', 'center')
                  .color(HSLA.white, 0.25)
                  .append(
                    SPAN.style('fontSize', '24px').innerText('👈'),
                    SPAN.innerText('Click to increment'),
                  ),
              ),
          ),
        ),

      COMMENT('Clean Code Section'),
      DIV.backgroundColor(HSLA.white, 0.05)
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
              DIV.backgroundColor(HSLA.black, 0.5)
                .width('100%')
                .style('borderRadius', '10px')
                .row(0)
                .append(
                  DIV.column(0)
                    .padding(30, 0)
                    .style('borderTopLeftRadius', '10px')
                    .style('borderBottomLeftRadius', '10px')
                    .style('height', '100%')
                    .map(
                      ([fileName, isCurrent]) =>
                        DIV.row(10, 'center')
                          .style('cursor', 'pointer')
                          .padding(10, 30)
                          .styleOnHover(
                            'backgroundColor',
                            hsla(HSLA.white, 0.05),
                          )
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
                        ['Main.ts', true],
                        ['Form.ts'],
                        ['TodoList.ts'],
                        ['DoneList.ts'],
                      ],
                    ),
                  DIV.padding(30)
                    .style('height', '100%')
                    .backgroundColor(HSLA.black, 0.4)
                    .append(todoSnippetEl),
                  DIV.padding(30)
                    .style('flex', '1')
                    .style('height', '100%')
                    .innerText('result'),
                ),
            ),
        ),
    );
};
