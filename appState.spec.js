/* eslint-env mocha */
const should = require('should') // eslint-disable-line
const sinon = require('sinon')
const shouldSinon = require('should-sinon') // eslint-disable-line

describe('appState', () => {
  it('handling undefined logger callback function', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.get().should.equal('INIT')
    appState.running()
    appState.get().should.equal('RUNNING')
  })

  it('handling logger callback function, logging changes', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.reset()
    appState.init()
    appState.running()
    loggerCB.should.be.calledOnce()
    // appState hasn't changed: called one
    appState.running()
    loggerCB.should.be.calledOnce()
  })

  it('changed: logged', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.reset()
    appState.running()
    loggerCB.should.be.calledOnce()
    appState.stopped()
    loggerCB.should.be.calledTwice()
  })

  it('is logging', () => {
    sinon.spy(console, 'log')
    const logger = {
      info(appState, newAppState) {
        console.log(`App state has changed from ${appState} to ${newAppState}`)
      },
    }
    const appState = require('./appState')(logger.info)
    appState.reset()
    appState.running()
    console.log.should.be.calledOnce()
    console.log.should.be.calledWith('App state has changed from INIT to RUNNING')
    console.log.restore()
  })

  it('is INIT', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.init()
    appState.get().should.be.equal('INIT')
  })

  it('is RUNNING', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.running()
    appState.get().should.be.equal('RUNNING')
  })

  it('is STOPPED', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.stopped()
    appState.get().should.be.equal('STOPPED')
  })

  it('is ERROR', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.error()
    appState.get().should.be.equal('ERROR')
  })

  it('isInit ok', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.init()
    appState.isInit().should.be.true()
  })

  it('isRunning ok', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.running()
    appState.isRunning().should.be.true()
  })

  it('isStopped ok', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.stopped()
    appState.isStopped().should.be.true()
  })

  it('isError ok', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.error()
    appState.isError().should.be.true()
  })

  it('list state values', () => {
    const appState = require('./appState')()
    appState.reset()
    appState.error()
    appState.list().should.be.eql({
      INIT: 'INIT',
      RUNNING: 'RUNNING',
      STOPPED: 'STOPPED',
      ERROR: 'ERROR',
      FATAL: 'FATAL',
    })
  })

  it('get state machine values', () => {
    const appState = require('./appState')()
    const state = appState.list()
    appState.reset()
    appState.error()
    appState.getStateMachine().should.be.eql({
      INIT: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
      RUNNING: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
      STOPPED: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
      ERROR: [state.INIT, state.RUNNING, state.STOPPED, state.ERROR, state.FATAL],
      FATAL: [state.FATAL],
    })
  })

  it('invalid state change FATAL to INIT', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.reset()
    appState.get().should.equal('INIT')
    appState.running()
    loggerCB.should.be.calledOnce()
    appState.get().should.equal('RUNNING')
    appState.fatal()
    loggerCB.should.be.calledTwice()
    appState.init()
    loggerCB.should.be.calledTwice() // not called
  })

  it('invalid state change FATAL to RUNNING', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.reset()
    appState.get().should.equal('INIT')
    appState.running()
    loggerCB.should.be.calledOnce()
    appState.get().should.equal('RUNNING')
    appState.fatal()
    loggerCB.should.be.calledTwice()
    appState.running()
    loggerCB.should.be.calledTwice() // not called
  })

  it('invalid state change FATAL to STOPPED', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.reset()
    appState.get().should.equal('INIT')
    appState.running()
    loggerCB.should.be.calledOnce()
    appState.get().should.equal('RUNNING')
    appState.fatal()
    loggerCB.should.be.calledTwice()
    appState.stopped()
    loggerCB.should.be.calledTwice() // not called
  })

  it('invalid state change FATAL to ERROR', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.reset()
    appState.get().should.equal('INIT')
    appState.running()
    loggerCB.should.be.calledOnce()
    appState.get().should.equal('RUNNING')
    appState.fatal()
    loggerCB.should.be.calledTwice()
    appState.error()
    loggerCB.should.be.calledTwice() // not called
  })
})
