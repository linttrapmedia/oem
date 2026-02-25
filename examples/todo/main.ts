// --- Entry Point ---

import { todoMachine } from './machines';
import { appState } from './state';
import { Action } from './types';
import { renderApp } from './ui';

// Dispatch: run action through state machine, update reactive state
const dispatch = (action: Action) => {
  appState.reduce((prev) => todoMachine(prev, action));
};

// Mount
document.body.style.margin = '0';
document.body.style.background = '#f5f5f5';
document.body.appendChild(renderApp(appState, dispatch));
