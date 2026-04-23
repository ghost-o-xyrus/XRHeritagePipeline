/*
 * Wires clicks on pipeline tabs.
 */

import { navigateToPipeline } from '../logic/navigationController.js';

export function initTopNavigation(onNavigate) {
    const container = document.getElementById('pipeline-tabs');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const tab = event.target.closest('[data-pipeline-id]');
        if (!tab) return;

        const pipelineId = tab.getAttribute('data-pipeline-id');
        navigateToPipeline(pipelineId);
        onNavigate();
    });
}