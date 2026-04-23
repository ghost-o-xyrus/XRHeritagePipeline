// window.addEventListener('DOMContentLoaded', () => {
//     console.log("Preload initialized");
// });

const { contextBridge, ipcRenderer } = require('electron');

/**
 * Secure API bridge exposed
 * to renderer process
 */
contextBridge.exposeInMainWorld('api', {

    /*
     * Send helper action requests
     * to main process
     */
    sendAction: (action, payload = {}) => {

        ipcRenderer.send('workflow-action', {
            action,
            payload
        });

    },

    /*
     * Listen for responses
     * from main process
     */
    onActionResponse: (callback) => {

        ipcRenderer.on('workflow-action-response', (_, data) => {
            callback(data);
        });

    }

});