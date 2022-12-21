import Model from '@apps/oem/models/Model';
import { A, BUTTON, DIV } from '@oem';
import { PAGE_WIDTH, THEME } from '../../config';

export function Banner() {
  const Disclaimer = DIV
    .style('alignItems', 'center')
    .style('backgroundColor', THEME.secondary.darken(70, 0.6))
    .style('display', 'block', Model.tabletBreakpoint)
    .style('display', 'flex')
    .style('display', 'none', Model.mobileBreakpoint)
    .style('flexDirection', 'column')
    .style('fontSize', '11px')
    .style('justifyContent', 'center')
    .style('left', '-85px')
    .style('padding', '100px 50px 10px')
    .style('position', 'fixed')
    .style('rotate', '-45deg')
    .style('textAlign', 'center')
    .style('textTransform', 'uppercase')
    .style('top', '-75px')
    .append(
      DIV.style('fontSize', '20px').style('rotate', '0deg').innerText('🧪💥'),
      DIV
        .style('color', THEME.white.get)
        .style('display', 'block')
        .style('display', 'none')
        .innerText("Don't Use"),
      DIV.style('color', THEME.white.alpha(0.25)).innerText('Experimental'),
    );

  const Contributor = A
    .attr('href', 'http://github.com/linttrapmedia/oem')
    .style('color', THEME.secondary.alpha(0.5))
    .style('color', THEME.secondary.get, 'hover')
    .style('textDecoration', 'none')
    .innerText('Become a contributor 💡');

  const LearnMoreButton = BUTTON
    .style('backgroundColor', THEME.secondary.alpha(0.15), 'hover')
    .style('backgroundColor', THEME.white.alpha(0.3))
    .style('border', '0')
    .style('borderRadius', '3px')
    .style('color', THEME.secondary.alpha(0.5), 'hover')
    .style('color', THEME.white.get)
    .style('cursor', 'pointer')
    .style('padding', '5px 10px')
    .innerText('Learn More');

  return DIV
    .style('alignItems', 'center')
    .style('backgroundColor', THEME.secondary.alpha(0.05))
    .style('display', 'flex')
    .style('flexDirection', 'row')
    .style('justifyContent', 'flex-end')
    .style('padding', '20px')
    .style('width', '100%')
    .append(
      DIV
        .style('alignItems', 'center')
        .style('display', 'flex')
        .style('flexDirection', 'row')
        .style('gap', '20px')
        .style('justifyContent', 'flex-end')
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(Disclaimer, Contributor, LearnMoreButton),
    );
}
