import Model from '@apps/oem/models/Model';
import { A, DIV } from '@oem';
import { HSLA, PAGE_WIDTH, THEME } from '../../config';

export function Menu() {
  return DIV.row(50, 'center', 'space-between')
    .padding(20, 50)
    .style('justifyContent', 'center', Model.mobileBreakpoint)
    .style('justifyContent', 'space-between', Model.tabletBreakpoint)
    .style('maxWidth', PAGE_WIDTH + 'px')
    .style('width', '100%')
    .append(
      DIV.row(10, 'center').append(
        DIV
          .style('color', THEME.white.get)
          .fontSize(48, Model.mobileBreakpoint)
          .fontSize(28, Model.tabletBreakpoint)
          .style('fontWeight', 'bold')
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
              .style('color', THEME.secondary.alpha(0.5))
              .style('color', THEME.white.get, 'hover')
              .style('textDecoration', 'none')
              .style('textTransform', 'uppercase')
              .style('fontWeight', 'bold')
              .style('whiteSpace', 'nowrap')
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
