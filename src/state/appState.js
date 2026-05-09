/*
 * Global application state.
 * Tracks what the user is currently looking at.
 */

const appState = {
    currentPipelineId: null,
    currentStepIndex: 0,
    statusMessage: 'Ready',
    workflowContext: {
        captureFolder: null,
        outputFolder: null,
        workspaceRoot: null,
        unityProject: null,

        unityAssetsImport: null,

        workflowData: null,

        captures: null,

        meshroom: null,

        blender: null,

        exports: null,

        textures: null,

        documentation: null,

        references: null

    }
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

export function setWorkflowFolder(folderType, folderPath) {

    if (folderType === 'capture') {

        appState.workflowContext.captureFolder = folderPath;

    }

    else if (folderType === 'output') {

        appState.workflowContext.outputFolder = folderPath;

    }

}

export function getWorkflowContext() {

    return appState.workflowContext;

}

export function setProjectPaths(projectPaths) {

    Object.assign(
        appState.workflowContext,
        projectPaths
    );

}