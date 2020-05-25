/* eslint-env node */

const merge = require('webpack-merge');
const output = require('./output.config.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge.smart(output('production'), {
    mode: 'production',
    output: {
        /**
         * Wherever urls should start from. This is used for production.
         * 
         * Be sure to also update `ServiceWorkerInstall.js` service worker
         * path if this changes.
         */
        publicPath: '/webapp/build/'
    },
    externals: {
        /** Add libraries here that are included externally (such as a <script> tag) */
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
});
