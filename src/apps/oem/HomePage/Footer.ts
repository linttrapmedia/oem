import { HSLA, PAGE_WIDTH } from '../config';

export function Footer() {
  return DIV.column(20, 'center')
    .width('100%')
    .backgroundColor(HSLA.secondary, 0.3, -70)
    .append(
      DIV.padding(50)
        .row(20, 'center', 'center')
        .width('100%')
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(
          DIV.append(
            DIV.color(HSLA.white)
              .style('fontSize', '28px')
              .innerText('Get Started in 3,2,1...'),
            DIV.row(5)
              .style('fontSize', '18px')
              .color(HSLA.white, 0.4)
              .append(
                SPAN.innerText('Don’t forget to checkout the '),
                A.attr('href', '').color(HSLA.white).innerText('Docs'),
                SPAN.innerText('and'),
                A.attr('href', '').color(HSLA.white).innerText('Design System'),
              ),
          ),
          DIV.backgroundColor(HSLA.white, 0.2)
            .padding(30)
            .style('borderRadius', '10px')
            .style('flex', '1')
            .innerText('install'),
        ),
      DIV.row(20, 'center', 'center').innerText('Newsletter'),
      DIV.row(20, 'center', 'center').innerText('Copyright'),
      DIV.row(20, 'center', 'center').innerText('Logos'),
    );
}
