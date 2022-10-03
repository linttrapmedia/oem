import { State } from '@core/framework/State';
import { ViewState } from '../types';

// atoms and properties
export const viewState = State.Atom<ViewState>('LOADING');
