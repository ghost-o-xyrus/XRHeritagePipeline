/*
 * Global application state.
 * Tracks what the user is currently looking at.
 */

const appState = {
    currentPipelineId: null,
    currentStepIndex: 0,
    statusMessage: 'Ready'
};

export function getAppState() {
    return appState;
}

export function setCurrentPipeline(pipelineId) {
    appState.currentPipelineId = pipelineId;
    appState.currentStepIndex = 0;
}

export function setCurrentStep(stepIndex) {
    appState.currentStepIndex = stepIndex;
}

export function setStatusMessage(message) {
    appState.statusMessage = message;
}