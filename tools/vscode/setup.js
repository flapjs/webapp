/* eslint-disable no-console */
/* eslint-env node */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
// @ts-ignore
const { prompt } = require('enquirer');

const VSCODE_DIR = './.vscode/';
const VSCODE_SETTINGS_FILENAME = 'settings.json';

// Start the program on execute.
main(process.argv).catch(e => { throw e; });

/**
 * Sets up the workspace for VS code. This usually just means generating an
 * appropriate settings.json. This is a command line script, so simply execute
 * this node script. For a specific mode, you can pass the mode in as the first
 * argument. Here are the list of valid workspace modes:
 * - **full**. For access to everything. Useful for admin or devops work.
 * - **dev**. For general development. Useful for developers. Less clutter.
 * 
 * @param {Array<string>} args The program arguments.
 */
async function main(args)
{
    console.log('Setting up workspace...');
    
    const defaultSettings = await loadSettings('.vscode/settings.json.default');

    const { answer } = await prompt({
        type: 'confirm',
        name: 'answer',
        message: 'Do you want to enable \'dev\' workspace mode?',
    });

    if (answer)
    {
        try
        {
            await writeSettings(defaultSettings);
        }
        catch(e)
        {
            console.log();
            console.log(e);
            process.exit(0);
        }
    }
}

async function writeSettings(settings)
{
    await mkdirp(VSCODE_DIR);

    const settingsPath = path.join(VSCODE_DIR, VSCODE_SETTINGS_FILENAME);
    if (fs.existsSync(settingsPath))
    {
        const { answer } = await prompt({
            type: 'confirm',
            name: 'answer',
            message: `File '${settingsPath}' already exists. Do you want to override it?`
        });

        if (!answer)
        {
            throw 'Skipping \'settings.json\'...';
        }
    }

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4));
}

async function loadSettings(filepath, dst = {})
{
    return new Promise((resolve, reject) =>
    {
        fs.readFile(filepath, 'utf-8', (err, data) =>
        {
            if (err) reject(err);

            let jsonData;
            try
            {
                jsonData = JSON.parse(data);
            }
            catch(e)
            {
                reject(e);
            }

            Object.assign(dst, jsonData);
            resolve(dst);
        });
    });
}
