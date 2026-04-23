/*
 * Manages which step within the active pipeline is selected.
 */

import { getAppState, setCurrentStep } from '../state/appState.js';
import { getCurrentPipeline } from './pipelineManager.js';

export function selectStep(stepIndex) {
    const pipeline = getCurrentPipeline();
    if (!pipeline) return null;
    if (stepIndex < 0 || stepIndex >= pipeline.steps.length) return null;
    setCurrentStep(stepIndex);
    return pipeline.steps[stepIndex];
}

export function getCurrentStep() {
    const pipeline = getCurrentPipeline();
    if (!pipeline) return null;
    const { currentStepIndex } = getAppState();
    return pipeline.steps[currentStepIndex] || null;
}