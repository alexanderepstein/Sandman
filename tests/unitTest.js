const exec = require('child_process').exec;

const mainwindowtestpath = "./node_modules/mocha/bin/mocha tests/mainwindowtest.js";


function runTest(testfile)
{
  var command = exec(testfile)
  command.stdout.pipe(process.stdout);
  command.stderr.pipe(process.stderr);
}

runTest(mainwindowtestpath);
