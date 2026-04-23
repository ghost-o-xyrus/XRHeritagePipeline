/*
 * Centralized IPC channel registry.
 */

const IPC_CHANNELS = {
    WORKFLOW_ACTION:   'workflow:action',
    WORKFLOW_RESPONSE: 'workflow:response',
    WORKFLOW_PROGRESS: 'workflow:progress',
    SYSTEM_ERROR:      'system:error'
};

module.exports = IPC_CHANNELS;