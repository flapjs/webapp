
const path = require('path');

const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const globals = require('../.config/globals.js').getGlobalVariables();

const pkg = require('../package.json');
const PROJECT_ALIAS = `@${pkg.name}`;

module.exports = {
    stories: ['../src/**/*.stories.mdx'],
    addons: ['@storybook/addon-docs'],
    webpackFinal: async (config, { configType }) => {

        const env = configType.toLowerCase();
        config.resolve.alias[PROJECT_ALIAS] = path.resolve('.', 'src');
        config.plugins.push(new DefinePlugin(globals));
        config.plugins.push(new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
        }));

        // Use SVGR...
        // https://github.com/storybookjs/storybook/issues/6758
        config.module.rules = config.module.rules.map(rule =>
        {
            if (rule.test.toString().includes('svg'))
            {
                const test = rule.test
                    .toString()
                    .replace('svg|', '')
                    .replace(/\//g, '');
                return { ...rule, test: new RegExp(test) };
            }
            else
            {
                return rule;
            }
        });
        config.module.rules.push(
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                    }
                ]
            });

        // Use MiniCSSExtract...
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