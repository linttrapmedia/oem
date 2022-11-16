import { SpaView } from '@core/components/SpaView';
import { PageState, ROUTES, viewState } from './config';
import { ConceptsPage } from './docs/views/ConceptsPage';
import { ConfigPage } from './docs/views/ConfigPage';
import { ContributingPage } from './docs/views/ContributingPage';
import { DesignSystemPage } from './docs/views/DesignSystem';
import { ExamplesPage } from './docs/views/ExamplePage';
import { HtmlPage } from './docs/views/HtmlPage';
import { LoadingPage } from './docs/views/LoadingPage';
import { QuickstartPage } from './docs/views/QuickstartPage';
import { SplashPage } from './docs/views/SplashPage';
import { StatePage } from './docs/views/StatePage';
import { StylingPage } from './docs/views/StylingPage';

SpaView<PageState>({
  state: viewState,
  views: [
    { route: ROUTES.CONCEPTS, state: 'CONCEPTS', view: ConceptsPage },
    { route: ROUTES.CONTRIBUTING, state: 'CONTRIBUTING', view: ContributingPage },
    { route: ROUTES.DESIGN_SYSTEM, state: 'DESIGN_SYSTEM', view: DesignSystemPage },
    { route: ROUTES.EXAMPLES, state: 'EXAMPLES', view: ExamplesPage },
    { route: ROUTES.LOADING, state: 'LOADING', view: LoadingPage },
    { route: ROUTES.QUICKSTART, state: 'QUICKSTART', view: QuickstartPage },
    { route: ROUTES.SPLASH, state: 'SPLASH', view: SplashPage },
    { route: ROUTES.STATE_MANAGEMENT, state: 'STATE_MANAGEMENT', view: StatePage },
    { route: ROUTES.STYLING, state: 'STYLING', view: StylingPage },
    { route: ROUTES.HTML, state: 'HTML', view: HtmlPage },
    { route: ROUTES.CONFIG, state: 'CONFIG', view: ConfigPage },
  ],
});
