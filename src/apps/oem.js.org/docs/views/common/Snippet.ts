import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { color } from '../../../config';

declare module Prism {
  const highlight: any;
  const languages: any;
}

export const Snippet = (
  urlOrString: string,
  language: 'typescript' | 'bash' = 'typescript',
  inline: boolean = false,
) => {
  // params
  const code = Prism.highlight(urlOrString, Prism.languages[`${language}`]);

  // template
  const { div } = Template.Html({
    prism: (el: HTMLElement) => (el.innerHTML = code),
    style_on_resize: Trait.StyleOnResize,
    style: Trait.Style,
  });

  return div(['style', 'width', '100%'])(
    div(
      ['style', 'overflowX', 'auto'],
      ['style', 'borderRadius', '5px'],
      ['style', 'border', 0],
      ['style', 'backgroundColor', color('black', 0.02)],
      ['style', 'fontSize', '14px'],
      ['style', 'lineHeight', inline ? 'auto' : '1'],
      ['style', 'fontFamily', 'monospace'],
      ['style', 'display', 'flex'],
      ['style', 'color', color('black', 0.5)],
      ['style', 'padding', inline ? '0px' : '20px'],
    )(div(['style', 'whiteSpace', inline ? 'unset' : 'pre'], ['prism'])()),
  );
};
