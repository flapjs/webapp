/* eslint-env node */

const path = require('path');
const merge = require('webpack-merge');
const base = require('./base.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const package = require('../package.json');

// This is our custom webpack plugin to handle inlining.
const HtmlWebpackInlineSourceOnlyPlugin = require('../tools/html-webpack-inline-source-only-plugin/index.js');
// This is our custom webpack plugin to handle defer/async bundled scripts.
const HtmlWebpackScriptAttributesPlugin = require('../tools/html-webpack-script-attributes-plugin/index.js');

const HTML_PAGE_TITLE = 'Flap.js';

module.exports = env => merge.smart(base(env),
{
    output: {
        // NOTE: This should be __dirname, but then all webpack
        // config files would need to be at the root directory.
        // For now, '.' will resolve from execution directory,
        // which the first webpack.config.js is at the root.
        path: path.resolve('.', 'build'),
        publicPath: '/',
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/template.html',
            cache: false,
            // NOTE: This is used nowhere, since we override it in the template.
            // But we have it here anyways since the expected use case is to define
            // it here. So it's really just in case someone references it unknowingly.
            title: HTML_PAGE_TITLE,
            // NOTE: Other data used only by the template, not the plugin itself (this is allowed).
            package,
        }),
        new HtmlWebpackInlineSourceOnlyPlugin(HtmlWebpackPlugin),
        new HtmlWebpackScriptAttributesPlugin(HtmlWebpackPlugin, {
            defaultAttributes: { 'defer': true }
        }),
        new CopyWebpackPlugin([
            { from: './src/assets/metadata/' },
            { from: './src/assets/images/', to: 'images' },
            { from: './src/assets/langs/', to: 'langs' },
            // NOTE: All self-hosted libs should be copied from here to build.
            { from: './src/assets/libs/', to: 'libs' },
            // NOTE: Most of the scripts and styles are already inlined, so
            // this is just for externally loaded scripts.
            { from: './src/assets/scripts/', to: 'scripts' },
            { from: './src/assets/styles/', to: 'styles' },
            // NOTE: Icons are loaded and inlined into bundles automatically.
            // { from: './src/assets/icons/', to: 'icons' },
        ]),
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './src/assets/scripts/ServiceWorker.js',
            swDest: 'service-worker.js'
        }),
    ]
});
