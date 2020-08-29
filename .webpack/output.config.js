/* eslint-env node */

const path = require('path');
const { merge } = require('webpack-merge');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const COMMON_CONFIG = require('./common.config.js');
const HTML_WEBPACK_CONFIG = require('./common/htmlWebpack.js');

module.exports = env => merge(
    COMMON_CONFIG(env),         // Adds configs shared by all other configs.
    HTML_WEBPACK_CONFIG(env),   // Adds html generation configs.
    // Adds file output configs.
    {
        output: {
            // NOTE: This should be __dirname, but then all webpack
            // config files would need to be at the root directory.
            // For now, '.' will resolve from execution directory,
            // which the initial webpack.config.js is at the root.
            path: path.resolve('.', 'dist'),
            publicPath: '/',
            filename: '[name].js',
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/assets/metadata/' },
                    { from: './src/assets/images/', to: 'images' },
                    { from: './src/assets/langs/', to: 'langs' },
                    // NOTE: All self-hosted libs should be copied from here to build.
                    { from: './node_modules/prop-types/prop-types.min.js', to: 'libs' },
                    { from: './node_modules/react/umd/react.production.min.js', to: 'libs' },
                    { from: './node_modules/react-dom/umd/react-dom.production.min.js', to: 'libs' },
                    // NOTE: Most of the scripts and styles are already inlined, so
                    // this is just for externally loaded scripts.
                    { from: './src/assets/scripts/', to: 'scripts' },
                    { from: './src/assets/styles/', to: 'styles' },
                    // NOTE: Icons are loaded and inlined into bundles automatically.
                    // { from: './src/assets/icons/', to: 'icons' },
                ]
            }),
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: './src/assets/scripts/ServiceWorker.js',
                swDest: 'service-worker.js',
                exclude: [
                    /\.map$/,
                    /manifest$/,
                    /\.htaccess$/,
                    /service-worker\.js$/,
                    /sw\.js$/,
                ],
            }),
        ]
    }
);
