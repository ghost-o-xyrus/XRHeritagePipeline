/*
 * Transient UI interaction state.
 * Currently: which checklist items have been ticked.
 * Keyed by "pipelineId:stepId:itemIndex".
 */

const uiState = {
    checkedItems: new Set()
};

function key(pipelineId, stepId, itemIndex) {
    return `${pipelineId}:${stepId}:${itemIndex}`;
}

export function isChecked(pipelineId, stepId, itemIndex) {
    return uiState.checkedItems.has(key(pipelineId, stepId, itemIndex));
}

export function toggleChecked(pipelineId, stepId, itemIndex) {
    const k = key(pipelineId, stepId, itemIndex);
    if (uiState.checkedItems.has(k)) {
        uiState.checkedItems.delete(k);
    } else {
        uiState.checkedItems.add(k);
    }
}