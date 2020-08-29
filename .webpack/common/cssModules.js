const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => ({
    resolve: {
        extensions: [ '.css' ],
    },
    module: {
        rules: [
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
                            // localsConvention: 'dashes',
                            /**
                             * NOTE: The above would transform any names from dash-case to
                             * camelCase, which would allow you to write dash-case in CSS
                             * files and camelCase in JavaScript. However, this would be an
                             * issue for Jest, which needs to revert the transformation in
                             * order to test it, which, due to ambiguity, is impossible.
                             * 
                             * Therefore, we don't use it.
                             */
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
                        options: {
                            importLoaders: 2,
                            modules: {
                                /**
                                 * NOTE: We override the CSS modules name format for this
                                 * loader because this is a global CSS file which does not
                                 * need any transformations.
                                 */
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
        new MiniCssExtractPlugin({
            moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
        }),
    ]
});