import BaseModule from '../base/BaseModule.js';
import GraphService from '@flapjs/services/graph/GraphService.js';
import MachineService from '@flapjs/services/machine/MachineService.js';

import * as NotificationService from '@flapjs/services/notification/NotificationService.js';
import * as HistoryService from '@flapjs/services2/history/HistoryService.js';

import PushDownAutomataToolbar from './PushDownAutomataToolbar.jsx';
import PushDownAutomataGraph from './graph/FiniteAutomataGraph.js';
import PushDownAutomataGraphPlayground from './graph/FiniteAutomataGraphPlayground.jsx';

import GraphMachineSource from '@flapjs/services/graphmachine/GraphMachineSource.jsx';
import GraphMachineNotifier from '@flapjs/services/graphmachine/GraphMachineNotifier.jsx';
import PushDownAutomataGraphEditor from 
import PushDownAutomataBuilder from 


import OverviewPanel from './drawer/overview/OverviewPanel.jsx';
import ComputePanel from './drawer/compute/ComputePanel.jsx';
import TestingPanel from './drawer/testing/TestingPanel.jsx';
import ExportPanel from './drawer/export/ExportPanel.jsx';





export default class PushdownAutomataModule extends BaseModule
{
    /** @override */
    static get moduleId() { return 'pda'; }
    /** @override */
    static get moduleVersion() { return '3.0.0'; }

    /** @override */
    static get providers() { return [
        NotificationService.NotificationProvider,
        HistoryService.HistoryProvider,
    ]; }
    /** @override */
    static get renders()
    {
        return {
            header: [ ],
            //appbar: [PushDownAutomataToolbar],
            playarea: [
                // [GraphMachineSource, { machineBuilderType: PushDownAutomataBuilder }],
                // [GraphMachineNotifier, { machineBuilderType: PushDownAutomataBuilder }]
             ],
            foreground: [
                NotificationService.NotificationList,
            ],
            viewarea: [ ],
            drawer: [OverviewPanel, TestingPanel, ComputePanel, ExportPanel],
        };
    }

    /** @override */
    static get services()
    {
        return [
            //GraphService.withGraphType(PushDownAutomataGraph, PushDownAutomataGraphPlayground, PushDownAutomataGraphEditor),
            GraphService.withGraphType(FiniteAutomataGraph, FiniteAutomataGraphPlayground, FiniteAutomataGraphEditor),
            MachineService,
        ];
    }
}
