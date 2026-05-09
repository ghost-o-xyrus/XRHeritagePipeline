const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { shell } = require('electron');

/*
 * Find Unity Hub executable
 */
function findUnityHubExecutable() {

    /*
     * Standard Windows install paths
     */
    const possiblePaths = [

        'C:\\Program Files\\Unity Hub\\Unity Hub.exe',

        path.join(
            process.env.LOCALAPPDATA || '',
            'Programs',
            'Unity Hub',
            'Unity Hub.exe'
        )

    ];

    /*
     * Search possible paths
     */
    for (const executablePath of possiblePaths) {

        if (fs.existsSync(executablePath)) {
            return executablePath;
        }

    }

    return null;
}

/*
 * Launch Unity Hub
 */
async function launchUnity() {

    const executable = findUnityHubExecutable();

    /*
     * Unity Hub found
     */
    if (executable) {

        spawn(executable, [], {
            detached: true,
            stdio: 'ignore'
        }).unref();

        return {

            success: true,

            message: 'Unity Hub launched successfully.'

        };

    }

    /*
     * Unity Hub missing
     */
    await shell.openExternal(
        'https://unity.com/releases/unity-6'
    );

    return {

        success: false,

        message:
            'Unity Hub not found. Opened Unity download page.'

    };

}

module.exports = launchUnity;