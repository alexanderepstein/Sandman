const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url')
const iconPath = path.join(__dirname, 'icon.png');
let tray = null;
let win = null;

app.on('ready', function(){
  win = new BrowserWindow({width: 800, height: 400, resizable: false});

  win.setMenu(null);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.openDevTools();
  win.on('minimize',function(event){
        event.preventDefault()
            win.hide();
    });



  win.on('close', function (event) {
        if( !app.isQuiting){
            event.preventDefault()
            win.hide();
        }
        return false;
    });
  tray = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([

          { label: 'Show App', click:  function(){
              win.show();
          } },
          { label: 'About Insomnia', click:  function(){
            abt = new BrowserWindow({width: 400, height: 400, resizable: false});
            abt.setMenu(null);
            abt.loadURL(url.format({
              pathname: path.join(__dirname, 'about.html'),
              protocol: 'file:',
              slashes: true
            }))

          } },
          { label: 'Quit', click:  function(){
              app.isQuiting = true;
              app.quit();

          } }
      ]);
  tray.setToolTip('Insomnia');
  tray.setContextMenu(contextMenu);
});
