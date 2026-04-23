/*
 * Renders the top-nav pipeline tabs.
 */

import { getPipelines } from '../state/pipelineState.js';
import { getAppState } from '../state/appState.js';

export function renderPipelineTabs() {
    const container = document.getElementById('pipeline-tabs');
    if (!container) return;

    const pipelines = getPipelines();
    const { currentPipelineId } = getAppState();

    container.innerHTML = pipelines.map(p => {
        const activeClass = p.id === currentPipelineId ? ' active' : '';
        return `<button class="pipeline-tab${activeClass}" data-pipeline-id="${p.id}">${p.name}</button>`;
    }).join('');
}