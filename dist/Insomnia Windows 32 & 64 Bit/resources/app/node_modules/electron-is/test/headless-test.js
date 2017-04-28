'use strict'

const fs = require('fs')
const electronEval = require('electron-eval')

const assertions = fs.readFileSync('./test/assertions.js', 'utf8')
const daemon = electronEval()

;(function test (options) {
  daemon.eval(assertions, { mainProcess: options.main }, (err, res) => {
    if (err) {
      console.log(err.message)
      process.exit(1)
    }
    if (options.main) {
      test({ main: false })
    } else {
      daemon.close()
      console.log('All test passed!')
      process.exit(0)
    }
  })
})({ main: true })
