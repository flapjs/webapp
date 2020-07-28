const { DefinePlugin } = require('webpack');

const Globals = require('../../.config/globals.js');

module.exports = env => ({
    plugins: [
        new DefinePlugin(Globals.getGlobalVariables(env)),
    ]
});
