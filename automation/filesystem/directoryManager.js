const fs   = require('fs');
const path = require('path');

/*
 * Create a directory (and all parents) if it does not exist.
 */
function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

/*
 * Create a tree of subdirectories under a root.
 * subdirs: array of folder names, e.g. ['Assets', 'Scenes']
 */
function createDirectoryTree(rootPath, subdirs) {
    ensureDir(rootPath);
    for (const sub of subdirs) {
        ensureDir(path.join(rootPath, sub));
    }
}

function exists(p) {
    try { fs.accessSync(p); return true; }
    catch { return false; }
}

module.exports = { ensureDir, createDirectoryTree, exists };