import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services/graph/GraphService.js';
import NotifyService from '@flapjs/services/notify/NotifyService.js';
import HistoryService from '@flapjs/services/history/HistoryService.js';

import ExportPanel from './drawer/export/ExportPanel.jsx';

import NodeGraph from './graph/NodeGraph.js';
import NodeGraphPlayground from './graph/NodeGraphPlayground.jsx';
import NodeGraphLabelEditor from './graph/widgets/editor/NodeGraphLabelEditor.jsx';

import NodeToolbar from './NodeToolbar.jsx';
import AutoInit from './AutoInit.jsx';
import AutoSave from './AutoSave.jsx';

export default class NodeModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'node'; }
    /** @override */
    static get moduleVersion() { return '2.0.0'; }

    /** @override */
    static get services()
    {
        return [
            HistoryService,
            NotifyService.withInitialMessages([ 'Welcome to Node Module!', 'I hope you have a wonderful time.', 'I really do.', 'Seriously.' ]),
            GraphService.withGraphType(NodeGraph, NodeGraphPlayground, NodeGraphLabelEditor),
        ];
    }

    /** @override */
    static get renders()
    {
        return {
            header: [ AutoInit, AutoSave ],
            appbar: [ NodeToolbar ],
            drawer: [ ExportPanel ],
        };
    }
}
