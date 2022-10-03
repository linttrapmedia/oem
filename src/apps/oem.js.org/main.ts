import { SpaView } from '@core/components/SpaView'
import { ROUTES, ViewState, viewState } from './context'
import { DesignSystemView } from './views/design'
import { ConceptsView } from './views/docs/Concepts'
import { ConfigView } from './views/docs/Config'
import { ContributingView } from './views/docs/Contributing'
import { HtmlView } from './views/docs/Html'
import { LoadingView } from './views/docs/LoadingView'
import { OverviewView } from './views/docs/Overview'
import { SplashView } from './views/docs/SplashView'
import { StateView } from './views/docs/State'
import { StylingView } from './views/docs/Styling'

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
})
