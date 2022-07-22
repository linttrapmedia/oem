import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Trait } from '@core/framework/Trait';
import { Theme } from '@core/modules/Theme';

type ConfiguratorProps = {
  title?: string;
  menu: HTMLElement;
  content: HTMLElement;
  maxWidth?: number;
  selectors?: [key: string, val: string][];
};

const Configurator = ({ title, menu, content, maxWidth = 960, selectors }: ConfiguratorProps) => {
  // Params
  const menu_state = State.Atom<'OPEN' | 'CLOSED'>('CLOSED');
  const win_size = State.Atom<'MOBILE' | 'TABLET'>(window.innerWidth < maxWidth ? 'MOBILE' : 'TABLET');

  // Template
  const html = Template.Html({
    attr: Trait.Attr,
    on_click: Trait.OnClick,
    on_resize: Trait.OnResize,
    on_change: Trait.OnChange,
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
    style_on_win_change: Trait.Atom(win_size, Trait.Style),
    style_on_menu_change: Trait.Atom(menu_state, Trait.Style),
  });

  // Grid
  return html(
    'div',
    ['style', 'display', 'grid'],
    ['style', 'width', '100%'],
    ['style', 'gridTemplateAreas', '"content-area menu-area"'],
    ['style', 'gridTemplateRows', 'auto'],
    ['style', 'gridTemplateColumns', '1fr auto'],
    ['style', 'backgroundColor', Theme.Color('black')],
  )(
    // Content Area
    html('div', ['style', 'gridArea', 'content-area'])(content),

    // Menu Area
    html(
      'div',
      ['style', 'gridArea', 'menu-area'],
      ['style', 'width', '200px'],
      ['style', 'padding', '30px'],
      ['style', 'borderLeft', `1px solid ${Theme.Color('white', 0, 0.1)}`],
    )(
      // Logo
      html(
        'a',
        ['attr', 'href', '/'],
        ['style', 'letterSpacing', '2px'],
        ['style', 'fontSize', '36px'],
        ['style', 'textAlign', 'center'],
        ['style', 'lineHeight', '0.5'],
        ['style', 'padding', '20px 0px'],
        ['style', 'color', Theme.Color('white')],
        ['style', 'fontFamily', Theme.Font('Splash')],
        ['style', 'textDecoration', 'none'],
      )('oem'),

      // Global Navigation Dropdown
      html('div', ['style', 'marginTop', '20px'])(
        html('div', ['style', 'position', 'relative'])(
          html(
            'select',
            ['on_change', (e) => (window.location.href = (<HTMLSelectElement>e.target).value)],
            ['style', 'backgroundColor', Theme.Color('black')],
            ['style', 'border', `1px solid ${Theme.Color('white', 0, 0.1)}`],
            ['style', 'borderRadius', '5px'],
            ['style', 'color', Theme.Color('white', 0, 0.5)],
            ['style', 'fontFamily', 'sans-serif'],
            ['style', 'fontSize', '11px'],
            ['style', 'height', '35px'],
            ['style', 'letterSpacing', '1px'],
            ['style', 'lineHeight', '35px'],
            ['style', 'padding', '0 5px 0 10px'],
            ['style', 'textTransform', 'uppercase'],
            ['style', 'webkitAppearance', 'none'],
            ['style', 'width', '100%'],
          )(...selectors.map((s) => html('option', ['attr', 'value', s[1]])(s[0]))),
          html(
            'div',
            ['style', 'position', 'absolute'],
            ['style', 'right', '12px'],
            ['style', 'top', '6px'],
            ['style', 'color', Theme.Color('white', 0, 0.3)],
          )('▾'),
        ),
      ),

      // Menu
      html('div', ['style', 'marginTop', '20px'])(menu),
    ),
  );
};

type DocumentationProps = {
  title?: string;
  menu: HTMLElement;
  content: HTMLElement;
  maxWidth?: number;
  selectors?: [key: string, val: string][];
};

