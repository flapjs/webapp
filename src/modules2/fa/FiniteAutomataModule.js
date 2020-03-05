import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services2/graph/GraphService.js';
import NotifyService from '@flapjs/services2/notify/NotifyService.js';
import HistoryService from '@flapjs/services2/history/HistoryService.js';

import FiniteAutomataToolbar from './FiniteAutomataToolbar.jsx';
import FiniteAutomataForeground from './FiniteAutomataForeground.jsx';
import FiniteAutomataGraph from './fagraph/FiniteAutomataGraph.js';
import FiniteAutomataGraphPlayground from './fagraph/FiniteAutomataGraphPlayground.jsx';

import AutoInit from './AutoInit.jsx';
import AutoSave from './AutoSave.jsx';

import OverviewPanel from './drawer/OverviewPanel.jsx';
import AnalysisPanel from './drawer/AnalysisPanel.jsx';
import TestingPanel from './drawer/TestingPanel.jsx';
import ExportPanel from './drawer/ExportPanel.jsx';

export default class FiniteAutomataModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'fa'; }
    /** @override */
    static get moduleVersion() { return '1.0.0'; }

    /** @override */
    static get renders()
    {
        return {
            header: [ AutoInit, AutoSave ],
            appbar: [ FiniteAutomataToolbar ],
            viewarea: [ FiniteAutomataForeground ],
            drawer: [ OverviewPanel, AnalysisPanel, TestingPanel, ExportPanel ],
        };
    }

    /** @override */
    static get services()
    {
        return [
            HistoryService,
            NotifyService.withInitialMessages([ 'Hello' ]),
            GraphService.withGraphType(FiniteAutomataGraph, FiniteAutomataGraphPlayground),
        ];
    }
}
