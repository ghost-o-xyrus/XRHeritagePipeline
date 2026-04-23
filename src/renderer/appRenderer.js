/*
 * Entry point for the renderer process.
 * Loads workflows, initializes components, triggers the first render.
 */

import { loadAllWorkflows } from '../logic/workflowLoader.js';
import { navigateToPipeline } from '../logic/navigationController.js';
import { getDefaultPipelineId } from '../logic/pipelineManager.js';

import { renderPipelineTabs } from './pipelineRenderer.js';
import { renderStepList, renderStepContent } from './stepRenderer.js';
import { renderStatus } from './statusRenderer.js';

import { initTopNavigation } from '../components/topNavigation.js';
import { initSidebar } from '../components/sidebar.js';
import { initContentPanel } from '../components/contentPanel.js';
import { initHelperButtons } from '../components/helperButtons.js';
import { initStatusBar } from '../components/statusBar.js';

/*
 * Full re-render of every region.
 * Simple and predictable for an MVP — performance is not
 * a concern at this scale.
 */
function renderAll() {
    renderPipelineTabs();
    renderStepList();
    renderStepContent();
    renderStatus();
}

async function bootstrap() {
    // 1. Load workflow data
    await loadAllWorkflows();

    // 2. Wire event listeners. Each component gets renderAll
    //    as its "something changed" callback.
    initTopNavigation(renderAll);
    initSidebar(renderAll);
    initContentPanel(renderAll);
    initHelperButtons(renderAll);
    initStatusBar();

    // 3. Auto-select the first pipeline so the user sees content
    //    immediately instead of an empty panel.
    const defaultId = getDefaultPipelineId();
    if (defaultId) {
        navigateToPipeline(defaultId);
    }

    // 4. First paint
    renderAll();
}

bootstrap().catch(err => {
    console.error('Application failed to start:', err);
});