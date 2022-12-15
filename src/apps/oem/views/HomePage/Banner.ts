import Model from '@apps/oem/models/Model';
import { A, BUTTON, DIV, hsla } from '@oem';
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
    .style('textDecoration', 'none')
    .style('color', hsla(HSLA.white), 'mouseenter')
    .style('color', hsla(HSLA.secondary, 0.5), 'mouseleave')
    .innerText('Become a contributor 💡');

  const LearnMoreButton = BUTTON.backgroundColor(HSLA.secondary, 0.15)
    .color(HSLA.secondary)
    .padding(5, 10)
    .style('border', '0')
    .style('borderRadius', '3px')
    .style('cursor', 'pointer')
    .style('color', hsla(HSLA.white), 'mouseenter')
    .style('color', hsla(HSLA.secondary), 'mouseleave')
    .style('backgroundColor', hsla(HSLA.white, 0.3), 'mouseenter')
    .style('backgroundColor', hsla(HSLA.secondary, 0.15), 'mouseleave')
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
