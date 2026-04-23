const { contextBridge, ipcRenderer } = require('electron');

const WORKFLOW_ACTION   = 'workflow:action';
const WORKFLOW_RESPONSE = 'workflow:response';
const WORKFLOW_PROGRESS = 'workflow:progress';
const SYSTEM_ERROR      = 'system:error';

contextBridge.exposeInMainWorld('api', {

    sendAction: (action, payload = {}) => {
        ipcRenderer.send(WORKFLOW_ACTION, { action, payload });
    },

    onActionResponse: (callback) => {
        ipcRenderer.on(WORKFLOW_RESPONSE, (_, data) => callback(data));
        ipcRenderer.on(SYSTEM_ERROR,      (_, data) => callback(data));
    },

    onActionProgress: (callback) => {
        ipcRenderer.on(WORKFLOW_PROGRESS, (_, data) => callback(data));
    }

});