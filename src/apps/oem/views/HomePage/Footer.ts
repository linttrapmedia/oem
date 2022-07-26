import { A, BUTTON, CODE, DIV, INPUT, SPAN } from '@oem';
import { Snippet } from '../../components/Snippet';
import { HSLA, PAGE_WIDTH, THEME } from '../../config';

export function Footer() {
  return DIV.column(0, 'center', 'start')
    .padding(50)
    .width(100)
    .backgroundColor(HSLA.secondary, 0.3, -70)
    .append(
      DIV.row(50, 'center', 'center')
        .width(100)
        .style('maxWidth', PAGE_WIDTH + 'px')
        .append(
          DIV.append(
            DIV.style('color', THEME.white.get).style('fontSize', '28px').innerText('Get Started in 3,2,1...'),
            DIV.row(5)
              .style('fontSize', '18px')
              .style('color', THEME.white.alpha(0.4))
              .append(
                SPAN.innerText('Don’t forget to checkout the '),
                A.attr('href', '')
                  .style('color', THEME.white.alpha(0.5))
                  .style('color', THEME.white.get, 'hover')
                  .innerText('Docs'),
                SPAN.innerText('and'),
                A.attr('href', '')
                  .style('color', THEME.white.alpha(0.5))
                  .style('color', THEME.white.get, 'hover')
                  .innerText('Design System'),
              ),
          ),
          CODE.backgroundColor(HSLA.white, 0.2)
            .padding(30)
            .style('opacity', '0.5')
            .style('whiteSpace', 'pre-wrap')
            .style('borderRadius', '10px')
            .style('flex', '1')
            .append(
              Snippet(`git clone http://github.com/linttrap/oem
npm i
npm start`),
            ),
        ),

      DIV.style('maxWidth', PAGE_WIDTH + 'px')
        .padding(50, 0)
        .width(100)
        .column(20, 'start', 'start')
        .append(
          DIV.style("color", THEME.white.get).innerText('Newsletter'),
          DIV.row(50, 'start', 'space-between')
            .width(100)
            .append(
              DIV.row(20)
                .style('alignItems', 'stretch')
                .style('alignContent', 'stretch')
                .width(100)
                .style('flex', '1')
                .append(
                  INPUT.padding(20)
                    .style('color', THEME.white.get)
                    .backgroundColor(HSLA.white, 0.1)
                    .style('borderRadius', '5px')
                    .style('border', 'none')
                    .style('fontSize', '16px')
                    .style('flex', '1')
                    .attr('placeholder', 'Email')
                    .render(),
                  BUTTON.backgroundColor(HSLA.black, 0.2)
                    .style('border', 'none')
                    .padding(0, 50)
                    .style('color', THEME.secondary.get)
                    .style('color', THEME.white.alpha(0.5), 'hover')
                    .style('fontSize', '16px')
                    .style('cursor', 'pointer')
                    .style('borderRadius', '10px')
                    .innerText('Subscribe'),
                ),
              DIV.column(10, 'end', 'start')
                .style('color', THEME.white.alpha(0.2))
                .append(
                  DIV.innerText(
                    'Subscribe to our newsletter to get the latest news and updates. *Spam-free*.',
                  ),
                  DIV.row(10).append(
                    DIV.style('color', THEME.white.get).innerText('Coming Soon:'),
                    DIV.style('color', THEME.accent.get).innerText('Design System'),
                  ),
                ),
            ),
        ),
      DIV.row(20, 'center', 'center').innerText('Copyright'),
      DIV.row(20, 'center', 'center').innerText('Logos'),
    );
}
