/* eslint-env node */

// TODO: Currently react-refresh still causes issues with our project. Until it is fixed, it should be disabled.

// const { HotModuleReplacementPlugin } = require('webpack');

// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = env => ({
    mode: 'development', // It must be in development mode to work.
    devtool: 'eval-source-map',
    plugins: [
        // new HotModuleReplacementPlugin(),
        // new ReactRefreshWebpackPlugin(),
    ],
    devServer: {
        // hot: false,
        open: true,
        overlay: true,
        contentBase: './dist',
        port: 8001,
        quiet: true,
        // NOTE: This disables the security warning on dev server startup
        https: false,
    },
});
