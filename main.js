// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}





function createHiddenWindow () {
  // Create the browser window.
  invisWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      devTools: true,
      webSecurity: false }
  })
  // and load the index.html of the app.
  invisWindow.loadURL("https://www.youtube.com/watch?v=7n9tlQCRiyA")

  invisWindow.webContents.openDevTools()

  invisWindow.on('closed', function () {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  invisWindow = null
  })
  //invisWindow.webContents.session.webRequest.onBeforeRequest(console.log("test"))
  cancelReq = false
  gotAudio = false
  const wpContentFilter = { urls: ['<all_urls>'] };

  invisWindow.webContents.session.webRequest.onBeforeRequest(wpContentFilter, (details, callback) => {
    const { url } = details
    if (gotAudio == false) {
      if (url.includes('mime=audio')) {
        console.log('onBeforeRequest details', details)
        cancelReq = true
        gotAudio = true
        urlChop = url.split("&range")
        console.log(urlChop[0]);
        var music_src = urlChop[0]
        global.sharedObj = { music_src }
        invisWindow.loadURL("https://stackoverflow.com/questions/48853606/how-to-pass-js-variable-from-js-file-to-html-page-in-electron")

      }
    }


  callback({
  cancel: cancelReq,
  });
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  createHiddenWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
