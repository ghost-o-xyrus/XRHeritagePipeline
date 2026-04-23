const { pickFolder, info } = require('../dialogs');
const { copyFolderRecursive } = require('../filesystem/fileCopier');
const { sendProgress } = require('../progress');

async function copyWorkflowAssets(context) {
    const src = await pickFolder(context, 'Select SOURCE folder (assets to copy)');
    if (!src) return { message: 'Cancelled' };

    const dest = await pickFolder(context, 'Select DESTINATION folder');
    if (!dest) return { message: 'Cancelled' };

    sendProgress(context, `Copying ${src} → ${dest}`);
    const count = copyFolderRecursive(src, dest);

    await info(context, 'Copy complete', `Copied ${count} file(s) to:\n${dest}`);
    return { message: `Copied ${count} file(s)` };
}

module.exports = copyWorkflowAssets;