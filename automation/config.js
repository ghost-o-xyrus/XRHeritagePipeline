const path = require('path');
const os   = require('os');

/*
 * Root folder where we install and manage external tools
 * (Meshroom, etc.) that the pipeline downloads automatically.
 */
const TOOLS_ROOT = path.join(os.homedir(), 'XRHeritagePipelineTools');

const PATHS = {
    TOOLS_ROOT,
    MESHROOM_DIR: path.join(TOOLS_ROOT, 'Meshroom')
};

/*
 * Common install paths the launchers will check before
 * prompting to install or locate manually.
 */
const COMMON_PATHS = {
    BLENDER: [
        'C:\\Program Files\\Blender Foundation\\Blender 4.3\\blender.exe',
        'C:\\Program Files\\Blender Foundation\\Blender 4.2\\blender.exe',
        'C:\\Program Files\\Blender Foundation\\Blender 4.1\\blender.exe',
        'C:\\Program Files\\Blender Foundation\\Blender 4.0\\blender.exe',
        'C:\\Program Files\\Blender Foundation\\Blender 3.6\\blender.exe'
    ],
    UNITY_HUB: [
        'C:\\Program Files\\Unity Hub\\Unity Hub.exe',
        'C:\\Program Files (x86)\\Unity Hub\\Unity Hub.exe'
    ]
};

const GITHUB = {
    MESHROOM_LATEST_API: 'https://api.github.com/repos/alicevision/Meshroom/releases/latest'
};

module.exports = { PATHS, COMMON_PATHS, GITHUB };