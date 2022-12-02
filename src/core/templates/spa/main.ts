import { SPA } from '@core/components/SpaView'
import { BP_MOBILE } from './lib/constants'
import { machine } from './lib/machine'
import { viewState } from './lib/props'
import { ViewState } from './types'
import { LoadingView } from './view/loading'

SPA<ViewState>({
  state: viewState,
  transitionView: LoadingView,
  transitionDelay: 500,
  views: [[LoadingView, 'LOADING', BP_MOBILE]],
  onReady: () => machine({ type: 'INIT' }),
})
