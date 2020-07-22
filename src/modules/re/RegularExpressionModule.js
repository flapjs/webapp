import BaseModule from '../base/BaseModule.js';

import RegularExpressionPlayground from './RegularExpressionPlayArea.jsx';

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
            viewarea: [
                { component: RegularExpressionPlayground, props: {} }
            ],
        };
    }
}
