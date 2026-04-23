/*
 * Holds all loaded pipeline workflow data.
 * Populated by workflowLoader.js at startup.
 */

const pipelineState = {
    pipelines: []
};

export function getPipelines() {
    return pipelineState.pipelines;
}

export function setPipelines(pipelineArray) {
    pipelineState.pipelines = pipelineArray;
}

export function getPipelineById(id) {
    return pipelineState.pipelines.find(p => p.id === id) || null;
}