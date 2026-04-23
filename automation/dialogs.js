const { dialog } = require('electron');

async function pickFolder(context, title = 'Select a folder') {
    const win = context.getMainWindow();
    const result = await dialog.showOpenDialog(win, {
        title,
        properties: ['openDirectory', 'createDirectory']
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
}

async function pickFile(context, title = 'Select a file', filters = []) {
    const win = context.getMainWindow();
    const result = await dialog.showOpenDialog(win, {
        title,
        filters,
        properties: ['openFile']
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
}

async function confirm(context, message, detail = '') {
    const win = context.getMainWindow();
    const result = await dialog.showMessageBox(win, {
        type: 'question',
        buttons: ['Cancel', 'Yes'],
        defaultId: 1,
        cancelId: 0,
        message,
        detail
    });
    return result.response === 1;
}

async function info(context, message, detail = '') {
    const win = context.getMainWindow();
    await dialog.showMessageBox(win, {
        type: 'info',
        buttons: ['OK'],
        message,
        detail
    });
}

module.exports = { pickFolder, pickFile, confirm, info };