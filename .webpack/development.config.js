/* eslint-env node */

const merge = require('webpack-merge');

const OUTPUT_CONFIG = require('./output.config.js');
const DEV_SERVER_CONFIG = require('./common/devServer.js');

module.exports = env => merge.smart(
    OUTPUT_CONFIG(env),         // Adds file output configs.
    DEV_SERVER_CONFIG(env),     // Adds webpack-dev-server configs.
    // Adds development-only configs
    {
        mode: 'development',
    }
);
