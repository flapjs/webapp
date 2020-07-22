const pkg = require('../package.json');

/**
 * **IMPORTANT: If this is required anywhere, please update this!**
 * 
 * This is where global variables are declared to be used by
 * all source files (including test files). Don't forget to
 * put `global NAME_OF_GLOBAL_VARIABLE` as a block comment
 * at the top of the file to satisfy the linters.
 * 
 * Also, any globals defined here must also be declared in
 * the `declarations.d.ts` file at the root. Please don't
 * forget this as you will get confusing type errors!
 * 
 * **NOTE:** This is used by DefinePlugin in `common.config.js`
 * and by "globals" in .jest/config.js.
 */
module.exports = {
    '__VERSION__': `"${pkg.version}"`,
    '__BUG_REPORT_URL__': `"${pkg.bugs.url}"`,
    '__PROJECT_NAME__': `"${pkg.name}"`,

    // This is computed and added by `.webpack/common/defineGlobals.js`.
    // '__NODE_ENV__': `"${env}"`,
    // This is used ONLY by the service worker and added by `./src/assets/template.html`.
    // '__SERVICE_WORKER_ENV__': ...
};
