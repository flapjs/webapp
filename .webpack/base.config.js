/* eslint-env node */

const path = require('path');

const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globals = require('../.config/globals.js');

// NOTE: Why is this a function, not an object?
// https://webpack.js.org/guides/environment-variables/
module.exports = env => ({
    entry: {
        /** Add entrypoints here for different modules. */
        'app.bundle': './src/main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            /** Add any aliases that need to be resolved by webpack here. Refer to eslint and jest config as well. */
            '@flapjs': path.resolve('.', 'src'),
        }
    },
    module: {
        rules: [
            /** Add loaders here for different file types. */
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                    configFile: './.eslintrc.js'
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            },
            /** This is to auto-bundle svg to React components. */
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                    }
                ]
            },
            /** This is to load asset files into chunks while bundling. */
            {
                test: /\.(png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            /** This is to bundle LOCAL css module files. */
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: env === 'development',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // NOTE: This would transform any names from dash-case to camelCase,
                            // which would allow you to write dash-case in CSS files and
                            // camelCase in JavaScript. However, this would be an issue for
                            // Jest, which needs to revert the transformation in order to
                            // test it, which, due to ambiguity, is impossible. Therefore,
                            // we don't use it.
                            // localsConvention: 'dashes',
                            importLoaders: 2,
                            modules: {
                                // This is the generated CSS name... perhaps it doesn't need to be this long?
                                localIdentName: '[path]__[name]__[local]--[hash:base64:5]'
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            /** This is to bundle GLOBAL css files. */
            {
                test: /^((?!\.module).)*\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: env === 'development',
                        }
                    },
                    {
                        loader: 'css-loader',
                        // NOTE: We got rid of CSS modules for this loader, because this is a
                        // global CSS file which does not need any transformations.
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]'
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new DefinePlugin(globals),
        new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
        }),
    ]
});
