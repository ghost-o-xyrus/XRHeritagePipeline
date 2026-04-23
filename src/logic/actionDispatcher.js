/*
 * Sends helper-action requests to the main process via the preload bridge.
 * The main process handles the actual filesystem/tool work.
 */

import { setStatusMessage } from '../state/appState.js';

export function dispatchAction(actionName, payload = {}) {
    setStatusMessage(`Dispatching: ${actionName}`);

    if (window.api && typeof window.api.sendAction === 'function') {
        window.api.sendAction(actionName, payload);
    } else {
        console.warn('window.api bridge not available; action not dispatched:', actionName);
    }
}

export function registerActionResponseHandler(handler) {
    if (window.api && typeof window.api.onActionResponse === 'function') {
        window.api.onActionResponse(handler);
    }
}