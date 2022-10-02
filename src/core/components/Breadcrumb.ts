import { Template } from '@core/framework/template'
import { Theme } from '@core/framework/theme'
import { Trait } from '@core/framework/trait'

const theme = Theme()

type BreadcrumbProps = {
  color?: string
  colorOnHover?: string
  font?: string
  items: { label: string; href?: string; onClick?: () => void }[]
}

export const Breadcrumb = ({ color, colorOnHover, font, items = [] }: BreadcrumbProps) => {
  const { div, a } = Template.Html(
    {
      'style@hover': Trait.StyleOnHover,
      attr: Trait.Attr,
      on_click: Trait.OnClick,
      on_load: Trait.OnLoad,
      style: Trait.Style,
    },
    ['div', 'a'],
  )

  return div(
    ['style', 'alignItems', 'center'],
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'flex-start'],
    ['style', 'fontFamily', font ?? theme.font('Space Grotesk')],
    ['style', 'fontWeight', 'bold'],
    ['style', 'textTransform', 'uppercase'],
    ['style', 'color', color ?? theme.color('white')],
    ['style', 'boxSizing', 'border-box'],
    ['style', 'padding', '20px'],
    ['style', 'flexWrap', 'wrap'],
    ['style', 'lineHeight', 2],
  )(
    ...items.map(({ href, onClick, label }, i) =>
      div(['style', 'display', 'flex'], ['style', 'flexDirection', 'row'])(
        div(
          ['style', 'margin', '0 10px'],
          ['style', 'opacity', '0.5'],
          ['style', 'display', 'none', i === 0],
        )('·'),
        a(
          ['attr', 'href', href],
          ['on_click', onClick],
          ['style', 'color', theme.color('white', 0.5)],
          ['style', 'cursor', 'pointer'],
          ['style', 'wordBreak', 'free-break'],
          ['style@hover', 'color', colorOnHover ?? theme.color('white')],
        )(label),
      ),
    ),
  )
}
