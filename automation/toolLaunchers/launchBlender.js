const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { shell } = require('electron');

/*
 * Common Blender install locations
 */
// const POSSIBLE_PATHS = [

//     /*
//      * Standard Windows install paths
//      */
//     'C:\\Program Files\\Blender Foundation\\Blender 4.0\\blender.exe',
//     'C:\\Program Files\\Blender Foundation\\Blender 3.6\\blender.exe',
//     'C:\\Program Files\\Blender Foundation\\Blender\\blender.exe',

//     /*
//      * Portable installs
//      */
//     path.join(process.env.USERPROFILE || '', 'Desktop', 'Blender', 'blender.exe'),

//     path.join(process.env.USERPROFILE || '', 'Downloads', 'Blender', 'blender.exe')

// ];

// /*
//  * Find Blender executable
//  */
// function findBlenderExecutable() {

//     for (const executablePath of POSSIBLE_PATHS) {

//         if (fs.existsSync(executablePath)) {
//             return executablePath;
//         }

//     }

//     return null;
// }
function findBlenderExecutable() {

    /*
     * Main Blender install directory
     */
    const blenderRoot =
        'C:\\Program Files\\Blender Foundation';

    /*
     * Check if Blender Foundation folder exists
     */
    if (fs.existsSync(blenderRoot)) {

        /*
         * Read all folders inside Blender Foundation
         */
        const folders = fs.readdirSync(blenderRoot);

        for (const folder of folders) {

            /*
             * Look for folders starting with "Blender"
             */
            if (folder.startsWith('Blender')) {

                const executablePath = path.join(
                    blenderRoot,
                    folder,
                    'blender.exe'
                );

                /*
                 * Check if blender.exe exists
                 */
                if (fs.existsSync(executablePath)) {
                    return executablePath;
                }

            }

        }

    }

    /*
     * Portable install locations
     */
    const portablePaths = [

        path.join(
            process.env.USERPROFILE || '',
            'Desktop',
            'Blender',
            'blender.exe'
        ),

        path.join(
            process.env.USERPROFILE || '',
            'Downloads',
            'Blender',
            'blender.exe'
        )

    ];

    /*
     * Check portable paths
     */
    for (const executablePath of portablePaths) {

        if (fs.existsSync(executablePath)) {
            return executablePath;
        }

    }

    return null;
}
/*
 * Launch Blender
 */
async function launchBlender() {

    const executable = findBlenderExecutable();

    /*
     * Blender found
     */
    if (executable) {

        spawn(executable, [], {
            detached: true,
            stdio: 'ignore'
        }).unref();

        return {

            success: true,

            message: 'Blender launched successfully.'

        };

    }

    /*
     * Blender missing
     */
    await shell.openExternal(
        'https://www.blender.org/download/'
    );

    return {

        success: false,

        message:
            'Blender not found. Opened Blender download page.'

    };

}

module.exports = launchBlender;