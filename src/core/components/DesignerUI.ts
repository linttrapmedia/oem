import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/Theme';
import { Trait } from '@core/framework/Trait';

type DesignerUIProps = {
  title?: string;
  menu: HTMLElement;
  content: HTMLElement;
  maxWidth?: number;
  selectors?: [key: string, val: string][];
};

export const DesignerUI = ({ title, menu, content, maxWidth = 960, selectors }: DesignerUIProps) => {
  // Params
  const menu_state = State.Atom<'OPEN' | 'CLOSED'>('CLOSED');
  const win_size = State.Atom<'MOBILE' | 'TABLET'>(window.innerWidth < maxWidth ? 'MOBILE' : 'TABLET');

  // Template
  const { div, a, select, option } = Template.Html(
    {
      attr: Trait.Attr,
      on_click: Trait.OnClick,
      on_resize: Trait.OnResize,
      on_change: Trait.OnChange,
      style_on_hover: Trait.StyleOnHover,
      style: Trait.Style,
      style_on_win_change: Trait.Atom(win_size, Trait.Style),
      style_on_menu_change: Trait.Atom(menu_state, Trait.Style),
    },
    ['div', 'a', 'select', 'option'],
  );

  // Grid
  return div(
    ['style', 'display', 'grid'],
    ['style', 'width', '100%'],
    ['style', 'gridTemplateAreas', '"content-area menu-area"'],
    ['style', 'gridTemplateRows', 'auto'],
    ['style', 'gridTemplateColumns', '1fr auto'],
    ['style', 'backgroundColor', Theme().color('black')],
  )(
    // Content Area
    div(['style', 'gridArea', 'content-area'])(content),

    // Menu Area
    div(
      ['style', 'gridArea', 'menu-area'],
      ['style', 'width', '200px'],
      ['style', 'padding', '30px'],
      ['style', 'borderLeft', `1px solid ${Theme().color('white', 0, 0.1)}`],
    )(
      // Logo
      a(
        ['attr', 'href', '/'],
        ['style', 'letterSpacing', '2px'],
        ['style', 'fontSize', '36px'],
        ['style', 'textAlign', 'center'],
        ['style', 'lineHeight', '0.5'],
        ['style', 'padding', '20px 0px'],
        ['style', 'color', Theme().color('white')],
        ['style', 'fontFamily', Theme().font('Splash')],
        ['style', 'textDecoration', 'none'],
      )('oem'),

      // Global Navigation Dropdown
      div(['style', 'marginTop', '20px'])(
        div(['style', 'position', 'relative'])(
          select(
            ['on_change', (e) => (window.location.href = (<HTMLSelectElement>e.target).value)],
            ['style', 'backgroundColor', Theme().color('black')],
            ['style', 'border', `1px solid ${Theme().color('white', 0, 0.1)}`],
            ['style', 'borderRadius', '5px'],
            ['style', 'color', Theme().color('white', 0, 0.5)],
            ['style', 'fontFamily', 'sans-serif'],
            ['style', 'fontSize', '11px'],
            ['style', 'height', '35px'],
            ['style', 'letterSpacing', '1px'],
            ['style', 'lineHeight', '35px'],
            ['style', 'padding', '0 5px 0 10px'],
            ['style', 'textTransform', 'uppercase'],
            ['style', 'webkitAppearance', 'none'],
            ['style', 'width', '100%'],
          )(...selectors.map((s) => option(['attr', 'value', s[1]])(s[0]))),
          div(
            ['style', 'position', 'absolute'],
            ['style', 'right', '12px'],
            ['style', 'top', '6px'],
            ['style', 'color', Theme().color('white', 0, 0.3)],
          )('▾'),
        ),
      ),

      // Menu
      div(['style', 'marginTop', '20px'])(menu),
    ),
  );
};
