const pkg = require('../package.json');

/**
 * This is where global variables are declared to be used by all source files (including test files).
 * Don't forget to put `global GLOBAL_VARIABLE_NAME` as a block comment at the top of the file.
 * 
 * Also, any globals defined here must also be declared in the `declarations.d.ts` file at the root.
 * Please don't forget this as you will get confusing type errors!
 * 
 * **NOTE:** This is used by DefinePlugin in `base.config.js` and by "globals" in .jest/config.js.
 * 
 * **NOTE:** If this is required anywhere else, please update the above!
 */
module.exports = {
    '__VERSION__': `"${pkg.version}"`,
    '__BUG_REPORT_URL__': `"${pkg.bugs.url}"`,
};
