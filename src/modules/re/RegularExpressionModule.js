import BaseModule from '../base/BaseModule.js';

import RegularExpressionWorkspace from './RegularExpressionWorkspace.jsx';

export default class RegularExpressionModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 're'; }
    /** @override */
    static get moduleVersion() { return '3.0.0'; }

    /** @override */
    static get providers() { return []; }
    /** @override */
    static get renders()
    {
        return {
            foreground: [
                RegularExpressionWorkspace,
            ],
        };
    }
}
