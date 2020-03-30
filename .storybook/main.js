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
    stories: ['../src/**/*.stories.(js|mdx)'],
    addons: [
        '@storybook/addon-docs/register',
        '@storybook/addon-actions/register',
    ],
    webpackFinal: async (config, { configType }) =>
    {
        const env = configType.toLowerCase();

        config.resolve.alias['@flapjs'] = path.resolve('.', 'src');
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

        // For @storybook/addon-docs...
        await configureStoryBookDocs(config);
        
        return config;
    }
};

const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
async function configureStoryBookDocs(config)
{
    config.module.rules.push({
        // 2a. Load `.stories.mdx` / `.story.mdx` files as CSF and generate
        //     the docs page from the markdown
        test: /\.(stories|story)\.mdx$/,
        use: [
            {
                loader: 'babel-loader',
                // may or may not need this line depending on your app's setup
                options: {
                    plugins: ['@babel/plugin-transform-react-jsx'],
                },
            },
            {
                loader: '@mdx-js/loader',
                options: {
                    compilers: [createCompiler({})],
                },
            },
        ],
    });
    // 2b. Run `source-loader` on story files to show their source code
    //     automatically in `DocsPage` or the `Source` doc block.
    config.module.rules.push({
        test: /\.(stories|story)\.[tj]sx?$/,
        loader: require.resolve('@storybook/source-loader'),
        exclude: [/node_modules/],
        enforce: 'pre',
    });
}