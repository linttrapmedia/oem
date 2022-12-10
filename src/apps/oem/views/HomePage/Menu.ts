import Model from '@apps/oem/models/Model';
import { HSLA, PAGE_WIDTH } from '../../config';

export function Menu() {
  return DIV.row(50, 'center', 'space-between')
    .style('justifyContent', 'center', Model.mobileBreakpoint)
    .style('justifyContent', 'space-between', Model.tabletBreakpoint)
    .padding(20, 50)
    .style('maxWidth', PAGE_WIDTH + 'px')
    .style('width', '100%')
    .append(
      DIV.row(10, 'center').append(
        DIV.color(HSLA.white)
          .style('fontWeight', 'bold')
          .style('fontSize', '28px')
          .style('fontSize', '48px', Model.mobileBreakpoint)
          .style('fontSize', '28px', Model.tabletBreakpoint)
          .style('textTransform', 'uppercase')
          .style('fontFamily', 'Courier')
          .innerText('oem'),
        DIV.color(HSLA.secondary, 0.5)
          .style('fontWeight', 'bold')
          .style('fontSize', '10px')
          .style('textTransform', 'uppercase')
          .innerText('alpha'),
      ),
      DIV.row(50)
        .style('display', 'none', Model.mobileBreakpoint)
        .style('display', 'flex', Model.tabletBreakpoint)
        .map(
          ([label, href]) =>
            A.attr('href', href)
              .color(HSLA.white, 0.85)
              .style('textDecoration', 'none')
              .style('textTransform', 'uppercase')
              .style('fontWeight', 'bold')
              .style('whiteSpace', 'nowrap')
              .style('opacity', '0.5', 'mouseenter')
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
