/*
 * Wires clicks on sidebar step items.
 */

import { navigateToStep } from '../logic/navigationController.js';

export function initSidebar(onNavigate) {
    const container = document.getElementById('step-list');
    if (!container) return;

    container.addEventListener('click', (event) => {
        const item = event.target.closest('[data-step-index]');
        if (!item) return;

        const idx = parseInt(item.getAttribute('data-step-index'), 10);
        navigateToStep(idx);
        onNavigate();
    });
}