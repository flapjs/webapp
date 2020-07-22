/* global __NODE_ENV__ */
/* global __VERSION__ */

import { startUp } from './WebApplication.js';

// NOTE: __NODE_ENV__ is defined in `template.html` as a global.
// NOTE: __VERSION__ is defined by Webpack with the DefinePlugin.
startUp(__NODE_ENV__, __VERSION__);
