const pkg = require('../package.json');

// USAGE: Declare any global variables used by all scripts (includes jest tests).
// NOTE: Don't forget to put /* global __GLOBAL_VARIABLE_NAME__ */ at the top of the file,
// where GLOBAL_VARIABLE_NAME is the name of the global variable used.
// NOTE: This is used by DefinePlugin in `base.config.js` and by "globals" in .jest/config.js.
// NOTE: If this is required anywhere else, please update the above!
module.exports = {
    '__VERSION__': `"${pkg.version}"`,
    '__BUG_REPORT_URL__': `"${pkg.bugs.url}"`,
};
