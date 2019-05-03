declare interface StateHandler {
  (appState: string, newAppState: string): void
}
declare function appState(stateHandler: StateHandler): appState.AppStateInstance

declare namespace appState {
  interface AppStateInstance {}
  // Application is under initialization.
  function init(): void
  // Application is running.
  function running(): void
  // Application has stopped, restaring available.
  function stopped(): void
  // Application in error state, maybe it's recoverable.
  function error(): void
  // Application in error state, never to run again.
  function fatal(): void

  function isInit(): boolean
  function isRunning(): boolean
  function isStopped(): boolean
  function isError(): boolean
  function isFatal(): boolean

  /**
   * Return state machine object.
   */
  function getStateMachine(): Object

  /**
   * Reading application state as string.
   */
  function get(): string

  /**
   * Return all application state value.
   */
  function list(): state

  /**
   * Same as AppState.init()
   * @deprecated use init().
   */
  function reset(): void

  /**
   * Application state values.
   */
  const enum state {
    INIT = 'INIT',
    RUNNING = 'RUNNING',
    STOPPED = 'STOPPED',
    ERROR = 'ERROR',
    FATAL = 'FATAL',
  }
}

export = appState
