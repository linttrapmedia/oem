import { html } from '../config';
import { Section } from './Section';

const Header = (txt: string) =>
  html.div(['style', 'backgroundColor', 'rgba(0,0,0,0.1)'], ['style', 'padding', '10px'])(txt);
const Cell = (txt: HTMLElement | string) =>
  html.div(
    ['style', 'padding', '10px'],
    ['style', 'borderBottom', '1px solid rgba(0,0,0,0.1)'],
    ['style', 'fontSize', '13px'],
    ['style:tablet', 'fontSize', '16px'],
  )(txt);

export const KitchenSink = () =>
  Section({
    title: 'Included Traits',
    subtitle: `You aren't left to fend for yourself, OEM comes with a set of traits for common use cases. Here's a list.`,
    content: html.div(
      ['style', 'borderRadius', '5px'],
      ['style', 'boxSizing', 'border-box'],
      ['style', 'display', 'grid'],
      ['style', 'gridTemplateColumns', '1fr 1fr'],
      ['style', 'width', '100%'],
    )(
      Header('Trait'),
      Header('Description'),
      Cell(
        html.a(
          ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Style.ts'],
          ['attr', 'target', '_blank'],
        )('useAttribute'),
      ),
      Cell('Apply attributes'),
      Cell(
        html.a(
          ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/ClassName.ts'],
          ['attr', 'target', '_blank'],
        )('useClassName'),
      ),
      Cell('Apply class names'),
      Cell(
        html.a(
          ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Event.ts'],
          ['attr', 'target', '_blank'],
        )('useEvent'),
      ),
      Cell('Attach event listener'),
      Cell(
        html.a(
          ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/InnerHTML.ts'],
          ['attr', 'target', '_blank'],
        )('useInnerHTML'),
      ),
      Cell('Attach event listener'),
      Cell(
        html.a(
          ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Text.ts'],
          ['attr', 'target', '_blank'],
        )('useText'),
      ),
      Cell('Apply inner text'),
      Cell(
        html.a(
          ['attr', 'href', 'https://github.com/linttrapmedia/oem/blob/main/src/html/traits/Style.ts'],
          ['attr', 'target', '_blank'],
        )('useStyle'),
      ),
      Cell('Apply styles'),
    ),
  });
