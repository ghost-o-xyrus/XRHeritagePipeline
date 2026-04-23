const { pickFolder, info } = require('../dialogs');
const { createDirectoryTree } = require('../filesystem/directoryManager');
const { sendProgress } = require('../progress');

/*
 * Standard XR Heritage project folder layout
 * (per design doc Section 6.3 Project Organization Structure).
 */
const STANDARD_SUBDIRS = [
    'Assets',
    'Scenes',
    'Prefabs',
    'Scripts',
    'Monuments',
    'Templates'
];

async function createProjectStructure(context) {
    const root = await pickFolder(context, 'Choose root folder for the new project');
    if (!root) return { message: 'Cancelled' };

    sendProgress(context, `Creating folder structure in ${root}`);
    createDirectoryTree(root, STANDARD_SUBDIRS);

    await info(
        context,
        'Project structure created',
        `Created folders:\n${STANDARD_SUBDIRS.map(s => '  /' + s).join('\n')}\n\nat:\n${root}`
    );
    return { message: `Structure created at ${root}` };
}

module.exports = createProjectStructure;