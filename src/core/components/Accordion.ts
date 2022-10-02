import { State } from '@core/framework/state'
import { Template } from '@core/framework/template'
import { Theme } from '@core/framework/theme'
import { Trait } from '@core/framework/trait'

const { div } = Template.Html({ style: Trait.Style })

const AccordionItem = (
  title: string,
  content: HTMLElement,
  expand: boolean = false,
  onExpand: (isExpanded: boolean) => void,
) => {
  const expandAtom = State.Atom(expand)

  const html = Template.Html({
    on_click: Trait.OnClick,
    style_on_expand_change: Trait.Atom(expandAtom, Trait.Style),
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
  })

  return div(['style', 'display', 'flex'], ['style', 'flexDirection', 'column'])(
    div(
      ['style', 'alignItems', 'center'],
      ['style', 'display', 'flex'],
      ['style', 'flexDirection', 'row'],
      ['style', 'justifyContent', 'space-between'],
      ['style', 'cursor', 'pointer'],
      ['style', 'padding', '10px'],
      ['style', 'borderBottom', `1px dashed ${Theme().color('black', 0, 0.2)}`],
      ['style', 'color', Theme().color('black', 0, 0.65)],
      ['style', 'transition', 'all 0.5s'],
    )(
      div(
        ['style', 'textTransform', 'uppercase'],
        ['style', 'letterSpacing', '1px'],
        ['style', 'fontSize', '12px'],
      )(title),
      div(['style', 'transform', 'rotate(90deg)', () => expandAtom.get() === false])('▾'),
    ),
    div(
      ['style', 'padding', '10px'],
      ['style', 'display', 'flex', () => expandAtom.get() === true],
      ['style', 'display', 'none', () => expandAtom.get() === false],
    )(content),
  )
}

export const Accordion = (
  ...children: [
    title: string,
    content: HTMLElement,
    isExpanded: boolean,
    onExpand: (isExpanded: boolean) => void,
  ][]
) =>
  div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
  )(...children.map(i => AccordionItem(...i)))
