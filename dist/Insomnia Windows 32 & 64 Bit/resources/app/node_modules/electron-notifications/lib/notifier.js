const electron = require('electron');
const is = require('electron-is');

class Notifier {
  constructor () {
    this.activeNotifications = [];
    this.notificationHeight = 80;
    this.queue = [];
    this.startBarSizeEstimate = 90;
    if (process.type === 'renderer') {
      this.BrowserWindow = electron.remote.BrowserWindow;
    } else {
      this.BrowserWindow = electron.BrowserWindow;
    }
  }

  configure(options) {
	  if(options.hasOwnProperty('stackGap')) {
		this.stackGap = options.stackGap;
	  }
  }

  notify (title, data) {
    const isWindows = process.platform === 'win32'
    const options = Object.assign({}, data);
    const size = electron.screen.getPrimaryDisplay().workAreaSize;
    let verticalSpace = 0;
    if (options.vertical && options.buttons && options.buttons.length) {
      verticalSpace = Math.min(options.buttons.length * 40, 80);
    } else {
      options.vertical = false;
    }
    options.stackGap = this.stackGap;
    let windowOptions = {
      width: 400,
      height: this.notificationHeight + verticalSpace,
      x: size.width - 400,
      y: 0,  /* this is because we set the poper position when we pop it from the queue */
      frame: false,
      resizable: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      webPreferences: {
        devTools: false,
      },
      focusable: false,
    };
    if (!is.macOS()) {
      //this causes close/resize buttons to show on macOS
      windowOptions.titleBarStyle = 'hidden';
    }
    const notificationWindow = new this.BrowserWindow(windowOptions);
    this.queue.push({
      window:notificationWindow,
      title:title,
      options:options
    });
    this.showNext();
    return notificationWindow;
  }

  showNext () {
    if (this.queue.length === 0) {
      return;
    }
    const size = electron.screen.getPrimaryDisplay().workAreaSize;
    var availableHeight = size.height - (is.windows()?this.startBarSizeEstimate:0);
    for(var j = 0; j < this.activeNotifications.length ; j++) {
    	availableHeight -= this.activeNotifications[j].window.getBounds().height;
    }
    if(availableHeight < this.queue[0].window.getBounds().height) {
      return;
    }
    const notification = this.queue.shift();
    const title = notification.title;
    const options = notification.options;
    let notificationWindow = notification.window;

    var notificationY = 0;

    for(var i = 0; i < this.activeNotifications.length ; i++) {
      var item = this.activeNotifications[i];
      notificationY += item.window.getBounds().height + 10
    }

    this.activeNotifications.push(notification);

    notificationWindow.loadURL('file://' + __dirname + '/assets/notification.html');

    notificationWindow.webContents.on('did-finish-load', () => {
      notificationWindow.show();
      notificationWindow.webContents.send('setup', title, options);
    })
    const timeout = setTimeout(() => {
      //console.log("closing notification window!")
      //console.log("Is notification window gone? ", notificationWindow.isDestroyed())
      if (!notificationWindow.isDestroyed()) {
        notificationWindow.close()
      }
    }, options.duration || 4000);

    notificationWindow.setPosition(
      notificationWindow.getPosition()[0],
      is.windows()?size.height-this.startBarSizeEstimate-notificationY:notificationY,
      true
    );

    const currentWindow = electron.remote && electron.remote.getCurrentWindow()
    if (notificationWindow) {
      notificationWindow.on('close', () => {
        this.nextY = 0;
        var loc = this.activeNotifications.indexOf(notification);
        if(loc > -1) {
          this.activeNotifications = this.activeNotifications.filter(function(item){
            return item.window != this.window;
          }.bind(notification));
        }
        if (notificationWindow) {
          notificationWindow.removeAllListeners();
        }
        for(var i = 0; i < this.activeNotifications.length ; i++) {
          var item = this.activeNotifications[i];
          var canMove = true;
          try {
            item.window.getPosition();
          } catch(e) {
            canMove = false;
          }
          if(canMove) {
            console.log("window at index "+[1]+" is moving to position "+this.nextY);
            const size = electron.screen.getPrimaryDisplay().workAreaSize
            // TODO - do a pretty slide up/down to collapse list
            item.window.setPosition(
              item.window.getPosition()[0],
              is.windows()?size.height-this.startBarSizeEstimate-this.nextY:this.nextY,
              true /* TODO : this is electron "animate" param - it's not working on windows */
            );
            var itemHeight = item.window.getBounds().height;
            this.nextY += itemHeight;
            console.log(item);
          }
        }
        if(this.queue.length) {
          this.showNext();

        }
      });
    }
    this.showNext();
    notificationWindow.on('closed', () => {
      clearTimeout(timeout);
      notificationWindow = null;
    });
  }
}

module.exports = Notifier;
