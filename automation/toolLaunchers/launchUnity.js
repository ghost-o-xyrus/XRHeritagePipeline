const { spawn } = require('child_process');

const { COMMON_PATHS } = require('../config');
const { exists } = require('../filesystem/directoryManager');
const { pickFile, info } = require('../dialogs');
const { sendProgress } = require('../progress');

async function launchUnity(context) {

    let exe = COMMON_PATHS.UNITY_HUB.find(p => exists(p));

    if (!exe) {
        await info(
            context,
            'Unity Hub not found',
            'Locate Unity Hub.exe manually, or install Unity Hub from unity.com.'
        );
        exe = await pickFile(
            context,
            'Locate Unity Hub.exe',
            [{ name: 'Executable', extensions: ['exe'] }]
        );
        if (!exe) return { message: 'Launch cancelled' };
    }

    sendProgress(context, `Launching Unity Hub from ${exe}`);
    spawn(exe, [], { detached: true, stdio: 'ignore' }).unref();
    return { message: 'Unity Hub launched' };
}

module.exports = launchUnity;