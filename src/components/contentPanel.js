/*
 * Wires clicks on checklist items.
 */

import { toggleChecked } from '../state/uiState.js';
import { getCurrentPipeline } from '../logic/pipelineManager.js';
import { getCurrentStep } from '../logic/stepManager.js';

export function initContentPanel(onChecklistToggle) {
    const container = document.getElementById('step-checklist');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const item = event.target.closest('[data-item-index]');
        if (!item) return;

        const pipeline = getCurrentPipeline();
        const step = getCurrentStep();
        if (!pipeline || !step) return;

        const idx = parseInt(item.getAttribute('data-item-index'), 10);
        toggleChecked(pipeline.id, step.id, idx);
        onChecklistToggle();
    });
}