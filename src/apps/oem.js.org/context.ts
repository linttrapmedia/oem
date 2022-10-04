import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/Theme';
import { Trait } from '@core/framework/Trait';

// Interface

export type ViewState =
  | 'CONCEPTS'
  | 'CONTRIBUTING'
  | 'DESIGN_SYSTEM'
  | 'LOADING'
  | 'OVERVIEW'
  | 'SPLASH'
  | 'STATE_MANAGEMENT'
  | 'STYLING'
  | 'HTML'
  | 'CONFIG';

// Constants

export const ROUTES = {
  CONCEPTS: '/?page=concepts',
  CONTRIBUTING: '/?page=contributing',
  DESIGN_SYSTEM: '/?page=design-system',
  LOADING: '/?page=loading',
  OVERVIEW: '/?page=overview',
  SPLASH: '/?page=slash',
  STATE_MANAGEMENT: '/?page=state-management',
  STYLING: '/?page=styling',
  HTML: '/?page=html',
  CONFIG: '/?page=config',
};

// State

export const viewState = State.Atom<ViewState>('SPLASH');

// Theming

export const { color, font } = Theme();

// Template

export const tags = Template.Html({
  attr: Trait.Attr,
  flex: Trait.Flex,
  on_click: Trait.OnClick,
  on_win_resize: Trait.OnWinResize,
  style_on_hover: Trait.StyleOnHover,
  style_on_print: Trait.PrintStyle,
  style_on_resize: Trait.StyleOnWinResize,
  style: Trait.Style,
  styles: Trait.Styles,
});
