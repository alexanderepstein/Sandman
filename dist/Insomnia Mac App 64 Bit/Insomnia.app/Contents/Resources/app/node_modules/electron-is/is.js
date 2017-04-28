/*
 * Project: electron-is
 * Version: 2.4.0
 * Author: delvedor
 * Twitter: @delvedor
 * License: MIT
 * GitHub: https://github.com/delvedor/electron-is
 */

'use strict'

const semver = require('semver')
const gt = semver.gt
const lt = semver.lt
const release = require('os').release
const isDev = require('electron-is-dev')

// Constructor
function IsApi () {}

// Checks if we are in renderer process
IsApi.prototype.renderer = function () {
  return process.type === 'renderer'
}

// Checks if we are in main process
IsApi.prototype.main = function () {
  return process.type === 'browser'
}

// Checks if we are under Mac OS
IsApi.prototype.osx = IsApi.prototype.macOS = function () {
  return process.platform === 'darwin'
}

// Checks if we are under Windows OS
IsApi.prototype.windows = function () {
  return process.platform === 'win32'
}

// Checks if we are under Linux OS
IsApi.prototype.linux = function () {
  return process.platform === 'linux'
}

// Checks if we are the processor's arch is x86
IsApi.prototype.x86 = function () {
  return process.arch === 'ia32'
}

// Checks if we are the processor's arch is x64
IsApi.prototype.x64 = function () {
  return process.arch === 'x64'
}

// Checks if the env is setted to 'production'
IsApi.prototype.production = function () {
  return !isDev
}

// Checks if the env is setted to 'dev'
IsApi.prototype.dev = function () {
  return isDev
}

// Checks if the app is running in a sandbox on macOS
IsApi.prototype.sandbox = function () {
  return 'APP_SANDBOX_CONTAINER_ID' in process.env
}
// Checks if the app is running as a Mac App Store build
IsApi.prototype.mas = function () {
  return process.mas === true
}
// Checks if the app is running as a Windows Store (appx) build
IsApi.prototype.windowsStore = function () {
  return process.windowsStore === true
}

// checks if all the 'is functions' passed as arguments are true
IsApi.prototype.all = function () {
  const isFunctions = new Array(arguments.length)
  for (var i = 0; i < isFunctions.length; i++) {
    isFunctions[i] = arguments[i]
  }
  if (!isFunctions.length) return
  for (i = 0; i < isFunctions.length; i++) {
    if (!isFunctions[i]()) return false
  }
  return true
}

// checks if all the 'is functions' passed as arguments are false
IsApi.prototype.none = function () {
  const isFunctions = new Array(arguments.length)
  for (var i = 0; i < isFunctions.length; i++) {
    isFunctions[i] = arguments[i]
  }
  if (!isFunctions.length) return
  for (i = 0; i < isFunctions.length; i++) {
    if (isFunctions[i]()) return false
  }
  return true
}

// returns true if one of the 'is functions' passed as argument is true
IsApi.prototype.one = function () {
  const isFunctions = new Array(arguments.length)
  for (var i = 0; i < isFunctions.length; i++) {
    isFunctions[i] = arguments[i]
  }
  if (!isFunctions.length) return
  for (i = 0; i < isFunctions.length; i++) {
    if (isFunctions[i]()) return true
  }
  return false
}

// checks the if the given release is the same of the OS
IsApi.prototype.release = function (requested) {
  if (this.osx()) {
    return requested === osxRelease()
  } else if (this.windows()) {
    requested = requested.split('.')
    const actual = release().split('.')
    if (requested.length === 2) {
      return `${actual[0]}.${actual[1]}` === `${requested[0]}.${requested[1]}`
    }
    return `${actual[0]}.${actual[1]}.${actual[2]}` === `${requested[0]}.${requested[1]}.${requested[2]}`
  } else {
    // Not implemented for Linux yet
    return null
  }
}

// checks if the given release is greater than the current OS release
IsApi.prototype.gtRelease = function (requested) {
  if (this.osx()) {
    return gt(requested, osxRelease())
  } else if (this.windows()) {
    requested = requested.split('.')
    const actual = release().split('.')
    if (requested.length === 2) {
      return gt(`${requested[0]}.${requested[1]}.0`, `${actual[0]}.${actual[1]}.0`)
    }
    return gt(`${requested[0]}.${requested[1]}.${requested[2]}`, `${actual[0]}.${actual[1]}.${actual[2]}`)
  } else {
    // Not implemented for Linux yet
    return null
  }
}

// checks if the given release is less than the current OS release
IsApi.prototype.ltRelease = function (requested) {
  if (this.osx()) {
    return lt(requested, osxRelease())
  } else if (this.windows()) {
    requested = requested.split('.')
    const actual = release().split('.')
    if (requested.length === 2) {
      return lt(`${requested[0]}.${requested[1]}.0`, `${actual[0]}.${actual[1]}.0`)
    }
    return lt(`${requested[0]}.${requested[1]}.${requested[2]}`, `${actual[0]}.${actual[1]}.${actual[2]}`)
  } else {
    // Not implemented for Linux yet
    return null
  }
}

// returns the current osx release
function osxRelease () {
  const actual = release().split('.')
  return `10.${actual[0] - 4}.${actual[1]}`
}

// exports
module.exports = new IsApi()
