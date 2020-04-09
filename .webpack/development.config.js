/* eslint-env node */

const merge = require('webpack-merge');
const output = require('./output.config.js');

const { HotModuleReplacementPlugin } = require('webpack');

const result = merge.smart(output('development'), {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        open: true,
        overlay: true,
        contentBase: './build',
        port: 8004,
        quiet: true,
        // NOTE: This disables the security warning on dev server startup
        https: false,
    },
});

module.exports = result;
