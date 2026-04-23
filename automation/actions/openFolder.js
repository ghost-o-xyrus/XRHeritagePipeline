const { shell } = require('electron');

const { pickFolder } = require('../dialogs');
const { sendProgress } = require('../progress');

async function openFolder(context) {
    const folder = await pickFolder(context, 'Select a folder');
    if (!folder) return { message: 'No folder selected' };

    sendProgress(context, `Opening ${folder}`);
    const failureReason = await shell.openPath(folder);
    if (failureReason) {
        throw new Error(failureReason);
    }
    return { message: `Opened: ${folder}` };
}

module.exports = openFolder;