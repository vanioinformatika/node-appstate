# node-appstate

[![TravisCI Build Status](https://travis-ci.org/vanioinformatika/node-appstate.svg?branch=master)](https://travis-ci.org/vanioinformatika/node-appstate)

Application state handler without dependency

---

```npm i @vanioinformatika/appstate```

Initialization without callback (logger):

```javascript
const appState = require('@vanioinformatika/appstate')()
```

Initialization with a simple logger:

```javascript
const appState = require('@vanioinformatika/appstate')((appState, newAppState) => {
  console.log(`App state has changed from ${appState} to ${newAppState}`)
})
```

You have two variables:

* appState: application state

* newAppState: new application state

You can use any logger library, for example pino.

```javascript
let logger = require('pino')()
const appState = require('@vanioinformatika/appstate')((appState, newAppState) => {
  logger.warn(`App state has changed from ${appState} to ${newAppState}`)
})
```

Changing application state.

```javascript
const appState = require('@vanioinformatika/appstate')()
appState.init()
appState.running()
appState.stopped()
appState.error()
appState.fatal()
```

Checking application state (recommended).

```javascript
const appState = require('@vanioinformatika/appstate')()
appState.isInit()
appState.isRunning()
appState.isStopped()
appState.isError()
appState.isFatal()
```

Reading application state.

```javascript
const appState = require('@vanioinformatika/appstate')()
let applicationState = appState.get()
```

Listing state values.

```javascript
const appState = require('@vanioinformatika/appstate')()
let applicationStateValues = appState.list()
```

**Application state values are 'INIT', 'ERROR', 'RUNNING', 'STOPPED', 'FATAL'**

## Debug

Turn on debugging with env. variable: ```DEBUG=appState```

Debug messages are:

```javascript
debug('info: appState has already set: ' + newAppState)
debug('warn: invalid state changes from ' + appState + ' to ' + newAppState)
debug('warn: unknow appState: ' + newAppState)
```

## State machine

States:

* **INIT** - Default state, application is starting, initialization: starting phase (app doesn't handle request)
* **RUNNING** - application is running
* **STOPPED** - application is running, but programmatically stopped
* **ERROR** - application is running, but has a critical error (e.g.: DB connection error): app doesn't serve requests
* **FATAL** - application doesn't serve request, and never comes to RUNNING state, all other state changes ignored

State machine:

* INIT icon:arrow-right[] [INIT, RUNNING, STOPPED, ERROR, FATAL]

* RUNNING icon:arrow-right[] [INIT, RUNNING, STOPPED, ERROR, FATAL]

* STOPPED icon:arrow-right[] [INIT, RUNNING, STOPPED, ERROR, FATAL]

* ERROR icon:arrow-right[] [INIT, RUNNING, STOPPED, ERROR, FATAL]

* FATAL icon:arrow-right[] [FATAL]

## Best practice

Turn on DEBUG on test environment and check debug messages.

Invalid state changes doesn't throw error, but ignored and logged.

Use a /health endpoint for load-balancers, and set to UP, if ```appState.isRunning()```, else DOWN.

You can change anytime the application state, for example under initialization process: persistent DB connection error => appState.error()
