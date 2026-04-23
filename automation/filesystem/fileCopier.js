const fs   = require('fs');
const path = require('path');

/*
 * Recursively copy a folder and all its contents into another folder.
 */
function copyFolderRecursive(src, dest) {
    if (!fs.existsSync(src)) {
        throw new Error(`Source folder does not exist: ${src}`);
    }

    fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });
    let count = 0;

    for (const entry of entries) {
        const srcPath  = path.join(src,  entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            count += copyFolderRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
            count += 1;
        }
    }

    return count;
}

module.exports = { copyFolderRecursive };