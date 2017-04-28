'use strict'

const assert = require('assert')
const release = require('os').release
const path = require('path')
const is = require(path.join(__dirname, '..', '..', '..', 'is'))

function assertions () {
  assert.equal(is.main(), process.type === 'browser', 'is.main() not ok!')
  assert.equal(is.renderer(), process.type === 'renderer', 'is.renderer() not ok!')

  assert.equal(is.osx(), process.platform === 'darwin', 'is.osx() not ok!')
  assert.equal(is.macOS(), process.platform === 'darwin', 'is.macOS() not ok!')
  assert.equal(is.windows(), process.platform === 'win32', 'is.windows() not ok!')
  assert.equal(is.linux(), process.platform === 'linux', 'is.linux() not ok!')

  assert.equal(is.x86(), process.arch === 'ia32', 'is.x86() not ok!')
  assert.equal(is.x64(), process.arch === 'x64', 'is.x64() not ok!')

  assert.equal(is.production(), (process.env.NODE_ENV || 'dev') === 'production', 'is.production() not ok!')
  assert.equal(is.dev(), (process.env.NODE_ENV || 'dev') === 'dev', 'is.dev() not ok!')

  assert.equal(is.sandbox(), ('APP_SANDBOX_CONTAINER_ID' in process.env), 'is.sandbox() not ok!')
  assert.equal(is.mas(), process.mas === true, 'is.mas() not ok!')
  assert.equal(is.windowsStore(), process.windowsStore === true, 'is.windowsStore() not ok!')

  assert.equal(is.all(is.osx, is.x64), is.osx() && is.x64(), 'is.all() 1 not ok!')
  assert.equal(is.all(is.osx, is.x86), is.osx() && is.x86(), 'is.all() 2 not ok!')
  assert.equal(is.none(is.windows, is.x86), !is.windows() && !is.x86(), 'is.none() 1 not ok!')
  assert.equal(is.none(is.windows, is.x64), !is.windows() && !is.x64(), 'is.none() 2 not ok!')
  assert.equal(is.one(is.windows, is.osx), is.windows() || is.osx(), 'is.one() 1 not ok!')
  assert.equal(is.one(is.windows, is.linux), is.windows() || is.linux(), 'is.one() 2 not ok!')

  if (is.osx()) {
    const osx = osxRelease()
    // mac el capitan
    assert.equal(is.release(osx), true, 'is.release() not ok!')

    assert.equal(is.gtRelease(osx), false, 'is.gtRelease() 1 not ok!')
    assert.equal(is.gtRelease('100.100.100'), true, 'is.gtRelease() 2 not ok!')
    assert.equal(is.gtRelease('1.0.0'), false, 'is.gtRelease() 3 not ok!')

    assert.equal(is.ltRelease(osx), false, 'is.ltRelease() 1 not ok!')
    assert.equal(is.ltRelease('100.100.100'), false, 'is.ltRelease() 2 not ok!')
    assert.equal(is.ltRelease('1.0.0'), true, 'is.ltRelease() 3 not ok!')
  } else if (is.windows()) {
    // tests Windows 10 AU
    assert.equal(is.release('10.0'), true, 'is.release() not ok!')
    assert.equal(is.release('10.0.14393'), true, 'is.release() not ok!')
  } else {
    assert.equal(is.release('1.2.3'), null, 'is.release() not ok!')
  }

  return true
}

// returns the current osx release
function osxRelease () {
  const actual = release().split('.')
  return `10.${actual[0] - 4}.${actual[1]}`
}

assertions()
