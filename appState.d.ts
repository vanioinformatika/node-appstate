declare interface StateHandler {
  (appState: string, newAppState: string): void
}
declare function appState(stateHandler: StateHandler): appState.AppStateInstance

declare namespace appState {
  interface AppStateInstance {
    // Application is under initialization.
    init(): void
    // Application is running.
    running(): void
    // Application has stopped, restaring available.
    stopped(): void
    // Application in error state, maybe it's recoverable.
    error(): void
    // Application in error state, never to run again.
    fatal(): void

    isInit(): boolean
    isRunning(): boolean
    isStopped(): boolean
    isError(): boolean
    isFatal(): boolean

    /**
     * Return state machine object.
     */
    getStateMachine(): Object

    /**
     * Reading application state as string.
     */
    get(): string

    /**
     * Return all application state value.
     */
    list(): state

    /**
     * Same as AppState.init()
     * @deprecated use init().
     */
    reset(): void
  }

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
