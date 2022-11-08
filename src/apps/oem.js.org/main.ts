import { SpaView } from '@core/components/SpaView';
import { ROUTES, viewState, ViewState } from './config';
import { DesignSystemView } from './design/views';
import { ConceptsView } from './docs/views/Concepts';
import { ConfigView } from './docs/views/Config';
import { ContributingView } from './docs/views/Contributing';
import { HtmlView } from './docs/views/Html';
import { LoadingView } from './docs/views/LoadingView';
import { OverviewView } from './docs/views/Overview';
import { SplashView } from './docs/views/SplashView';
import { StateView } from './docs/views/State';
import { StylingView } from './docs/views/Styling';

SpaView<ViewState>({
  state: viewState,
  views: [
    { route: ROUTES.CONCEPTS, state: 'CONCEPTS', view: ConceptsView },
    { route: ROUTES.CONTRIBUTING, state: 'CONTRIBUTING', view: ContributingView },
    { route: ROUTES.DESIGN_SYSTEM, state: 'DESIGN_SYSTEM', view: DesignSystemView },
    { route: ROUTES.LOADING, state: 'LOADING', transitionView: true, view: LoadingView },
    { route: ROUTES.OVERVIEW, state: 'OVERVIEW', view: OverviewView },
    { route: ROUTES.SPLASH, state: 'SPLASH', view: SplashView },
    { route: ROUTES.STATE_MANAGEMENT, state: 'STATE_MANAGEMENT', view: StateView },
    { route: ROUTES.STYLING, state: 'STYLING', view: StylingView },
    { route: ROUTES.HTML, state: 'HTML', view: HtmlView },
    { route: ROUTES.CONFIG, state: 'CONFIG', view: ConfigView },
  ],
});
