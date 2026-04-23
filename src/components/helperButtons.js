/*
 * Wires clicks on helper action buttons.
 */

import { dispatchAction, registerActionResponseHandler } from '../logic/actionDispatcher.js';
import { setStatusMessage } from '../state/appState.js';

export function initHelperButtons(onStatusChange) {
    const container = document.getElementById('step-actions');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) return;

        const action = button.getAttribute('data-action');
        dispatchAction(action);
        onStatusChange();
    });

    registerActionResponseHandler((response) => {
        if (response && response.message) {
            setStatusMessage(`Response: ${response.message}`);
        } else if (response && response.error) {
            setStatusMessage(`Error: ${response.error}`);
        }
        onStatusChange();
    });
}