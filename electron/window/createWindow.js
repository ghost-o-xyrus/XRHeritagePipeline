const { BrowserWindow } = require('electron');
const path = require('path');

/**
 * Creates and configures
 * the main Electron application window
 */
function createWindow() {

    /*
     * Create browser window
     */
    const mainWindow = new BrowserWindow({

        width: 1400,
        height: 900,

        minWidth: 1000,
        minHeight: 700,

        backgroundColor: '#111111',

        webPreferences: {

            /*
             * Secure preload bridge
             */
            preload: path.join(__dirname, '../preload.js'),

            /*
             * Security settings
             */
            contextIsolation: true,

            nodeIntegration: false,

            sandbox: false

        }

    });

    /*
     * Load frontend application
     */
    mainWindow.loadFile(
        path.join(__dirname, '../../src/index.html')
    );

    /*
     * Open developer tools
     * during development
     */
    mainWindow.webContents.openDevTools();

    return mainWindow;

}

/*
 * Export window creator
 */
module.exports = createWindow;