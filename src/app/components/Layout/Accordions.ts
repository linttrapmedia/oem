import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

const BasicItem = (
  title: string,
  content: HTMLElement,
  expand: boolean = false,
  onExpand: (isExpanded: boolean) => void,
) => {
  const expandAtom = State.Atom(expand);

  const html = Template.Html({
    on_click: Trait.OnClick,
    style_on_expand_change: Trait.Atom(expandAtom, Trait.Style),
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
  });

  return html(
    'div',
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
  )(
    html(
      'div',
      ['style', 'alignItems', 'center'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'row'],
      ['style', 'justifyContent', 'space-between'],
      ['style', 'cursor', 'pointer'],
      ['style', 'padding', '10px'],
      ['style', 'borderBottom', `1px dashed ${Theme.Color('black', 0, 0.2)}`],
      ['style', 'color', Theme.Color('black', 0, 0.65)],
      ['style_on_hover', 'color', Theme.Color('black'), Theme.Color('black', 0, 0.65)],
      ['style', 'transition', 'all 0.5s'],
      [
        'style_on_hover',
        'borderBottom',
        `1px dashed ${Theme.Color('black')}`,
        `1px dashed ${Theme.Color('black', 0, 0.2)}`,
      ],
      ['on_click', () => expandAtom.set(!expandAtom.get())],
      ['on_click', onExpand ? () => onExpand(expandAtom.get()) : null],
    )(
      html(
        'div',
        ['style', 'textTransform', 'uppercase'],
        ['style', 'letterSpacing', '1px'],
        ['style', 'fontSize', '12px'],
      )(title),
      html(
        'div',
        ['style', 'transform', 'rotate(90deg)', () => expandAtom.get() === false],
        ['style_on_expand_change', 'transform', 'rotate(0deg)', () => expandAtom.get() === true],
        ['style_on_expand_change', 'transform', 'rotate(90deg)', () => expandAtom.get() === false],
      )('▾'),
    ),
    html(
      'div',
      ['style', 'padding', '10px'],
      ['style', 'display', 'flex', () => expandAtom.get() === true],
      ['style', 'display', 'none', () => expandAtom.get() === false],
      ['style_on_expand_change', 'display', 'flex', () => expandAtom.get() === true],
      ['style_on_expand_change', 'display', 'none', () => expandAtom.get() === false],
    )(content),
  );
};

const Basic = (
  ...children: [title: string, content: HTMLElement, isExpanded: boolean, onExpand: (isExpanded: boolean) => void][]
) =>
  Template.Html({ style: Trait.Style })('div', ['style', 'display', 'flex'], ['style', 'flexDirection', 'column'])(
    ...children.map((i) => BasicItem(...i)),
  );

export const Accordion = {
  Basic,
};
