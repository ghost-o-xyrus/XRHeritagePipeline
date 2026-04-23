/*
 * Renders the sidebar step list AND the content-panel step body.
 */

import { getCurrentPipeline } from '../logic/pipelineManager.js';
import { getCurrentStep } from '../logic/stepManager.js';
import { getAppState } from '../state/appState.js';
import { renderChecklist } from './checklistRenderer.js';
import { renderActions } from './actionRenderer.js';

export function renderStepList() {
    const container = document.getElementById('step-list');
    if (!container) return;

    const pipeline = getCurrentPipeline();
    if (!pipeline) {
        container.innerHTML = '<li class="sidebar-empty">No pipeline selected</li>';
        return;
    }

    const { currentStepIndex } = getAppState();

    container.innerHTML = pipeline.steps.map((step, idx) => {
        const activeClass = idx === currentStepIndex ? ' active' : '';
        return `
            <li class="step-item${activeClass}" data-step-index="${idx}">
                <span class="step-item-index">${idx + 1}</span>
                <span class="step-item-title">${step.title}</span>
            </li>
        `;
    }).join('');
}

export function renderStepContent() {
    const step = getCurrentStep();

    const titleEl = document.getElementById('step-title');
    const descEl = document.getElementById('step-description');
    const instructionsEl = document.getElementById('step-instructions');

    if (!step) {
        titleEl.textContent = 'Select a pipeline to begin';
        descEl.textContent = '';
        instructionsEl.innerHTML = '';
        document.getElementById('step-checklist').innerHTML = '';
        document.getElementById('step-actions').innerHTML = '';
        return;
    }

    titleEl.textContent = step.title;
    descEl.textContent = step.description || '';

    const instructions = step.instructions || [];
    if (instructions.length > 0) {
        instructionsEl.innerHTML = `
            <h3 class="section-heading">Instructions</h3>
            <ol class="instruction-list">
                ${instructions.map(text => `<li class="instruction-item">${text}</li>`).join('')}
            </ol>
        `;
    } else {
        instructionsEl.innerHTML = '';
    }

    renderChecklist();
    renderActions();
}