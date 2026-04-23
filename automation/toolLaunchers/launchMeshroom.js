const fs    = require('fs');
const path  = require('path');
const https = require('https');
const { spawn, exec } = require('child_process');

const { PATHS, GITHUB } = require('../config');
const { ensureDir, exists } = require('../filesystem/directoryManager');
const { sendProgress } = require('../progress');
const { confirm, info } = require('../dialogs');

/*
 * Find Meshroom.exe inside our managed Meshroom directory.
 * The zip usually extracts into a subfolder like Meshroom-2023.3.0-win64/.
 */
function findMeshroomExe() {
    if (!exists(PATHS.MESHROOM_DIR)) return null;

    // Direct hit
    const direct = path.join(PATHS.MESHROOM_DIR, 'Meshroom.exe');
    if (exists(direct)) return direct;

    // Search one level deep
    const entries = fs.readdirSync(PATHS.MESHROOM_DIR, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const candidate = path.join(PATHS.MESHROOM_DIR, entry.name, 'Meshroom.exe');
            if (exists(candidate)) return candidate;
        }
    }
    return null;
}

/*
 * Fetch the latest release metadata from GitHub's API.
 */
function fetchLatestReleaseInfo() {
    return new Promise((resolve, reject) => {
        const opts = {
            headers: { 'User-Agent': 'XR-Heritage-Pipeline' }
        };
        https.get(GITHUB.MESHROOM_LATEST_API, opts, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`GitHub API returned ${res.statusCode}`));
            }
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(body)); }
                catch (err) { reject(err); }
            });
        }).on('error', reject);
    });
}

/*
 * From the release's asset list, pick the Windows zip.
 */
function findWindowsAsset(release) {
    console.log('[launchMeshroom] Release tag:', release.tag_name);
    console.log('[launchMeshroom] Assets:');
    for (const a of (release.assets || [])) {
        console.log('  -', a.name, '(' + a.size + ' bytes)');
    }

    const asset = (release.assets || []).find(a => {
        const name = (a.name || '').toLowerCase();
        return name.endsWith('.zip') && name.includes('win');
    });

    if (!asset) {
        const names = (release.assets || []).map(a => a.name).join(', ') || '(none)';
        throw new Error(
            `No Windows zip found in Meshroom release ${release.tag_name}. Assets were: ${names}`
        );
    }
    return asset;
}

/*
 * Download a URL to a file, following redirects. Emits progress.
 */
function downloadFile(url, destPath, context, label) {
    return new Promise((resolve, reject) => {
        const opts = { headers: { 'User-Agent': 'XR-Heritage-Pipeline' } };

        const request = https.get(url, opts, (res) => {

            // GitHub asset URLs redirect to S3
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                res.resume(); // drain
                return downloadFile(res.headers.location, destPath, context, label)
                    .then(resolve, reject);
            }

            if (res.statusCode !== 200) {
                return reject(new Error(`Download failed with status ${res.statusCode}`));
            }

            const total       = parseInt(res.headers['content-length'] || '0', 10);
            const totalMB     = total ? (total / 1024 / 1024).toFixed(0) : '?';
            let   downloaded  = 0;
            let   lastReport  = Date.now();

            const fileStream = fs.createWriteStream(destPath);

            res.on('data', (chunk) => {
                downloaded += chunk.length;
                const now = Date.now();
                if (now - lastReport > 1000) {       // throttle: 1/sec
                    const mb  = (downloaded / 1024 / 1024).toFixed(0);
                    const pct = total ? ` (${Math.floor(downloaded * 100 / total)}%)` : '';
                    sendProgress(context, `${label}: ${mb} / ${totalMB} MB${pct}`);
                    lastReport = now;
                }
            });

            res.pipe(fileStream);
            fileStream.on('finish', () => fileStream.close(resolve));
            fileStream.on('error', reject);
        });

        request.on('error', reject);
    });
}

/*
 * Unzip a file on Windows using PowerShell's built-in Expand-Archive.
 */
function unzipWithPowerShell(zipPath, destPath) {
    return new Promise((resolve, reject) => {
        const cmd = `powershell -NoProfile -Command "Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${destPath}' -Force"`;
        exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
            if (err) return reject(new Error(`Unzip failed: ${stderr || err.message}`));
            resolve();
        });
    });
}

/*
 * Main handler.
 */
async function launchMeshroom(context) {

    // 1) If already installed, launch it
    let exe = findMeshroomExe();
    if (exe) {
        sendProgress(context, `Launching Meshroom from ${exe}`);
        spawn(exe, [], { detached: true, stdio: 'ignore' }).unref();
        return { message: 'Meshroom launched' };
    }

    // 2) Confirm install
    const proceed = await confirm(
        context,
        'Meshroom is not installed.',
        'The pipeline can download and install the latest Windows release. This is a large download (several GB — the latest 2025.1.0 zip is ~9.5 GB). Continue?'
    );
    if (!proceed) {
        return { message: 'Install cancelled by user' };
    }

    // 3) Look up latest release
    sendProgress(context, 'Checking latest Meshroom release on GitHub...');
    const release = await fetchLatestReleaseInfo();
    const asset   = findWindowsAsset(release);
    sendProgress(context, `Found ${asset.name} (${release.tag_name})`);

    // 4) Download
    ensureDir(PATHS.MESHROOM_DIR);
    const zipPath = path.join(PATHS.MESHROOM_DIR, asset.name);
    await downloadFile(asset.browser_download_url, zipPath, context, 'Downloading Meshroom');

    // 5) Extract
    sendProgress(context, 'Extracting... (this can take a couple minutes)');
    await unzipWithPowerShell(zipPath, PATHS.MESHROOM_DIR);

    // 6) Clean up the zip
    try { fs.unlinkSync(zipPath); } catch { /* ignore */ }

    // 7) Re-scan for the exe
    exe = findMeshroomExe();
    if (!exe) {
        throw new Error('Meshroom installed but Meshroom.exe could not be located afterward.');
    }

    // 8) Launch
    sendProgress(context, `Launching Meshroom from ${exe}`);
    spawn(exe, [], { detached: true, stdio: 'ignore' }).unref();

    await info(context, 'Meshroom installed', `Installed to:\n${PATHS.MESHROOM_DIR}`);
    return { message: 'Meshroom installed and launched' };
}

module.exports = launchMeshroom;