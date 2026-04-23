const path = require('path');
const fs   = require('fs');

const { pickFolder, info } = require('../dialogs');
const { copyFolderRecursive } = require('../filesystem/fileCopier');
const { exists } = require('../filesystem/directoryManager');
const { sendProgress } = require('../progress');

/*
 * Copies whatever is in <repo>/templates/ into the target project.
 * If the templates folder is empty, just informs the user.
 */
async function installTemplates(context) {
    // __dirname = .../automation/actions  →  <repo>/templates
    const srcRoot = path.resolve(__dirname, '..', '..', 'templates');

    if (!exists(srcRoot) || fs.readdirSync(srcRoot).length === 0) {
        await info(
            context,
            'No templates bundled yet',
            'The templates/ folder in this project is empty. Add reusable Unity templates there first, then run this action.'
        );
        return { message: 'No templates to install' };
    }

    const dest = await pickFolder(context, 'Select target Unity project folder');
    if (!dest) return { message: 'Cancelled' };

    sendProgress(context, `Installing templates into ${dest}`);
    const count = copyFolderRecursive(srcRoot, dest);

    await info(context, 'Templates installed', `Copied ${count} file(s) into:\n${dest}`);
    return { message: `Installed ${count} template file(s)` };
}

module.exports = installTemplates;