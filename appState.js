// RUNNING - application is running
// STOPPED - application is running, but programmatically stopped
// ERROR - application is running, but has a critical error (e.g.: DB connection error): app doesn't serves requests
// INIT - application is starting, initialization: starting phase (app doesn't handle request)

// start state
var appState = 'INIT'

/**
 * Callback has two params: cb(appState, newAppState)
 * - appState: application state actually
 * - newAppState: new application state
 * Tipical use case is when cb contains a logger function.
 */
module.exports = (cb) => {
  /**
   * Set application state to new state and loging it,
   * if state has changed.
   * @param String newAppState
   */
  function changeAppState (newAppState) {
    if (appState !== newAppState) {
      if (cb) cb(appState, newAppState)
      appState = newAppState
    }
  }

  // changing appState
  function init () {
    changeAppState('INIT')
  }
  function running () {
    changeAppState('RUNNING')
  }
  function error () {
    changeAppState('ERROR')
  }
  function stopped () {
    changeAppState('STOPPED')
  }

  // reading appState
  function get () {
    return appState
  }
  return {init, running, error, stopped, get}
}
