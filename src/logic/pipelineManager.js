/*
 * Manages which pipeline is currently active.
 */

import { getAppState, setCurrentPipeline } from '../state/appState.js';
import { getPipelineById, getPipelines } from '../state/pipelineState.js';

export function selectPipeline(pipelineId) {
    const pipeline = getPipelineById(pipelineId);
    if (!pipeline) {
        console.warn(`Pipeline not found: ${pipelineId}`);
        return null;
    }
    setCurrentPipeline(pipelineId);
    return pipeline;
}

export function getCurrentPipeline() {
    const { currentPipelineId } = getAppState();
    if (!currentPipelineId) return null;
    return getPipelineById(currentPipelineId);
}

export function getDefaultPipelineId() {
    const pipelines = getPipelines();
    return pipelines.length > 0 ? pipelines[0].id : null;
}