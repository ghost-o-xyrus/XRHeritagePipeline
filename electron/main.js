const { app, BrowserWindow } = require('electron');

const createWindow = require('./window/createWindow');
const initializeActionRouter = require('./ipc/actionRouter');

/*
 * Holds a reference to the main window so automation code
 * can attach modal dialogs to it.
 */
let mainWindow = null;

function getMainWindow() {
    return mainWindow;
}

function initializeApplication() {
    initializeActionRouter({ getMainWindow });
    mainWindow = createWindow();
}

app.whenReady().then(() => {
    initializeApplication();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

module.exports = { getMainWindow };