const { ipcMain } = require('electron');

const IPC_CHANNELS = require('./ipcChannels');

const launchMeshroom = require('../../automation/toolLaunchers/launchMeshroom');
const openFolder = require('../../automation/actions/openFolder');
const launchBlender = require('../../automation/toolLaunchers/launchBlender');
const launchUnity = require('../../automation/toolLaunchers/launchUnity');
const installTemplates = require('../../automation/actions/installTemplates');
const createProjectStructure = require('../../automation/actions/createProjectStructure');
const copyWorkflowAssets = require('../../automation/actions/copyWorkflowAssets');

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
                


                /* Install Templates*/

                case 'install_templates':

                    installTemplates()

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

                    break;
                    /*
                    * open folder action
                    */
                case 'open_folder':

                    openFolder(payload)

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

                    break;
                /*
                 * launch Blender
                 */
                case 'launch_blender':

                    launchBlender()

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

                    break;


                /* 
                *launch Unity
                */
               case 'launch_unity':

                    launchUnity()

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

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
                    * Launch Meshroom
                    */    
                case 'launch_meshroom':

                    launchMeshroom()

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

                    break;

                /* PROJECT STRUCTURE GENERATION */
                case 'create_project_structure':

                    createProjectStructure()

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

                    break;

                /* Copying Workflow Assets */
                case 'copy_workflow_assets':

                    copyWorkflowAssets(payload)

                        .then((result) => {

                            event.reply(
                                IPC_CHANNELS.WORKFLOW_RESPONSE,
                                result
                            );

                        })

                        .catch((error) => {

                            event.reply(
                                IPC_CHANNELS.SYSTEM_ERROR,
                                {
                                    success: false,
                                    error: error.message
                                }
                            );

                        });

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