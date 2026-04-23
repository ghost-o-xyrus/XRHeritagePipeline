/*
 * Renders the checklist for the current step.
 */

import { getCurrentStep } from '../logic/stepManager.js';
import { getCurrentPipeline } from '../logic/pipelineManager.js';
import { isChecked } from '../state/uiState.js';

export function renderChecklist() {
    const container = document.getElementById('step-checklist');
    if (!container) return;

    const step = getCurrentStep();
    const pipeline = getCurrentPipeline();
    if (!step || !pipeline) {
        container.innerHTML = '';
        return;
    }

    const items = step.checklist || [];
    if (items.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = `
        <h3 class="section-heading">Checklist</h3>
        <ul class="checklist">
            ${items.map((text, idx) => {
                const checked = isChecked(pipeline.id, step.id, idx);
                const checkedClass = checked ? ' checked' : '';
                return `
                    <li class="checklist-item${checkedClass}" data-item-index="${idx}">
                        <span class="checklist-box">${checked ? '✓' : ''}</span>
                        <span class="checklist-label">${text}</span>
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}