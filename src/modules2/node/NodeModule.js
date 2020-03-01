import BaseModule from '../base/BaseModule.js';

import ExportPanel from './ExportPanel.jsx';
import FAGraphReducer from '@flapjs/services2/faGraph/FAGraphReducer.js';

import { withConstructor } from '@flapjs/modules2/ModuleHelper.js';

import GraphService from '@flapjs/services2/graph2/GraphService.js';

export default class NodeModule extends BaseModule
{
    /** @override */
    static get services()
    {
        return [
            withConstructor(GraphService, (loader, contribs) =>
            {
                // Sets the graph reducer to our own.
                contribs.providers[0].props.reducer = FAGraphReducer;
            })
        ];
    }

    /** @override */
    static get providers()
    {
        return [];
    }

    /** @override */
    static get renders()
    {
        return {
            drawer: [ ExportPanel, ExportPanel ],
            playground: [],
        };
    }

    /** @override */
    static get moduleId() { return 'node'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }
}
