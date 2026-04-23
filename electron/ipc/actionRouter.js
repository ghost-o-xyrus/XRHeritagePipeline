const { ipcMain } = require('electron');
const IPC_CHANNELS = require('./ipcChannels');

/*
 * Action handlers from the automation layer.
 */
const launchMeshroom          = require('../../automation/toolLaunchers/launchMeshroom');
const launchBlender           = require('../../automation/toolLaunchers/launchBlender');
const launchUnity             = require('../../automation/toolLaunchers/launchUnity');
const openFolder              = require('../../automation/actions/openFolder');
const createProjectStructure  = require('../../automation/actions/createProjectStructure');
const copyWorkflowAssets      = require('../../automation/actions/copyWorkflowAssets');
const installTemplates        = require('../../automation/actions/installTemplates');
const installScripts          = require('../../automation/actions/installScripts');

/*
 * Map action names (as used in workflow JSON)
 * to their handler function.
 */
const HANDLERS = {
    launch_meshroom:          launchMeshroom,
    launch_blender:           launchBlender,
    launch_unity:             launchUnity,
    open_folder:              openFolder,
    create_project_structure: createProjectStructure,
    copy_workflow_assets:     copyWorkflowAssets,
    install_templates:        installTemplates,
    install_scripts:          installScripts,

    /*
     * Test action retained for debugging.
     */
    ping: async () => ({ success: true, message: 'pong' })
};

function initializeActionRouter({ getMainWindow }) {

    ipcMain.on(IPC_CHANNELS.WORKFLOW_ACTION, async (event, request) => {

        const { action, payload } = request || {};
        console.log(`[IPC] Action received: ${action}`);

        const handler = HANDLERS[action];

        if (!handler) {
            event.reply(IPC_CHANNELS.SYSTEM_ERROR, {
                success: false,
                error: `Unknown action: ${action}`
            });
            return;
        }

        /*
         * Context passed to every handler.
         * Includes the sender (so handlers can emit progress)
         * and a window accessor for dialogs.
         */
        const context = {
            sender: event.sender,
            getMainWindow,
            payload: payload || {}
        };

        try {
            const result = await handler(context);
            event.reply(IPC_CHANNELS.WORKFLOW_RESPONSE, {
                success: true,
                action,
                ...result
            });
        } catch (err) {
            console.error(`[IPC] Handler failed for ${action}:`, err);
            event.reply(IPC_CHANNELS.SYSTEM_ERROR, {
                success: false,
                action,
                error: err.message || String(err)
            });
        }

    });

    console.log('[IPC ROUTER INITIALIZED]');
}

module.exports = initializeActionRouter;