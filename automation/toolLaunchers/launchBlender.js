const { spawn } = require('child_process');

const { COMMON_PATHS } = require('../config');
const { exists } = require('../filesystem/directoryManager');
const { pickFile, info } = require('../dialogs');
const { sendProgress } = require('../progress');

async function launchBlender(context) {

    // Try known install paths
    let exe = COMMON_PATHS.BLENDER.find(p => exists(p));

    // If not found, ask user to locate blender.exe
    if (!exe) {
        await info(
            context,
            'Blender not found',
            'Locate your blender.exe manually. You can download Blender from blender.org.'
        );
        exe = await pickFile(
            context,
            'Locate blender.exe',
            [{ name: 'Executable', extensions: ['exe'] }]
        );
        if (!exe) return { message: 'Launch cancelled' };
    }

    sendProgress(context, `Launching Blender from ${exe}`);
    spawn(exe, [], { detached: true, stdio: 'ignore' }).unref();
    return { message: 'Blender launched' };
}

module.exports = launchBlender;