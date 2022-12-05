import { HSLA, PAGE_WIDTH } from '../config';

export function Menu() {
  return DIV.row(50, 'center', 'space-between')
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
          .innerText('alpha'),
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
    );
}
