/*
 * Renders helper action buttons for the current step.
 */

import { getCurrentStep } from '../logic/stepManager.js';

export function renderActions() {
    const container = document.getElementById('step-actions');
    if (!container) return;

    const step = getCurrentStep();
    if (!step) {
        container.innerHTML = '';
        return;
    }

    const actions = step.actions || [];
    if (actions.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = actions.map(a => `
        <button class="helper-button" data-action="${a.action}">${a.label}</button>
    `).join('');
}