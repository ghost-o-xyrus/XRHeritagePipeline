const path = require('path');
const fs   = require('fs');

const { pickFolder, info } = require('../dialogs');
const { copyFolderRecursive } = require('../filesystem/fileCopier');
const { exists } = require('../filesystem/directoryManager');
const { sendProgress } = require('../progress');

async function installScripts(context) {
    // <repo>/templates/scripts
    const srcRoot = path.resolve(__dirname, '..', '..', 'templates', 'scripts');

    if (!exists(srcRoot) || fs.readdirSync(srcRoot).length === 0) {
        await info(
            context,
            'No scripts bundled yet',
            'The templates/scripts/ folder is empty. Add reusable C# scripts there first.'
        );
        return { message: 'No scripts to install' };
    }

    const dest = await pickFolder(context, 'Select target Unity project Scripts folder');
    if (!dest) return { message: 'Cancelled' };

    sendProgress(context, `Installing scripts into ${dest}`);
    const count = copyFolderRecursive(srcRoot, dest);

    await info(context, 'Scripts installed', `Copied ${count} script(s) into:\n${dest}`);
    return { message: `Installed ${count} script file(s)` };
}

module.exports = installScripts;