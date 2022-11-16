import { State } from '@core/framework/State';
import { Template } from '@core/framework/Template';
import { Theme } from '@core/framework/Theme';

// Interface

export type PageState =
  | 'CONCEPTS'
  | 'CONTRIBUTING'
  | 'DESIGN_SYSTEM'
  | 'EXAMPLES'
  | 'LOADING'
  | 'QUICKSTART'
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
  EXAMPLES: '/?page=examples',
  LOADING: '/?page=loading',
  QUICKSTART: '/?page=quickstart',
  SPLASH: '/?page=slash',
  STATE_MANAGEMENT: '/?page=state-management',
  STYLING: '/?page=styling',
  HTML: '/?page=html',
  CONFIG: '/?page=config',
};

// State

export const viewState = State.Atom<PageState>('SPLASH');

// Theming

export const { color, font } = Theme();

// Template

export const tags = Template.Html();
