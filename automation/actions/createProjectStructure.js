const fs = require('fs');
const path = require('path');
const { dialog, shell } = require('electron');

/*
 * Create directory safely
 */
function ensureDirectory(directoryPath) {

    if (!fs.existsSync(directoryPath)) {

        fs.mkdirSync(directoryPath, {
            recursive: true
        });

    }

}

/*
 * Generate project structure
 */
async function createProjectStructure() {

    /*
     * Ask user for workspace root folder
     */
    const result = await dialog.showOpenDialog({

        title: 'Select workspace root folder',

        properties: [
            'openDirectory'
        ]

    });

    /*
     * User cancelled
     */
    if (result.canceled || !result.filePaths.length) {

        return {

            success: false,

            error: 'Workspace selection cancelled.'

        };

    }

    /*
     * Workspace root
     */
    const workspaceRoot = result.filePaths[0];

    /*
     * Build folder paths
     */
    const paths = {

        workspaceRoot,

        unityProject:
            path.join(workspaceRoot, 'UnityProject'),

        unityAssetsImport:
            path.join(
                workspaceRoot,
                'UnityProject',
                'Assets',
                'Imported'
            ),

        workflowData:
            path.join(workspaceRoot, 'WorkflowData'),

        captures:
            path.join(
                workspaceRoot,
                'WorkflowData',
                'Captures'
            ),

        meshroom:
            path.join(
                workspaceRoot,
                'WorkflowData',
                'Meshroom'
            ),

        blender:
            path.join(
                workspaceRoot,
                'WorkflowData',
                'Blender'
            ),

        exports:
            path.join(
                workspaceRoot,
                'WorkflowData',
                'Exports'
            ),

        textures:
            path.join(
                workspaceRoot,
                'WorkflowData',
                'Textures'
            ),

        documentation:
            path.join(
                workspaceRoot,
                'Documentation'
            ),

        references:
            path.join(
                workspaceRoot,
                'References'
            )

    };

    /*
     * Create directories
     */
    Object.values(paths).forEach((directoryPath) => {
        ensureDirectory(directoryPath);
    });

    /*
     * Open workspace folder
     */
    await shell.openPath(workspaceRoot);

    /*
     * Return success
     */
    return {

        success: true,

        message:
            'Project structure generated successfully.',

        projectPaths: paths

    };

}

module.exports = createProjectStructure;