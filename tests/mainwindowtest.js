const Application = require('spectron').Application;
const path = require('path');
const assert = require('assert');


var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}

var appPath = path.join(__dirname, '..');

var app = new Application({
            path: electronPath,
            args: [appPath]
        });

describe('Main Window Test', function () {
  this.timeout(10000);

  beforeEach(function () {
      return app.start();
  });

  afterEach(function () {
      return app.stop();
  });

  it('Opens main window', function () {
    return app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
  });
});

  it('Check the title', function () {
    return app.client.getTitle().then(function (title) {
      assert.equal(title, "Sandman");
  });
});


it('Check Sleep Time', function () {
    return app.client.getValue('#alarmTime').then(function (value) {
        assert.equal(value,"08:30")
    });
});

/*it('Set Sleep Time', function () {
  app.client.waitUntilWindowLoaded();
  return app.client.setValue('#alarmTime','07:30').then(function(){
      return app.client.getValue('#alarmTime').then(function (value) {
        console.log(value);
        assert.equal(value,"07:30");

    });
  })

});
*/

});
