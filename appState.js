const debug = require('debug')('appState')
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
module.exports = cb => {
  // RUNNING - application is running
  // STOPPED - application is running, but programmatically stopped
  // ERROR - application is running, but has a critical error (e.g.: DB connection error): app doesn't serves requests
  // INIT - application is starting, initialization: starting phase (app doesn't handle request)
  const state = {
    INIT: 'INIT',
    RUNNING: 'RUNNING',
    STOPPED: 'STOPPED',
    ERROR: 'ERROR',
    FATAL: 'FATAL',
  }
  const stateMachine = {
    INIT: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
    RUNNING: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
    STOPPED: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
    ERROR: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
    FATAL: [state.FATAL],
  }
  /**
   * Set application state to new state and loging it,
   * if state has changed.
   * @param {string} newAppState
   */
  function changeAppState(newAppState) {
    if (state[newAppState]) {
      if (stateMachine[appState].includes(newAppState)) {
        // valid state changes
        if (appState !== newAppState) {
          if (cb) cb(appState, newAppState)
          appState = newAppState
        } else {
          debug('info: appState has already set: ' + newAppState)
        }
      } else {
        debug('warn: invalid state changes from ' + appState + ' to ' + newAppState)
      }
    } else {
      debug('warn: unknow appState: ' + newAppState)
    }
  }

  // changing appState
  function init() {
    changeAppState(state.INIT)
  }
  function running() {
    changeAppState(state.RUNNING)
  }
  function error() {
    changeAppState(state.ERROR)
  }
  function stopped() {
    changeAppState(state.STOPPED)
  }
  function fatal() {
    changeAppState(state.FATAL)
  }
  function isInit() {
    return appState === state.INIT
  }
  function isRunning() {
    return appState === state.RUNNING
  }
  function isError() {
    return appState === state.ERROR
  }
  function isStopped() {
    return appState === state.STOPPED
  }
  function isFatal() {
    return appState === state.FATAL
  }

  function getStateMachine() {
    return stateMachine
  }

  function get() {
    return appState
  }

  function list() {
    return state
  }

  function reset() {
    appState = state.INIT
  }

  return {
    init,
    running,
    error,
    stopped,
    fatal,
    get,
    getStateMachine,
    list,
    isInit,
    isRunning,
    isError,
    isStopped,
    isFatal,
    reset,
  }
}
