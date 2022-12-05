import { HSLA, PAGE_WIDTH } from '../config';
import { hsla } from '../util';

export function Banner() {
  return DIV.row(20, 'start', 'center')
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
    );
}
