import BaseModule from '../base/BaseModule.js';
// import GraphService from '@flapjs/services/graph/GraphService.js';
import ViewService from '@flapjs/services/view/ViewService.js';

import * as GraphService from '@flapjs/services3/graph/GraphService.js';
import * as HistoryService from '@flapjs/services2/history/HistoryService.js';
import * as NotificationService from '@flapjs/services/notification/NotificationService.js';

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
            ViewService,
            // GraphService.withGraphType(NodeGraph, NodeGraphPlayground, NodeGraphLabelEditor),
        ];
    }

    /** @override */
    static get renders()
    {
        return {
            header: [ AutoInit, AutoSave ],
            appbar: [ NodeToolbar ],
            drawer: [ ExportPanel ],
            foreground: [ NotificationService.NotificationList ],
            playarea: [NodeGraphPlayground]
        };
    }

    /** @override */
    static get providers()
    {
        return [
            GraphService.GraphProvider,
            NotificationService.NotificationProvider,
            HistoryService.HistoryProvider,
        ];
    }
}
