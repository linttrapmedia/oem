import { State } from '@core/framework/state'
import { Template } from '@core/framework/template'
import { Theme } from '@core/framework/theme'
import { Trait } from '@core/framework/trait'

type DocumentationUIProps = {
  title?: string
  menu: HTMLElement
  content: HTMLElement
  maxWidth?: number
  selectors?: [key: string, val: string][]
}

export const DocumentationUI = ({
  title,
  menu,
  content,
  maxWidth = 960,
  selectors,
}: DocumentationUIProps) => {
  // Params

  const menu_state = State.Atom<'OPEN' | 'CLOSED'>('CLOSED')
  const win_size = State.Atom<'MOBILE' | 'TABLET'>(
    window.innerWidth < maxWidth ? 'MOBILE' : 'TABLET',
  )

  // Template

  const { div, select, option, a } = Template.Html({
    attr: Trait.Attr,
    on_click: Trait.OnClick,
    on_resize: Trait.OnResize,
    on_change: Trait.OnChange,
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
    style_on_win_change: Trait.Atom(win_size, Trait.Style),
    style_on_menu_change: Trait.Atom(menu_state, Trait.Style),
  })

  // functions
  const toggleMenu = () => menu_state.set(menu_state.get() === 'CLOSED' ? 'OPEN' : 'CLOSED')
  const isTablet = () => win_size.get() === 'TABLET'
  const isMobile = () => win_size.get() === 'MOBILE'

  // Layout
  const Grid = div(
    ['on_resize', () => win_size.set(window.innerWidth < maxWidth ? 'MOBILE' : 'TABLET')],
    ['style', 'display', 'grid'],
    ['style', 'maxWidth', `${maxWidth}px`],
    ['style', 'minWidth', `0px`],
    ['style_on_win_change', 'gridTemplateAreas', '"menu-area" "content-area"', isMobile],
    ['style_on_win_change', 'gridTemplateRows', 'min-content 1fr', isMobile],
    ['style_on_win_change', 'gridTemplateColumns', 'auto', isMobile],
    ['style_on_win_change', 'gridTemplateAreas', '"menu-area content-area"', isTablet],
    ['style_on_win_change', 'gridTemplateRows', 'auto', isTablet],
    ['style_on_win_change', 'gridTemplateColumns', 'min-content 1fr', isTablet],
  )

  const MenuArea = div(
    ['style', 'gridArea', 'menu-area'],
    ['style', 'borderRight', `1px solid ${Theme().color('black', 0, 0.1)}`],
    ['style', 'minWidth', `200px`],
  )

  const ContentArea = div(['style', 'gridArea', 'content-area'], ['style', 'minWidth', `0px`])

  // Elements

  const MenuWrapper = div(
    ['style', 'margin', '20px'],
    ['style', 'display', 'block'],
    [
      'style',
      'display',
      'none',
      () => win_size.get() === 'MOBILE' && menu_state.get() === 'CLOSED',
    ],
    ['style', 'display', 'block', () => win_size.get() === 'TABLET'],
    [
      'style_on_win_change',
      'display',
      'none',
      () => win_size.get() === 'MOBILE' && menu_state.get() === 'CLOSED',
    ],
    ['style_on_win_change', 'display', 'block', () => win_size.get() === 'TABLET'],
    ['style_on_menu_change', 'display', 'none', () => menu_state.get() === 'CLOSED'],
    ['style_on_menu_change', 'display', 'block', () => menu_state.get() === 'OPEN'],
  )

  const Hamburger = div(
    ['on_click', toggleMenu],
    ['style', 'cursor', 'pointer'],
    ['style', 'borderTop', `5px solid ${Theme().color('black')}`],
    ['style', 'borderBottom', `5px solid ${Theme().color('black')}`],
    [
      'style_on_menu_change',
      'borderBottom',
      `5px solid ${Theme().color('black')}`,
      () => menu_state.get() === 'CLOSED',
    ],
    ['style_on_menu_change', 'borderBottom', `0px`, () => menu_state.get() === 'OPEN'],
    ['style', 'height', '3px'],
    ['style', 'width', '25px'],
    ['style', 'display', 'block', () => win_size.get() === 'MOBILE'],
    ['style', 'display', 'none', () => win_size.get() === 'TABLET'],
    ['style_on_win_change', 'display', 'block', () => win_size.get() === 'MOBILE'],
    ['style_on_win_change', 'display', 'none', () => win_size.get() === 'TABLET'],
  )

  const LogoWrapper = div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'row'],
    ['style', 'justifyContent', 'space-between'],
    ['style', 'alignItems', 'center'],
    ['style', 'padding', '0px 20px'],
  )

  const Title = div(
    ['style', 'fontFamily', 'sans-serif'],
    ['style', 'fontSize', '14px'],
    ['style', 'textTransform', 'uppercase'],
    ['style', 'letterSpacing', '2px'],
    ['style', 'padding', '0px 20px'],
    ['style', 'marginBottom', '20px'],
    ['style', 'display', 'none', () => win_size.get() === 'MOBILE'],
    ['style', 'display', 'block', () => win_size.get() === 'TABLET'],
    ['style_on_win_change', 'display', 'none', () => win_size.get() === 'MOBILE'],
    ['style_on_win_change', 'display', 'block', () => win_size.get() === 'TABLET'],
  )

  const ContentWrapper = div(['style', 'padding', '20px'])

  const Selectors = () =>
    div(['style', 'margin', '0 20px'], ['style', 'position', 'relative'])(
      select(
        ['style', 'fontFamily', 'sans-serif'],
        ['style', 'fontSize', '11px'],
        ['style', 'letterSpacing', '1px'],
        ['style', 'textIndent', '5px'],
        ['style', 'textTransform', 'uppercase'],
        ['style', 'height', '35px'],
        ['style', 'lineHeight', '35px'],
        ['style', 'width', '100%'],
        ['style', 'padding', '0 5px'],
        ['style', 'webkitAppearance', 'none'],
        ['style', 'borderRadius', '5px'],
        ['style', 'border', `1px solid ${Theme().color('black', 0, 0.2)}`],
        ['on_change', e => (window.location.href = (<HTMLSelectElement>e.target).value)],
      )(...selectors.map(s => option(['attr', 'value', s[1]])(s[0]))),
      div(
        ['style', 'position', 'absolute'],
        ['style', 'right', '12px'],
        ['style', 'top', '6px'],
        ['style', 'color', Theme().color('black', 0, 0.3)],
      )('▾'),
    )

  // Html

  return Grid(
    MenuArea(
      LogoWrapper(
        a(
          ['attr', 'href', '/'],
          ['style', 'letterSpacing', '2px'],
          ['style', 'fontSize', '60px'],
          ['style', 'textAlign', 'center'],
          ['style', 'lineHeight', '0.9'],
          ['style', 'padding', '30px 0px 20px'],
          ['style', 'color', Theme().color('black')],
          ['style', 'fontFamily', Theme().font('Splash')],
          ['style', 'textDecoration', 'none'],
        )('oem'),

        Hamburger(''),
      ),
      title && Title(title),
      selectors && Selectors(),
      MenuWrapper(menu),
    ),
    ContentArea(ContentWrapper(content)),
  )
}
