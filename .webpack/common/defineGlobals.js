const { DefinePlugin } = require('webpack');

const globals = require('../../.config/globals.js');

module.exports = env => ({
    plugins: [
        new DefinePlugin({
            ...globals,
            /**
             * This needs to be here to access `env`.
             * Otherwise, it should go in `.config/globals.js`.
             */
            '__NODE_ENV__': `"${env}"`
        }),
    ]
});
