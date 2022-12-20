import Model from '@apps/oem/models/Model';
import { A, BUTTON, DIV } from '@oem';
import { HSLA, PAGE_WIDTH } from '../../config';

export function Banner() {
  const Disclaimer = DIV.column(0, 'center', 'center')
    .backgroundColor(HSLA.secondary, 0.6, -70)
    .padding(100, 50, 10)
    .style('textAlign', 'center')
    .style('position', 'fixed')
    .style('top', '-75px')
    .style('left', '-85px')
    .style('rotate', '-45deg')
    .style('fontSize', '11px')
    .style('textTransform', 'uppercase')
    .style('display', 'none', Model.mobileBreakpoint)
    .style('display', 'block', Model.tabletBreakpoint)
    .append(
      DIV.style('rotate', '0deg').style('fontSize', '20px').innerText('🧪💥'),
      DIV.color(HSLA.white, 0.35)
        .style('display', 'none')
        .style('display', 'block')
        .innerText("Don't Use"),
      DIV.color(HSLA.white, 0.25).innerText('Experimental'),
    );

  const Contributor = A.color(HSLA.secondary, 0.5)
    .attr('href', 'http://github.com/linttrapmedia/oem')
    .color(HSLA.white, 0.5)
    .color(HSLA.secondary, 0.5, 1, 'hover')
    .style('textDecoration', 'none')
    .innerText('Become a contributor 💡');

  const LearnMoreButton = BUTTON.backgroundColor(HSLA.white, 0.3)
    .backgroundColor(HSLA.secondary, 0.15, 1, 'hover')
    .color(HSLA.white)
    .color(HSLA.secondary, 0.5, 1, 'hover')
    .padding(5, 10)
    .style('border', '0')
    .style('borderRadius', '3px')
    .style('cursor', 'pointer')
    .innerText('Learn More');

  return DIV.row(20, 'start', 'center')
    .padding(20)
    .backgroundColor(HSLA.secondary, 0.05)
    .width(100)
    .append(
      DIV.row(20, 'center', 'end')
        .width(100)
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(Disclaimer, Contributor, LearnMoreButton),
    );
}
