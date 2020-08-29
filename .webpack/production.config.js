/* eslint-env node */

const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const OUTPUT_CONFIG = require('./output.config.js');

module.exports = env => merge(
    OUTPUT_CONFIG(env),         // Adds file output configs.
    // Adds production-only configs.
    {
        mode: 'production',
        output: {
            /**
             * Wherever urls should start from. This is used for production.
             * 
             * Be sure to also update `ServiceWorkerInstall.js` service worker
             * path if this changes.
             */
            publicPath: '/webapp/dist/'
        },
        externals: {
            /** Add libraries here that are included externally (such as a <script> tag) */
            'react': 'React',
            'react-dom': 'ReactDOM',
            'prop-types': 'PropTypes'
        },
        plugins: [
            new CleanWebpackPlugin()
        ]
    }
);
