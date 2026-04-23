/*
 * Loads JSON workflow files from the data folder.
 */

import { setPipelines } from '../state/pipelineState.js';

const WORKFLOW_FILES = [
    '../../data/asset_acquisition.json',
    '../../data/asset_optimization.json',
    '../../data/scene_setup.json',
    '../../data/interaction_layer.json'
];

export async function loadAllWorkflows() {
    const loaded = [];

    for (const file of WORKFLOW_FILES) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                console.error(`Failed to load ${file}: ${response.status}`);
                continue;
            }
            const json = await response.json();
            loaded.push(json);
        } catch (err) {
            console.error(`Error loading ${file}:`, err);
        }
    }

    setPipelines(loaded);
    return loaded;
}