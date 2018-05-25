# node-appstate

[![TravisCI Build Status](https://travis-ci.org/vanioinformatika/node-appstate.svg?branch=master)](https://travis-ci.org/vanioinformatika/node-appstate)

Application state handler without dependency

---

```npm i @vanioinformatika/appstate```

Initialization without callback (logger):

```javascript
const appState = require('./appState')()
```

Initialization with a simple logger:

```javascript
const appState = require('./appState')((appState, newAppState) => {
  console.log(`App state has changed from ${appState} to ${newAppState}`)
})
```

You have two variables:

* appState: application state

* newAppState: new application state

You can use any logger library, for example pino.

```javascript
let logger = require('pino')()
const appState = require('./appState')((appState, newAppState) => {
  logger.warn(`App state has changed from ${appState} to ${newAppState}`)
})
```

Changing application state.

```javascript
const appState = require('./appState')()
appState.init()
appState.running()
appState.error()
appState.stopped()
```

Reading application state.

```javascript
const appState = require('./appState')()
let applicationState = appState.get()
```

**Application state values are 'INIT', 'ERROR', 'RUNNING', 'STOPPED'**

## Best practice

Using state:

* **RUNNING** - application is running
* **STOPPED** - application is running, but programmatically stopped
* **ERROR** - application is running, but has a critical error (e.g.: DB connection error): app doesn't serves requests
* **INIT** - Default state, application is starting, initialization: starting phase (app doesn't handle request)

Use a /health endpoint for load-balancers, and set to UP, if ```appState.get() === 'RUNNING'```, else DOWN.

You can change anytime the application state, for example under initialization process: persistent DB connection error => appState.error()
