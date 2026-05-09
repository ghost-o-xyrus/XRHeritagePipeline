const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');

/*
 * Recursively copy folder contents
 */
function copyRecursive(source, destination) {

    /*
     * Create destination if missing
     */
    if (!fs.existsSync(destination)) {

        fs.mkdirSync(destination, {
            recursive: true
        });

    }

    /*
     * Read source contents
     */
    const entries = fs.readdirSync(source, {
        withFileTypes: true
    });

    for (const entry of entries) {

        const sourcePath =
            path.join(source, entry.name);

        const destinationPath =
            path.join(destination, entry.name);

        /*
         * Recurse into folders
         */
        if (entry.isDirectory()) {

            copyRecursive(
                sourcePath,
                destinationPath
            );

        }

        /*
         * Copy files
         */
        else {

            fs.copyFileSync(
                sourcePath,
                destinationPath
            );

        }

    }

}

/*
 * Main asset copy workflow
 */
async function copyWorkflowAssets(payload = {}) {

    const workflowContext =
        payload.workflowContext || {};

    /*
     * Required destinations
     */
    const texturesDestination =
        workflowContext.textures;

    const exportsDestination =
        workflowContext.exports;

    const unityImportDestination =
        workflowContext.unityAssetsImport;

    /*
     * Validate workflow paths
     */
    if (
        !texturesDestination ||
        !exportsDestination ||
        !unityImportDestination
    ) {

        return {

            success: false,

            error:
                'Project structure paths missing.'

        };

    }

    /*
     * Ask for texture source folder
     */
    const textureDialog =
        await dialog.showOpenDialog({

            title: 'Select texture source folder',

            properties: [
                'openDirectory'
            ]

        });

    if (
        textureDialog.canceled ||
        !textureDialog.filePaths.length
    ) {

        return {

            success: false,

            error:
                'Texture folder selection cancelled.'

        };

    }

    /*
     * Ask for export source folder
     */
    const exportDialog =
        await dialog.showOpenDialog({

            title: 'Select export source folder',

            properties: [
                'openDirectory'
            ]

        });

    if (
        exportDialog.canceled ||
        !exportDialog.filePaths.length
    ) {

        return {

            success: false,

            error:
                'Export folder selection cancelled.'

        };

    }

    /*
     * Source folders
     */
    const textureSource =
        textureDialog.filePaths[0];

    const exportSource =
        exportDialog.filePaths[0];

    /*
     * Copy textures
     */
    copyRecursive(
        textureSource,
        texturesDestination
    );

    copyRecursive(
        textureSource,
        unityImportDestination
    );

    /*
     * Copy exports
     */
    copyRecursive(
        exportSource,
        exportsDestination
    );

    copyRecursive(
        exportSource,
        unityImportDestination
    );

    /*
     * Success response
     */
    return {

        success: true,

        message:
            'Workflow assets copied successfully.'

    };

}

module.exports = copyWorkflowAssets;