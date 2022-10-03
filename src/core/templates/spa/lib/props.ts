import { State } from '@core/framework/state'
import { ViewState } from '../types'

// atoms and properties
export const viewState = State.Atom<ViewState>('LOADING')
