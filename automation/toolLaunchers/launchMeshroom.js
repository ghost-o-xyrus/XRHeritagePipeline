const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { shell } = require('electron');

/*
 * Common Meshroom install locations (Windows first)
 */
const POSSIBLE_PATHS = [

    // Standard install locations
    'C:\\Program Files\\Meshroom\\Meshroom.exe',
    'C:\\Program Files\\AliceVision\\Meshroom\\Meshroom.exe',

    // User download locations
    path.join(process.env.USERPROFILE || '', 'Downloads', 'Meshroom', 'Meshroom.exe'),

    // Portable extraction locations
    path.join(process.env.USERPROFILE || '', 'Desktop', 'Meshroom', 'Meshroom.exe')

];

/*
 * Find Meshroom executable
 */
function findMeshroomExecutable() {

    for (const executablePath of POSSIBLE_PATHS) {

        if (fs.existsSync(executablePath)) {
            return executablePath;
        }

    }

    return null;
}

/*
 * Launch Meshroom
 */
async function launchMeshroom() {

    const executable = findMeshroomExecutable();

    /*
     * If Meshroom exists:
     * launch it
     */
    if (executable) {

        spawn(executable, [], {
            detached: true,
            stdio: 'ignore'
        }).unref();

        return {
            success: true,
            message: 'Meshroom launched successfully.'
        };

    }

    /*
     * Otherwise:
     * open GitHub repo
     */
    await shell.openExternal(
        'https://github.com/alicevision/Meshroom'
    );

    return {
        success: false,
        message: 'Meshroom not found. Opened GitHub page.'
    };

}

module.exports = launchMeshroom;