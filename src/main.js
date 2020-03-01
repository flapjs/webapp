/* global module */
/* global __NODE_ENV__ */
/* global __VERSION__ */

// NOTE: This is for polyfill
// eslint-disable-next-line import/no-unassigned-import
import 'core-js/stable';
// eslint-disable-next-line import/no-unassigned-import
import 'regenerator-runtime/runtime';

import Logger from './util/Logger.js';
import * as Application from './Application.js';

Logger.out('Main', '='.repeat(40));

// NOTE: __NODE_ENV__ is defined in `template.html` as a global.
Logger.out('Main', `Preparing app for ${__NODE_ENV__} environment...`);
// NOTE: __VERSION__ is defined by Webpack with the DefinePlugin.
Logger.out('Main', `Loading app version '${__VERSION__}'...`);

// Initial rendering...
Application.startUp();

// Debug rendering...
if (module.hot)
{
    Logger.out('Main', '...in debug mode for hot-reload...');
    module.hot.accept();
    module.hot.dispose(function()
    {
        // eslint-disable-next-line no-console
        console.clear();
        Application.shutDown();
    });
}
