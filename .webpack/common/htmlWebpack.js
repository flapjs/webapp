/* eslint-env node */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourceOnlyPlugin = require('html-webpack-inline-source-only-plugin');

// This is our custom webpack plugin to handle defer/async bundled scripts.
const HtmlWebpackScriptAttributesPlugin = require('../../tools/webpack/html-webpack-script-attributes-plugin/index.js');

const pkg = require('../../package.json');

const HTML_PAGE_TITLE = 'Flap.js';

module.exports = env => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/template.html',
            cache: false,
            // NOTE: This is used nowhere, since we override it in the template.
            // But we have it here anyways since the expected use case is to define
            // it here. So it's really just in case someone references it unknowingly.
            title: HTML_PAGE_TITLE,
            // NOTE: Other data used only by the template, not the plugin itself (this is allowed).
            package: pkg,
        }),
        new HtmlWebpackInlineSourceOnlyPlugin(HtmlWebpackPlugin),
        new HtmlWebpackScriptAttributesPlugin(HtmlWebpackPlugin, {
            defaultAttributes: { 'defer': true }
        }),
    ]
});
