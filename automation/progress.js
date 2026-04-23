const IPC_CHANNELS = require('../electron/ipc/ipcChannels');

/*
 * Send a short progress message to the renderer.
 * The UI shows it in the status bar.
 */
function sendProgress(context, message) {
    if (!context || !context.sender) return;
    try {
        context.sender.send(IPC_CHANNELS.WORKFLOW_PROGRESS, {
            message
        });
    } catch (err) {
        /* sender may be destroyed if window closed */
    }
}

module.exports = { sendProgress };