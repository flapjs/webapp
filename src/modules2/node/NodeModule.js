import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services2/graph/GraphService.js';
import NotifyService from '@flapjs/services2/notify/NotifyService.js';

import ExportPanel from './ExportPanel.jsx';

import NodeGraph from './nodegraph/NodeGraph.js';
import NodeGraphPlayground from './nodegraph/NodeGraphPlayground.jsx';
import NodeToolbar from './NodeToolbar.jsx';

export default class NodeModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'node'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }

    /** @override */
    static get services()
    {
        return [
            NotifyService.withInitialMessages([ 'Welcome to Node Module!', 'I hope you have a wonderful time.', 'I really do.', 'Seriously.' ]),
            GraphService.withGraphType(NodeGraph, NodeGraphPlayground)
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
            appbar: [ NodeToolbar ],
            drawer: [ ExportPanel ],
        };
    }
}
