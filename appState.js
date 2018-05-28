/**
 * Application state handler.
 */

// start state is INIT
var appState = 'INIT'

/**
 * Callback has two params: cb(appState, newAppState)
 * - appState: application state actually
 * - newAppState: new application state
 * Tipical use case is when cb contains a logger function.
 */
module.exports = (cb) => {
  // RUNNING - application is running
  // STOPPED - application is running, but programmatically stopped
  // ERROR - application is running, but has a critical error (e.g.: DB connection error): app doesn't serves requests
  // INIT - application is starting, initialization: starting phase (app doesn't handle request)
  const state = {
    INIT: 'INIT',
    RUNNING: 'RUNNING',
    ERROR: 'ERROR',
    STOPPED: 'STOPPED'
  }
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
    changeAppState(state.INIT)
  }
  function running () {
    changeAppState(state.RUNNING)
  }
  function error () {
    changeAppState(state.ERROR)
  }
  function stopped () {
    changeAppState(state.STOPPED)
  }

  function isInit () {
    return appState === state.INIT
  }
  function isRunning () {
    return appState === state.RUNNING
  }
  function isError () {
    return appState === state.ERROR
  }
  function isStopped () {
    return appState === state.STOPPED
  }

  function get () {
    return appState
  }

  function list () {
    return state
  }
  return {init, running, error, stopped, get, list, isInit, isRunning, isError, isStopped}
}
