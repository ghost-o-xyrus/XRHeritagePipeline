/*
 * Wires clicks on helper action buttons.
 */
import { setWorkflowFolder, setProjectPaths, getWorkflowContext} from '../state/appState.js';
import { dispatchAction, registerActionResponseHandler } from '../logic/actionDispatcher.js';
import { setStatusMessage } from '../state/appState.js';

export function initHelperButtons(onStatusChange) {
    const container = document.getElementById('step-actions');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) return;

        const action = button.getAttribute('data-action');

        const payload = JSON.parse(button.getAttribute('data-payload') || '{}');
        dispatchAction(action, {
            ...payload,
            workflowContext: getWorkflowContext()
        });
        onStatusChange();
    });

    registerActionResponseHandler((response) => {
        if (response && response.folderType && response.path) {
            setWorkflowFolder(response.folderType, response.path);
        }
        if (response && response.message) {
            setStatusMessage(`Response: ${response.message}`);
        
        } 

        if (response && response.projectPaths) { setProjectPaths(response.projectPaths); }
        
        
        else if (response && response.error) {
            setStatusMessage(`Error: ${response.error}`);
        }
        onStatusChange();
    });
}