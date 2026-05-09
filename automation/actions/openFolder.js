const { dialog, shell } = require('electron');

async function openFolder(payload = {}) {

    const folderType = payload.foldertype || 'generic';

    /*
     * Open folder picker dialog
     */
    const result = await dialog.showOpenDialog({

        title: `Select ${folderType} folder`,

        properties: [
            'openDirectory'
        ]

    });

    /*
     * User cancelled dialog
     */
    if (result.canceled || !result.filePaths.length) {

        return {
            success: false,
            error: 'Folder selection cancelled.'
        };

    }

    /*
     * Selected folder path
     */
    const selectedPath = result.filePaths[0];

    /*
     * Open folder in OS explorer
     */
    await shell.openPath(selectedPath);

    /*
     * Return response
     */
    return {

        success: true,

        message:
            `${folderType} folder selected: ${selectedPath}`,

        folderType,

        path: selectedPath

    };

}

module.exports = openFolder;