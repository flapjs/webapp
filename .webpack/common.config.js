/* eslint-env node */

const path = require('path');
const { merge } = require('webpack-merge');

const pkg = require('../package.json');
const PROJECT_ALIAS = `@${pkg.name}`;

const DEFINE_GLOBALS_CONFIG = require('./common/defineGlobals.js');
const CSS_MODULES_CONFIG = require('./common/cssModules.js');

// NOTE: Why is this a function, not an object?
// https://webpack.js.org/guides/environment-variables/
module.exports = env => merge(
    DEFINE_GLOBALS_CONFIG(env), // Adds global defines
    CSS_MODULES_CONFIG(env),    // Adds css module configs
    // Adds config shared by all configs
    {
        entry: {
            /** Add entrypoints here for different modules. */
            'app.bundle': './src/main.js'
        },
        resolve: {
            extensions: [
                '.js',
                '.jsx',
            ],
            alias: {
                /**
                 * Add any aliases that need to be resolved by
                 * webpack here. Refer to eslint and jest config
                 * as well.
                 */
                [PROJECT_ALIAS]: path.resolve('.', 'src'),
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
                        {
                            loader: 'babel-loader'
                        }
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
                /** This is to load files into strings. */
                {
                    test: /\.(txt|json|lang|md)$/i,
                    use: 'raw-loader',
                },
            ]
        },
    }
);
