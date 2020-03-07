import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services/graph/GraphService.js';
import NotifyService from '@flapjs/services/notify/NotifyService.js';
import HistoryService from '@flapjs/services/history/HistoryService.js';
import MachineService from '@flapjs/services/machine/MachineService.js';

import FiniteAutomataToolbar from './FiniteAutomataToolbar.jsx';
import FiniteAutomataForeground from './FiniteAutomataForeground.jsx';
import FiniteAutomataGraph from './fagraph/FiniteAutomataGraph.js';
import FiniteAutomataGraphPlayground from './fagraph/FiniteAutomataGraphPlayground.jsx';

import AutoInit from './AutoInit.jsx';
import AutoSave from './AutoSave.jsx';

import OverviewPanel from './drawer/overview/OverviewPanel.jsx';
import AnalysisPanel from './drawer/analysis/AnalysisPanel.jsx';
import TestingPanel from './drawer/testing/TestingPanel.jsx';
import ExportPanel from './drawer/export/ExportPanel.jsx';

import GraphMachineSource from '@flapjs/services/graphmachine/GraphMachineSource.jsx';
import FSABuilder from './machine/FSABuilder.js';

export default class FiniteAutomataModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'fa'; }
    /** @override */
    static get moduleVersion() { return '4.0.0'; }

    /** @override */
    static get providers() { return []; }
    /** @override */
    static get renders()
    {
        return {
            header: [ AutoInit, AutoSave ],
            appbar: [ FiniteAutomataToolbar ],
            playarea: [ [GraphMachineSource, { machineBuilderType: FSABuilder }] ],
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
            MachineService,
        ];
    }
}
