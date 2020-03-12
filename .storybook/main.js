/* eslint-env node */

const path = require('path');

const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const globals = require('../.config/globals.js');

/**
 * We are just trying to match `base.config.js` by overriding storybook's webpack config.
 * 
 * For more information, refer to here:
 * https://storybook.js.org/docs/configurations/custom-webpack-config/
 */
module.exports = {
    stories: ['../src/**/*.stories.js'],
    webpackFinal: async (config, { configType }) =>
    {
        const env = configType.toLowerCase();
       
        config.resolve.alias['@flapjs'] = path.resolve('.', 'src');
        config.plugins.push(new DefinePlugin(globals));
        config.plugins.push(new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
        }));

        config.module.rules = config.module.rules.filter(rule => !rule.test.toString().includes('css'));
        config.module.rules.unshift({
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
                        importLoaders: 2,
                        modules: {
                            localIdentName: '[path]__[name]__[local]--[hash:base64:5]'
                        },
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        });
        config.module.rules.unshift({
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
        });
        
        return config;
    }
};