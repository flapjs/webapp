import BaseModule from '../base/BaseModule.js';

import ExportPanel from './ExportPanel.jsx';
import NodePlayground from './NodePlayground.jsx';

export default class NodeModule extends BaseModule
{
    /** @override */
    static get renders()
    {
        return {
            drawer: [ ExportPanel, ExportPanel ],
            playground: [ NodePlayground ],
        };
    }

    /** @override */
    static get moduleId() { return 'node'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }
}
