const Application = require("spectron").Application;
const path = require("path");
const assert = require("assert");


var electronPath = path.join(__dirname, "..", "node_modules", ".bin", "electron");

if (process.platform === "win32") {
  electronPath += ".cmd";
}

var appPath = path.join(__dirname, "..");

var app = new Application({
  path: electronPath,
  args: [appPath]
});

describe("Main Window Test", function() {
  this.timeout(10000);

  beforeEach(function() {
    return app.start();
  });

  afterEach(function() {
    app.client.execute(function() {
      return quit();
    });
  });

  it("Main Window Check", function() {
    return app.client.getWindowCount().then(function(count) {
      assert.equal(count, 1);
      app.stop();
    });
  });

  it("Title Check", function() {
    return app.client.getTitle().then(function(title) {
      assert.equal(title, "Sandman");
    });
  });


  it("Set Sleep Time Check", function() {
    app.client.waitUntilWindowLoaded();
    app.client.execute(function() {
      return document.getElementById("alarmTime").value = "07:30";
    });

    return app.client.getValue("#alarmTime").then(function(value) {
      assert.equal(value, "07:30");



    });

  });

  it("Check Generated Sleep Times", function() {
    app.client.waitUntilWindowLoaded();
    app.client.execute(function() {
      return document.getElementById("alarmTime").value = "07:30";
    });

    return app.client.getValue("#alarmTime").then(function(value) {
      app.client.execute(function() {
        return setTime();
      });
      return app.client.getText("#lblcheck0").then(function(check0) {
        assert.equal(check0, "10:15pm");
        return app.client.getText("#lblcheck1").then(function(check1) {
          assert.equal(check1, "11:45pm");
          return app.client.getText("#lblcheck2").then(function(check2) {
            assert.equal(check2, "01:15am");
            return app.client.getText("#lblcheck3").then(function(check3) {
              assert.equal(check3, "02:45am");
              return app.client.getText("#lblcheck4").then(function(check4) {
                assert.equal(check4, "04:15am");
                return app.client.getText("#lblcheck5").then(function(check5) {
                  assert.equal(check5, "05:45am");

                });
              });
            });
          });
        });
      });

    });

  });

});
