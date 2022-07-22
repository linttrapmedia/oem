import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';
import { debounce } from 'src/utils/Debounce';
import { LoadFile } from 'src/utils/FileLoader';
import { LoadJavascript, LoadStyleSheet } from 'src/utils/ScriptLoader';
import { Timers } from 'src/utils/Timers';

export const Snippet = (
  urlOrString: string,
  maxHeight: number = 500,
  language: 'typescript' | 'bash' = 'typescript',
) => {
  // params
  const autoHeight = urlOrString.split('\n').length * 14;
  const code = State.Atom<HTMLElement>('Loading...' as unknown as HTMLElement);
  const width = State.Atom<string>('0%');
  const padding = 20;
  const highlightedCode = State.Atom<string>(null);

  // template
  const html = Template.Html({
    innerhtml_on_code_update: Trait.Atom(code, Trait.InnerHtml),
    on_load: Trait.OnLoad,
    on_win_resize: Trait.OnWinResize,
    style_on_resize: Trait.StyleOnResize,
    style_on_width_update: Trait.Atom(width, Trait.Style),
    style: Trait.Style,
  });

  const container = html('div', ['style', 'whiteSpace', 'pre'])();
  const load = async () => {
    const txt = urlOrString.startsWith('http') ? await LoadFile(urlOrString) : urlOrString;
    await LoadStyleSheet('/assets/scripts/prism.css');
    await LoadJavascript('/assets/scripts/prism.min.js');
    await LoadJavascript(`/assets/scripts/prism-${language}.min.js`);
    await Timers.waitUntil(() => Prism !== void 0);
    highlightedCode.set(Prism.highlight(txt, Prism.languages[`${language}`]));
    container.innerHTML = highlightedCode.get();
    code.set(container);
  };

  return html(
    'div',
    [
      'on_win_resize',
      debounce(
        ({ width: elWidth }) => {
          width.set(`${elWidth - padding * 2}px`);
          container.innerHTML = highlightedCode.get();
        },
        {
          onStart: () => {
            container.innerHTML = 'Loading...';
            width.set(null);
          },
        },
      ),
    ],
    ['style', 'width', '100%'],
  )(
    html(
      'div',
      ['style', 'overflowX', 'auto'],
      ['style', 'borderRadius', '5px'],
      ['style', 'border', 0],
      ['style', 'backgroundColor', Theme.Color('black', 0, 0.02)],
      ['style', 'height', `${autoHeight}px`],
      ['style', 'maxHeight', `${maxHeight}px`],
      ['style', 'fontSize', '14px'],
      ['style', 'lineHeight', '1'],
      ['style', 'fontFamily', 'monospace'],
      ['style_on_width_update', 'width', width.get],
      ['style', 'display', 'flex'],
      ['style', 'color', Theme.Color('black', 0, 0.5)],
      ['style', 'padding', '20px'],
      [
        'on_load',
        (el) => {
          width.set(`${el.getBoundingClientRect().width - padding * 2}px`);
          load();
        },
      ],
      ['innerhtml_on_code_update', code.get],
      ['innerhtml_on_code_update', code.get],
    )(code.get()),
  );
};
