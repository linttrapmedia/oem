import { State } from '@core/framework/state'
import { Template } from '@core/framework/template'
import { Trait } from '@core/framework/trait'
import { color, font, ROUTES } from '../../context'

type DocumentationProps = {
  content: HTMLElement | DocumentFragment
  next?: [text: string, link: string]
  prev?: [text: string, link: string]
}

export const Documentation = ({ content, next, prev }: DocumentationProps) => {
  // functions

  const getResponsiveMode = () => (window.innerWidth < maxWidth ? 'MOBILE' : 'TABLET')
  const isMenuClosed = () => menuState.get() === 'CLOSED'
  const isMenuOpen = () => menuState.get() === 'OPEN'
  const isMobile = () => winSize.get() === 'MOBILE'
  const isMobileAndClosed = () => isMobile() && isMenuClosed()
  const isTablet = () => winSize.get() === 'TABLET'
  const onResize = () => winSize.set(getResponsiveMode())
  const toggleMenu = () => menuState.set(menuState.get() === 'CLOSED' ? 'OPEN' : 'CLOSED')

  // Params

  const maxWidth = 1400
  const menuState = State.Atom<'OPEN' | 'CLOSED'>('CLOSED')
  const winSize = State.Atom<'MOBILE' | 'TABLET'>(getResponsiveMode())
  const menu = [
    ['Overview', ROUTES.OVERVIEW],
    ['Concepts', ROUTES.CONCEPTS],
    ['Html', ROUTES.HTML],
    ['Styling', ROUTES.STYLING],
    ['State', ROUTES.STATE_MANAGEMENT],
    ['Design', ROUTES.DESIGN_SYSTEM],
    ['Config', ROUTES.CONFIG],
    ['Contributing', ROUTES.CONTRIBUTING],
  ]

  // Template

  const { div, a, span } = Template.Html({
    attr: Trait.Attr,
    on_click: Trait.OnClick,
    on_resize: Trait.OnResize,
    on_change: Trait.OnChange,
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
    style_on_win_change: Trait.Atom(winSize, Trait.Style),
    style_on_menu_change: Trait.Atom(menuState, Trait.Style),
  })

  // Elements

  const ContentArea = div(['style', 'gridArea', 'content-area'], ['style', 'minWidth', `0px`])

  const Grid = div(
    ['on_resize', onResize],
    ['style_on_win_change', 'gridTemplateAreas', '"menu-area content-area"', isTablet],
    ['style_on_win_change', 'gridTemplateAreas', '"menu-area" "content-area"', isMobile],
    ['style_on_win_change', 'gridTemplateColumns', 'auto', isMobile],
    ['style_on_win_change', 'gridTemplateColumns', 'min-content 1fr', isTablet],
    ['style_on_win_change', 'gridTemplateRows', 'auto', isTablet],
    ['style_on_win_change', 'gridTemplateRows', 'min-content 1fr', isMobile],
    ['style', 'color', color('black')],
    ['style', 'display', 'grid'],
    ['style', 'fontFamily', font('Space Grotesk')],
    ['style', 'maxWidth', `${maxWidth}px`],
    ['style', 'minWidth', `0px`],
    ['style', 'gap', '50px'],
    ['style', 'padding', '50px'],
    ['style', 'margin', '0 auto'],
  )

  const Hamburger = div(
    ['on_click', toggleMenu],
    ['style', 'cursor', 'pointer'],
    ['style', 'borderTop', `5px solid ${color('black')}`],
    ['style', 'borderBottom', `5px solid ${color('black')}`],
    ['style_on_menu_change', 'borderBottom', `5px solid ${color('black')}`, isMenuClosed],
    ['style_on_menu_change', 'borderBottom', `0px`, isMenuOpen],
    ['style', 'height', '13px'],
    ['style', 'width', '25px'],
    ['style', 'display', 'block', isMobile],
    ['style', 'display', 'none', isTablet],
    ['style_on_win_change', 'display', 'block', isMobile],
    ['style_on_win_change', 'display', 'none', isTablet],
  )

  const Logo = a(
    ['attr', 'href', '/'],
    ['style', 'letterSpacing', '2px'],
    ['style', 'fontSize', '60px'],
    ['style', 'textAlign', 'left'],
    ['style', 'lineHeight', '0.9'],
    ['style', 'color', color('black')],
    ['style', 'fontFamily', font('Splash')],
    ['style', 'textDecoration', 'none'],
    ['style', 'width', '100%'],
  )

  const LogoWrapper = div(
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'row'],
    ['style', 'justifyContent', 'space-between'],
    ['style', 'alignItems', 'center'],
  )

  const MenuArea = div(
    ['style', 'gridArea', 'menu-area'],
    ['style', 'borderRight', `1px solid ${color('black', 0.1)}`, isTablet],
    ['style', 'minWidth', `200px`],
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'column'],
    ['style', 'gap', '30px'],
  )

  const MenuWrapper = div(
    ['style', 'display', 'none', isMobileAndClosed],
    ['style', 'display', 'block', isTablet],
    ['style_on_menu_change', 'display', 'block', isMenuOpen],
    ['style_on_win_change', 'display', 'block', isTablet],
    ['style_on_menu_change', 'display', 'none', isMobileAndClosed],
    ['style_on_win_change', 'display', 'none', isMobileAndClosed],
  )

  function MenuItem(text: string, route: string) {
    const isCurrentPage = route === '/' + window.location.search
    return a(
      ['attr', 'href', route],
      ['style', 'color', color('black', 0.4), !isCurrentPage],
      ['style', 'color', color('black'), isCurrentPage],
      ['style', 'padding', '5px 0'],
      ['style', 'cursor', 'pointer'],
      ['style', 'display', 'block'],
      ['style_on_hover', 'color', color('black')],
      ['style', 'textDecoration', 'none'],
    )(text)
  }

  const FooterNav = div(
    ['style', 'textAlign', 'center'],
    ['style', 'display', 'flex'],
    ['style', 'justifyContent', 'space-between'],
    ['style', 'alignItems', 'center'],
    ['style', 'margin', '50px 0'],
    ['style', 'backgroundColor', color('black', 0.02)],
    ['style', 'borderRadius', '50px'],
  )(
    prev
      ? a(
          ['attr', 'href', prev[1]],
          ['style_on_hover', 'color', color('black', 0.25), color('black', 0.5)],
          ['style', 'color', color('black', 0.5)],
          ['style', 'fontSize', '16px'],
          ['style', 'padding', '20px'],
          ['style', 'textDecoration', 'none'],
          ['style', 'transition', '0.25s'],
        )(`← `, prev[0])
      : null,
    next
      ? a(
          ['attr', 'href', next[1]],
          ['style_on_hover', 'color', color('black', 0.25), color('black', 0.5)],
          ['style', 'color', color('black', 0.5)],
          ['style', 'fontSize', '16px'],
          ['style', 'padding', '20px'],
          ['style', 'textDecoration', 'none'],
          ['style', 'transition', '0.25s'],
        )(next[0], ` → `)
      : null,
  )

  // Output

  return Grid(
    MenuArea(
      LogoWrapper(Logo('oem'), Hamburger('')),
      MenuWrapper(...menu.map(([text, route]) => MenuItem(text, route))),
    ),
    ContentArea(content, FooterNav),
  )
}
