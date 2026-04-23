import {
    dispatchAction,
    registerActionResponseHandler,
    registerActionProgressHandler
} from '../logic/actionDispatcher.js';
import { setStatusMessage } from '../state/appState.js';

export function initHelperButtons(onStatusChange) {
    const container = document.getElementById('step-actions');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const button = event.target.closest('[data-action]');
        if (!button) return;
        dispatchAction(button.getAttribute('data-action'));
        onStatusChange();
    });

    // Progress messages during long ops (downloads, copies)
    registerActionProgressHandler((data) => {
        if (data && data.message) {
            setStatusMessage(data.message);
            onStatusChange();
        }
    });

    // Final response or error
    registerActionResponseHandler((response) => {
        if (response && response.error) {
            setStatusMessage(`Error: ${response.error}`);
        } else if (response && response.message) {
            setStatusMessage(response.message);
        }
        onStatusChange();
    });
}