const Documentation = ({ title, menu, content, maxWidth = 960, selectors }: DocumentationProps) => {
  // Params

  const menu_state = State.Atom<'OPEN' | 'CLOSED'>('CLOSED');
  const win_size = State.Atom<'MOBILE' | 'TABLET'>(window.innerWidth < maxWidth ? 'MOBILE' : 'TABLET');

  // Template

  const html = Template.Html({
    attr: Trait.Attr,
    on_click: Trait.OnClick,
    on_resize: Trait.OnResize,
    on_change: Trait.OnChange,
    style_on_hover: Trait.StyleOnHover,
    style: Trait.Style,
    style_on_win_change: Trait.Atom(win_size, Trait.Style),
    style_on_menu_change: Trait.Atom(menu_state, Trait.Style),
  });

  // functions
  const toggleMenu = () => menu_state.set(menu_state.get() === 'CLOSED' ? 'OPEN' : 'CLOSED');
  const isTablet = () => win_size.get() === 'TABLET';
  const isMobile = () => win_size.get() === 'MOBILE';

  // Layout
  const Grid = html(
    'div',
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
  );

  const MenuArea = html(
    'div',
    ['style', 'gridArea', 'menu-area'],
    ['style', 'borderRight', `1px solid ${Theme.Color('black', 0, 0.1)}`],
    ['style', 'minWidth', `200px`],
  );

  const ContentArea = html('div', ['style', 'gridArea', 'content-area'], ['style', 'minWidth', `0px`]);

  // Elements

  const MenuWrapper = html(
    'div',
    ['style', 'margin', '20px'],
    ['style', 'display', 'block'],
    ['style', 'display', 'none', () => win_size.get() === 'MOBILE' && menu_state.get() === 'CLOSED'],
    ['style', 'display', 'block', () => win_size.get() === 'TABLET'],
    ['style_on_win_change', 'display', 'none', () => win_size.get() === 'MOBILE' && menu_state.get() === 'CLOSED'],
    ['style_on_win_change', 'display', 'block', () => win_size.get() === 'TABLET'],
    ['style_on_menu_change', 'display', 'none', () => menu_state.get() === 'CLOSED'],
    ['style_on_menu_change', 'display', 'block', () => menu_state.get() === 'OPEN'],
  );

  const Hamburger = html(
    'div',
    ['on_click', toggleMenu],
    ['style', 'cursor', 'pointer'],
    ['style', 'borderTop', `5px solid ${Theme.Color('black')}`],
    ['style', 'borderBottom', `5px solid ${Theme.Color('black')}`],
    ['style_on_menu_change', 'borderBottom', `5px solid ${Theme.Color('black')}`, () => menu_state.get() === 'CLOSED'],
    ['style_on_menu_change', 'borderBottom', `0px`, () => menu_state.get() === 'OPEN'],
    ['style', 'height', '3px'],
    ['style', 'width', '25px'],
    ['style', 'display', 'block', () => win_size.get() === 'MOBILE'],
    ['style', 'display', 'none', () => win_size.get() === 'TABLET'],
    ['style_on_win_change', 'display', 'block', () => win_size.get() === 'MOBILE'],
    ['style_on_win_change', 'display', 'none', () => win_size.get() === 'TABLET'],
  );

  const LogoWrapper = html(
    'div',
    ['style', 'display', 'flex'],
    ['style', 'flexDirection', 'row'],
    ['style', 'justifyContent', 'space-between'],
    ['style', 'alignItems', 'center'],
    ['style', 'padding', '0px 20px'],
  );

  const Title = html(
    'div',
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
  );

  const ContentWrapper = html('div', ['style', 'padding', '20px']);

  const Selectors = () =>
    html(
      'div',
      ['style', 'margin', '0 20px'],
      ['style', 'position', 'relative'],
    )(
      html(
        'select',
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
        ['style', 'border', `1px solid ${Theme.Color('black', 0, 0.2)}`],
        ['on_change', (e) => (window.location.href = (<HTMLSelectElement>e.target).value)],
      )(...selectors.map((s) => html('option', ['attr', 'value', s[1]])(s[0]))),
      html(
        'div',
        ['style', 'position', 'absolute'],
        ['style', 'right', '12px'],
        ['style', 'top', '6px'],
        ['style', 'color', Theme.Color('black', 0, 0.3)],
      )('▾'),
    );

  // Html

  return Grid(
    MenuArea(
      LogoWrapper(
        html(
          'a',
          ['attr', 'href', '/'],
          ['style', 'letterSpacing', '2px'],
          ['style', 'fontSize', '60px'],
          ['style', 'textAlign', 'center'],
          ['style', 'lineHeight', '0.9'],
          ['style', 'padding', '30px 0px 20px'],
          ['style', 'color', Theme.Color('black')],
          ['style', 'fontFamily', Theme.Font('Splash')],
          ['style', 'textDecoration', 'none'],
        )('oem'),

        Hamburger(''),
      ),
      title && Title(title),
      selectors && Selectors(),
      MenuWrapper(menu),
    ),
    ContentArea(ContentWrapper(content)),
  );
};

export const Shell = {
  Documentation,
  Configurator,
};
