import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

const html = Template.Html({
  style: Trait.Style,
  onclick: Trait.OnClick,
});

export const text =
  (
    type: 'paragraph' | 'phrase' | 'code',
    ...styles: [keyof CSSStyleDeclaration, string | number, (() => boolean)?][]
  ) =>
  (...text: (string | HTMLElement)[]) => {
    const defaults = [
      ['style', 'fontFamily', Theme.Font('Space Grotesk')],
      ['style', 'color', Theme.Color('black', 0, 0.7)],
    ] as any;
    const overwrites = [...styles.map(([prop, val, cond]) => ['style', prop, val, cond] as any)];

    switch (type) {
      case 'paragraph':
        return html(
          'p',
          ['style', 'fontSize', '16px'],
          ['style', 'lineHeight', '1.6'],
          ...defaults,
          ...overwrites,
        )(...text);
      case 'phrase':
        return html('span', ['style', 'color', Theme.Color('black', 0, 0.65)], ...defaults, ...overwrites)(...text);
      case 'code':
        return html(
          'pre',
          ['style', 'fontSize', '14px'],
          ['style', 'color', Theme.Color('black', 0, 0.75)],
          ['style', 'fontSize', '12px'],
          ['style', 'fontWeight', 'normal'],
          ['style', 'fontFamily', 'courier'],
          ['style', 'padding', '20px'],
          ['style', 'margin', '0px'],
          ['style', 'backgroundColor', Theme.Color('black', 0, 0.15)],
          ['style', 'borderRadius', '3px'],
          ['style', 'cursor', 'pointer'],
          [
            'onclick',
            async (e) => {
              const textToCopy = (<HTMLElement>e.currentTarget).innerText;
              await navigator.clipboard.writeText(textToCopy);
              alert('Copied 👍');
            },
          ],
        )(...text.join('\n'));
    }
  };
