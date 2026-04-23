/**
 * Centralized IPC channel registry
 *
 * Prevents hardcoded channel strings
 * across renderer and main processes
 */

const IPC_CHANNELS = {

    /*
     * Workflow action requests
     * Renderer → Main
     */
    WORKFLOW_ACTION: 'workflow:action',

    /*
     * Workflow responses
     * Main → Renderer
     */
    WORKFLOW_RESPONSE: 'workflow:response',

    /*
     * System error reporting
     * Main → Renderer
     */
    SYSTEM_ERROR: 'system:error'

};

/*
 * Export IPC channel registry
 */
module.exports = IPC_CHANNELS;