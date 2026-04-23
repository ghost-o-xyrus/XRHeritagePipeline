/*
 * Renders the bottom status bar.
 */

import { getAppState } from '../state/appState.js';
import { getCurrentPipeline } from '../logic/pipelineManager.js';
import { getCurrentStep } from '../logic/stepManager.js';

export function renderStatus() {
    const { statusMessage } = getAppState();
    const pipeline = getCurrentPipeline();
    const step = getCurrentStep();

    document.getElementById('status-pipeline').textContent =
        pipeline ? `Pipeline: ${pipeline.name}` : 'Pipeline: —';

    document.getElementById('status-step').textContent =
        step ? `Step: ${step.title}` : 'Step: —';

    document.getElementById('status-message').textContent = statusMessage || 'Ready';
}