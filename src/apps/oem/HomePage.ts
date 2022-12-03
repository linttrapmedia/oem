import { HSLA, PAGE_WIDTH } from './config';
import { hsla } from './util';

declare module Prism {
  const highlight: any;
  const languages: any;
}

const heroSnippet = Prism.highlight(
  `function Counter() {
    const count = NUMBER(1);
    return DIV.append(
        BUTTON.onClick(count.dec, 2).innerText('–'),
        DIV.innerText(count.get, count),
        BUTTON.onClick(count.inc, 1).innerText('+'),
    );
  }`,
  Prism.languages[`typescript`],
);
const heroSnippetEl = document.createElement('div');
heroSnippetEl.style.whiteSpace = 'pre';
heroSnippetEl.style.color = 'white';
heroSnippetEl.style.lineHeight = '1.5em';
heroSnippetEl.innerHTML = heroSnippet;

export const HomePage = () => {
  return DIV.backgroundColor(HSLA.primary)
    .column(20, 'center', 'start')
    .style('minHeight', '100vh')
    .style('fontFamily', 'sans-serif')
    .append(
      // Banner Section
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

      // Menu Section
      DIV.row(50, 'center', 'space-between')
        .padding(20)
        .style('maxWidth', PAGE_WIDTH + 'px')
        .style('width', '100%')
        .append(
          DIV.row(10, 'center').append(
            DIV.color(HSLA.white)
              .style('fontWeight', 'bold')
              .style('fontSize', '28px')
              .style('letterSpacing', '-2px')
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

      // Hero Section
      DIV.row(50, 'center', 'center')
        .padding(30, 50, 70)
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(
          DIV.column(40, 'center', 'center')
            .color(HSLA.white)
            .style('width', '100%')
            .append(
              DIV.style('fontSize', '48px')
                .style('fontWeight', 'bold')
                .style('lineHeight', '0.9')
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
          DIV.backgroundColor(HSLA.black, 0.3)
            .padding(50)
            .style('borderRadius', '10px')
            .innerHtml(heroSnippetEl),
        ),

      // Clean Code Section
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
                  'No more one library for the dom, another for your css and another for components, routing, forms, validations with a neverending chain of stackoverflow threads, deprecations, etc...',
                ),
            ),
        ),
    );
};
