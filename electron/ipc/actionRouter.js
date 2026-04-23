const { ipcMain } = require('electron');

const IPC_CHANNELS = require('./ipcChannels');

/**
 * Initialize IPC action routing system
 */
function initializeActionRouter() {

    /*
     * Listen for workflow actions
     * from renderer process
     */
    ipcMain.on(

        IPC_CHANNELS.WORKFLOW_ACTION,

        (event, request) => {

            const { action, payload } = request;

            console.log('[IPC ACTION RECEIVED]');
            console.log('Action:', action);
            console.log('Payload:', payload);

            /*
             * Route actions
             */
            switch (action) {

                /*
                 * Test action
                 */
                case 'ping':

                    event.reply(
                        IPC_CHANNELS.WORKFLOW_RESPONSE,
                        {
                            success: true,
                            message: 'pong'
                        }
                    );

                    break;

                /*
                 * Placeholder:
                 * launch Blender
                 */
                case 'launch_blender':

                    event.reply(
                        IPC_CHANNELS.WORKFLOW_RESPONSE,
                        {
                            success: true,
                            message: 'Blender launch placeholder'
                        }
                    );

                    break;

                /*
                 * Placeholder:
                 * open project
                 */
                case 'open_project':

                    event.reply(
                        IPC_CHANNELS.WORKFLOW_RESPONSE,
                        {
                            success: true,
                            message: 'Project open placeholder'
                        }
                    );

                    break;

                /*
                 * Unknown action
                 */
                default:

                    event.reply(
                        IPC_CHANNELS.SYSTEM_ERROR,
                        {
                            success: false,
                            error: `Unknown action: ${action}`
                        }
                    );

            }

        }

    );

    console.log('[IPC ROUTER INITIALIZED]');

}

/*
 * Export router initializer
 */
module.exports = initializeActionRouter;