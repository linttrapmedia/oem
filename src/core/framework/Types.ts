import { Trait } from './trait'

export namespace Types {
  // Utilities
  export type OmitFirstArg<T> = T extends (x: any, ...args: infer P) => infer R
    ? (...args: P) => R
    : never

  export type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never

  // State

  export type AtomReducer<T extends Record<string, (...args: any[]) => void>> = {
    [P in keyof T]: (...args: Tail<Parameters<T[P]>>) => void
  }

  export type Atom<T> = {
    get: () => T
    set: (atom: T) => void
    sub: (cb: (atom: T) => any) => number
  }

  // Styling

  export type CssPropType = keyof CSSStyleDeclaration
  export type CssPropValType = string | number
  export type CssDeclaration = [CssPropType, CssPropValType]
  export type KeyframeStyleDeclaration = [number, CssPropType, CssPropValType][]

  export type ThemeColors =
    | 'transparent'
    | 'black'
    | 'brown'
    | 'blue'
    | 'purple'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'white'

  export type ThemeFonts =
    | 'Monospace'
    | 'Space Grotesk'
    | 'Times New Roman'
    | 'Crimson Text'
    | 'Splash'
    | 'Primary'

  export type ThemeProps = {
    colors?: Record<string, [h: number, s: number, l: number] | undefined>
    fonts?: Record<string, string>
  }

  export type ThemeFunc<Colors = ThemeColors, Fonts = ThemeFonts> = {
    color: (color: Colors, opacity?: number, adjustLightness?: number) => string
    font: (font: Fonts) => string
  }

  const COLORS = {
    black: [326, 2, 13],
    brown: [28, 11, 14],
    blue: [203, 81, 49],
    purple: [270, 38, 40],
    red: [11, 88, 56],
    orange: [16, 97, 73],
    yellow: [47, 98, 55],
    green: [118, 27, 49],
    white: [0, 4, 98],
    transparent: 'transparent',
  }

  const FONTS = {
    Monospace: 'monospace',
    'Space Grotesk': 'Space Grotesk, Arial, sans-serif',
    'Times New Roman': 'Times New Roman, sans-serif',
    'Crimson Text': 'Crimson Text, serif',
    Splash: 'Splash, cursive',
    Primary: 'Space Grotesk, Arial, sans-serif',
  }

  function Theme<
    Colors extends Record<string, [h: number, s: number, l: number]> | typeof COLORS,
    Fonts extends Record<string, string> | typeof FONTS,
  >({
    colors,
    fonts,
  }: {
    colors?: Colors
    fonts?: Fonts
  } = {}) {
    const _colors = { ...COLORS, ...colors }
    const _fonts = { ...FONTS, ...fonts }
    return {
      color: (color: keyof typeof _colors) => color,
      font: (font: keyof typeof _fonts) => font,
    }
  }
  // Fonts

  const theme = Theme({
    colors: {
      aasd: [1, 2, 3],
    },
  })
  theme.color('aasd')
  const theme2 = Theme()
  theme2.color('blue')

  // Template

  export type TraitProp = string
  export type TraitFunc = (el: HTMLElement, ...a: any) => any
  export type TraitParams<T> = Parameters<OmitFirstArg<T>>
  export type HtmlChild =
    | HTMLElement
    | DocumentFragment
    | string
    | number
    | SVGElement
    | Comment
    | undefined
    | null

  export const HtmlTagList = [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'menu',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'picture',
    'pre',
    'progress',
    'q',
    'rp',
    'rt',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'slot',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr',
  ]

  export const TraitsDefault: HtmlTemplateConfig = {
    attr: Trait.Attr,
    style: Trait.Style,
    styles: Trait.Styles,
  }
  export type HtmlTemplate = (...children: HtmlChild[]) => HTMLElement
  export type HtmlTemplateConfig = Record<TraitProp, TraitFunc>
  export type HtmlTemplateTagMap<Config> = Record<
    keyof HTMLElementTagNameMap,
    <KS extends (keyof Config)[]>(
      ...traits: {
        [I in keyof KS]-?: [
          KS[I],
          ...Parameters<OmitFirstArg<Config[Extract<KS[I], keyof Config>]>>,
        ]
      }
    ) => (...children: HtmlChild[]) => HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  >

  export type SvgTraitProp = string
  export type SvgTraitFunc = (el: SVGElement, ...a: any) => any
  export type SvgTraitParams<T> = Parameters<OmitFirstArg<T>>
  export type SvgChild = string | number | SVGElement | Comment
  export type SvgTags = keyof SVGElementTagNameMap
}
