/*
 * Coordinates pipeline and step selection.
 * When a pipeline is selected, the first step is auto-selected.
 */

import { selectPipeline } from './pipelineManager.js';
import { selectStep } from './stepManager.js';
import { setStatusMessage } from '../state/appState.js';

export function navigateToPipeline(pipelineId) {
    const pipeline = selectPipeline(pipelineId);
    if (!pipeline) return null;
    selectStep(0);
    setStatusMessage(`Loaded ${pipeline.name}`);
    return pipeline;
}

export function navigateToStep(stepIndex) {
    const step = selectStep(stepIndex);
    if (step) {
        setStatusMessage(`Viewing: ${step.title}`);
    }
    return step;
}