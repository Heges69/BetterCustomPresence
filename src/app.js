const express = require('express');
const { app, BrowserWindow } = require('electron')
const router = require('./router');

module.exports.run = (config) => {
    const exp = express();
    exp.use('/setpresence', router)
    exp.listen(config.port, ()=>console.log(`Listening on port ${config.port}`));
    function createWindow() {
        const win = new BrowserWindow({
            width: config.width,
            height: config.height,
            webPreferences: {
                nodeIntegration: true,
                devTools: false
            },
            resizable: false
        })
        win.setMenuBarVisibility(false);
        win.loadFile('./content/index.html');
    }

    app.whenReady().then(createWindow)

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
}