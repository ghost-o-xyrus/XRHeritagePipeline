const { contextBridge, ipcRenderer } = require('electron');
const IPC_CHANNELS = require('./ipc/ipcChannels');

/**
 * Secure API bridge exposed to the renderer process.
 */
contextBridge.exposeInMainWorld('api', {

    sendAction: (action, payload = {}) => {
        ipcRenderer.send(IPC_CHANNELS.WORKFLOW_ACTION, {
            action,
            payload
        });
    },

    onActionResponse: (callback) => {
        ipcRenderer.on(IPC_CHANNELS.WORKFLOW_RESPONSE, (_, data) => {
            callback(data);
        });
        ipcRenderer.on(IPC_CHANNELS.SYSTEM_ERROR, (_, data) => {
            callback(data);
        });
    }

});