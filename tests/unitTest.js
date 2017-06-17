var exec = require('child_process').exec;
var cmd = './node_modules/mocha/bin/mocha tests/mainwindowtest.js'

exec(cmd, function(error, stdout, stderr) {
  console.log(stdout);
  if (error != null)
  {
    console.log(error);
  }
});
