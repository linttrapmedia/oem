import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';

const html = Template.Html({
  style: Trait.Style,
});

type BoxOptions =
  | ['align', 'flex-start' | 'center' | 'flex-end']
  | ['borderTop', `${number}px ${'solid' | 'dashed' | 'dotted'} ${string}`]
  | ['direction', 'row' | 'column']
  | ['justify', 'flex-start' | 'center' | 'flex-end' | 'space-between'];

export const box = (...opts: BoxOptions[]) => {
  const _opts = opts.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<BoxOptions[0], any>);
  return html(
    'div',
    ['style', 'alignItems', _opts.align ?? 'center'],
    ['style', 'borderTop', _opts.borderTop ?? '0'],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', _opts.direction ?? 'row'],
    ['style', 'justifyContent', _opts.justify ?? 'center'],
    ['style', 'width', '100%'],
  );
};
