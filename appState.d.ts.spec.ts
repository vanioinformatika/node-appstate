import * as AppState from '.'
import { AppStateInstance } from '.'

// init application state handler with logging
export const appStateInstance: AppStateInstance = AppState(
  (appState: string, newAppState: string): void => {
    if (appStateInstance.isError() || appStateInstance.isFatal()) {
      console.error(`appstate ${appState} to ${newAppState}`)
    } else {
      console.warn(`appstate ${appState} to ${newAppState}`)
    }
  },
)
