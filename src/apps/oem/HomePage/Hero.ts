import { CounterExample } from '../components/CounterExample';
import { Snippet } from '../components/Snippet';
import { HSLA, PAGE_WIDTH } from '../config';
import { hsla } from '../util';

export function Hero() {
  return DIV.row(50, 'center', 'center')
    .padding(30, 50, 70)
    .style('maxWidth', PAGE_WIDTH + 'px')
    .append(
      DIV.column(40, 'start', 'start')
        .color(HSLA.white)
        .style('width', '100%')
        .append(
          DIV.style('fontSize', '64px')
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
              .styleOnHover('backgroundColor', hsla(HSLA.white))
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
              .styleOnHover('color', hsla(HSLA.white))
              .innerText('Design'),
          ),
        ),
      COMMENT('Example'),
      DIV.column(20).append(
        DIV.backgroundColor(HSLA.black, 0.2)
          .padding(40)
          .style('borderRadius', '10px')
          .append(
            Snippet(`function Counter() {
  const count = NUMBER(100);
  return DIV
      .onClick(count.inc, 1)
      .style('fontSize', '24px')
      .style('cursor', 'pointer')
      .innerText(count.get, count);
}`),
          ),
        DIV.row(20, 'center', 'space-between')
          .style('borderRadius', '10px')
          .append(
            DIV.style('borderRadius', '10px')
              .backgroundColor(HSLA.accent, 0.05)
              .color(HSLA.white, 0.25)
              .styleOnHover('color', hsla(HSLA.white))
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
    );
}
