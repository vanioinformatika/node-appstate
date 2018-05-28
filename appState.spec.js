/* eslint-env mocha */
const should = require('should') // eslint-disable-line
const sinon = require('sinon')
const shouldSinon = require('should-sinon') // eslint-disable-line

describe('appState', () => {
  it('handling undefined logger callback function', () => {
    const appState = require('./appState')()
    appState.get().should.equal('INIT')
    appState.running()
    appState.get().should.equal('RUNNING')
  })

  it('handling logger callback function, logging changes', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.init()
    loggerCB.should.be.calledOnce()
    // appState hasn't changed: called one
    appState.init()
    loggerCB.should.be.calledOnce()
  })

  it('changed: logged', () => {
    const loggerCB = sinon.spy()
    const appState = require('./appState')(loggerCB)
    appState.running()
    loggerCB.should.be.calledOnce()
    appState.stopped()
    loggerCB.should.be.calledTwice()
  })

  it('is logging', () => {
    sinon.spy(console, 'log')
    const logger = {
      info (appState, newAppState) { console.log(`App state has changed from ${appState} to ${newAppState}`) }
    }
    const appState = require('./appState')(logger.info)
    appState.init()
    console.log.should.be.calledOnce()
    console.log.should.be.calledWith('App state has changed from STOPPED to INIT')
    console.log.restore()
  })

  it('is INIT', () => {
    const appState = require('./appState')()
    appState.init()
    appState.get().should.be.equal('INIT')
  })

  it('is RUNNING', () => {
    const appState = require('./appState')()
    appState.running()
    appState.get().should.be.equal('RUNNING')
  })

  it('is STOPPED', () => {
    const appState = require('./appState')()
    appState.stopped()
    appState.get().should.be.equal('STOPPED')
  })

  it('is ERROR', () => {
    const appState = require('./appState')()
    appState.error()
    appState.get().should.be.equal('ERROR')
  })

  it('isInit ok', () => {
    const appState = require('./appState')()
    appState.init()
    appState.isInit().should.be.true()
  })

  it('isRunning ok', () => {
    const appState = require('./appState')()
    appState.running()
    appState.isRunning().should.be.true()
  })

  it('isStopped ok', () => {
    const appState = require('./appState')()
    appState.stopped()
    appState.isStopped().should.be.true()
  })

  it('isError ok', () => {
    const appState = require('./appState')()
    appState.error()
    appState.isError().should.be.true()
  })

  it('list state values', () => {
    const appState = require('./appState')()
    appState.error()
    appState.list().should.be.eql({
      INIT: 'INIT',
      RUNNING: 'RUNNING',
      ERROR: 'ERROR',
      STOPPED: 'STOPPED'
    })
  })
})
