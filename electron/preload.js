const { contextBridge, ipcRenderer } = require('electron');

/*
 * Channel names — must match the values in electron/ipc/ipcChannels.js.
 * Duplicated here (not imported) because preload scripts cannot
 * require local project files in this Electron configuration.
 */
const WORKFLOW_ACTION   = 'workflow:action';
const WORKFLOW_RESPONSE = 'workflow:response';
const SYSTEM_ERROR      = 'system:error';

contextBridge.exposeInMainWorld('api', {

    sendAction: (action, payload = {}) => {
        ipcRenderer.send(WORKFLOW_ACTION, { action, payload });
    },

    onActionResponse: (callback) => {
        ipcRenderer.on(WORKFLOW_RESPONSE, (_, data) => callback(data));
        ipcRenderer.on(SYSTEM_ERROR,      (_, data) => callback(data));
    }

});