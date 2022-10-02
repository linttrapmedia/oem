import { Template } from '@core/framework/template'
import { Trait } from '@core/framework/trait'
import { color } from '../../context'

declare module Prism {
  const highlight: any
  const languages: any
}

export const Snippet = (urlOrString: string, language: 'typescript' | 'bash' = 'typescript') => {
  // params
  const code = Prism.highlight(urlOrString, Prism.languages[`${language}`])

  // template
  const { div } = Template.Html({
    prism: (el: HTMLElement) => (el.innerHTML = code),
    style_on_resize: Trait.StyleOnResize,
    style: Trait.Style,
  })

  return div(['style', 'width', '100%'])(
    div(
      ['style', 'overflowX', 'auto'],
      ['style', 'borderRadius', '5px'],
      ['style', 'border', 0],
      ['style', 'backgroundColor', color('black', 0.02)],
      ['style', 'fontSize', '14px'],
      ['style', 'lineHeight', '1'],
      ['style', 'fontFamily', 'monospace'],
      ['style', 'display', 'flex'],
      ['style', 'color', color('black', 0.5)],
      ['style', 'padding', '20px'],
    )(div(['style', 'whiteSpace', 'pre'], ['prism'])()),
  )
}
