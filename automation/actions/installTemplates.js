const { shell } = require('electron');

/*
 * Open Unity Asset Store templates page
 */
async function installTemplates() {

    await shell.openExternal(
        'https://assetstore.unity.com/templates'
    );

    return {

        success: true,

        message:
            'Opened Unity Asset Store templates page.'

    };

}

module.exports = installTemplates;