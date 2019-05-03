import * as AppState from '.'

// init application state handler with logging
AppState(
  (appState: string, newAppState: string): void => {
    if (AppState.isError() || AppState.isFatal()) {
      console.error({ details: `${appState} to ${newAppState}` }, 'appstate')
    } else {
      console.warn({ details: `${appState} to ${newAppState}` }, 'appstate')
    }
  },
)
