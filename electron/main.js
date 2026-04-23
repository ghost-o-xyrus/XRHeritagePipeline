// const { app, BrowserWindow } = require('electron');
// const path = require('path');

// function createWindow() {
//     const win = new BrowserWindow({
//         width: 1400,
//         height: 900,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js')
//         }
//     });

//     win.loadFile(path.join(__dirname, '../src/index.html'));
// }

// app.whenReady().then(() => {
//     createWindow();
// });

const { app, BrowserWindow } = require('electron');

const createWindow = require('./window/createWindow');
const initializeActionRouter = require('./ipc/actionRouter');

/**
 * Initialize core application systems
 */
function initializeApplication() {

    /*
     * Initialize IPC communication routes
     */
    initializeActionRouter();

    /*
     * Create main application window
     */
    createWindow();

}

/*
 * Electron ready lifecycle
 */
app.whenReady().then(() => {

    initializeApplication();

    /*
     * macOS application behavior
     */
    app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }

    });

});

/*
 * Quit app when all windows close
 * except on macOS
 */
app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {
        app.quit();
    }

});